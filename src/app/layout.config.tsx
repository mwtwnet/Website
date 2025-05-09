import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Book, LayoutTemplateIcon, Timer } from 'lucide-react';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import Logo from '@public/assets/logo.png';

export const baseOptions: BaseLayoutProps = {
  nav: {
    url: "/",
    title: (
      <>
        <Image
          alt=":D"
          src={Logo}
          sizes="100px"
          className="w-10 md:w-10" />
        <span className="font-bold text-xl">多元世界團隊</span>
      </>
    ),
  },
  links: [
    {
      icon: <Book />,
      url: "/docs",
      text: "星球文件",
    },
    {
      icon: <LayoutTemplateIcon />,
      url: "/blog",
      text: "星球日記",
    },
    {
      icon: <Timer />,
      url: "https://status.mwtw.net",
      text: "星球導航",
      external: true,
    },
    {
      icon: <FontAwesomeIcon icon={faDiscord} />,
      url: "/discord",
      text: "星球聚集地",
      external: true,
    },
    {
      icon: <FontAwesomeIcon icon={faDiscord} />,
      url: "https://dcs.tw",
      text: "DCS.tw",
      external: true,
    },
  ],
};
