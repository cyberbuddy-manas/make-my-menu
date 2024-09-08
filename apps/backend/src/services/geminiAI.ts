import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const menuToJsonAI = async (image)=> {
  // console.log("menuToJson called with image:", image);
    // The image must be a base64 encoded string
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([
    "Extract all the Menu data and export in json format, include all the item, price, and category",
    {
      inlineData: {
        data: image,
        mimeType: "image/png",
      },
    },
  ]);
  console.log(JSON.stringify(result, null, 2));
  return result
}

