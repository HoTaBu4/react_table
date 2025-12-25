export type CellId = number;
export type CellValue = number;

export interface CellType {
  id: CellId;
  amount: CellValue;
}

export type MatrixRow = CellType[];
export type Matrix = MatrixRow[];

export interface MatrixContextType {
  M: number;
  N: number;
  X: number;
  setM: (m: number) => void;
  setN: (n: number) => void;
  setX: (x: number) => void;
  matrix: Matrix;
  generateMatrix: (m: number, n: number) => void;
  incrementCell: (rowId: number, cellId: CellId) => void;
  removeRow: (rowIndex: number) => void;
  addRow: () => void;
  hoveredCellId: CellId | null;
  setHoveredCellId: (id: CellId | null) => void;
  nearestCellIds: CellId[];
  hoveredSumRowIndex: number | null;
  setHoveredSumRowIndex: (index: number | null) => void;
}
