import Link from "fumadocs-core/link";
import { cn } from "fumadocs-ui/components/api";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { DocsBody } from "fumadocs-ui/page";
import { ChevronRightIcon } from "lucide-react";
import { Metadata } from "next";
import { ReactNode } from "react";

export default function Tos({
    children,
}: {
    children: ReactNode;
}): React.ReactElement {
    return (
        <div className="container max-w-fd-container lg:w-[calc(100%-1rem)] prose mt-10 mb-10">
            <h1 className="text-center text-4xl font-bold not-prose mb-4">隱私權政策</h1>
            <div className="flex flex-row justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch mb-8">
                <Link
                    href="/tos"
                    className={cn(
                        buttonVariants({ color: "primary"}),
                    )}
                >
                    <ChevronRightIcon className="h-4 w-4" /> 服務條款
                </Link>
                <Link
                    href="/privacy"
                    className={cn(
                        buttonVariants({ color: "secondary"}),
                    )}
                >
                    <ChevronRightIcon className="h-4 w-4" /> 隱私權政策
                </Link>
            </div>
            {children}
        </div>
    );
}

export function generateMetadata(): Metadata {
    return {
        title: "版權政策",
        description: '多元世界團隊的版權政策。',
    };
}