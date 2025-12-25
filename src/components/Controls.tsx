import React, { useState } from 'react';
import { useMatrix } from '../context/MatrixContext';

const Controls: React.FC = () => {
  const { setM, setN, setX, generateMatrix } = useMatrix();

  const [inpM, setInpM] = useState<string>('');
  const [inpN, setInpN] = useState<string>('');
  const [inpX, setInpX] = useState<string>('');

  const handleGenerate = () => {
    const mVal = parseInt(inpM, 10);
    const nVal = parseInt(inpN, 10);
    const xVal = parseInt(inpX, 10);

    if (isNaN(mVal) || isNaN(nVal) || isNaN(xVal)) {
      alert("Please enter valid numbers");
      return;
    }

    if (mVal < 0 || mVal > 100) return alert("M must be 0-100");
    if (nVal < 0 || nVal > 100) return alert("N must be 0-100");

    const maxCells = mVal * nVal;
    if (xVal >= maxCells) {
      alert(`X must be less than total cells (${maxCells})`);
      return;
    }

    setM(mVal);
    setN(nVal);
    setX(xVal);
    generateMatrix(mVal, nVal);
  };

  return (
    <div className="controls">
      <div className="input-group">
        <label>M (Rows)</label>
        <input
          type="number"
          value={inpM}
          onChange={e => setInpM(e.target.value)}
          placeholder="0-100"
          max={100} min={0}
        />
      </div>
      <div className="input-group">
        <label>N (Columns)</label>
        <input
          type="number"
          value={inpN}
          onChange={e => setInpN(e.target.value)}
          placeholder="0-100"
          max={100} min={0}
        />
      </div>
      <div className="input-group">
        <label>X (Nearest)</label>
        <input
          type="number"
          value={inpX}
          onChange={e => setInpX(e.target.value)}
          placeholder="Amount"
        />
      </div>
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
};

export default Controls;
