'use client';

import { Info, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Explanation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: '2rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '10px' }}>
            <Info size={20} style={{ color: '#3b82f6' }} />
          </div>
          <h2 style={{ fontSize: '1.1rem', color: '#1e293b', margin: 0 }}>適正広告費を計算する</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, flex: 1, minWidth: '240px', lineHeight: 1.5 }}>
            3ステップの質問に答えるだけで、あなたのビジネスの限界CPA（1人あたりに使える広告費）を算出します。
          </p>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              background: '#f1f5f9', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {isOpen ? <><ChevronUp size={14} /> 閉じる</> : <><ChevronDown size={14} /> 仕組みを見る</>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: '1.5rem', marginTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ background: '#3b82f6', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700 }}>1</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>粗利をベースに考える</p>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>売上から原価を引いた「粗利」が、あなたが自由に使えるお金の源泉です。</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ background: '#3b82f6', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700 }}>2</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>確保したい利益を引く</p>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>粗利のすべてを広告に使うと利益はゼロ。確保したい分を差し引いた残りが広告予算です。</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ background: '#3b82f6', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700 }}>3</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>成約率で割り出す</p>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>1人呼ぶのにいくら払えるか（限界CPA）を割り出し、目標達成に必要な予算を計算します。</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
