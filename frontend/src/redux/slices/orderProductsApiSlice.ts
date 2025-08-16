import { Order, OrderProduct, Product } from '../../types';
import apiSlice from './apiSlice';
import { ordersApiSlice } from './ordersApiSlice';

export const ordersProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateOrderProduct: builder.mutation<OrderProduct, OrderProduct>({
      query: (orderProduct) => ({
        url: `/order_products/${orderProduct.id}`,
        method: 'PATCH',
        body: orderProduct,
      }),
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersApiSlice.util.updateQueryData('getCart', undefined, (draftCart: Order) => {
            const itemToUpdate = draftCart.products.find((({orderProductId}) => {
              return orderProductId === patch.id;
            })) as Product;
            Object.assign(itemToUpdate, patch);
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    deleteOrderProduct: builder.mutation<OrderProduct, OrderProduct>({
      query: (orderProduct) => ({
        url: `/order_products/${orderProduct.id}`,
        method: 'DELETE'
      }),
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ordersApiSlice.util.updateQueryData('getCart', undefined, (draftCart: Order) => {
            draftCart.products = draftCart.products.filter((({id}) => id !== patch.id));
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    })
  })
})

export const {
  useUpdateOrderProductMutation,
  useDeleteOrderProductMutation
} = ordersProductsApiSlice;
