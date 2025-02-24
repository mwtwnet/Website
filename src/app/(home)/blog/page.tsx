import Link from 'next/link';
import { blogS } from '@/lib/source';
import { Metadata } from 'next';

export default function Page(): React.ReactElement {
  const posts = [...blogS.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime(),
  );

  return (
    <main className="container max-sm:px-0 md:py-12 rounded-lg">
      <div
        className="h-[300px] p-8 md:h-[400px] md:p-12 background-cover background-norepeat"
        style={{
            background: "url(https://wallup.net/wp-content/uploads/2016/01/99936-spaceship-space_station-science_fiction.jpg)"
        }}
      >
        <h1 className="mb-4 border-b-4 border-fd-foreground pb-2 text-4xl font-bold md:text-5xl">
          星球日記
        </h1>
        <p className="text-sm md:text-base">
          我們的旅途從這裡開始！
        </p>
      </div>
      <div className="grid grid-cols-1 border md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="flex flex-col bg-fd-card p-4 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <p className="font-medium">{post.data.title}</p>
            <p className="text-sm text-fd-muted-foreground">
              {post.data.description}
            </p>

            <p className="mt-auto pt-4 text-xs text-fd-muted-foreground">
              {new Date(post.data.date ?? post.file.name).toLocaleDateString("zh-tw", {
                dateStyle: "full"
              })}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}