import React, { useState } from 'react';
import { Form, Radio, InputNumber, Button, Space, Select, Typography } from 'antd';
import './CoinFlip.css';


const CoinFlip = () => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState(null);
    const [form] = Form.useForm();
    const [lang, setLang] = useState("en");
    const [balance, setBalance] = useState(3000);
    const [currency, setCurrency] = useState("usd");

    const flipCoin = () => {
        if (isFlipping) return;

        const values = form.getFieldsValue();
        const selectedSide = values.side;
        const predictionNumber = values.number;

        setIsFlipping(true);
        setResult(null);

        setTimeout(() => {
            const randomResult = Math.random() < 0.5 ? 'heads' : 'tails';
            setResult(randomResult);
            setIsFlipping(false);

            if (selectedSide === randomResult) {
                let prize = predictionNumber * 2
                if (currency === 'eur') {
                    prize = (prize * 1.04).toFixed(2)
                }
                setBalance((balance + prize).toFixed(2))
                LOCALIZATION['ru'].resultMsg = getResultMsg('ru', randomResult, true, prize)
                LOCALIZATION['en'].resultMsg = getResultMsg('en', randomResult, true, prize)
            } else {
                let lose = predictionNumber
                if (currency === 'eur') {
                    lose = (lose * 1.04).toFixed(2)
                }
                setBalance((balance - lose).toFixed(2))
                LOCALIZATION['ru'].resultMsg = getResultMsg('ru', randomResult, false, lose)
                LOCALIZATION['en'].resultMsg = getResultMsg('en', randomResult, false, lose)
            }
        }, 2000);
    };

    const onChangeCurrency = (curr) => {
        setCurrency(curr);
    }

    return (
        <div className="coin-flip-container">
            <div className={`coin ${isFlipping ? 'flipping' : ''} ${result}`}>
                <div className="side heads">{LOCALIZATION[lang].head}</div>
                <div className="side tails">{LOCALIZATION[lang].tail}</div>
            </div>

            <Space wrap>
                <Select
                    defaultValue="en"
                    style={{
                        width: 120,
                    }}
                    onChange={(lang) => {
                        setLang(lang)
                        form.validateFields()
                    }}
                    options={[
                        {
                            value: 'ru',
                            label: 'Ru',
                        },
                        {
                            value: 'en',
                            label: 'En',
                        },
                    ]}
                />
                <Select
                    defaultValue="usd"
                    style={{
                        width: 120,
                    }}
                    onChange={onChangeCurrency}
                    options={[
                        {
                            value: 'usd',
                            label: '$',
                        },
                        {
                            value: 'eur',
                            label: '€',
                        },
                    ]}
                />
            </Space>
            <Space>
                <Typography>{LOCALIZATION[lang].balance} {balance}$</Typography>
                <Button onClick={() => setBalance(3000)}>{LOCALIZATION[lang].reset}</Button>
            </Space>
            <Form form={form} layout="vertical" className="controls" onFinish={flipCoin}>
                <Form.Item
                    name="side"
                    label={LOCALIZATION[lang].sideLabel}
                    rules={[{ required: true, message: LOCALIZATION[lang].sideRuleMsg }]}
                >
                    <Radio.Group>
                        <Radio value="heads">{LOCALIZATION[lang].head}</Radio>
                        <Radio value="tails">{LOCALIZATION[lang].tail}</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="number"
                    label={LOCALIZATION[lang].moneyLabel}
                    rules={[
                        { required: true, message: LOCALIZATION[lang].moneyRuleMsg },
                        { type: 'number', min: 1, max: 1000, message: LOCALIZATION[lang].moneyRangeMsg },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" disabled={isFlipping} htmlType="submit">
                        {isFlipping ? LOCALIZATION[lang].buttonProcessing : LOCALIZATION[lang].buttonPlay}
                    </Button>
                </Form.Item>

                {LOCALIZATION[lang].resultMsg && !isFlipping && (
                    <p style={{ marginTop: 16 }}>
                        {LOCALIZATION[lang].resultMsg}
                    </p>
                )}
            </Form>
        </div>
    );
};

const getResultMsg = (lang, res, isWin, amount) => {
    if (lang === 'ru') {
        if (isWin) {
            return `Вы угадали! Результат: ${res === 'heads' ? 'Орёл' : 'Решка'}. Ваш выигрыш: ${amount}$`
        }

        return `Вы не угадали. Результат: ${res === 'heads' ? 'Орёл' : 'Решка'}. Ваш проигрыш: -${amount}$`
    }

    if (lang === 'en') {
        if (isWin) {
            return `You guessed it! Result: ${res === 'heads' ? 'Head' : 'Tail'}. Your winnings: ${amount}$`
        }

        return `You didn't guess it. Result: ${res === 'heads' ? 'Head' : 'Tail'}. Your loss: -${amount}$`
    }
}

const LOCALIZATION = {
    "ru": {
        head: "Орёл",
        tail: "Решка",
        balance: "Баланс:",
        reset: "Восстановить",
        sideLabel: "Выберите сторону монеты",
        sideRuleMsg: "Пожалуйста, выберите сторону!",
        moneyLabel: "Введите ставку от 1 до 1000",
        moneyRuleMsg: "Пожалуйста, введите число!",
        moneyRangeMsg: "Число должно быть от 1 до 1000!",
        buttonProcessing: "Подбрасываем...",
        buttonPlay: "Сыграть",
        resultMsg: "",
    },
    "en": {
        head: "Head",
        tail: "Tail",
        balance: "Balance:",
        reset: "Reset",
        sideLabel: "Choose coin side",
        sideRuleMsg: "Please, choose coin side!",
        moneyLabel: "Enter a bet from 1 to 1000",
        moneyRuleMsg: "Please enter a number!",
        moneyRangeMsg: "The number must be between 1 and 1000!",
        buttonProcessing: "Flipping...",
        buttonPlay: "Play",
        resultMsg: "",
    }
}

export default CoinFlip;