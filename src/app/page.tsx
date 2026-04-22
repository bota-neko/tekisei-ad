'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Explanation from './components/Explanation';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import { CalculatorInput } from '@/lib/calc';

export default function Home() {
  const [initialInput, setInitialInput] = useState<CalculatorInput | null>(null);

  const handleCalculate = (data: CalculatorInput) => {
    setInitialInput(data);
    // 計算完了時にトップへスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setInitialInput(null);
  };

  return (
    <main>
      {/* ヘッダーエリア */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          適正広告費計算ツール
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          あなたのビジネスに最適な広告予算を診断します
        </p>
      </motion.div>

      {/* 計算前：説明＋フォーム / 計算後：結果カード */}
      {!initialInput ? (
        <>
          <Explanation />
          <InputForm onCalculate={handleCalculate} />
        </>
      ) : (
        <ResultCard 
          initialInput={initialInput} 
          onReset={handleReset} 
        />
      )}

      {/* フッターエリア */}
      <footer style={{ marginTop: 'auto', padding: '2rem 0', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} tekisei-ad | 広告費の判断を簡単に。
      </footer>
    </main>
  );
}
