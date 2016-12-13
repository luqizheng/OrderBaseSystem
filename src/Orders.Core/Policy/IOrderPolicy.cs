namespace Orders.Policy
{
    /// <summary>
    /// 
    /// </summary>
    public interface IOrderPolicy
    {
        /// <summary>
        /// 
        /// </summary>
        int Priority { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string Message { get; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="openOrder"></param>
        /// <param name="game"></param>
        /// <param name="user"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        bool IsPass(OpenOrderInfo openOrder, Games.Game game, string user, OrderContext context);
    }
}