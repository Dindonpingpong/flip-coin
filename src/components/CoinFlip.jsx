import React, { useState } from 'react';
import { Radio, InputNumber, Button } from 'antd';
import './CoinFlip.css';

const CoinFlip = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedSide, setSelectedSide] = useState(); // Выбранная сторона монеты
  const [predictionNumber, setPredictionNumber] = useState(1); // Введенное число

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const randomResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(randomResult);
      setIsFlipping(false);

      if (selectedSide === randomResult) {
        setResult(`Вы угадали! Результат: ${randomResult === 'heads' ? 'Орёл' : 'Решка'}`);
      } else {
        setResult(`Вы не угадали. Результат: ${randomResult === 'heads' ? 'Орёл' : 'Решка'}`);
      }
    }, 1000);
  };

  return (
    <div className="coin-flip-container">
      <div className={`coin ${isFlipping ? 'flipping' : ''} ${result}`}>
        <div className="side heads">Орёл</div>
        <div className="side tails">Решка</div>
      </div>

      <div className="controls">
        <Radio.Group
          value={selectedSide}
          onChange={(e) => setSelectedSide(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          <Radio value="heads">Орёл</Radio>
          <Radio value="tails">Решка</Radio>
        </Radio.Group>

        <InputNumber
          min={1}
          max={10}
          defaultValue={1}
          value={predictionNumber}
          onChange={(value) => setPredictionNumber(value)}
          style={{ marginBottom: 16 }}
        />

        <Button type="primary" onClick={flipCoin} disabled={isFlipping}>
          {isFlipping ? 'Подбрасываем...' : 'Подбросить монетку'}
        </Button>
      </div>

      {result && !isFlipping && (
        <p style={{ marginTop: 16 }}>
          {result}
        </p>
      )}
    </div>
  );
};

export default CoinFlip;