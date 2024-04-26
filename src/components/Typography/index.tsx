function GetText({ 
    classes, children 
} : {classes: string, children: React.ReactNode}) {
    return <p className={classes}>{children}</p>;
}

export function LargeTitle({ children }: { children: React.ReactNode }) {
    return <h1 className="largeTitle">{children}</h1>;
}

export const Headline = (
    { children }: { children: React.ReactNode }
) => <GetText children={children} classes="headline" />


export const Caption = (
    { children }: { children: React.ReactNode }
) => <GetText children={children} classes="caption" />

export const Subhead = (
    { children }: { children: React.ReactNode }
) => <GetText children={children} classes="subhead" />

export const SubheadMedium = (
    { children }: { children: React.ReactNode }
) => <GetText children={children} classes="subheadMedium" />

export const SubheadUppercase = (
    { children }: { children: React.ReactNode }
) => <GetText children={children} classes="subheadUppercase" />