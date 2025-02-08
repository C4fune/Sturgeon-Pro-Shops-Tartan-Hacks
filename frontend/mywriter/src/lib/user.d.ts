export interface User {
    username: string
    books: Book[]
    interests: Interests
    onboarding: boolean
    matchedAuthor: string
}

export interface Interests {
    genres: GenreRatings
    custom: string
    writingOneScore: number
    writingTwoScore: number
    writingThreeScore: number
    writingFourScore: number
}

export interface Book {
    chapters: BookChapter[]
    title: string
}

export interface BookChapter {
    content: string
    title: string
    authorName: string
    authorID: string
}

export interface Author {
    name: string
    genreSelection: GenreSelection
    writingSamples: string[]
    style: string
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

export interface GenreSelection {
    scifi: boolean
    fantasy: boolean
    dystopia: boolean
    mystery: boolean
    horror: boolean
    action: boolean
    adventure: boolean
    teen: boolean
    romance: boolean
    historical: boolean
    thriller: boolean
    children: boolean
}