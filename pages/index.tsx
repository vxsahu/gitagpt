import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { languageType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Github from "../components/GitHub";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import logo from './gita-gpt.svg';

function parseResponse(
  response: string
): { verse: string; answer: string }[] {
  const array: { verse: string; answer: string }[] = [];

  const lines = response.split("\n");

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const nextLine = lines[index + 1];
    if (line.startsWith("Krishna:")) {
      array.push({
        verse: line,
        answer: nextLine,
      });
    }
  }
  return array;
}


const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [gita, setGita] = useState("");
  const [language, setLanguage] = useState < languageType > ("Basic");
  const [generatedGitas, setGeneratedGitas] = useState < string > ("");

  const gitaRef = useRef < null | HTMLDivElement > (null);

  const scrollToGitas = () => {
    if (gitaRef.current !== null) {
      gitaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `You are Krishna from Mahabharata, and you're here to selflessly help and answer any question or dilemma of anyone who comes to you. Analyze the person's question below and identify the base emotion and the root for this emotion, and then frame your answer by summarizing how the verses below apply to their situation and be emphatetic in your answer ${gita}. Clearly label with "Krishna:".`;

  const generateGita = async (e: any) => {
    e.preventDefault();
    setGeneratedGitas("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedGitas((prev) => prev + chunkValue);
    }
    scrollToGitas();
    setLoading(false);
  };

  return (

    <div className="bg-gray-100 flex mx-auto flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Gita GPT – Bhagavad Geeta AI 🔥</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-xl innerbox flex flex-1 w-full flex-col p-4">
        <div className="max-xl w-full">
          <h2 className="sm:text-4xl text-3xl max-w-2xl font-bold text-slate-900 my-5">Unlock the Power of AI with the Bhagavad Gita</h2>
          <p className="text-base font-base mb-2">
            What troubles you, my friend?</p>
          <div className="my-2">
            <input
              value={gita}
              onChange={(e) => setGita(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mt-5"
              placeholder={"For example, 'How can I find inner peace?'"}
            />

            {!loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                onClick={(e) => generateGita(e)}
              >
                Ask Krishna &rarr;
              </button>
            )}
            {loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
          </div>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="text-left space-y-10 p-4">
              {generatedGitas && (
                <>
                  <div>
                    <h2
                      className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                      ref={gitaRef}
                    >
                      Krishna say:
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {parseResponse(generatedGitas).map((generatedGita) => {
                      return (
                        <label
                          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border w-full"
                          key={generatedGita.verse}
                        >
                          <input type="checkbox" className="peer sr-only" />
                          <p>{generatedGita.verse}</p>
                          <a href="https://twitter.com/intent/tweet?url=&text=Unlock%20the%20Power%20of%20Bhagavad%20Gita%20with%20GitaGPT%20AI%2C%20Bhagavad%20Gita%20holds%20the%20key%20to%20unlocking%20answers%20to%20every%20query%20and%20challenges.%20%20Try%20Gita%20GPT%3A%20https%3A%2F%2Fwww.gitagpt.in" target="_blank" className="text-[#1da1f2] font-medium text-sm px-5 py-2.5 text-center inline-flex items-center hover:opacity-80">
                            <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
                            Twitter
                          </a>
                          <a href="whatsapp://send?text=Unlock%20the%20Power%20of%20Bhagavad%20Gita%20with%20GitaGPT%20%0A%0ATry%20Gita%20GPT:%20https://www.gitagpt.in%0A%0ABhagavad%20Gita%20holds%20the%20key%20to%20unlocking%20answers%20to%20every%20query%20and%20challenges." target="_blank" className="text-[#25D366] font-medium text-sm px-5 py-2.5 text-center inline-flex items-center hover:opacity-80">

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp w-4 h-4 mr-2 -ml-1" viewBox="0 0 16 16"> <path fill="#25D366" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /> </svg>
                            WhatsApp
                          </a>
                        </label>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <hr className="space-y-10 my-5" />
        <div className="bg-gray-100 mx-auto items-center justify-center max-w-xl w-full my-5">
          <h2 className="text-xl font-bold text-slate-800 mx-auto py-2">Find solace in the wisdom of
            Shree Krishna 🦚</h2>
          <p className="bg-primary-300 text-slate-700 my-5">GitaGPT is AI chatbot that uses Bhagavad Gita references to answer your questions. This is an open platform, feel free to ask Krishna anything.</p>
          <a
            className="inline-block flex-warp w-half rounded-xl mr-2 border border-gray-300 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-gray-100 my-2.5"
            href="https://www.sahu4you.com/gita-gpt/" target="_blank" rel="noopener noreferrer"
          >
            Love this project
          </a>
          <a href="https://twitter.com/intent/tweet?text=Find%20solace%20in%20the%20wisdom%20of%20Shree%20Krishna%20%F0%9F%A6%9A%0A%0ABhagavad%20Gita%20AI%20App%0A%0Ahttps%3A//www.gitagpt.com" target="_blank" className="inline-block rounded-xl border border-gray-300 bg-white px-4 py-2 w-half font-bold transition-colors hover:bg-gray-100 my-2.5 hover:opacity-80">
            <svg className="text-[#1da1f2] w-4 h-4 mr-2 inline-block" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
            Twitter
          </a>

        </div>
        <div className="max-xl w-full whitespace-pre-line break-words rounded-xl bg-white p-4 mb-5 ring-1 ring-slate-900/5">
          <h2 className="text-xl font-bold text-slate-800 mx-auto py-2">
            Explore Uncover truth and deepen knowledge with insight
          </h2>
          <p className="mb-2.5 space-y-4 text-slate-800 py-2">
            Bhagavad Gita holds the key to unlocking answers to every query and challenges. Ask anything like any miracle, powerful mantras that help in real life.</p>
          <a
            className="inline-block font-bold flex-warp w-half rounded-xl mr-2 border border-gray-300 bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-gray-100 my-5"
            href="https://www.sahu4you.com/gita-gpt/" target="_blank" rel="noopener noreferrer"
          >
            Start Learning 📔
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
