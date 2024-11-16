import axios from "axios";

export const getMemes = async () => {
  const apiUrl = "https://programming-memes-images.p.rapidapi.com/v1/memes";
  const apiKey = "11a65cdbbcmsh00a124d7f497d01p1e1696jsna19f7ede7589";
  const apiHost = "programming-memes-images.p.rapidapi.com";

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
