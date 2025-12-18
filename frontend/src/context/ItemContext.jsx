import React, { createContext, useState, useContext } from 'react';
import { itemService } from '../services/itemService.js';

const ItemContext = createContext();

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await itemService.getItems();
      setItems(data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData) => {
    try {
      setLoading(true);
      setError(null);
      const newItem = await itemService.createItem(itemData);
      setItems([...items, newItem]);
      return newItem;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedItem = await itemService.updateItem(id, itemData);
      setItems(items.map(item => item._id === id ? updatedItem : item));
      return updatedItem;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await itemService.deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getItem = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const item = await itemService.getItem(id);
      setCurrentItem(item);
      return item;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCurrentItem = () => {
    setCurrentItem(null);
  };

  const value = {
    items,
    currentItem,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    getItem,
    clearCurrentItem,
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};