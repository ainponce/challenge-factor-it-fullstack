"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { finalizeCart } from "@/redux/slices/cartSlice";
import Cart from "./Cart";

const Navbar: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const carritoId = useAppSelector((state) => state.cart.carritoId);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleFinalizeCart = (carritoId: number) => {
    dispatch(finalizeCart({ carritoId }))
      .unwrap()
      .then((res) => {
        console.log("Carrito finalizado con id:", res.id);
      })
      .catch((err) => {
        console.error("Error al finalizar carrito:", err);
      });
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <span>E-Commerce App</span>
        <button
          className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600 transition"
          onClick={toggleModal}
        >
          🛒
        </button>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl text-gray-800 font-semibold mb-4">
              Tu Carrito
            </h2>
            <p className="text-gray-800 font-semibold mb-4">
              ID del Carrito: {carritoId || "No disponible"}
            </p>
            <Cart />
            <button
              className="m-1.5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={toggleModal}
            >
              Cerrar
            </button>
            <button
              className="m-1.5 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={() => {
                {
                  if (carritoId) {
                    handleFinalizeCart(carritoId);
                  } else {
                    alert("No hay carrito disponible para finalizar.");
                  }
                }
              }}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
