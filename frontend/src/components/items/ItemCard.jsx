import React, { useState } from 'react';
import ItemForm from './ItemForm.jsx';

const ItemCard = ({ item, onDelete, user }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  if (showEditForm) {
    return <ItemForm item={item} onClose={() => setShowEditForm(false)} />;
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
        <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
          ${parseFloat(item.price).toFixed(2)}
        </span>
      </div>

      <p className="text-gray-700 mb-6 line-clamp-3">{item.description}</p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleDateString()}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowEditForm(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;