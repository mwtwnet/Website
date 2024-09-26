import { useParams, useSearchParams } from "next/navigation";
import { baseOptions } from "../layout.config";
import { HomeLayout } from "fumadocs-ui/home-layout";
import { LinkButton } from "../components/LinkButton";
import Link from "fumadocs-core/link";
import * as lucid from "lucide-react";
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