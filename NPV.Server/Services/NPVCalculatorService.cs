using Microsoft.VisualBasic;
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
                var npv = Financial.NPV(discountRate, ref cashFlowValues);

                result.Add(new NPVResultViewModel
                {
                    DiscountRate = discountRate,
                    NPV = -model.Investment + npv
                });
            }
            return result;
        }

    }
}
