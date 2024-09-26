import { type HomeLayoutProps } from 'fumadocs-ui/home-layout';
import { Book, BookIcon, LayoutTemplateIcon, Timer } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceSix } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export const baseOptions: HomeLayoutProps = {
  githubUrl: 'https://github.com/fuma-nama/fumadocs',
  nav: {
    transparentMode: 'top',
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
  ],
};