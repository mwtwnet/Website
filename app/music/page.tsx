import { Metadata } from "next";
import Card from "../../components/MusicCard";
import { Suspense } from "react";

export default function MusicPage() {
    return (
        <>
            <Suspense fallback={null}>
                <Card />
            </Suspense>
        </>
    );
}

export function generateMetadata({
    params,
  }: {
    params: { slug: string };
  }): Metadata {
    return {
      title: "多元世界團隊",
      description: "多元世界團隊",
    };
  }