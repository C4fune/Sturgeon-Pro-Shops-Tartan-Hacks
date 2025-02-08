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
    body: string
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
    genres: GenreRatings
    samples: string[]
    style: string
    followers: string[]
    queue: QueueRequest
}

export interface QueueRequest {
    id: UUID
    fromID: string
    fromName: string
    prompt: string
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