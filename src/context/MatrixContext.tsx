import React, { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { Matrix, MatrixContextType, CellId, CellType, MatrixRow } from '../types';

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

let idCounter = 0;
const generateId = () => ++idCounter;
const generateRandomAmount = () => Math.floor(Math.random() * 900) + 100;

export const MatrixProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [M, setM] = useState<number>(0);
  const [N, setN] = useState<number>(0);
  const [X, setX] = useState<number>(0);
  const [matrix, setMatrix] = useState<Matrix>([]);
  const [hoveredCellId, setHoveredCellId] = useState<CellId | null>(null);
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(null);

  const generateMatrix = useCallback((rows: number, cols: number) => {
    const newMatrix: Matrix = [];
    idCounter = 0;
    for (let i = 0; i < rows; i++) {
      const row: MatrixRow = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          id: generateId(),
          amount: generateRandomAmount(),
        });
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix);
  }, []);

  const incrementCell = useCallback((rowIndex: number, cellId: CellId) => {
    setMatrix(prevMatrix => {
      const newMatrix = [...prevMatrix];
      const row = [...newMatrix[rowIndex]];
      const cellIndex = row.findIndex(c => c.id === cellId);
      if (cellIndex !== -1) {
        row[cellIndex] = { ...row[cellIndex], amount: row[cellIndex].amount + 1 };
        newMatrix[rowIndex] = row;
      }
      return newMatrix;
    });
  }, []);

  const removeRow = useCallback((rowIndex: number) => {
    setMatrix(prev => prev.filter((_, index) => index !== rowIndex));
    setM(prev => prev - 1);
  }, []);

  const addRow = useCallback(() => {
    setMatrix(prev => {
      const newRow: MatrixRow = [];

      const actualCols = prev.length > 0 ? prev[0].length : (N > 0 ? N : 0);

      for (let j = 0; j < actualCols; j++) {
        newRow.push({ id: generateId(), amount: generateRandomAmount() });
      }
      return [...prev, newRow];
    });
    setM(prev => prev + 1);
  }, [N]);

  const nearestCellIds = useMemo(() => {
    if (hoveredCellId === null || matrix.length === 0) return [];

    let targetAmount = -1;
    let found = false;
    const allCells: CellType[] = [];

    for (const row of matrix) {
      for (const cell of row) {
        allCells.push(cell);
        if (cell.id === hoveredCellId) {
          targetAmount = cell.amount;
          found = true;
        }
      }
    }

    if (!found) return [];

    const otherCells = allCells.filter(c => c.id !== hoveredCellId);

    otherCells.sort((a, b) => {
      const diffA = Math.abs(a.amount - targetAmount);
      const diffB = Math.abs(b.amount - targetAmount);
      return diffA - diffB;
    });

    return otherCells.slice(0, X).map(c => c.id);
  }, [matrix, hoveredCellId, X]);

  return (
    <MatrixContext.Provider value={{
      M, N, X,
      setM, setN, setX,
      matrix,
      generateMatrix,
      incrementCell,
      removeRow,
      addRow,
      hoveredCellId,
      setHoveredCellId,
      nearestCellIds,
      hoveredSumRowIndex,
      setHoveredSumRowIndex
    }}>
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (context === undefined) {
    throw new Error('useMatrix must be used within a MatrixProvider');
  }
  return context;
};
