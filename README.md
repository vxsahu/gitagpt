# [GitaGPT.in](https://www.gitagpt.in/)

Yes, GitaGPT is an application that utilizes OpenAI's GPT-3 language model to generate answers to life questions based on the teachings of the Bhagavad Gita, a Hindu scripture. The app aims to provide a modern interpretation of the ancient text and offer practical advice to people facing various challenges in their lives.

This project provide Online Bhagvat Gita for you using AI. According to 18 chapters and 700 shlokas of Bhagavad Gita, which are the text of morality, strength, discipline and spirituality, so that friend Arjuna can be taken out of trouble.

[![GitaGPT AI](./public/Gitagpt.png)](https://www.gitagpt.in)

## How it works

This project uses the [OpenAI GPT-3 API](https://openai.com/api/) (specifically, text-davinci-003) and [Vercel Edge functions](https://vercel.com/features/edge-functions) with streaming. It constructs a prompt based on the form and user input, sends it to the GPT-3 API via a Vercel Edge function, then streams the response back to the application.

Video and blog post coming soon on how to build apps with OpenAI and Vercel Edge functions!
``
