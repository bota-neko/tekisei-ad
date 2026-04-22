'use client';

import { Info, Lightbulb, ArrowRight, Target, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Explanation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
      {/* 全体像・コンセプト */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Target className="gradient-text" style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
          <h2 className="gradient-text" style={{ fontSize: '1.25rem' }}>このツールの目的</h2>
        </div>
        
        <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
          広告費は「いくら使うか」ではなく、<br />
          <strong>「いくらまでなら使っても利益が残るか」</strong>を知ることが重要です。<br />
          勘に頼らず、商売の「限界値」を可視化して、攻めの経営をサポートします。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: '#10b981' }} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>利益の確保</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              売上から経費を引いた「粗利」のうち、絶対に手元に残したい金額を決めます。
            </p>
          </div>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Zap size={18} style={{ color: '#3b82f6' }} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>広告への投資</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              残った金額が、1人のお客さんを連れてくるために使える「投資枠」になります。
            </p>
          </div>
        </div>
      </motion.div>

      {/* 具体例シミュレーション */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ border: '1px solid #e2e8f0', background: '#f8fafc' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Lightbulb style={{ width: '22px', height: '22px', color: '#eab308' }} />
          <h3 style={{ fontSize: '1.1rem', color: '#1e293b' }}>具体例：1万円の商品を売る場合</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#475569' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{ background: '#3b82f6', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', marginTop: '2px' }}>1</div>
            <div>
              <p style={{ fontWeight: 600, color: '#1e293b' }}>まず「粗利」を出す</p>
              <p>利益率50%なら、1個売れると<strong>5,000円</strong>の利益。</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{ background: '#3b82f6', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', marginTop: '2px' }}>2</div>
            <div>
              <p style={{ fontWeight: 600, color: '#1e293b' }}>「手元の利益」を決める</p>
              <p>利益の半分（50%）を自分の給料として残すなら、残りの<strong>2,500円</strong>が広告費の限界です。</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{ background: '#3b82f6', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', marginTop: '2px' }}>3</div>
            <div>
              <p style={{ fontWeight: 600, color: '#1e293b' }}>「集客コスト」に落とし込む</p>
              <p>100人見て1人買う（成約率1%）なら、1人呼ぶのに使えるのは<strong>25円</strong>（2,500円 ÷ 100人）です。</p>
            </div>
          </div>

          <div style={{ 
            marginTop: '0.5rem',
            padding: '0.75rem', 
            background: '#eff6ff', 
            borderRadius: '12px', 
            border: '1px solid #bfdbfe',
            color: '#1e40af',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <ArrowRight size={18} />
            <span>この「25円」が広告運用の基準になります！</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
