import { Order } from '../../types';
import apiSlice from './apiSlice';

type StripeSessionResponse = {
  URL: string
}

type StripeSessionRequest = {
  cart: Order;
  baseURL: string;
}

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createStripeSession: builder.mutation<StripeSessionResponse, StripeSessionRequest>({
      query: (stripeSessionRequest) => ({
        url: '/stripe/create-checkout-session',
        method: 'POST',
        body: stripeSessionRequest,
      }),
    }),
  })
})

export const {
  useCreateStripeSessionMutation
} = stripeApiSlice;
