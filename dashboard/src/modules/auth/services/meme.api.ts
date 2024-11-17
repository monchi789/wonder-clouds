import axios from "axios";

export const getMemes = async () => {
  const apiUrl = import.meta.env.VITE_MEME_URL;
  const apiKey = import.meta.env.VITE_MEME_KEY;
  const apiHost = import.meta.env.VITE_MEME_HOST;

  try {
    const res = await axios.get(apiUrl, {
      headers: {
        "X-RapidAPI-Key": apiKey, 
        "X-RapidAPI-Host": apiHost, 
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
