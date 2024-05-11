export type ErrorType = {
    error: boolean
}

export type LoginPost = {
    access_token: string
    token_type: string
}

export type Reviews = {
    user_id: number
    review_id: number
    place_id: number
    description: string
    photos: string[]
    grade: number
    user_photo: string
    user_name: string
    created_at: string
}

export type Places = {
    place_id: number
    user_id: number
    rating: number
    title: string
    geo: string
    description: string
    reviews_list: Reviews[]
    category: string
    filters_list: string[],

}

export type User = {
    user_id: number
    name: string
    email: string
    like_list: Places[]
    reviews_list: Reviews[]
    photo: string
}

export type AuthKey = string