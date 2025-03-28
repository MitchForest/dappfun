'use client';

import { ChangeEvent } from 'react';
import { categories } from '@/data/mock-data';
import { ListingType } from '@/models/Listing';

interface CategorySelectProps {
  type: ListingType;
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({ type, value, onChange }: CategorySelectProps) {
  const typeCategories = categories.filter(cat => cat.type === type.toLowerCase());

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="pl-3 pr-10 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
    >
      <option value="">All Categories</option>
      {typeCategories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.label}
        </option>
      ))}
    </select>
  );
} 