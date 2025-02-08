import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeEvent, CKEditorModule, loadCKEditorCloud } from '@ckeditor/ckeditor5-angular';
import { IonicModule } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Bold, CKFinder, CKFinderUI, CKFinderUploadAdapter, ClassicEditor, EditorConfig, Essentials, ImageInsertUI, Image as CKImage, ImageResize, ImageStyle, ImageToolbar, ImageUpload, Italic, Link, MediaEmbed, Paragraph, SimpleUploadAdapter, FontColor, FontFamily, Font, FontSize, List, TodoList, TodoListUI, TodoListEditing, Underline, UnderlineEditing, UnderlineUI } from 'ckeditor5';
import { debounceTime, Observable, Subject } from 'rxjs';
import { PostState } from '../../states/reducers/post/post.reducer';
import { selectPost } from '../../states/selectors/post/post.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostActions } from '../../states/actions/post/post.actions';

@Component({
  selector: 'app-writing-editor',
  templateUrl: './writing-editor.component.html',
  styleUrls: ['./writing-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    CKEditorModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WritingEditorComponent  implements OnInit {

  @Output() public content: EventEmitter<string> = new EventEmitter<string>();
  
  @Input('headerHeight') headerHeight: number = 0;

  private _debouncer: Subject<string> = new Subject<string>();
  private _post$: Observable<{ data: any, status: string }>;

  public Editor: ClassicEditor | any = ClassicEditor;
  public config: EditorConfig = {
    licenseKey: 'GPL',
    placeholder: 'Start write, use #hashtags to define a topic.',
    plugins: [ 
      Essentials, 
      Paragraph, 
      Bold, 
      Link,
      Italic,
      Font,
      FontColor,
      FontFamily,
      FontSize,
      CKImage,
      CKFinder,
      CKFinderUI,
      CKFinderUploadAdapter,
      ImageUpload,
      ImageInsertUI, 
      SimpleUploadAdapter,
      List,
      TodoList,
      TodoListUI,
      TodoListEditing,
      Underline,
      UnderlineEditing,
      UnderlineUI,
    ],
    toolbar: {
      items: [ 
        'undo', 'redo',
        'fontsize', 'fontColor',
        'bold', 'underline',
        'numberedList', 'bulletedList',
        // 'imageUpload'
      ],
    },
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: 'http://example.com',

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: true,

      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
        'X-CSRF-TOKEN': 'CSRF-Token',
        Authorization: 'Bearer <JSON Web Token>'
      }
    }
  };
  
  constructor(
    private _store: Store<PostState>,
    private _actionsSubject$: ActionsSubject,
  ) { 
    this._setupEditor();
    this._post$ = this._store.pipe(select(selectPost));
    this._post$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      if (action.status == 'success') {
        const content = action.data.post_content;
        if (this.Editor.data) {
          this.Editor.data.set(content);
        }
      }
    });

    this._debouncer
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe(value => this.content.emit(value));
  }

  ngOnInit() { }

  private _setupEditor () {
    this.Editor = ClassicEditor;
  }

  /**
   * Listen editor changed
   */
  public editorChangeHandler( { editor }: ChangeEvent ) {
    if (editor) {
      const data = editor.getData();
      this._debouncer.next(data);
    }
  }

  /**
   * Editor ready
   */
  editorReadyHandler(event: any) {
    // do something here
    this.Editor = event;
  }

}
