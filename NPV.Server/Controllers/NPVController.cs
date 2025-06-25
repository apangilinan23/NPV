using Microsoft.AspNetCore.Mvc;
using NPV.Server.Services;
using System.Threading.Tasks;

namespace NPV.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NPVController : ControllerBase
    {
        private readonly ILogger<NPVController> _logger;
        private INPVCalculatorService _calculatorService;

        public NPVController(ILogger<NPVController> logger,
            INPVCalculatorService calculatorService)
        {
            _logger = logger;
            _calculatorService = calculatorService;
        }

        [HttpPost]
        public async Task<NPVViewModel> Calculate(NPVViewModel model)
        {
            return await _calculatorService.GetResults(model);
        }
    }
}
