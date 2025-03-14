import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeProductFromCart } from "@/redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const carritoId = useAppSelector((state) => state.cart.carritoId);
  const products = useAppSelector((state) => state.cart.products);

  const handleRemoveToCart = ({ id }: { id: number }) => {
    if (carritoId) {
      dispatch(removeProductFromCart({ carritoId, productId: id }));
    }
  };

  return (
    <div className="border p-4">
      <h2 className="text-gray-800">Carrito</h2>
      {products.map((p) => (
        <div key={p.id} className="p-2 border-b text-gray-800">
          {p.nombre} - ${p.precio}
          <button
            onClick={() => {
              handleRemoveToCart({ id: p.id });
            }}
            className="mt-2 bg-blue-500 text-gray-800 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Eliminar del carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
