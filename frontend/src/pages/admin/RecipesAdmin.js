import React from 'react';
import AdminCrudPage from '../../components/AdminCrudPage';

const COLUMNS = [
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category', type: 'badge' },
  { key: 'prep_time', label: 'Prep' },
];

const FIELDS = [
  { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Calming Hibiscus Chamomile Blend' },
  { key: 'category', label: 'Category', type: 'text', required: true, placeholder: 'Stress Relief' },
  { key: 'prep_time', label: 'Prep time', type: 'text', placeholder: '10 minutes' },
  { key: 'image', label: 'Image URL', type: 'image', placeholder: 'https://…' },
  { key: 'ingredients', label: 'Ingredients', type: 'list', placeholder: '2 tsp dried hibiscus, 1 tsp chamomile…' },
  { key: 'benefits', label: 'Benefits', type: 'list', placeholder: 'reduces stress, improves sleep' },
  { key: 'instructions', label: 'Instructions', type: 'list', placeholder: 'Boil water, add herbs, steep 5 min' },
  { key: 'beetroot_included', label: 'Includes beetroot', type: 'boolean' },
];

const emptyItem = () => ({
  name: '', category: '', prep_time: '',
  image: '', ingredients: [], benefits: [], instructions: [],
  beetroot_included: false,
});

export default function RecipesAdmin() {
  return (
    <AdminCrudPage
      title="Recipes"
      subtitle="Manage the recipe journal"
      resourcePath="/api/recipes"
      adminPath="/api/admin/recipes"
      columns={COLUMNS}
      fields={FIELDS}
      emptyItem={emptyItem}
      testidPrefix="admin-recipes"
    />
  );
}
