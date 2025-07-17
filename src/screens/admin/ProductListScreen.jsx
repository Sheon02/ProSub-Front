import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useToggleProductOnMutation,
  useToggleProductOffMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery({});
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [toggleProductOn] = useToggleProductOnMutation();
  const [toggleProductOff] = useToggleProductOffMutation();

  const openDeleteDialog = (productId) => {
    setProductToDelete(productId);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setProductToDelete(null);
  };

  const deleteHandler = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete).unwrap();
      toast.success('Product deleted successfully');
      refetch();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(
        err.data?.message || 
        err.error || 
        'Failed to delete product. Please try again.'
      );
    } finally {
      closeDeleteDialog();
    }
  };

  const toggleProductStatus = async (productId, currentStatus) => {
    try {
      if (currentStatus) {
        await toggleProductOff(productId).unwrap();
        toast.success('Product deactivated successfully');
      } else {
        await toggleProductOn(productId).unwrap();
        toast.success('Product activated successfully');
      }
      refetch();
    } catch (err) {
      toast.error(err.data?.message || err.error || 'Failed to toggle product status');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 relative">
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteDialog}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteHandler}
                disabled={loadingDelete}
                className={`px-4 py-2 rounded-md transition-colors ${
                  loadingDelete 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {loadingDelete ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-[#e64833] text-[#244855] px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error || 'Error loading products'}
        </Message>
      ) : (
        <div className="overflow-x-auto mb-4">
          {/* Desktop Table */}
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-1">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleProductStatus(product._id, product.isActive)}
                      className={`p-2 rounded-full transition-colors ${
                        product.isActive ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'
                      }`}
                      title={product.isActive ? 'Active - Click to deactivate' : 'Inactive - Click to activate'}
                    >
                      {product.isActive ? (
                        <FaToggleOn size={20} />
                      ) : (
                        <FaToggleOff size={20} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="text-blue-600 hover:text-blue-900 p-2 transition-colors duration-200"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => openDeleteDialog(product._id)}
                        className="text-red-600 hover:text-red-900 p-2 transition-colors duration-200"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile List */}
          <div className="space-y-4 md:hidden">
            {data.products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="text-xs text-gray-500">ID: {product._id}</p>
                    <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => toggleProductStatus(product._id, product.isActive)}
                      className={`p-1 rounded-full transition-colors ${
                        product.isActive ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'
                      }`}
                      title={product.isActive ? 'Active - Click to deactivate' : 'Inactive - Click to activate'}
                    >
                      {product.isActive ? (
                        <FaToggleOn size={18} />
                      ) : (
                        <FaToggleOff size={18} />
                      )}
                    </button>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="text-blue-600 hover:text-blue-900 p-1 transition-colors duration-200"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => openDeleteDialog(product._id)}
                        className="text-red-600 hover:text-red-900 p-1 transition-colors duration-200"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;