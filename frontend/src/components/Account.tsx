import { useGetMeQuery } from "@/redux/slices/authApiSlice";
import { useGetOrdersByUserQuery } from "../redux/slices/ordersApiSlice";
import Loader from "./Loader";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Account = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  const {
    isLoading: userLoading,
    isError: userError,
    data: user,
  } = useGetMeQuery();

  const {
    isLoading: orderLoading,
    isError: orderError,
    data: orders,
  } = useGetOrdersByUserQuery(user?.username || "", {
    skip: !user,
  });

  const toggleOrderExpansion = (orderId: number | undefined) => {
    if (!orderId) return;
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const calculateOrderTotal = (products: any[]) => {
    return products.reduce(
      (total, product) => total + (product.totalProductPrice || 0),
      0,
    );
  };

  if (userLoading || orderLoading) {
    return <Loader />;
  } else if (userError || orderError) {
    return <div>There was an error loading your orders. Please try again.</div>;
  } else if (orders?.length === 0) {
    return <div>You have no orders.</div>;
  }

  return (
    <div className="max-w-[1300px] w-[70vw] mx-auto p-4 space-y-4">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Hi, {user?.username}!</h1>
        <p className="text-blue-100 mt-2">Welcome to your account dashboard</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Orders</CardTitle>
          <p className="text-gray-600">Click on an order to view details</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders?.map((order) => {
              const isExpanded = order.id
                ? expandedOrders.has(order.id)
                : false;
              const orderTotal = calculateOrderTotal(order.products || []);

              return (
                <Card key={order.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          Status:{" "}
                          <span
                            className={`font-medium ${
                              order.status === "completed"
                                ? "text-green-600"
                                : order.status === "cancelled"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </p>
                        {order.datePlaced && (
                          <p className="text-sm text-gray-500">
                            Date:{" "}
                            {new Date(order.datePlaced).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ${orderTotal.toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleOrderExpansion(order.id)}
                          className="p-2"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="pt-0">
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Order Items:</h4>
                        <div className="space-y-3">
                          {order.products?.map((product, index) => (
                            <div
                              key={`${product.id}-${index}`}
                              className="flex justify-between items-center bg-gray-50 p-3 rounded"
                            >
                              <div className="flex-1">
                                <h5 className="font-medium">{product.name}</h5>
                                <p className="text-sm text-gray-600">
                                  {product.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Quantity: {product.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ${(product.totalProductPrice || 0).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ${product.price} each
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t mt-4 pt-4">
                          <div className="flex justify-between items-center font-bold text-lg">
                            <span>Order Total:</span>
                            <span>${orderTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
