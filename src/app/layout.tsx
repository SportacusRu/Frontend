
import { fontVariables } from "@/extensions/fonts";
import { Metadata, Viewport } from "next";

import "@/styles/global.css";
import "@/styles/typography.css";
import "@/styles/input.scss";
import ToastQueueProvider from "@/shared/ToastQueueProvider";
import ToastFabric from "@/components/ToastFabric";
import Cookie from "@/components/Cookie";


export const viewport: Viewport = {
    themeColor: 'black',
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
};

export const metadata: Metadata = {
    title: "Sportacus",
    description: "Sportacus - интерактивная карта, для поиска спортивных площадок",
    keywords: "sportacus, спорт, спортивные площадки, площадки",
    openGraph: {
      title: "Sportacus",
      description: "Sportacus - интерактивная карта, для поиска спортивных площадок",
      url: "https://sportacus.vercel.app/",
      siteName: "Sportacus",
      images: [
        {
          url: "https://sportacus.vercel.app/og.png",
          width: 1920,
          height: 1080,
        },
      ],
      locale: "ru-RU",
      type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ToastQueueProvider>
            <html lang="en" className={fontVariables}>
                <body>
                    <ToastFabric />
                    <Cookie />
                    {children}
                </body>
            </html>
        </ToastQueueProvider>
    )
}