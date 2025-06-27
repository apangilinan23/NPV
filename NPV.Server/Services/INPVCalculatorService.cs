using NPV.Server.Models;

namespace NPV.Server.Services
{
    public interface INPVCalculatorService
    {
        public List<NPVResultViewModel> Calculate(NPVViewModel model);
    }
}
    