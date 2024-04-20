export type ReviewProps = {
    place_id: number,
    review_id: number,
    rating: number,
    description: string,
    userPhoto?: string,
    userName: string,
    time: string,
    viewUserPage: boolean,
    complaintHandler?: () => void,
    viewPageHandler?: () => void,
}