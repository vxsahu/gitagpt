import Image from "next/image";
import Link from "next/link";

export default function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between border-b bg-gray-50/50 px-10 py-2 text-center text-lg font-medium backdrop-blur-sm" />
      <title>GitaGPT.in</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Unlock the power of AI with GitaGPT.in – 18 Chapters and 700 Verses of Bhagavad Gita." />
      <Link rel="icon" href="/favicon.ico" />
        <Image alt="header logo" src="/Gitagpt.png" className="sm:4xl sm:2xl" />
      </Link>
    </header>
  );
}
