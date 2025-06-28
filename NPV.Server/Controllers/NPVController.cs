using Microsoft.AspNetCore.Mvc;
using NPV.Server.Models;
using NPV.Server.Services;

namespace NPV.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NPVController : ControllerBase
    {        
        private INPVCalculatorService _calculatorService;

        public NPVController(INPVCalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpPost]
        public async Task<List<NPVResultViewModel>> Calculate(NPVViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Null param model.");
            return await _calculatorService.Calculate(model);
        }
    }
}
