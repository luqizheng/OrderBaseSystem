namespace Orders.Policy
{
    public interface IOrderPolicy
    {
        int Priority { get; set; }
        string Message { get; }
        bool IsPass(OrderCreateDto order, OrderContext context);
    }
}