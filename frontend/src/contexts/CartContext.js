import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'hp_cart_v1';

const safeParse = (raw) => {
  try { return raw ? JSON.parse(raw) : []; } catch { return []; }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => safeParse(localStorage.getItem(STORAGE_KEY)));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      const price = parseFloat(String(product.price).replace(/[£$,]/g, '').trim()) || 0;
      return [...prev, {
        id: product.id,
        name: product.name,
        price,
        image: product.image,
        category: product.category,
        quantity,
      }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const setQuantity = useCallback((id, quantity) => {
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = useMemo(() => items.reduce((s, p) => s + p.price * p.quantity, 0), [items]);
  const count = useMemo(() => items.reduce((s, p) => s + p.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQuantity, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
