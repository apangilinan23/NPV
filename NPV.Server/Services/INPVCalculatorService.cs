using NPV.Server.Models;

namespace NPV.Server.Services
{
    public interface INPVCalculatorService
    {
        public Task<List<NPVResultViewModel>> Calculate(NPVViewModel model);        
    }
}
    