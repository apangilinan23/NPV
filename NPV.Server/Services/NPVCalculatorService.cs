using NPV.Server.Models;

namespace NPV.Server.Services
{
    public class NPVCalculatorService : INPVCalculatorService
    {
        public List<NPVResultViewModel> Calculate(NPVViewModel model)
        {
            var result = new List<NPVResultViewModel>();
            var cashFlowValues = model.CashFlowArray.ToArray();
            for (var start = model.LowerBound; start <= model.UpperBound; start += model.Increment)
            {
                float discountRate = (float)(start / 100);
                result.Add(new NPVResultViewModel
                {
                    DiscountRate = discountRate,
                    NPV = GetNpv(discountRate, cashFlowValues, model.Investment)
                });
            }
            return result;
        }

        private double GetNpv(double rate, double[] cashFlows, double investment)
        {
            double inflow = 0;
            for (var index = 0; index < cashFlows.Length; index++)
                inflow += cashFlows[index] / Math.Pow((1 + rate), index + 1) ;

            return -investment + inflow;
        }

    }
}
