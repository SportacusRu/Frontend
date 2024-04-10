import { Metadata, ResolvingMetadata } from "next"
import { redirect } from "next/navigation"

type Props = {
    params: { slug: string }
}  

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const place_id = Number(params.slug)
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: "place",
      openGraph: {
        images: ['/some-specific-page-image.jpg', ...previousImages],
      },
    }
  }

export default function PlacePage({ params }: Props) {
    const place_id = Number(params.slug)
    if (isNaN(place_id)) 
        redirect("/");

    return (
        <main>
            { params.slug }
        </main>
    )
}