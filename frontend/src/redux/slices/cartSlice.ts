import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';
import { crearCarrito, agregarProducto, quitarProducto, finalizarCarrito } from '../../services/carritoService';

interface CartState {
  products: Product[];
  carritoId: number | null;
}

const initialState: CartState = {
  products: [],
  carritoId: null,
};

export const createCart = createAsyncThunk(
  'cart/createCart',
  async (clienteId: number) => {
    const carrito = await crearCarrito(clienteId);
    return carrito.id;
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async ({ carritoId, productId }: { carritoId: number; productId: number }) => {
    const carrito = await agregarProducto(carritoId, productId);
    return carrito.productos;
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProduct',
  async ({ carritoId, productId }: { carritoId: number; productId: number }) => {
    const carrito = await quitarProducto(carritoId, productId);
    return carrito.productos;
  }
);

export const finalizeCart = createAsyncThunk(
  'cart/finalizeCart',
  async (params: { carritoId: number }) => {
    const carrito = await finalizarCarrito(params.carritoId);
    return carrito;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCart.fulfilled, (state, action) => {
        state.carritoId = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(finalizeCart.fulfilled, (state, action) => {
        state.products = [];
      });
  },
});

export default cartSlice.reducer;
