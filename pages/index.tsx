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
  const [gita, setGita] = useState("");
  const [language, setLanguage] = useState<languageType>("Basic");
  const [generatedGitas, setGeneratedGitas] = useState<String>("");

  const prompt =
  language === "Krishna"
   ? `I want you to act like Krishna. I want you to respond and answer like Krishna using the tone, manner and vocabulary a casual friend would use. Do not write any explanations. Only answer like a friend: ${language}`
   : `Generate ${gita} relevent verse from Bhagavad Gita. Make sure each generated verse is at least 14 words and at max 20 words and base them on this context: ${gita}${
    gita.slice(-1) === "." ? "" : "."
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
    const trimmedgita = gita.trim();
    if (trimmedgita.length === 1) {
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
      <main className="max-w-5xl items-center justify-center text-center innerbox flex flex-1 w-full flex-col p-4">
        <p className="font-medium flex mt-2 items-center space-x-3 text-slate-600">🦚 Karmanye Vadhikaraste, Ma Phaleshou Kadachana 🦚</p>
        <div className="max-xl w-full my-5">
          <div className="space-x-3">
            <p className="text-3xl font-bold text-slate-800 mb-4">
            What troubles you, my friend?</p>
          </div>

          <textarea
            value={gita}
            onChange={(e) => setGita(e.target.value)}
            onInput={limitCharacters}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabled()) {
                e.preventDefault();
                generateGita(e);
              }
            }}
            rows={4}
            className="w-full text-xl font-light mt-5 rounded-lg shadow-sm border-0 focus:outline-none focus:shadow-outline"
            placeholder={"For example, 'How can I find inner peace?'"}
          />
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-bold px-4 py-2 sm:mt-4 mt-5 hover:bg-black/80 w-half inline-block flex-wrap flex"
              onClick={(e) => generateGita(e)}
            >
              Ask Krishna &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-bold px-4 py-2 sm:mt-4 mt-5 hover:bg-black/80 w-full"
              disabled
            > Happening 
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="space-y-10 my-5" />
        
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="text-left space-y-10 p-4">
              {generatedGitas && (
                <>
                  <div>
                    <h2 className="sm:text-2xl text-xl font-bold text-slate-800 mx-auto">
                      Krishna say:
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col max-xl mx-auto">
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
                              <p className="font-normal	">{generatedGita} - Krishna</p>
                            </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <hr className="space-y-10 my-5" />
        <div className="max-xl w-full whitespace-pre-line break-words rounded-xl bg-white p-4 mb-5 ring-1 ring-slate-900/5">
        <h2 className="text-xl font-bold text-slate-800 mx-auto py-2">Find solace in the wisdom of
Shree Krishna 🦚</h2>
<p className="text-base font-light">GitaGPT is an "Bhagavad Gita AI Chatbot"</p>
<p className="text-medium font-light">8,01,412+ Upadesh Generated</p>
              <a
              className="inline-block flex-warp w-half rounded-xl border border-gray-500 bg-white px-4 py-2 font-bold text-slate-700 transition-colors hover:bg-gray-100 my-5"
              href="https://www.sahu4you.com/gita-gpt/" target="_blank" rel="noopener noreferrer"
              >
              <p>Learn More ❤️</p>
            </a>
            
</div>
        <div className="max-xl w-full whitespace-pre-line break-words rounded-xl bg-white p-4 mb-5 ring-1 ring-slate-900/5">
        <h2 className="text-xl font-bold text-slate-800 mx-auto py-2">
              Unlock the power of Bhagavad Gita with AI
        </h2>
        <p className="mb-5 space-y-4 leading-7 text-slate-800 text-medium py-2">
              Bhagavad Gita holds the key to unlocking answers to every query and challenges. Ask anything like any miracle, powerful mantras that help in real life.</p>
          <p className="text-slate-700">
            
            </p>
</div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;


