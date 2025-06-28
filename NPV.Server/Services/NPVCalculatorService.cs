using NPV.Server.Controllers;
using NPV.Server.Models;

namespace NPV.Server.Services
{
    public class NPVCalculatorService : INPVCalculatorService
    {
        private readonly ILogger<NPVController> _logger;

        public NPVCalculatorService(ILogger<NPVController> logger)
        {
            _logger = logger;
        }

        public async Task<List<NPVResultViewModel>> Calculate(NPVViewModel model)
        {
            _logger.LogInformation("Calculating NPV");
            var result = new List<NPVResultViewModel>();
            try
            {   
                await Task.Run(() =>
                {

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
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return result;
        }

        private static double GetNpv(double rate, double[] cashFlows, double investment)
        {
            double inflow = 0;
            for (var index = 0; index < cashFlows.Length; index++)
                inflow += cashFlows[index] / Math.Pow((1 + rate), index + 1);

            return -investment + inflow;
        }

    }
}
