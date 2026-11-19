export interface IndustryBenchmarkPreset {
  id: string;
  label: string;
  avgCpc: number;
  baselineCvr: number;
  optimizedCvr: number;
  avgDealValue: number;
  closeRate: number;
  benchmarkNote: string;
}

export const industryBenchmarkPresets: IndustryBenchmarkPreset[] = [
  {
    id: "local-service",
    label: "Local Service / HVAC",
    avgCpc: 6.5,
    baselineCvr: 4.5,
    optimizedCvr: 8.5,
    avgDealValue: 850,
    closeRate: 40,
    benchmarkNote: "High-intent emergency & 'near me' searches with call-first landing pages.",
  },
  {
    id: "b2b-services",
    label: "B2B Services",
    avgCpc: 11.5,
    baselineCvr: 2.5,
    optimizedCvr: 5.8,
    avgDealValue: 4500,
    closeRate: 25,
    benchmarkNote: "2026 B2B median CVR is ~4.9%; CRO + pre-qualification halves CPA.",
  },
  {
    id: "b2b-saas",
    label: "B2B SaaS",
    avgCpc: 13.0,
    baselineCvr: 2.4,
    optimizedCvr: 5.0,
    avgDealValue: 6000,
    closeRate: 20,
    benchmarkNote: "Benchmark B2B SaaS CPCs range $5.42–$15.00; VBB targets SQLs over free signups.",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    avgCpc: 2.2,
    baselineCvr: 2.0,
    optimizedCvr: 3.8,
    avgDealValue: 185,
    closeRate: 100,
    benchmarkNote: "Direct checkout ROAS with margin-segmented PMax & Shopping feeds.",
  },
];

export interface EconomicsInputs {
  monthlyBudget: number;
  avgCpc: number;
  landingPageCvr: number;
  avgDealValue: number;
  closeRate: number;
}

export interface EconomicsProjection {
  flatManagementFee: number;
  percentSpendAgencyFee: number;
  annualFeeSavingsVsPercentModel: number;
  totalInvestment: number;
  estimatedClicks: number;
  qualifiedLeads: number;
  costPerQualifiedLead: number;
  closedCustomers: number;
  customerAcquisitionCost: number;
  projectedRevenue: number;
  netProfitAfterMarketing: number;
  pipelineToSpendRatio: number;
  roasMultiple: number;
  breakEvenCustomers: number;
}

export function getFlatManagementFee(monthlyBudget: number): number {
  if (monthlyBudget <= 1500) return 750;
  if (monthlyBudget <= 3500) return 950;
  if (monthlyBudget <= 7500) return 1250;
  return 1650;
}

export function calculatePipelineEconomics(
  inputs: EconomicsInputs
): EconomicsProjection {
  const safeBudget = Math.max(250, inputs.monthlyBudget);
  const safeCpc = Math.max(0.5, inputs.avgCpc);
  const safeCvr = Math.max(0.5, Math.min(35, inputs.landingPageCvr));
  const safeDealValue = Math.max(50, inputs.avgDealValue);
  const safeCloseRate = Math.max(5, Math.min(100, inputs.closeRate));

  const flatManagementFee = getFlatManagementFee(safeBudget);
  const percentSpendAgencyFee = Math.round(safeBudget * 0.15);
  const annualFeeSavingsVsPercentModel =
    (percentSpendAgencyFee - flatManagementFee) * 12;

  const totalInvestment = safeBudget + flatManagementFee;
  const estimatedClicks = Math.max(1, Math.round(safeBudget / safeCpc));
  const qualifiedLeads = Math.max(
    1,
    Math.round(estimatedClicks * (safeCvr / 100))
  );
  const costPerQualifiedLead = Math.round(safeBudget / qualifiedLeads);

  const closedCustomers = Math.max(
    1,
    Math.round(qualifiedLeads * (safeCloseRate / 100))
  );
  const customerAcquisitionCost = Math.round(totalInvestment / closedCustomers);
  const projectedRevenue = closedCustomers * safeDealValue;
  const netProfitAfterMarketing = projectedRevenue - totalInvestment;

  const pipelineToSpendRatio = Number(
    (projectedRevenue / safeBudget).toFixed(1)
  );
  const roasMultiple = Number((projectedRevenue / totalInvestment).toFixed(1));
  const breakEvenCustomers = Math.ceil(totalInvestment / safeDealValue);

  return {
    flatManagementFee,
    percentSpendAgencyFee,
    annualFeeSavingsVsPercentModel,
    totalInvestment,
    estimatedClicks,
    qualifiedLeads,
    costPerQualifiedLead,
    closedCustomers,
    customerAcquisitionCost,
    projectedRevenue,
    netProfitAfterMarketing,
    pipelineToSpendRatio,
    roasMultiple,
    breakEvenCustomers,
  };
}
