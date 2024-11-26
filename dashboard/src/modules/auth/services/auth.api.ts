import axios from 'axios';
import Cookies from 'js-cookie';

export const getTokenAuth = async (email: string, contrasena: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.post(`${apiUrl}auth/login`, {
      email,
      contrasena
    });

    const { accessToken, refreshToken } = res.data;

    // Store tokens in secure cookies
    Cookies.set('accessToken', accessToken, { 
      secure: true, 
      sameSite: 'strict' 
    });
    Cookies.set('refreshToken', refreshToken, { 
      secure: true, 
      sameSite: 'strict' 
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const refreshToken = Cookies.get('refreshToken');

  try {
    const response = await axios.post(`${apiUrl}auth/refresh`, {
      refreshToken
    });

    const { accessToken, newRefreshToken } = response.data;

    // Update tokens in cookies
    Cookies.set('accessToken', accessToken, { 
      secure: true, 
      sameSite: 'strict' 
    });
    Cookies.set('refreshToken', newRefreshToken, { 
      secure: true, 
      sameSite: 'strict' 
    });

    return accessToken;
  } catch (error) {
    // Logout user if refresh fails
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    throw error;
  }
};

/*
export const isAuthenticated = () => {
  return !!Cookies.get('accessToken');
};

export const logout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};*/
