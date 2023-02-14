import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex bg-white w-full border-b-1 border-gray-900 mx-auto innerbox flex flex-1 w-full flex-col items-center justify-center">
      <div className="myhead bg-white flex max-w-5xl px-4 max-xl w-full">
      <div className="gg-head flex col-1 w-1/3 justify-start">
        <Link href="https://www.gitagpt.in/"
        className="flex items-center">
          <Image
          alt="GitaGPT"
          src="/gita-gpt.svg"
          width={40}
          height={40}
        />
        <h1 className="ml-2 justify-items-center my-5 font-light text-xl">Gita GPT</h1>
      </Link>
      </div>
      <div className="gg-menu flex gg-menu w-3/4 flex items-center justify-end">
      <Link href="https://twitter.com/Gita_GPT"
        className="px-2 space-x-3 max-w-5xl align-center innerbox flex">
        <p className="my-2 mr-2 font-light text-base">Twitter</p>
      </Link>
      <Link href="https://www.sahu4you.com/donate"
        className="px-2 space-x-3 max-w-5xl align-center innerbox flex">
        <p className="my-2 mr-2 font-light text-base">Donate</p>
      </Link>
      <Link href="/#"
        className="px-2 space-x-3 max-w-5xl align-center innerbox flex">
        <p className="bg-black rounded-xl text-white font-bold px-4 py-2 hover:bg-gray-200 w-half inline-block flex-wrap flex">Login</p>
      </Link>
      </div>
      </div>
    </header>
  );
}
