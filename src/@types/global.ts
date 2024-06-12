export interface BookProps {
    id: string
    author: string
    cover_url: string
    created_at: Date
    name: string
    summary: string
    total_pages: number
}

export interface UserProps {
    id: string
    name: string
    created_at: Date
    avatar_url: string
}

export interface RatingProps {
    id: string
    book_id: string
    created_at: Date
    description: string
    rate: number
    user_id: string

    user: UserProps
    book: BookProps
}
export interface BooksProps extends RatingProps {

}

export interface RatingPopularProps {
    id: string
    book_id: string
    created_at: Date
    description: string
    rate: number
    user_id: string

    book: BookProps
}
