export interface User {
    username: string
    books: Book[]
    interests: Interests

}

export interface Interests {
    genres: GenreRatings
    custom: string
}

export interface Book {
    chapters: BookChapter[]
    title: string
}

export interface BookChapter {
    content: string
    title: string
    author: Author
}

export interface Author {
    id: string
    name: string
}

export interface GenreRatings {
    scifi: number
    fantasy: number
    dystopia: number
    mystery: number
    horror: number
    action: number
    adventure: number
    teen: number
    romance: number
    historical: number
    thriller: number
    children: number
}