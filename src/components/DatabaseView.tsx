import { Database, Row, Column } from '../types';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState } from 'react';
import TableCell from './TableCell';
import ColumnHeader from './ColumnHeader';
import AddColumnModal from './AddColumnModal';
import AddRowButton from './AddRowButton';

interface DatabaseViewProps {
  database: Database;
  setDatabase: (database: Database) => void;
}

export default function DatabaseView({ database, setDatabase }: DatabaseViewProps) {
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);

  const addRow = () => {
    const newRow: Row = {
      id: `row-${Date.now()}`,
      cells: database.columns.map(col => ({
        columnId: col.id,
        value: col.type === 'status' && col.statusOptions ? col.statusOptions[0].id : '',
      })),
    };
    setDatabase({
      ...database,
      rows: [...database.rows, newRow],
    });
  };

  const deleteRow = (rowId: string) => {
    setDatabase({
      ...database,
      rows: database.rows.filter(r => r.id !== rowId),
    });
  };

  const updateCell = (rowId: string, columnId: string, value: string | number | null) => {
    setDatabase({
      ...database,
      rows: database.rows.map(row => {
        if (row.id === rowId) {
          return {
            ...row,
            cells: row.cells.map(cell =>
              cell.columnId === columnId ? { ...cell, value } : cell
            ),
          };
        }
        return row;
      }),
    });
  };

  const addColumn = (column: Column) => {
    const newColumn = { ...column, id: `col-${Date.now()}` };
    setDatabase({
      ...database,
      columns: [...database.columns, newColumn],
      rows: database.rows.map(row => ({
        ...row,
        cells: [
          ...row.cells,
          {
            columnId: newColumn.id,
            value: newColumn.type === 'status' && newColumn.statusOptions
              ? newColumn.statusOptions[0].id
              : '',
          },
        ],
      })),
    });
    setShowAddColumn(false);
  };

  const updateColumn = (updatedColumn: Column) => {
    setDatabase({
      ...database,
      columns: database.columns.map(col =>
        col.id === updatedColumn.id ? updatedColumn : col
      ),
    });
    setEditingColumn(null);
  };

  const deleteColumn = (columnId: string) => {
    setDatabase({
      ...database,
      columns: database.columns.filter(col => col.id !== columnId),
      rows: database.rows.map(row => ({
        ...row,
        cells: row.cells.filter(cell => cell.columnId !== columnId),
      })),
    });
  };

  const getCellValue = (row: Row, columnId: string) => {
    const cell = row.cells.find(c => c.columnId === columnId);
    return cell?.value ?? null;
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-300 transform rotate-1 hover:rotate-0 transition-transform duration-300">
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">📊</span>
            My Awesome Database
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddColumn(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Plus size={18} />
              Add Column
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-purple-200">
              <th className="p-3 text-left font-semibold text-gray-700 sticky left-0 bg-gradient-to-r from-blue-50 to-purple-50 z-10 border-r-2 border-purple-200">
                <div className="flex items-center gap-2">
                  <GripVertical size={16} className="text-gray-400" />
                  Actions
                </div>
              </th>
              {database.columns.map(column => (
                <ColumnHeader
                  key={column.id}
                  column={column}
                  onUpdate={updateColumn}
                  onDelete={deleteColumn}
                  onEdit={() => setEditingColumn(column)}
                />
              ))}
              <th className="p-3 min-w-[150px] bg-gradient-to-r from-purple-50 to-blue-50">
                <AddRowButton onAdd={addRow} />
              </th>
            </tr>
          </thead>
          <tbody>
            {database.rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`border-b border-gray-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-yellow-50 transition-colors ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="p-2 sticky left-0 bg-inherit z-10 border-r-2 border-purple-200">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500 hover:text-red-700"
                    title="Delete row"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
                {database.columns.map(column => (
                  <TableCell
                    key={column.id}
                    column={column}
                    value={getCellValue(row, column.id)}
                    onChange={(value) => updateCell(row.id, column.id, value)}
                  />
                ))}
                <td className="p-2 bg-gray-50/50"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddColumn && (
        <AddColumnModal
          onClose={() => setShowAddColumn(false)}
          onAdd={addColumn}
        />
      )}

      {editingColumn && (
        <AddColumnModal
          column={editingColumn}
          onClose={() => setEditingColumn(null)}
          onAdd={updateColumn}
        />
      )}
    </div>
  );
}

