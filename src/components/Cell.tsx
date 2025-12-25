import React, { useMemo } from 'react';
import { useMatrix } from '../context/MatrixContext';
import { type CellType } from '../types';

interface CellProps {
  cell: CellType;
  rowIndex: number;
  rowMax: number;
  rowSum: number;
}

const Cell: React.FC<CellProps> = ({ cell, rowIndex, rowMax, rowSum }) => {
  const {
    incrementCell,
    setHoveredCellId,
    nearestCellIds,
    hoveredSumRowIndex
  } = useMatrix();

  const isNearest = nearestCellIds.includes(cell.id);
  const isRowHovered = hoveredSumRowIndex === rowIndex;

  const handleClick = () => {
    incrementCell(rowIndex, cell.id);
  };

  const outputValue = useMemo(() => {
    if (isRowHovered && rowSum > 0) {
      const percent = (cell.amount / rowSum) * 100;
      return `${Math.round(percent)}%`;
    }
    return cell.amount;
  }, [isRowHovered, rowSum, cell.amount]);

  const style: React.CSSProperties = {};

  if (isNearest) {
    style.backgroundColor = 'var(--nearest-highlight-color)';
  }

  if (isRowHovered) {
    const ratio = rowMax > 0 ? cell.amount / rowMax : 0;

    style.backgroundImage = `linear-gradient(to top, rgba(0, 123, 255, 0.2) ${ratio * 100}%, transparent ${ratio * 100}%)`;
  }

  return (
    <div
      className={`cell ${isNearest ? 'nearest' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setHoveredCellId(cell.id)}
      onMouseLeave={() => setHoveredCellId(null)}
      style={style}
      role="gridcell"
    >
      {outputValue}
    </div>
  );
};

export default Cell;
