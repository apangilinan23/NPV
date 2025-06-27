using Microsoft.VisualBasic;

namespace NPV.Server.Services
{
    public class NPVCalculatorService : INPVCalculatorService
    {
        public NPVViewModel GetResults(NPVViewModel model)
        {   
            var cashFlowValues = model.CashFlowArray.ToArray();
            for (var start = model.LowerBound; start <= model.UpperBound; start += model.Increment)
            {
                float discountRate = (float)(start / 100);
                model.NPVResults.Add(-model.Investment + Financial.NPV(discountRate, ref cashFlowValues)); 
            }
            return model;
        }

    }
}
