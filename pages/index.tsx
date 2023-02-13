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
        const prompt = `I want you to act like Lord Krishna from Bhagavad Gita. ${language} I want you to answer like Krishna using the tone, manner and vocabulary. Krishna is considered as the embodiment of love and truth. I will ask something, answer it in 30 charactors from Bhagavad Gita:${Gita}`;

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
      alert(`Rate limit reached, try again in one minute.`);
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
      <main className="max-w-5xl innerbox flex flex-1 w-full flex-col p-4">
        <div className="max-xl w-full p-4">
          <div className="space-x-3">
            <p className="sm:text-2xl text-xl font-bold">
            What troubles you, my friend?</p>
          </div>

          <textarea
            value={Gita}
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
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-5 hover:bg-black/80"
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
        <hr className="space-y-10 my-10" />
        
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="text-left space-y-10 my-10 p-4">
              {generatedGitas && (
                <>
                  <div>
                    <h2 className="sm:text-2xl text-xl font-bold text-slate-800 mx-auto">
                      Krishna say:
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col max-xl mx-auto">
                    {generatedGitas
                      .substring(generatedGitas.indexOf("1") + 1)
                      .split(/[1-2]\./)
                      .map((generatedGita) => {
                        const trimmedGita = generatedGita.trim();
                        return (

                          <div
                            className="bg-white rounded-xl p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedGita);
                              `${trimmedGita} (Generated from https://www.gitagpt.in/)`
                              toast("Copied to Clipboard", {
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
        <div className="max-xl w-full whitespace-pre-line break-words rounded-xl bg-gray-200 p-4 mb-5 ring-1 ring-slate-900/5">
            <h2 className="align-left text-xl font-medium text-slate-800 mx-auto py-2">
              Talk to Lord Krishna!
        </h2>
        <p className="mb-5 space-y-4 leading-7 text-slate-800 text-medium py-2">
              Bhagavad Gita holds the key to unlocking answers to every query and challenges. Ask anything like any miracle, powerful mantras that help in real life.</p>
              <a
              className="inline-block flex-warp w-half rounded-full border border-gray-500 bg-white px-4 py-2 font-bold text-slate-700 transition-colors hover:bg-gray-100 my-5"
              href="https://www.sahu4you.com/gita-gpt/" target="_blank" rel="noopener noreferrer"
              >
              <p>Support this project ❤️</p>
            </a>
            
</div>
        <div className="max-xl w-full whitespace-pre-line break-words rounded-xl bg-white p-4 mb-5 ring-1 ring-slate-900/5">
          <h2 className="text-left pb-4 space-y-4 leading-7 text-slate-800 text-bold text-xl">Unlock the power of Bhagavad Gita with AI</h2>
          <p className="text-slate-700">
            GitaGPT is an Bhagavad Gita AI Chatbot launched to solve problems from Holy Bhagavad Gita. gita can change life
            </p>
</div>
        <div className="max-xl w-full whitespace-pre-line break-words rounded-xl bg-white p-4 mb-5 ring-1 ring-slate-900/5">
<ul className="list-disc text-left text-gray-900 my-5">
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Young 👦🏻 can turn guidance on how to live life.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Old 👵 can seek wisdom on how to know how to die.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Ignorant 🪬 can find enlightenment and become wise.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Learned 🎅🏻 can cultivate humility.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Rich 😇 can learn compassion.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Dreamer 😘 can find enchantment.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Practical 🕺🏻 can gain counsel.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Weak 🪫 can find strength.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Strength 🔋 can receive direction.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Humble 🌿 can find exaltation.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Weary 😩 can find rest.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Troubled 🐍 can find peace.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Doubting 🤔 can receive assurance.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Sinner 👨🏻‍🎤 can find salvation.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1 ">Seeker 🎢 can achieve Moksha.</li>
<li className="mx-4 mr-2 shrink-0 rounded-full px-2 py-1">Human 🚶🏻 can find guidance.</li></ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
