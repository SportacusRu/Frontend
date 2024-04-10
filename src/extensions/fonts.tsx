import localFont from 'next/font/local';
import classNames from './classNames';


export const extraBold = localFont({
    src: '../assets/fonts/extraBold.woff2',
    variable: '--font-extra-bold',
    weight: '800',
    display: 'swap',
})

export const bold = localFont({
    src: '../assets/fonts/bold.woff2',
    variable: '--font-bold',
    weight: '700',
    display: 'swap',
})

export const semiBold = localFont({
    src: '../assets/fonts/semiBold.woff2',
    variable: '--font-semi-bold',
    weight: '600',
    display: 'swap',
})

export const medium = localFont({
    src: '../assets/fonts/medium.woff2',
    variable: '--font-medium',
    weight: '500',
    display: 'swap',
})

export const regular = localFont({
    src: '../assets/fonts/regular.woff2',
    variable: '--font-regular',
    weight: '400',
    display: 'swap',
})

export const fontVariables = classNames(
    extraBold.variable, bold.variable, 
    semiBold.variable, medium.variable, 
    regular.variable
);