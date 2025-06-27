namespace NPV.Server.Models
{
    public class NPVViewModel
    {
        public NPVViewModel()
        {
            CashFlowArray = new List<double>();
            NPVResults = new List<double>();
        }
        public double Investment { get; set; }

        public double UpperBound { get; set; }

        public double LowerBound { get; set; }

        public int Increment { get; set; }

        public List<double> CashFlowArray { get; set; }

        public List<double> NPVResults { get; set; }
    }
}
