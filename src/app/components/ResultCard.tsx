'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, Users, Wallet, RefreshCcw, Settings2, Coins } from 'lucide-react';
import { calculate, CalculatorInput } from '@/lib/calc';

interface Props {
  initialInput: CalculatorInput;
  onReset: () => void;
}

export default function ResultCard({ initialInput, onReset }: Props) {
  const [data, setData] = useState<CalculatorInput>(initialInput);

  // 数値が変わるたびに再計算
  const result = useMemo(() => calculate(data), [data]);

  const formatNumber = (num: number) => num.toLocaleString();

  const updateField = (field: keyof CalculatorInput, value: number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // 警告メッセージの判定
  const warnings = useMemo(() => {
    const list = [];
    if (data.conversionRate < 1) {
      list.push({
        id: 'cvr',
        text: '成約率がかなり低いです。ページの改善や、商品の見直しが必要かもしれません。',
      });
    }
    if (result.costPerLead < 100) {
      list.push({
        id: 'cpa',
        text: '1人あたりの広告費が非常に安いです。この金額で集客するのは難しい可能性があります。',
      });
    }
    return list;
  }, [data.conversionRate, result.costPerLead]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <div className="card" style={{ border: '2px solid #3b82f6' }}>
        <h2 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          診断結果
        </h2>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* 結果①：顧客獲得単価 (限界CPA) */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#64748b' }}>
              <TrendingUp size={18} />
              <span style={{ fontWeight: 600 }}>1人獲得に使える広告費 (限界CPA)</span>
            </div>
            <p className="gradient-text" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
              {formatNumber(result.limitCPA)}<span style={{ fontSize: '1rem', marginLeft: '0.25rem' }}>円</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem' }}>
              リピートを考えた生涯利益から、確保したい利益を引いた「1人を呼ぶために払える上限」です。
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* 結果②：クリック単価 (限界CPC) */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#64748b' }}>
              <RefreshCcw size={18} />
              <span style={{ fontWeight: 600 }}>1クリックあたり上限 (限界CPC)</span>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>
              {formatNumber(result.limitCPC)}<span style={{ fontSize: '1rem', marginLeft: '0.25rem' }}>円</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem' }}>
              広告のクリック単価がこの金額を下回れば、目標の利益を確保できます。
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* 結果③：必要な集客数 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#64748b' }}>
              <Users size={18} />
              <span style={{ fontWeight: 600 }}>達成に必要なアクセス数 (月間)</span>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>
              {formatNumber(result.requiredLeads)}<span style={{ fontSize: '1rem', marginLeft: '0.25rem' }}>回</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem' }}>
              目標売上のために、広告経由でサイトに呼ぶ必要がある人数（回数）です。
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* 結果④：月の適正広告費 */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#64748b' }}>
              <Wallet size={18} />
              <span style={{ fontWeight: 600 }}>月の適正広告費</span>
            </div>
            <p className="gradient-text" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
              {formatNumber(result.adBudget)}<span style={{ fontSize: '1rem', marginLeft: '0.25rem' }}>円</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem' }}>
              手元に利益を残しつつ、成長を加速させるための最適な月間予算です。
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '2px solid #3b82f6', borderStyle: 'dashed' }} />

          {/* 結果⑤：手元に残る利益 (納得感の源泉) */}
          <section style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#0369a1' }}>
              <Coins size={18} />
              <span style={{ fontWeight: 800 }}>手元に残る予想利益 (年間)</span>
            </div>
            <p style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0369a1', lineHeight: 1 }}>
              {formatNumber(result.expectedAnnualNetProfit)}<span style={{ fontSize: '1rem', marginLeft: '0.25rem' }}>円</span>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#0c4a6e', marginTop: '0.6rem', fontWeight: 600 }}>
              広告費をすべて使った後、あなたのポケットに残る純利益の予想です。
            </p>
          </section>

          {/* 計算の仕組み（セルフエクスプラナトリー） */}
          <section style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '1rem' }}>💡 計算の内訳（1人獲得あたり）</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>生涯の粗利 (LTV):</span>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>{formatNumber(result.annualProfitPerCustomer)}円</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>確保する利益 ({data.profitRetention}%):</span>
                <span style={{ fontWeight: 600, color: '#059669' }}>- {formatNumber(Math.floor(result.annualProfitPerCustomer * data.profitRetention / 100))}円</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9', color: '#1e3a8a', fontWeight: 800, fontSize: '0.9rem' }}>
                <span>1人獲得に使える額 (CPA):</span>
                <span>= {formatNumber(result.limitCPA)}円</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                <span>成約率 ({data.conversionRate}%):</span>
                <span style={{ fontWeight: 600 }}>× {data.conversionRate}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#1e293b' }}>
                <span>1クリックあたり上限 (CPC):</span>
                <span>{formatNumber(result.limitCPC)}円</span>
              </div>
            </div>
          </section>
        </div>

        {/* 数値の調整セクション */}
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e3a8a', marginBottom: '1.5rem' }}>
            <Settings2 size={20} />
            <span style={{ fontWeight: 700 }}>数値を調整してみる</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>商品単価</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  min="0"
                  value={data.price} 
                  onChange={(e) => updateField('price', Number(e.target.value))}
                  style={{ marginBottom: 0, paddingRight: '2rem', fontSize: '0.9rem' }}
                />
                <span style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#94a3b8' }}>円</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>利益率</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  value={data.profitMargin} 
                  onChange={(e) => updateField('profitMargin', Number(e.target.value))}
                  style={{ marginBottom: 0, paddingRight: '2rem', fontSize: '0.9rem' }}
                />
                <span style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#94a3b8' }}>%</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>年間リピート</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  min="1"
                  value={data.repeatCount} 
                  onChange={(e) => updateField('repeatCount', Number(e.target.value))}
                  style={{ marginBottom: 0, paddingRight: '2rem', fontSize: '0.9rem' }}
                />
                <span style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#94a3b8' }}>回</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>成約率</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  step="0.1"
                  value={data.conversionRate} 
                  onChange={(e) => updateField('conversionRate', Number(e.target.value))}
                  style={{ marginBottom: 0, paddingRight: '2rem', fontSize: '0.9rem' }}
                />
                <span style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#94a3b8' }}>%</span>
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>手元に残したい利益の割合: {data.profitRetention}%</label>
              <input 
                type="range" 
                min="0"
                max="100"
                step="5"
                value={data.profitRetention} 
                onChange={(e) => updateField('profitRetention', Number(e.target.value))}
                style={{ margin: 0, width: '100%' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>目標売上 (月間)</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="number" 
                  min="0"
                  value={data.targetSales} 
                  onChange={(e) => updateField('targetSales', Number(e.target.value))}
                  style={{ marginBottom: 0, paddingRight: '2rem', fontSize: '0.9rem' }}
                />
                <span style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#94a3b8' }}>円</span>
              </div>
            </div>
          </div>
        </div>

        {/* 警告・アドバイスエリア */}
        {warnings.length > 0 && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff7ed', borderRadius: '16px', border: '1px solid #fed7aa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ea580c', marginBottom: '1rem' }}>
              <AlertCircle size={20} />
              <span style={{ fontWeight: 700 }}>アドバイス</span>
            </div>
            {warnings.map((w) => (
              <p key={w.id} style={{ fontSize: '0.9rem', color: '#9a3412', marginBottom: '0.75rem' }}>
                ・{w.text}
              </p>
            ))}
          </div>
        )}

        <button className="btn btn-secondary" onClick={onReset} style={{ marginTop: '2rem' }}>
          <RefreshCcw size={18} /> 最初からやり直す
        </button>
      </div>
    </motion.div>
  );
}
