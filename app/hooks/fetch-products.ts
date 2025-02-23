import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios-instance";
import { Product } from "../products/types/product";

const fetchProducts = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
}

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}


