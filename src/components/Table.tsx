import React from 'react';
import { useMatrix } from '../context/MatrixContext';
import TableRow from './TableRow';
import TableFooter from './TableFooter';

const Table: React.FC = () => {
  const { matrix, addRow, N } = useMatrix();

  if (matrix.length === 0 && N === 0) {
    return <div className="empty-state">Please configure M, N and X to generate a table</div>;
  }

  return (
    <div className="table-container">
      <div className="matrix-table" role="grid">
        <div className="table-header-row">
          <div className="header-cell row-label"></div>
          {matrix.length > 0 && matrix[0].map((_, idx) => (
            <div key={idx} className="header-cell">Col {idx + 1}</div>
          ))}
          <div className="header-cell sum-header">Sum</div>
        </div>

        {matrix.map((row, idx) => (
          <TableRow key={idx} row={row} rowIndex={idx} />
        ))}

        <TableFooter />
      </div>

      <div className="table-controls">
        <button className="add-row-btn" onClick={addRow}>+ Add Row</button>
      </div>
    </div>
  );
};

export default Table;
