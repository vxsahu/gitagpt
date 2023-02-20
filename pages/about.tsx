import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";


function About() {
  return (
    <div className="    bg-gray-100 flex mx-auto flex-col items-center justify-center min-h-screen">
      <Header />
      <main className="max-w-5xl innerbox flex flex-1 w-full flex-col p-4">
      <div className="2xl:container 2xl:mx-auto py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl text-black font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6  mb-2">Gita GPT is AI chatbot that uses <strong>Bhagavad Gita</strong> references to answer your questions. This is an open forum, feel free to ask Krishna anything.</p>
                    <p className="font-normal text-base leading-6  mb-2">In the Bhagavad-gita Lord Krishna said that everything happens for a reason or a good reason. Whatever happens in life happens for good and there is always a reason or reason behind it.</p>
                    <p className="font-normal text-base leading-6 mb-2">He also mentioned that we are all children of the one creator, God. God is the supreme power and this world is governed by him.</p>
                </div>
                <div className="w-full lg:w-6/12">
                    <img className="w-full h-full" src="./og-image.png" alt="Gita GPT" />
                </div>
            </div>
    
            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h2 className="text-xl text-black font-bold leading-9 text-gray-800 pb-4">Our Story</h2>
                    <p className="font-normal text-base leading-6 mb-2">Through AI technology, GitaGPT is able to analyze and interpret the Bhagavad Gita in a way that is accessible to people from different backgrounds and with different levels of familiarity with the text.</p>
                    <p>Purpose is to make the wisdom of the Bhagavad Gita more accessible and applicable to people in the modern world.</p>
                </div>
                <div className="w-full lg:w-6/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://avatars.githubusercontent.com/u/40103679?v=4" alt="Alexa featured Image" />
                            <img className="md:hidden block" src="https://avatars.githubusercontent.com/u/40103679?v=4" alt="Alexa featured Image" />
                            <p className="leading-5 text-gray-800 mt-4">Vikas Sahu</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                  </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                 </div>
                    </div>
                </div>
            </div>
        </div>
        </main>
          <Footer />
          </div>
          
  );
}

export default About;
