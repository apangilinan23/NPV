namespace NPV.Server.Services
{
    public class NPVCalculatorService : INPVCalculatorService
    {
        public async Task<NPVViewModel> GetResults(NPVViewModel model)
        {  
            await Task.Run(() =>
            {
                for (var start = model.LowerBound; start <= model.UpperBound; start += model.Increment)
                {
                    var value = model.CashFlow + (model.CashFlow * (start / 100));
                    model.Values.Add(value);
                }
            });

            return model;
        }

    }
}
