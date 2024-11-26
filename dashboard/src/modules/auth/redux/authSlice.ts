import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthState, LoginCredentials } from '../types/auth';
import authService from '../services/authService';

// Estado inicial
const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Thunk para login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      
      // Almacenar tokens en localStorage y cookies
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      Cookies.set('accessToken', response.accessToken, { 
        expires: 1, // 1 día 
        secure: process.env.NODE_ENV === 'production' 
      });
      
      return response;
    } catch (error: any) {
      const message = 
        (error.response && 
         error.response.data && 
         error.response.data.message) || 
        error.message || 
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk para logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      // Limpiar tokens de localStorage y cookies
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      Cookies.remove('accessToken');
      
      // Llamar al servicio de logout si tu backend lo requiere
      await authService.logout();
    } catch (error: any) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk para refresh token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const newAccessToken = await authService.refreshToken();
      
      // Actualizar tokens
      localStorage.setItem('accessToken', newAccessToken);
      Cookies.set('accessToken', newAccessToken, { 
        expires: 1, 
        secure: process.env.NODE_ENV === 'production' 
      });
      
      return newAccessToken;
    } catch (error) {
      // Si falla el refresh, hacer logout
      thunkAPI.dispatch(logout());
      throw error;
    }
  }
);

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Casos de login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      
      // Casos de logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      
      // Casos de refresh token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
