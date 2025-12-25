import React from 'react';
import { useMatrix } from '../context/MatrixContext';

interface SumCellProps {
  sum: number;
  rowIndex: number;
}

const SumCell: React.FC<SumCellProps> = ({ sum, rowIndex }) => {
  const { setHoveredSumRowIndex } = useMatrix();

  return (
    <div
      className="cell sum-cell"
      onMouseEnter={() => setHoveredSumRowIndex(rowIndex)}
      onMouseLeave={() => setHoveredSumRowIndex(null)}
      role="gridcell"
    >
      {sum}
    </div>
  );
};

export default SumCell;
