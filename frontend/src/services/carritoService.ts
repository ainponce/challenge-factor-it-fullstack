import api from './api';
import { Product } from '../types/Product';

export const crearCarrito = async (clienteId: number): Promise<{ id: number }> => {
  const response = await api.post<{ id: number }>(`/carrito/crear/${clienteId}`);
  return response.data;
};

export const finalizarCarrito = async (carritoId: number): Promise<{id: number}> => {
  const response = await api.post<{id: number}>(`/carrito/finalizar/${carritoId}`);
  return response.data;
}

export const agregarProducto = async (carritoId: number, productId: number): Promise<{ productos: Product[] }> => {
  const response = await api.post<{ productos: Product[] }>(`/carrito/agregar/${carritoId}/${productId}`);
  return response.data;
};

export const quitarProducto = async (carritoId: number, productId: number): Promise<{ productos: Product[] }> => {
  const response = await api.delete<{ productos: Product[] }>(`/carrito/quitar/${carritoId}/${productId}`);
  return response.data;
};

