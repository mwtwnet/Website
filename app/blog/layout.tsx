import type { Metadata } from "next";
import type { ReactNode } from "react";
import HomeLay from "../(home)/layout";

export const metadata: Metadata = {
  title: {
    template: "%s - 多元世界の星球日記",
    default: "多元世界の星球日記",
    absolute: "多元世界の星球日記",
  },
  description: "多元世界的小小筆記本~",
  openGraph: {
    images: "/og.png",
    title: {
      template: "%s - 多元世界の星球日記",
      default: "多元世界の星球日記",
      absolute: "多元世界の星球日記",
    },
    description: "多元世界的小小筆記本~",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLay>
      <div className="container">
        {children}
      </div>
    </HomeLay>
  )
}