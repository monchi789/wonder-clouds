import axios from 'axios';

export const getTokenAuth = async (email: string, contrasena: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.post(`${apiUrl}api/v1/auth/login`, {
      email: email,
      contrasena: contrasena
    });

    const token = res.data.accessToken;

    return token;
  } catch (error) {
    return error;
  }
};
