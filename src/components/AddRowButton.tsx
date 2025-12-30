import { Plus } from 'lucide-react';

interface AddRowButtonProps {
  onAdd: () => void;
}

export default function AddRowButton({ onAdd }: AddRowButtonProps) {
  return (
    <button
      onClick={onAdd}
      className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      <Plus size={18} />
      Add Row
    </button>
  );
}

