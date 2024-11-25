import axios from 'axios';

export const getMemes = async () => {
<<<<<<< HEAD
  const apiUrl = import.meta.env.VITE_MEME_URL as string
  const apiKey = import.meta.env.VITE_MEME_KEY as string
  const apiHost = import.meta.env.VITE_MEME_HOST as string
=======
  const apiUrl = import.meta.env.VITE_MEME_URL;
  const apiKey = import.meta.env.VITE_MEME_KEY;
  const apiHost = import.meta.env.VITE_MEME_HOST;
>>>>>>> 17f69aaeda972e32a5b43750dc1714f882dad88e

  try {
    const res = await axios.get(apiUrl, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
      }
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
