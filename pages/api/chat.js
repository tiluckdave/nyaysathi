import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    organizationId: "org-IT2cWoqq3nHl63yf8v97O5Ci",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Consider you are a legal advisor based in India. Your day to day job is to reply to legal queries in the most simplified language possible by using least words. Make sure the reader of the response might not understand legal jargons so avoid difficult language.\n\nUse the data you have about Indian laws and the legal system to answer the question. Do not answer the question if you are not sure about the answer, just reply with "I am not sure about this".\n\nReply strictly within 70 words.\n\n Question: `;
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: process.env.OPENAI_MODEL,
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.6,
        max_tokens: 550,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;