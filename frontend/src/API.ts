import axios from 'axios';
const API_URL = '/api';

export const fetchProducts = async () => {
  try {
    const { data: products } = await axios.get(`${API_URL}/products`);
    return products;
  } catch (error) {
    console.error('Failed to fetch products');
    throw error;
  }
}

export const login = async (username: string, password: string) => {
  try {
    const { data:token } = await axios.post(`${API_URL}/users/login`, {username, password});
    return token;
  } catch (error) {
    console.error('Error while logging in')
    throw error;
  }
}

export const register = async (user: any) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/register`, user);
    return data;
  } catch (error) {
    console.error('Error while registering');
    throw error;
  }
}

export const getUser = async (token: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error('Error while getting user');
    throw error;
  }
}

export const getCart = async (token: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/orders/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export const createPaymentIntent = async ({products}: any) => {
  try {
    const {
      data: { clientSecret: paymentIntent },
    } = await axios.post(`${API_URL}/orders/create-payment-intents`, {
      products,
    });
    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

export const confirmOrder = async (token: string, orderId: any) => {
  try {
    const {
      data
    } = await axios.patch(`${API_URL}/orders/${orderId}/complete`, '', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data
  } catch (error) {
    throw error;
  }
}

export const addProductToOrder = async (token: string, orderId: any, product: any) =>{
  try {
    await axios.post(`${API_URL}/orders/${orderId}/products`, {...product, productId: product.id}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  } catch (error) {
    throw error;
  }
} 
