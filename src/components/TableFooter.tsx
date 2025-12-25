import React, { useMemo } from 'react';
import { useMatrix } from '../context/MatrixContext';

const TableFooter: React.FC = () => {
  const { matrix } = useMatrix();

  const percentiles = useMemo(() => {
    if (matrix.length === 0) return [];

    const numCols = matrix[0].length;
    const result = [];

    for (let col = 0; col < numCols; col++) {
      const colValues = matrix.map(row => row[col].amount).sort((a, b) => a - b);

      const p = 0.6;
      if (colValues.length === 0) {
        result.push(0);
        continue;
      }

      const pos = p * (colValues.length - 1);
      const base = Math.floor(pos);
      const rest = pos - base;

      let val;
      if (base + 1 < colValues.length) {
        val = colValues[base] + rest * (colValues[base + 1] - colValues[base]);
      } else {
        val = colValues[base];
      }
      result.push(val);
    }
    return result;

  }, [matrix]);

  if (matrix.length === 0) return null;

  return (
    <div className="table-footer" role="row">
      <div className="row-label"></div>
      {percentiles.map((val, idx) => (
        <div key={idx} className="cell footer-cell">
          {Number.isInteger(val) ? val : parseFloat(val.toFixed(1))}
        </div>
      ))}

      <div className="cell empty-cell"></div>
    </div>
  );
};

export default TableFooter;
