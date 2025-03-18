import { Product } from "@/types/Product";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProductToCart, createCart } from "@/redux/slices/cartSlice";
import { useEffect } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const carritoId = useAppSelector((state) => state.cart.carritoId);

  const clienteId = 1;

  const handleAddToCart = () => {
    if (carritoId) {
      dispatch(addProductToCart({ carritoId, productId: product.id }));
    } else {
      dispatch(createCart(clienteId)).then((action) => {
        if (createCart.fulfilled.match(action)) {
          const cartId = action.payload as number;
          dispatch(
            addProductToCart({ carritoId: cartId, productId: product.id })
          );
        }
      });
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700">{product.nombre}</h3>
      <p className="text-gray-700">Precio: ${product.precio}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
