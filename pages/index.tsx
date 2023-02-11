import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { languageType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import logo from './gita-gpt.svg';

const Home: NextPage = () => {
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [Gita, setGita] = useState("");
  const [language, setLanguage] = useState<languageType>("Professional");
  const [generatedGitas, setGeneratedGitas] = useState<String>("");

  console.log("Streamed response: ", generatedGitas);  

  const prompt = `Act like Lord Krishna, Give answer from the teachings of Bhagavad Gita ${language}. Generated relevent verse with reference at max 30 words: ${Gita}${
    Gita.slice(-1) === "." ? "" : "."
  }`;

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
      setResponse({
        status: response.status,
        body: await response.text(),
        headers: {
          "X-Ratelimit-Limit": response.headers.get("X-Ratelimit-Limit"),
          "X-Ratelimit-Remaining": response.headers.get(
            "X-Ratelimit-Remaining"
          ),
          "X-Ratelimit-Reset": response.headers.get("X-Ratelimit-Reset"),
        },
      });
      setLoading(false);
      alert(`Rate limit reached, try again after one minute.`);
      return;
    }

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

    setLoading(false);
  };

  const isDisabled = () => {
    const trimmedGita = Gita.trim();
    if (trimmedGita.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const limitCharacters = (e: any) => {
    if (e.target.value.length > 300) {
      e.target.value = e.target.value.substr(0, 300);
      toast.error("You have reached the maximum number of characters.");
    }
  };

  return (
    
    <div className="bg-gray-100 flex mx-auto flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Gita GPT – Bhagavad Geeta AI 🔥</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="max-w-5xl innerbox flex flex-1 w-full flex-col items-center justify-center text-center p-4">
        <h2 className="text-xl font-light text-slate-900 mx-auto">
        Unlock the Power of AI with the Bhagavad Gita
        </h2>
        <div className="max-xl w-full">
          <div className="mt-10 items-center space-x-3">
            <p className="text-center font-bold text-slate-700 mt-5 mb-5">5,32,112+ Updesh generated</p>
            <strong className="text-center font-light">
              🦚 Shri Krishna, Radhe Radhe 🦚</strong>
          </div>
          <textarea
            value={Gita}
            onChange={(e) => setGita(e.target.value)}
            rows={4}
            className="sm:text-xl w-full rounded-xl focus:border-red focus:ring-black mt-5 bg-white border-0"
            placeholder={
              "How can I find inner peace?"
            }
            />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-5 hover:bg-black/80 w-full"
              onClick={(e) => generateGita(e)}
            >
              Ask GitaGPT &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-5 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        
        
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="text-left space-y-10 my-10">
              {generatedGitas && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Bhagavad Geeta say:
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col max-xl mx-auto">
                    {generatedGitas
                      .substring(generatedGitas.indexOf("1") + 3)
                      .split(/[1-3]\./)
                      .map((generatedGita) => {
                        const trimmedGita = generatedGita.trim();
                        return (

                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedGita);
                              `${trimmedGita} (Generated from https://www.gitagpt.in/)`
                              toast("Copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={Gita}
                          >
                            <p className="font-normal	">{generatedGita}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <a className="flex max-w items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mt-5 mb-5" href="https://www.sahu4you.com/gita-gpt/" target="_blank" rel="noopener noreferrer"><p>Share this project to spread ❤️</p></a>
        <p className="mt-6 mb-6 space-y-4 leading-7 text-slate-700 sm:text-xl">Express your love by taking a <strong>screenshot 🤳🏻</strong> of Shri <strong>Krishna's 🦚 Gita Upadesh</strong> and tweeting 🐥 it.</p>
        <div className="max-xl w-full whitespace-pre-line break-words rounded-xl bg-white p-8 ring-1 ring-slate-900/5">
<h2 className="text-left mt-6 mb-6 space-y-4 leading-7 text-slate-700 sm:text-xl">Bhagavad Gita holds the key to unlocking answers to every query and challenges.</h2>
<ul className="list-disc text-left text-gray-900 my-5">
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Young 👦🏻, can turn guidance on how to live life.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Old 👵, can seek wisdom on how to know how to die.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Ignorant 🪬, can find enlightenment and become wise.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Learned 🎅🏻, can cultivate humility.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Rich 😇, can learn compassion.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Dreamer 😘, can find enchantment.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Practical 🕺🏻, can gain counsel.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Weak 🪫, can find strength.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Strength 🔋, can receive direction.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Humble 🌿, can find exaltation.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Weary 😩, can find rest.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Troubled 🐍, can find peace.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Doubting 🤔, can receive assurance.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Sinner 👨🏻‍🎤, can find salvation.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Seeker 🎢, can achieve Moksha.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-1 text-sm">The Human 🚶🏻, can find guidance.</li></ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
