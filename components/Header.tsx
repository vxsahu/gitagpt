import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex bg-white w-full items-center justify-center text-center border-b-1 border-gray-900 mx-auto innerbox flex flex-1 w-full flex-col items-center justify-center">
      <div className="myhead bg-white flex max-w-5xl px-4 max-xl text-center text-3xl">
      <div className="gg-head flex align-center text-center text-3xl">
        <Link href="https://www.gitagpt.in/"
        className="my-5 text-slate-800">
          <Image
          alt="GitaGPT"
          src="/logo.png"
          width={100}
          height={22}
        />
      </Link>
      </div>
      <div className="gg-menu flex gg-menu flex items-center">
        <Link href="https://twitter.com/Gita_GPT"
        className="px-2 space-x-3 max-w-5xl align-center innerbox flex">
        <p className="my-2 mr-2 font-light text-base">Twitter</p>
      </Link>
      </div>
      </div>
    </header>
  );
}
