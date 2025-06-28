using Moq;
using NPV.Server.Controllers;
using NPV.Server.Models;
using NPV.Server.Services;

namespace NPVTests
{
    [TestFixture]
    public class NPVControllerTest
    {
        private Mock<INPVCalculatorService> _npvCalcService;
        private NPVController _npvController;


        [SetUp]
        public void Setup()
        {
            _npvCalcService = new Mock<INPVCalculatorService>();
        }

        [Test]
        public async Task Calculate_ValidModel_ShouldCalculate()
        {
            //arrange
            var mockModelInput = new NPVViewModel
            {
                CashFlowArray = new List<double> { 1000, 2000 },
                Increment = 1,
                Investment = 100000,
                LowerBound = 10,
                UpperBound = 20,
            };

            var mockModelResult = new List<NPVResultViewModel>
            {
                new NPVResultViewModel
                {
                    DiscountRate = 1,
                    NPV = 1234f
                }
            };

            _npvCalcService.Setup(x => x.Calculate(mockModelInput)).ReturnsAsync(mockModelResult);
            _npvController = new NPVController(_npvCalcService.Object);

            //act
            var result = await _npvController.Calculate(mockModelInput);

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual(mockModelResult.First().DiscountRate, result.First().DiscountRate);
            Assert.AreEqual(mockModelResult.First().NPV, result.First().NPV);
        }

        [Test]
        public async Task Calculate_InvalidModel_ShouldThrow()
        {
            //arrange
            NPVViewModel mockModelInput = null;

            //act
            _npvController = new NPVController(_npvCalcService.Object);

            //assert
            Assert.ThrowsAsync<NullReferenceException>(() => _npvController.Calculate(mockModelInput));            
        }
    }
}