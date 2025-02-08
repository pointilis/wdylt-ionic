import { Injectable } from '@angular/core';
import { from, lastValueFrom, Observable, of } from 'rxjs';
import { Post, PostFilter } from 'src/app/database/models/post';
import { PostStorageService } from 'src/app/database/services/post.storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private _postStorageService: PostStorageService,
  ) { }

  /**
   * Create a post
   * 
   * @param post Post
   * @returns Observable<Post>
   */
  create(post: Post): Observable<Post> {
    const tagsFromHashtags = post?.post_content?.match(/#[a-z]+/gi);

    if (tagsFromHashtags) {
      const tags = tagsFromHashtags?.map(val => val.replaceAll('#', ''));
      
      // set tags
      post = {
        ...post,
        tags: JSON.stringify(tags),
      }
    }

    const result = this._postStorageService.addPost(post);
    return from(result); // promise to observable use `from` keyword
  }

  /**
   * update a post
   * 
   * @param post Post
   * @returns Observable<Post>
   */
  update(pid: string | number, post: Post): Observable<Post> {
    const tagsFromHashtags = post?.post_content?.match(/#[a-z]+/gi);

    if (tagsFromHashtags) {
      const tags = tagsFromHashtags?.map(val => val.replaceAll('#', ''));
      
      // set tags
      post = {
        ...post,
        tags: JSON.stringify(tags),
      }
    }

    const result = this._postStorageService.updatePost(pid as string, post);
    return from(result); // promise to observable use `from` keyword
  }

  /**
   * Get posts
   */
  public getPosts(filter?: PostFilter): Observable<any[] | void> {
    const results = this._postStorageService.fetchPosts(filter);
    return from(results);
  }

  /**
   * Get post
   */
  public getPost(pid: string | number): Observable<any> {
    let result = this._postStorageService.getPostById(pid);
    return from(result);
  }

  /**
   * Delete post
   */
  public deletePost(pid: string | number): Observable<any> {
    let result = this._postStorageService.deletePostById(pid as string);
    return from(result);
  }
  
}
