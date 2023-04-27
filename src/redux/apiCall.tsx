import axios from "axios";

const API_URL = "http://localhost:4000/api";

interface Product {
  productId: string;
  productName: string;
  description: string;
  imageUrl: string;
  price: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};
