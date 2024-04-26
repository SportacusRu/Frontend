export enum AvatarSizes {
    S, M
}

export const AvatarSizesList = [36, 96]

export type AvatarProps = {
    userPhoto?: string,
    size?: AvatarSizes
}