/**
 * 広告費計算ロジック (納得感アップグレード版)
 */

export interface CalculatorInput {
  price: number;            // 商品単価
  profitMargin: number;     // 利益率 (%)
  conversionRate: number;    // 成約率 (%)
  targetSales: number;      // 月の目標売上
  repeatCount: number;      // 年間リピート回数 (LTV考慮)
  profitRetention: number;  // 利益の確保率（手元に残す割合） (%)
}

export interface CalculatorResult {
  profitPerSale: number;        // 1件あたりの利益 (1回)
  annualProfitPerCustomer: number; // 1人あたりの年間利益 (LTV)
  limitCPA: number;             // 1人獲得に使える広告費 (限界CPA)
  limitCPC: number;             // 1クリックに使える広告費 (限界CPC)
  requiredLeads: number;        // 必要な集客数 (アクセス数)
  adBudget: number;             // 月の適正広告費
  expectedAnnualNetProfit: number; // 手元に残る予想年間利益
}

/**
 * 入力された数値をもとに適正広告費などを計算する
 */
export function calculate(input: CalculatorInput): CalculatorResult {
  const { 
    price, 
    profitMargin, 
    conversionRate, 
    targetSales, 
    repeatCount = 1, 
    profitRetention = 50 
  } = input;

  const marginRatio = profitMargin / 100;
  const cvrRatio = conversionRate / 100;
  const retentionRatio = profitRetention / 100;

  // 1. 1件あたりの利益 (1回分)
  const profitPerSale = Math.floor(price * marginRatio);

  // 2. 1人あたりの年間利益 (LTV利益)
  const annualProfitPerCustomer = Math.floor(profitPerSale * repeatCount);

  // 3. 1人獲得に使える広告費 (限界CPA)
  // LTV利益から手元に残す分を引いた残りすべて
  const limitCPA = Math.floor(annualProfitPerCustomer * (1 - retentionRatio));

  // 4. 1クリックに使える広告費 (限界CPC)
  // 限界CPA × 成約率
  const limitCPC = Math.floor(limitCPA * cvrRatio);

  // 5. 必要な集客数 (アクセス数)
  const requiredNewCustomers = targetSales / price;
  const requiredLeads = Math.floor(requiredNewCustomers / cvrRatio) || 0;

  // 6. 全体の広告費 (必要な新規顧客数 × 限界CPA)
  const adBudget = Math.floor(requiredNewCustomers * limitCPA);

  // 7. 手元に残る予想年間利益
  const expectedAnnualNetProfit = Math.floor((annualProfitPerCustomer * requiredNewCustomers) - adBudget);

  return {
    profitPerSale,
    annualProfitPerCustomer,
    limitCPA,
    limitCPC,
    requiredLeads,
    adBudget,
    expectedAnnualNetProfit,
  };
}
