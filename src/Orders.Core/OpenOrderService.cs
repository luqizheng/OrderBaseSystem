using System;
using Orders.Games;
using Orders.Policy;
using Orders.Policy.PricePolicies;
using Orders.Quotations;
using Orders.Stores;

namespace Orders
{
    public class OpenOrderService
    {
        private readonly IGameStore _gameStore;
        private readonly OrderContext _orderContext;
        private readonly IOrderPolicyStore _orderPolicyStore;
        private readonly IOrderStore _orderStore;
        private readonly IPricePolicyStore _pricePolicyStore;
        private readonly QuotationContext _qutationContext;


        /// <summary>
        /// </summary>
        /// <param name="orderContext"></param>
        /// <param name="qutationContext"></param>
        /// <param name="orderStore"></param>
        /// <param name="orderPolicyStore"></param>
        /// <param name="pricePolicyStore"></param>
        /// <param name="gameStore"></param>
        public OpenOrderService(OrderContext orderContext, QuotationContext qutationContext, IOrderStore orderStore,
            IOrderPolicyStore orderPolicyStore, IPricePolicyStore pricePolicyStore, IGameStore gameStore)
        {
            if (orderContext == null) throw new ArgumentNullException(nameof(orderContext));
            _orderContext = orderContext;
            _qutationContext = qutationContext;
            _orderStore = orderStore;
            _orderPolicyStore = orderPolicyStore;
            _pricePolicyStore = pricePolicyStore;
            _gameStore = gameStore;


            DefaultOpenOpenPricePolicy = new RealTimeOpenOpenPricePolicy();
        }

        /// <summary>
        /// </summary>
        public IOpenPricePolicy DefaultOpenOpenPricePolicy { get; }


        /// <summary>
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public OrderCreatedResult CreateOrder(OpenOrderInfo dto, string user)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            if (user == null) throw new ArgumentNullException(nameof(user));


            var game = _gameStore.Get(dto.GameTypeId);
            ValidateOpenOrderRule(dto, game, user);


            var order = CreateOrder(dto, user, game);
            order.Open(GetOpenPrice(dto, game, user));

            _orderContext.UncloseOrders.Add(order);
            _orderStore.Insert(order);

            return new OrderCreatedResult
            {
                Id = order.Id,
                OpenPrice = order.OpenInfo.OpenPrice.Bid,
                ExpireDateTime = order.CloseInfo.ExpireDateTime
            };
        }

        private Order CreateOrder(OpenOrderInfo dto, string user, Game game)
        {
            var order = new Order(dto.Volume, dto.Direction)
            {
                User = user,
                Game = game
            };

            order.OpenInfo.ClientPostTime = dto.ClientPostTime;


            return order;
        }

        private void ValidateOpenOrderRule(OpenOrderInfo dto, Game game, string user)
        {
            var openOrderPolicies = _orderPolicyStore.GetOpenOrderPolicies(user);

            foreach (var policy in openOrderPolicies)
                if (!policy.IsPass(dto, game, user, _orderContext))
                    throw new OrderCreatingException(policy.Message);
        }

        /// <summary>
        /// </summary>
        /// <param name="openOrderInfo"></param>
        /// <returns></returns>
        private Quotation GetOpenPrice(OpenOrderInfo openOrderInfo, Game game, string user)
        {
            var openPricePolicies = _pricePolicyStore.GetOpenPricePolicies(user);
            Quotation openPrice;
            foreach (var policy in openPricePolicies)
                if (policy.TryGetPrice(_qutationContext, openOrderInfo, game, out openPrice))
                    return openPrice;
            if (DefaultOpenOpenPricePolicy.TryGetPrice(_qutationContext, openOrderInfo, game, out openPrice))
                return openPrice;
            throw new OrderCreatingException(DefaultOpenOpenPricePolicy.Message);
        }
    }
}