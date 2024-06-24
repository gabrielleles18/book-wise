export interface BookProps {
    id: string
    author: string
    cover_url: string
    created_at: Date
    name: string
    summary: string
    total_pages: number
    ratings?: RatingProps[]
    categories: any[]
}

export interface UserProps {
    id: string
    name: string
    avatar_url: string
    email: string
    created_at: Date
}

export interface RatingProps {
    id: string
    rate: number
    description: string
    created_at: Date
    book_id: string
    user_id: string

    user?: UserProps
    book?: BookProps
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


export interface CategoryProps {
    id: string
    name: string
}

export interface CategoriesOnBooksProps {
    book_id: string
    category_id: string
}

