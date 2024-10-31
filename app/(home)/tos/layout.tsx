import { LinkButton } from "@/app/components/LinkButton";
import { DocsBody } from "fumadocs-ui/page";
import { ReactNode } from "react";

export default function Tos({
    children,
}: {
    children: ReactNode;
}): React.ReactElement {
    return (
        <DocsBody style={{ marginTop: "50px", marginBottom: "50px" }}>
            <div className="fixed inset-0 z-[-1] overflow-hidden duration-1000 animate-in fade-in [perspective:2000px]">
                <div
                    className="fixed bottom-[10%] left-1/2 size-[1200px] origin-bottom bg-primary/30 opacity-30"
                    style={{
                        transform: "rotateX(75deg) translate(-50%, 400px)",
                        backgroundImage:
                            "radial-gradient(50% 50% at center,transparent,hsl(var(--background))), repeating-linear-gradient(to right,hsl(var(--primary)),hsl(var(--primary)) 1px,transparent 2px,transparent 100px), repeating-linear-gradient(to bottom,hsl(var(--primary)),hsl(var(--primary)) 2px,transparent 3px,transparent 100px)",
                    }}
                />
            </div>
            <div className="container">
                <h1 className="text-center text-4xl font-bold">服務條款</h1>
                <div className="flex flex-row justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch">
                    <LinkButton
                        href="/privacy"
                        variant="primary"
                    >
                        隱私權政策
                    </LinkButton>
                    <LinkButton
                        href="/copyright"
                        variant="secondary"
                    >
                        版權政策
                    </LinkButton>
                </div>
                {children}
            </div>
        </DocsBody>
    );
}
