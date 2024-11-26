import { Product } from "@/interfaces/Products";
import axios from "axios";
import Cookies from "node_modules/@types/js-cookie";


const cargoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string
});


export const getAllTipoProductos = async () => {
  const token = Cookies.get('authToken');

  const res = await cargoApi.get('api/v1/tipo-general/categoria-producto', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
}

export const createProduct = async (product: Product) => {
  const token = Cookies.get('authToken');

  await cargoApi.post('api/v1/producto', product, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
} 
