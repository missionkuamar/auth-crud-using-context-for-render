import React, { useState, useEffect } from 'react';
import { useItems } from '../../context/ItemContext.jsx';
import { useAlert } from '../../context/AlertContext.jsx';

const ItemForm = ({ item, onClose }) => {
  const { createItem, updateItem, currentItem } = useItems();
  const { showAlert } = useAlert();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (item || currentItem) {
      const itemData = item || currentItem;
      setFormData({
        name: itemData.name || '',
        description: itemData.description || '',
        price: itemData.price || '',
        category: itemData.category || '',
      });
    }
  }, [item, currentItem]);

  const { name, description, price, category } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const itemData = {
        ...formData,
        price: parseFloat(price),
      };

      if (item || currentItem) {
        await updateItem((item || currentItem)._id, itemData);
        showAlert('Item updated successfully', 'success');
      } else {
        await createItem(itemData);
        showAlert('Item created successfully', 'success');
      }

      onClose();
    } catch (error) {
      showAlert(error.message || 'Failed to save item', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {item || currentItem ? 'Edit Item' : 'Create New Item'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="input-field"
            value={name}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            className="input-field"
            value={description}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            className="input-field"
            value={price}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            className="input-field"
            value={category}
            onChange={onChange}
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving...' : (item || currentItem ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;