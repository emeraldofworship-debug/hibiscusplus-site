import React from 'react';
import AdminCrudPage from '../../components/AdminCrudPage';

const COLUMNS = [
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category', type: 'badge' },
  { key: 'price', label: 'Price' },
];

const FIELDS = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'category', label: 'Category', type: 'text', placeholder: 'Tea Blend' },
  { key: 'price', label: 'Price', type: 'text', placeholder: '£24.00' },
  { key: 'image', label: 'Image URL', type: 'image' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'ingredients', label: 'Ingredients', type: 'list' },
  { key: 'allergenInfo', label: 'Allergen info', type: 'text' },
  { key: 'comingSoon', label: 'Mark as coming soon', type: 'boolean' },
];

const emptyItem = () => ({
  name: '', category: '', price: '', image: '',
  description: '', ingredients: [], allergenInfo: '', comingSoon: false,
});

export default function ProductsAdmin() {
  return (
    <AdminCrudPage
      title="Products"
      subtitle="Manage the shop catalogue"
      resourcePath="/api/products"
      adminPath="/api/admin/products"
      columns={COLUMNS}
      fields={FIELDS}
      emptyItem={emptyItem}
      testidPrefix="admin-products"
    />
  );
}
