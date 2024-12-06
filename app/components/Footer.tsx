import Image from "next/image";
import Link from "next/link";

import { ExternalLinkIcon } from "lucide-react";

export type FooterCategory = {
  title: string;
  items: FooterItem[];
};

type FooterItem = {
  label: string;
  href: string;
  newWindow?: boolean;
};

export default function Footer({
  categories,
}: {
  categories: FooterCategory[];
}) {
  return (
    <div className="container mt-auto border-t p-8 pb-2">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
        <Info />
        {categories.map((category, i) => (
          <Category key={i} category={category} />
        ))}
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="hidden flex-col gap-2 sm:flex">
      <div className="flex flex-row items-center gap-2" style={{margin: "auto"}}>
        <Image
          alt="logo"
          src="https://i.imgur.com/10NgdV5.png"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="text-xl font-bold">多元世界團隊</p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground text-center">
        客服信箱: <a href="mailto:support@mwtw.net">support@mwtw.net</a>
      </p>
      <p className="mt-2 text-xs text-muted-foreground text-center">
        Copyright © 2022 ~ {new Date(Date.now()).getFullYear() + 1} 多元世界團隊. All Rights Reserved
      </p>
    </div>
  );
}

function Category({ category }: { category: FooterCategory }) {
  return (
    <div className="flex flex-col">
      <p className="mb-2 font-medium max-sm:cursor-pointer">{category.title}</p>
      <div className="flex flex-col gap-1 text-sm">
        {category.items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="py-1 text-muted-foreground transition-colors hover:text-accent-foreground"
            target={item.newWindow === true ? "_blank" : "_self"}
          >
            {item.label}
            {item.newWindow && (
              <ExternalLinkIcon className="ml-1.5 inline h-3 w-3" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}