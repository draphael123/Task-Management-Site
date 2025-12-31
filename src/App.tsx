import { useState } from 'react';
import DatabaseView from './components/DatabaseView';
import { Database } from './types';

const initialDatabase: Database = {
  columns: [
    { id: 'col1', name: 'Task', type: 'text' },
    { id: 'col2', name: 'Status', type: 'status', statusOptions: [
      { id: 'opt1', label: 'Not Started', color: '#e9e9e7' },
      { id: 'opt2', label: 'In Progress', color: '#f7dd72' },
      { id: 'opt3', label: 'Done', color: '#4caf50' },
    ]},
    { id: 'col3', name: 'Priority', type: 'status', statusOptions: [
      { id: 'p1', label: 'Low', color: '#90caf9' },
      { id: 'p2', label: 'Medium', color: '#ffb74d' },
      { id: 'p3', label: 'High', color: '#f06292' },
    ]},
    { id: 'col4', name: 'Assignee', type: 'text' },
  ],
  rows: [
    { id: 'row1', cells: [
      { columnId: 'col1', value: 'Setup project' },
      { columnId: 'col2', value: 'opt3' },
      { columnId: 'col3', value: 'p2' },
      { columnId: 'col4', value: '' },
    ]},
    { id: 'row2', cells: [
      { columnId: 'col1', value: 'Design database' },
      { columnId: 'col2', value: 'opt2' },
      { columnId: 'col3', value: 'p3' },
      { columnId: 'col4', value: '' },
    ]},
  ],
};

function App() {
  const [database, setDatabase] = useState<Database>(initialDatabase);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
            🎉 Task Database 🎊
          </h1>
          <p className="text-xl text-white/90 font-semibold">
            Your zany workspace for organizing everything!
          </p>
        </div>
        <DatabaseView database={database} setDatabase={setDatabase} />
      </div>
    </div>
  );
}

export default App;

