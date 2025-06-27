export interface NpvViewModel {  
  investment: number;
  lowerBound: number;
  upperBound: number;
  increment: number;
  cashFlows: number[];  
  npvResults: number [];
  cashFlowNumber: number;
}