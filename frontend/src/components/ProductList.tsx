"use client";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
