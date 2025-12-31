import { useState, useEffect, useRef } from 'react';
import { Column, FieldType, StatusOption } from '../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface AddColumnModalProps {
  column?: Column;
  onClose: () => void;
  onAdd: (column: Column) => void;
}

const fieldTypeColors: Record<FieldType, string> = {
  text: '#3b82f6',
  status: '#8b5cf6',
  number: '#10b981',
  date: '#f59e0b',
};

const defaultColors = [
  '#e9e9e7', '#f7dd72', '#4caf50', '#90caf9', '#ffb74d', '#f06292',
  '#ba68c8', '#64b5f6', '#81c784', '#ffd54f', '#ff8a65', '#a1887f'
];

export default function AddColumnModal({ column, onClose, onAdd }: AddColumnModalProps) {
  const [name, setName] = useState(column?.name || '');
  const [type, setType] = useState<FieldType>(column?.type || 'text');
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>(
    column?.statusOptions || [{ id: 'opt-1', label: 'Option 1', color: defaultColors[0] }]
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (column) {
      setName(column.name);
      setType(column.type);
      setStatusOptions(column.statusOptions || [{ id: 'opt-1', label: 'Option 1', color: defaultColors[0] }]);
    }
  }, [column]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const addStatusOption = () => {
    const newOption: StatusOption = {
      id: `opt-${Date.now()}`,
      label: `Option ${statusOptions.length + 1}`,
      color: defaultColors[statusOptions.length % defaultColors.length],
    };
    setStatusOptions([...statusOptions, newOption]);
  };

  const updateStatusOption = (id: string, updates: Partial<StatusOption>) => {
    setStatusOptions(
      statusOptions.map(opt => (opt.id === id ? { ...opt, ...updates } : opt))
    );
  };

  const deleteStatusOption = (id: string) => {
    if (statusOptions.length > 1) {
      setStatusOptions(statusOptions.filter(opt => opt.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newColumn: Column = {
      id: column?.id || `col-${Date.now()}`,
      name: name.trim(),
      type,
      ...(type === 'status' && { statusOptions }),
    };
    onAdd(newColumn);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-yellow-300"
      >
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {column ? '✏️ Edit Column' : '➕ Add Column'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Column Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all text-lg"
              placeholder="Enter column name..."
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Field Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['text', 'status', 'number', 'date'] as FieldType[]).map((fieldType) => (
                <button
                  key={fieldType}
                  type="button"
                  onClick={() => setType(fieldType)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all border-2 ${
                    type === fieldType
                      ? 'border-purple-400 bg-purple-50 scale-105'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                  style={
                    type === fieldType
                      ? { borderColor: fieldTypeColors[fieldType] }
                      : {}
                  }
                >
                  <span className="capitalize">{fieldType}</span>
                </button>
              ))}
            </div>
          </div>

          {type === 'status' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Status Options
                </label>
                <button
                  type="button"
                  onClick={addStatusOption}
                  className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold"
                >
                  <Plus size={16} />
                  Add Option
                </button>
              </div>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <input
                      type="color"
                      value={option.color}
                      onChange={(e) =>
                        updateStatusOption(option.id, { color: e.target.value })
                      }
                      className="w-12 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) =>
                        updateStatusOption(option.id, { label: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                      placeholder="Option label..."
                    />
                    {statusOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => deleteStatusOption(option.id)}
                        className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {column ? 'Update Column' : 'Add Column'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

