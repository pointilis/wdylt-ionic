import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, PostFilter } from '../models/post';
import { PostUpgradeStatements } from '../upgrades/post.upgrade.statements';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';

@Injectable({
  providedIn: 'root'
})
export class PostStorageService {

  public postList: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  private _databaseName: string = "";
  private _upgradePostStatements: PostUpgradeStatements = new PostUpgradeStatements();
  private _versionUpgrades!: any;
  private _loadToVersion!: any;
  private _db!: SQLiteDBConnection;
  private _isPostReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(
    private _sqliteService: SQLiteService,
    private _dbVerService: DbnameVersionService,
  ) { 
    this._versionUpgrades = this._upgradePostStatements.postUpgrades;
    this._loadToVersion = this._versionUpgrades[this._versionUpgrades.length - 1].toVersion;
  }

  async initializeDatabase(dbName: string) {
    this._databaseName = dbName;

    // create upgrade statements
    await this._sqliteService.addUpgradeStatement({
      database: this._databaseName,
      upgrade: this._versionUpgrades
    });

    // create and/or open the database
    this._db = await this._sqliteService.openDatabase(this._databaseName, false, 'no-encryption', this._loadToVersion, false);
    this._dbVerService.set(this._databaseName, this._loadToVersion);
  }

  // current database state
  postState() {
    return this._isPostReady.asObservable();
  }

  async fetchPosts(filter?: PostFilter) {
    if (!this._db) {
      await this.initializeDatabase('posts');
    }

    // start query
    let sql = `SELECT * FROM posts AS p`;
    
    // filter date
    if (filter?.post_date_gmt) {
      sql += ` WHERE date(p.post_date_gmt) = '${filter?.post_date_gmt}'`
    }

    sql += ` ORDER BY p.ID DESC;`

    const posts: Post[] = (await this._db.query(sql)).values as Post[];
    return posts.map(item => {
      return {
        ...item,
        meta: item?.meta ? JSON.parse(item.meta) : {},
      }
    });
  }

  /**
   * Add post to database
   * 
   * @param data Post
   * @return Post
   */
  async addPost(data: Post) {
    let keys: string[] = [];
    let fields: string[] = [];
    let values: any[] = [];

    for (let key in data) {
      fields.push(key);
      values.push(data[key as keyof Post]);
      keys.push('?');
    }

    const sql = `
      INSERT INTO posts (${fields.join(',')})
      VALUES      (${keys.join(',')})
    `;
    
    const { changes } = await this._db.run(sql, values);
    const lastId = changes?.lastId;
    const post = await this.getPostById(lastId as number);

    return post;
  }

  /**
   * Update post
   */
  async updatePost(pid: string, data: Post) {
    const postContent = data.post_content;
    const postModified = data.post_modified;
    const postModifiedGmt = data.post_modified_gmt;
    const postStatus = data.post_status;
    const tags = data.tags;
    const meta = data.meta;

    const sql = `UPDATE posts 
      SET post_content='${postContent}',
        post_modified='${postModified}',
        post_modified_gmt='${postModifiedGmt}',
        post_status='${postStatus}',
        tags='${tags}',
        meta='${meta}'
      WHERE ID=${pid}`;
    await this._db.run(sql);
    const post = await this.getPostById(pid);

    return post;
  }

  /**
   * Get post by id
   */
  async getPostById(id: string | number): Promise<Post> {
    const sql = `SELECT * FROM posts WHERE id=${id} LIMIT 1`;
    let post: Post = (await this._db.query(sql)).values?.[0] as Post;

    // parsing JSON
    post = {
      ...post,
      meta: post?.meta ? JSON.parse(post.meta) : {},
      tags: post?.tags ? JSON.parse(post.tags) : [],
    }

    return post;
  }

  /**
   * Delete post
   */
  async deletePostById(id: string) {
    const post = this.getPostById(id);
    const sql = `DELETE FROM posts WHERE ID=${id}`;
    await this._db.run(sql);

    return post;
  }

}
