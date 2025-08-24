export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  inStock: boolean;
  category: string;
  quantity: number;
  totalProductPrice?: number;
  orderProductId?: number;
};

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  imageURL?: string;
  username: string;
  password: string;
  isAdmin?: boolean;
};

export type Order = {
  id?: number;
  status?: string;
  datePlaced?: string;
  products: Product[];
};

export type APIError = {
  data: {
    message: string;
  };
};

export type OrderProduct = {
  id?: number;
  productId?: number;
  orderId?: number;
  price?: number;
  quantity?: number;
};

export type OrderStatus = "created" | "cancelled" | "completed" | "processing";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  inStock: boolean;
  category: string;
};
