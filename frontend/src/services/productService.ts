import api from './api';
import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('carrito/productos/listar');
  return response.data;
};