namespace NPV.Server.Services
{
    public interface INPVCalculatorService
    {
        public Task<NPVViewModel> GetResults(NPVViewModel model);
    }
}
    