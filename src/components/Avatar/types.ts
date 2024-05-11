export enum AvatarSizes {
    S, M, L
}

export const AvatarSizesList = [36, 96, 128]

export type AvatarProps = {
    userPhoto?: string,
    size?: AvatarSizes,
    upload?: string
}