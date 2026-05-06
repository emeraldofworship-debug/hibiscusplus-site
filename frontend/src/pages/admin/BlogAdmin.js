import React from 'react';
import AdminCrudPage from '../../components/AdminCrudPage';

const COLUMNS = [
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category', type: 'badge' },
  { key: 'author', label: 'Author' },
];

const FIELDS = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'category', label: 'Category', type: 'text', placeholder: 'History' },
  { key: 'author', label: 'Author', type: 'text', placeholder: 'Dr. Sarah Chen' },
  { key: 'date', label: 'Date (ISO)', type: 'text', placeholder: '2025-05-09T00:00:00' },
  { key: 'read_time', label: 'Read time', type: 'text', placeholder: '5 min read' },
  { key: 'image', label: 'Cover image URL', type: 'image' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 3 },
  { key: 'content', label: 'Body', type: 'textarea', rows: 10 },
];

const emptyItem = () => ({
  title: '', category: '', author: '', date: '', read_time: '',
  image: '', excerpt: '', content: '',
});

export default function BlogAdmin() {
  return (
    <AdminCrudPage
      title="Blog"
      subtitle="Stories from the steeping pot"
      resourcePath="/api/blog"
      adminPath="/api/admin/blog"
      columns={COLUMNS}
      fields={FIELDS}
      emptyItem={emptyItem}
      testidPrefix="admin-blog"
    />
  );
}
