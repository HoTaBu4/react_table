import React from 'react';
import './App.css';
import { MatrixProvider } from './context/MatrixContext';
import Controls from './components/Controls';
import Table from './components/Table';

const App: React.FC = () => {
  return (
    <MatrixProvider>
      <div className="app-layout">
        <header>
          <h1>Matrix Master</h1>
        </header>
        <main>
          <Controls />
          <Table />
        </main>
      </div>
    </MatrixProvider>
  );
};

export default App;
