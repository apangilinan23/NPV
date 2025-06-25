using Microsoft.AspNetCore.Mvc;

namespace NPV.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NPVController : ControllerBase
    {
        private readonly ILogger<NPVController> _logger;

        public NPVController(ILogger<NPVController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public NPVViewModel Get()
        {
            return new NPVViewModel();
        }
    }
}
