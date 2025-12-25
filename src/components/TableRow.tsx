import React, { useMemo } from 'react';
import { type MatrixRow } from '../types';
import SumCell from './SumCell';
import { useMatrix } from '../context/MatrixContext';
import Cell from "./Cell.tsx";

interface TableRowProps {
  row: MatrixRow;
  rowIndex: number;
}

const TableRow: React.FC<TableRowProps> = ({ row, rowIndex }) => {
  const { removeRow } = useMatrix();
  const sum = useMemo(() => row.reduce((acc, curr) => acc + curr.amount, 0), [row]);
  const max = useMemo(() => Math.max(...row.map(c => c.amount), 0), [row]);

  return (
    <div className="table-row" role="row">
      <div className="row-label">
        <button onClick={() => removeRow(rowIndex)} className="remove-btn" title="Remove Row">
          ×
        </button>
      </div>
      {row.map(cell => (
        <Cell
          key={cell.id}
          cell={cell}
          rowIndex={rowIndex}
          rowMax={max}
          rowSum={sum}
        />
      ))}
      <SumCell sum={sum} rowIndex={rowIndex} />
    </div>
  );
};

export default TableRow;
