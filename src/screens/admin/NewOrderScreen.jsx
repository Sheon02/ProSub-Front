import React from 'react';
import { useGetUndeliveredOrdersQuery, useUpdateOrderDeliveryMutation } from '../../slices/ordersApiSlice';
import { toast } from 'react-toastify';

const NewOrderScreen = () => {
  const { data: orders, isLoading, error, refetch } = useGetUndeliveredOrdersQuery();
  const [updateDelivery] = useUpdateOrderDeliveryMutation();

  const handleDeliveryToggle = async (orderId) => {
    try {
      await updateDelivery(orderId).unwrap();
      toast.success('Order marked as delivered');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading orders</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Undelivered Orders</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.user?.email || 'N/A'}
               </td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderItems?.[0]?.product?.name || 'N/A'}
               </td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                 ${order.totalPrice.toFixed(2)}
               </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDeliveryToggle(order._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders?.length === 0 && (
        <div className="text-center mt-8 text-gray-500">
          No undelivered orders found
        </div>
      )}
    </div>
  );
};

export default NewOrderScreen;