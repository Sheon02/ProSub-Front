import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../slices/productsApiSlice';

const ProductAddScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const navigate = useNavigate();
  const [createProduct, { isLoading, error: createError }] = useCreateProductMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name,
        price: Number(price),
        image,
        description,
        isActive,
      }).unwrap();
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#fbe9d0] rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-[#244855] mb-6">Add New Product</h1>
      
      {createError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {createError.data?.message || createError.message}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#244855]">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-[#244855]">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Enter price"
            value={price}
             onChange={(e) => setPrice(e.target.value)} 
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-[#244855]">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#244855]">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Active
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#e64833] text-[#244855] py-2 px-4 rounded-md hover:bg-[#c12d1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="ml-2">Creating...</span>
              </div>
            ) : (
              'Create Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAddScreen;