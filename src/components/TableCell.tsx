import { Column } from '../types';
import { useState, useRef, useEffect } from 'react';

interface TableCellProps {
  column: Column;
  value: string | number | null;
  onChange: (value: string | number | null) => void;
}

export default function TableCell({ column, value, onChange }: TableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value || ''));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(String(value || ''));
  }, [value]);

  const handleBlur = () => {
    onChange(editValue || null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditValue(String(value || ''));
      setIsEditing(false);
    }
  };

  if (column.type === 'status' && column.statusOptions) {
    const selectedOption = column.statusOptions.find(opt => opt.id === value);
    
    return (
      <td className="p-2 border-r border-purple-200">
        <select
          value={value as string || ''}
          onChange={(e) => onChange(e.target.value || null)}
          className="w-full px-3 py-2 rounded-lg border-2 border-transparent hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-all font-medium cursor-pointer"
          style={{
            backgroundColor: selectedOption?.color || '#f3f4f6',
            color: selectedOption ? '#000' : '#6b7280',
          }}
        >
          {column.statusOptions.map(option => (
            <option key={option.id} value={option.id} style={{ backgroundColor: 'white', color: '#000' }}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
    );
  }

  return (
    <td
      className="p-2 border-r border-purple-200 cursor-text"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type={column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text'}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      ) : (
        <div className="px-2 py-1 min-h-[32px] flex items-center hover:bg-purple-50 rounded-lg transition-colors">
          {value || <span className="text-gray-400 italic">Empty</span>}
        </div>
      )}
    </td>
  );
}

