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
  const [loading, setLoading] = useState(false);
  const [Gita, setGita] = useState("");
  const [language, setLanguage] = useState<languageType>("Professional");
  const [generatedGitas, setGeneratedGitas] = useState<String>("");

  console.log("Streamed response: ", generatedGitas);  
  
  const prompt =
     language === "Funny"
      ? `Act as Lord Krishna and use the teachings of the Bhagavad Gita to help your friend Arjuna. ${Gita}.`
      : `${language}
      Arjuna: Krishna, I am in a great dilemma. I am unsure about what the right path for me is. Can you please guide me and help me find clarity?

Lord Krishna: My dear friend Arjuna, it is good that you have come to me for guidance. Remember that the essence of the Bhagavad Gita is to do your duty without attachment to the results, to remain steadfast in devotion to God, and to surrender all actions to Him.

Arjuna: But how can I stay detached from the results of my actions?

Lord Krishna: By performing your duties without desire for personal gain, and by offering the fruits of your actions to me, you can remain detached from the results. This will lead to inner peace and ultimate liberation.

Arjuna: How can I remain steadfast in devotion to you?

Lord Krishna: By constantly remembering me, performing actions for my sake, and surrendering your mind and intellect to me, you can develop unwavering devotion. And when you attain this state of devotion, you will come to me, for I am always with those who are steadfast in their devotion.

Arjuna: I will do as you say, Krishna. Please guide me always.

Lord Krishna: I am always with you, Arjuna. Have faith and do your duty without fear. I will always be there to guide and support you. ${Gita}.`
  ;

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
    console.log("Edge function returned.");

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

    setLoading(false);
  };

  return (
    
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Gita GPT – Bhagavad Geeta AI 🔥</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="innerbox flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <h2 className="sm:text-xl text-xl max-w-2xl font-medium text-slate-500">
          Unlock the Power of AI with the Bhagavad Gita
        </h2>
        <div className="max-w-xl w-full">
          <div className="mt-10 items-center space-x-3">
            <p className="text-center font-medium text-slate-300">2.71,108+ Updesh generated</p>
            <strong className="text-center font-medium">
              🦚 Shri Krishna, Radhe Radhe 🦚</strong>
          </div>
          <textarea
            value={Gita}
            onChange={(e) => setGita(e.target.value)}
            rows={4}
            className="w-full rounded-md border-0 focus:border-red focus:ring-red my-5 bg-gray-100  dark:border-none border-0"
            placeholder={
              "How can I find inner peace?"
            }
            />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium text-xl px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateGita(e)}
            >
              Ask to GitaGPT &rarr;
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
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        
        
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedGitas && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Bhagavad Geeta say:
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedGitas
                      .substring(generatedGitas.indexOf("1") + 3)
                      .split("2.")
                      .map((generatedGita) => {
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedGita);
                              toast("Copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={generatedGita}
                          >
                            <p>{generatedGita}</p>
                          </div>
                        );
                      })}
                  </div>
                  <a className="flex max-w items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mt-5 mb-5" href="https://www.sahu4you.com/gita-gpt/" target="_blank" rel="noopener noreferrer"><p>Support this project 😇, to build it.</p></a>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <div className="max-w-xl w-full whitespace-pre-line break-words rounded-xl bg-white p-8 ring-1 ring-slate-900/5">
<h2 className="text-left mt-6 space-y-4 leading-7 text-slate-700 sm:text-xl">Bhagavad Gita holds the key to unlocking answers to every query and challenge, learn how to Use GitaGPT:</h2>
          <p>The process is described as simple and easy:</p>
<ul className="list-disc text-left text-gray-900 my-5">
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-2 text-sm">Go to the website (either gitagpt.in or sahu4you.com), type in your question on the screen, and then press the submit button.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-4 py-2 text-sm">According to the statement, a relevant verse from the Bhagavad Gita will then be generated for you.</li>
          </ul>        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
