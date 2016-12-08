namespace Orders.Policy
{
    public interface IOrderPolicy
    {
        int Priority { get; set; }
        string Message { get; }
        bool IsPass(OpenOrderInfo openOrder, Games.Game game, string user, OrderContext context);
    }
}