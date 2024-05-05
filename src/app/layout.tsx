
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
          url: "https://sportacus.вебериум.рф/ogimage.png",
          width: 968,
          height: 544,
        },
      ],
      locale: "ru-RU",
      type: "website",
    },
    manifest: "https://sportacus.вебериум.рф/site.webmanifest",
    robots: {
        index: true,
        follow: true, 
    },
    alternates: {
        canonical: "https://sportacus.вебериум.рф/"
    }
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