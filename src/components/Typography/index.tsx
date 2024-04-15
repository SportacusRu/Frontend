export function LargeTitle({ children }: { children: React.ReactNode }) {
    return <h1 className="largeTitle">{children}</h1>;
}

export function Headline({ children }: { children: React.ReactNode }) {
    return <p className="headline">{children}</p>;
}

export function Caption({ children }: { children: React.ReactNode }) {
    return <p className="caption">{children}</p>;
}

export function Subhead({ children }: { children: React.ReactNode }) {
    return <p className="subhead">{children}</p>;
}

export function SubheadMedium({ children }: { children: React.ReactNode }) {
    return <p className="subheadMedium">{children}</p>;
}

export function SubheadUppercase({ children }: { children: React.ReactNode }) {
    return <p className="subheadUppercase">{children}</p>;
}