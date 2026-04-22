'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Calculator, HelpCircle } from 'lucide-react';
import { CalculatorInput } from '@/lib/calc';

interface Props {
  onCalculate: (data: CalculatorInput) => void;
}

export default function InputForm({ onCalculate }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CalculatorInput>({
    price: 0,
    profitMargin: 0,
    conversionRate: 0,
    targetSales: 0,
    repeatCount: 1,
    profitRetention: 50,
  });

  const [businessType, setBusinessType] = useState('');

  const benchmarks: Record<string, string> = {
    ec: '1〜2% (標準的)',
    consulting: '3〜5% (比較的高め)',
    local: '10〜15% (地域密着)',
    lead: '15〜20% (無料特典など)',
  };

  const updateField = (field: keyof CalculatorInput, value: string | number) => {
    const numValue = typeof value === 'string' ? Number(value.replace(/,/g, '')) : value;
    setFormData({ ...formData, [field]: numValue });
  };

  const nextStep = () => {
    if (step === 1 && (formData.price <= 0 || formData.profitMargin <= 0)) return;
    if (step === 2 && formData.conversionRate <= 0) return;
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    if (formData.targetSales <= 0) return;
    onCalculate(formData);
  };

  return (
    <div className="card">
      <div className="step-indicator">
        <div className={`step-dot ${step >= 1 ? 'active' : ''}`} />
        <div className={`step-dot ${step >= 2 ? 'active' : ''}`} />
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`} />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>STEP1：商売の情報</h2>
            
            <label>商品単価 (円)</label>
            <input
              type="number"
              placeholder="例: 10000"
              onChange={(e) => updateField('price', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && nextStep()}
            />

            <label>利益率 (%)</label>
            <input
              type="number"
              placeholder="例: 50"
              onChange={(e) => updateField('profitMargin', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && nextStep()}
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              年間リピート回数 
              <HelpCircle size={14} style={{ color: '#94a3b8' }} />
            </label>
            <input
              type="number"
              min="1"
              value={formData.repeatCount}
              onChange={(e) => updateField('repeatCount', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && nextStep()}
            />

            <button className="btn btn-primary" onClick={nextStep}>
              次へ進む <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>STEP2：集客の状況</h2>
            
            <label>業種を選択（成約率の目安を表示します）</label>
            <select 
              className="business-select"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                marginBottom: '1.5rem',
                fontSize: '1rem',
                appearance: 'none',
                background: 'white'
              }}
            >
              <option value="">選択してください</option>
              <option value="ec">ネットショップ (EC)</option>
              <option value="consulting">コンサル・士業</option>
              <option value="local">店舗・地域サービス</option>
              <option value="lead">無料サンプル・資料請求</option>
            </select>

            {businessType && (
              <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px dashed #cbd5e1' }}>
                <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                  💡 この業種の成約率目安: <strong style={{ color: '#1e3a8a' }}>{benchmarks[businessType]}</strong>
                </p>
              </div>
            )}

            <label>成約率（広告を見た100人中、最終的に何人買うか）</label>
            <input
              type="number"
              placeholder="例: 1"
              step="0.1"
              onChange={(e) => updateField('conversionRate', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && nextStep()}
            />

            {/* 成約率の考え方ヒント */}
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
              color: '#0369a1',
              lineHeight: 1.7,
            }}>
              <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>💡 どうやって出すの？</p>
              <p style={{ marginBottom: '0.75rem' }}>
                <strong>ネットショップなど直接購入の場合</strong><br />
                広告経由でサイトを訪れた人 100 人のうち、そのまま購入した人数がそのまま成約率です。
              </p>
              <p>
                <strong>資料請求・説明会などを経て成約する場合</strong><br />
                広告クリック→資料請求→説明会→成約、という一連の流れを全部かけ合わせた数字を使います。
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={prevStep} style={{ flex: 1, whiteSpace: 'nowrap' }}>
                <ChevronLeft size={18} /> 戻る
              </button>
              <button className="btn btn-primary" onClick={nextStep} style={{ flex: 2, whiteSpace: 'nowrap' }}>
                次へ進む <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}


        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>STEP3：目標</h2>
            
            <label>月の目標売上 (円)</label>
            <input
              type="number"
              placeholder="例: 1000000"
              onChange={(e) => updateField('targetSales', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              手元に残したい利益の割合（確保率）
              <HelpCircle size={14} style={{ color: '#94a3b8' }} />
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={formData.profitRetention}
                onChange={(e) => updateField('profitRetention', e.target.value)}
                style={{ flex: 1, margin: 0 }}
              />
              <span style={{ fontWeight: 800, color: '#1e3a8a', width: '3rem' }}>{formData.profitRetention}%</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              💡 <strong>「利益のうち何％を自分の給料や内部留保として残したいか」</strong>を選んでください。残りの分を広告費に充てて成長を加速させます。
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={prevStep} style={{ flex: 1, whiteSpace: 'nowrap' }}>
                <ChevronLeft size={18} /> 戻る
              </button>
              <button className="btn btn-primary" onClick={handleSubmit} style={{ flex: 2, whiteSpace: 'nowrap' }}>
                <Calculator size={18} /> 計算する
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
