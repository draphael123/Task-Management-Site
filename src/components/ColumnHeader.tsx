import { Column } from '../types';
import { Settings, X, GripVertical } from 'lucide-react';
import { useState } from 'react';

interface ColumnHeaderProps {
  column: Column;
  onUpdate: (column: Column) => void;
  onDelete: (columnId: string) => void;
  onEdit: () => void;
}

export default function ColumnHeader({ column, onDelete, onEdit }: ColumnHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <th className="p-3 text-left font-semibold text-gray-700 min-w-[150px] relative group border-r border-purple-200">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <GripVertical size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="truncate">{column.name}</span>
          <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
            {column.type}
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
          >
            <Settings size={14} />
          </button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border-2 border-purple-200 z-30 overflow-hidden">
                <button
                  onClick={() => {
                    onEdit();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors flex items-center gap-2"
                >
                  <Settings size={14} />
                  Edit Column
                </button>
                <button
                  onClick={() => {
                    onDelete(column.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                >
                  <X size={14} />
                  Delete Column
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </th>
  );
}

