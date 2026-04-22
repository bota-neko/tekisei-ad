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
  costPerLead: number;          // 1人あたり広告費 (許容CPA)
  requiredLeads: number;        // 必要な集客数
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

  // 3. 1人あたりに使える広告枠 (LTV利益から手元に残す分を引く)
  const adAllowancePerCustomer = annualProfitPerCustomer * (1 - retentionRatio);

  // 4. 1人あたり集客コスト (許容CPA)
  // 小数点は切り捨て
  const costPerLead = Math.floor(adAllowancePerCustomer * cvrRatio);

  // 5. 必要な集客数
  // 目標売上を達成するために必要な「新規顧客数」を割り出し、そこから必要な集客数を逆算
  const requiredNewCustomers = targetSales / price;
  const requiredLeads = Math.floor(requiredNewCustomers / cvrRatio) || 0;

  // 6. 全体の広告費
  const adBudget = Math.floor(requiredLeads * costPerLead);

  // 7. 手元に残る予想年間利益 (LTV利益 * 新規顧客数 - 広告総額)
  // 実際にはリピート時のコスト変動などあるが、簡易化のためLTV利益ベースで計算
  const expectedAnnualNetProfit = Math.floor((annualProfitPerCustomer * requiredNewCustomers) - adBudget);

  return {
    profitPerSale,
    annualProfitPerCustomer,
    costPerLead,
    requiredLeads,
    adBudget,
    expectedAnnualNetProfit,
  };
}
