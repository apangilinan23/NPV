namespace NPV.Server
{
    public class NPVViewModel
    {
        public NPVViewModel() 
        {
            Values = new List<double>();
        }
        public double CashFlow { get; set; }

        public double UpperBound { get; set; }

        public double LowerBound { get; set; }

        public int Increment { get; set; }

        public List<double> Values { get; set; }
    }
}
