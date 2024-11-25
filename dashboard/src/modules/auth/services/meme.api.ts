import axios from 'axios'

export const getMemes = async () => {
  const apiUrl = import.meta.env.VITE_MEME_URL as string
  const apiKey = import.meta.env.VITE_MEME_KEY as string
  const apiHost = import.meta.env.VITE_MEME_HOST as string

  try {
    const res = await axios.get(apiUrl, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
      }
    })

    return res.data
  } catch (error) {
    return error
  }
}
