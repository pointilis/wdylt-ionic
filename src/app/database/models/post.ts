export interface Post {
    ID?: number
    post_parent?: number | null
    post_date?: string
    post_date_gmt?: string
    post_status?: string
    post_title?: string
    post_content?: string
    post_modified?: string
    post_modified_gmt?: string
    post_type?: string
    post_excerpt?: string
    post_author?: string /* use user email */
    post_mime_type?: string
    meta?: string // use JSON.stringfy()
    tags?: string // use JSON.stringfy()
}

export interface PostFilter {
    post_date_gmt?: string
}