import React, { useState } from 'react';
import { Form, Radio, InputNumber, Button } from 'antd';
import './CoinFlip.css';

const CoinFlip = () => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState(null);
    const [form] = Form.useForm();

    const flipCoin = () => {
        if (isFlipping) return;

        const values = form.getFieldsValue();
        const selectedSide = values.side;
        const predictionNumber = values.number;

        setIsFlipping(true);
        setResult(null);

        setTimeout(() => {
            const randomResult = Math.random() < 0.5 ? 'heads' : 'tails';
            setIsFlipping(false);

            if (selectedSide === randomResult) {
                setResult(
                    `Вы угадали! Результат: ${randomResult === 'heads' ? 'Орёл' : 'Решка'}. Ваш выигрыш: ${predictionNumber}`
                );
            } else {
                setResult(
                    `Вы не угадали. Результат: ${randomResult === 'heads' ? 'Орёл' : 'Решка'}. Ваш проигрыш: -${predictionNumber}`
                );
            }
        }, 2000);
    };

    return (
        <div className="coin-flip-container">
            <div className={`coin ${isFlipping ? 'flipping' : ''} ${result}`}>
                <div className="side heads">Орёл</div>
                <div className="side tails">Решка</div>
            </div>

            <Form form={form} layout="vertical" className="controls" onFinish={flipCoin}>
                <Form.Item
                    name="side"
                    label="Выберите сторону монеты"
                    rules={[{ required: true, message: 'Пожалуйста, выберите сторону!' }]}
                >
                    <Radio.Group>
                        <Radio value="heads">Орёл</Radio>
                        <Radio value="tails">Решка</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="number"
                    label="Введите ставку от 1 до 1000"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите число!' },
                        { type: 'number', min: 1, max: 1000, message: 'Число должно быть от 1 до 1000!' },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" disabled={isFlipping} htmlType="submit">
                        {isFlipping ? 'Подбрасываем...' : 'Сыграть'}
                    </Button>
                </Form.Item>

                {result && !isFlipping && (
                    <p style={{ marginTop: 16 }}>
                        {result}
                    </p>
                )}
            </Form>
        </div>
    );
};



export default CoinFlip;