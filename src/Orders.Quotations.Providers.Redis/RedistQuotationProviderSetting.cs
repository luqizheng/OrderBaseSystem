namespace Orders.Quotations
{
    public class RedistQuotationProviderSetting
    {
        public string Server { get; set; }
        public int Port { get; set; } = 6379;
        public string Password { get; set; }
        public string[] Channel { get; set; }
    }
}