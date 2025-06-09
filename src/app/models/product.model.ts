export interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  rating: number; // 1-5
  stock: number;
  createdAt?: any; // Firebase
  updatedAt?: any; // Firebase
  image?: string;

}
