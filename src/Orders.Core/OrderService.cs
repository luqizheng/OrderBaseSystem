using System;
using Microsoft.Extensions.Logging;
using Orders.Games;
using Orders.Notify;
using Orders.Policy;
using Orders.Policy.PricePolicies;
using Orders.Quotations;
using Orders.Stores;

namespace Orders
{
    public class OrderService
    {
        private readonly ILogger<OrderService> _logger;
        private readonly IOrderNotify _notify;
        private readonly OrderContext _orderContext;
        private readonly IOrderIdGenerator _orderIdGenerator;
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
        /// <param name="generator"></param>
        /// <param name="notify"></param>
        /// <param name="logger"></param>
        public OrderService(OrderContext orderContext, QuotationContext qutationContext, IOrderStore orderStore,
            IOrderPolicyStore orderPolicyStore, IPricePolicyStore pricePolicyStore,
            IOrderIdGenerator generator, IOrderNotify notify, ILogger<OrderService> logger)
        {
            if (orderContext == null) throw new ArgumentNullException(nameof(orderContext));
            if (qutationContext == null) throw new ArgumentNullException(nameof(qutationContext));
            if (orderStore == null) throw new ArgumentNullException(nameof(orderStore));
            if (generator == null) throw new ArgumentNullException(nameof(generator));
            if (notify == null) throw new ArgumentNullException(nameof(notify));
            if (logger == null) throw new ArgumentNullException(nameof(logger));
            
            _orderContext = orderContext;
            _qutationContext = qutationContext;
            _orderStore = orderStore;
            _orderPolicyStore = orderPolicyStore;
            _pricePolicyStore = pricePolicyStore;


            _orderIdGenerator = generator;
            _notify = notify;
            _logger = logger;
            DefaultOpenOpenPricePolicy = new RealTimeOpenPricePolicy();
        }

        /// <summary>
        /// </summary>
        public IOpenPricePolicy DefaultOpenOpenPricePolicy { get; }


        /// <summary>
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="game"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Order CreateOrder(OpenOrderInfo dto, Game game, string user)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            if (game == null) throw new ArgumentNullException(nameof(game));
            if (user == null) throw new ArgumentNullException(nameof(user));
            _logger.LogDebug("创建订单");
            try
            {
                ValidateOpenOrderRule(dto, game, user);
                _notify.OnCreating(dto);

                var openPrice = GetOpenPrice(dto, game, user);
                var order = CreateOrder(dto, user);
                order.Open(openPrice, game);

                _orderContext.UncloseOrders.Add(order);
                _orderStore.Add(order);

                _notify.OnCreated(order);
                return order;
            }
            catch (Exception ex)
            {
                throw new OrderCreatingException("建仓失败", ex);
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="user"></param>
        /// <param name="game"></param>
        /// <returns></returns>
        private Order CreateOrder(OpenOrderInfo dto, string user)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            if (user == null) throw new ArgumentNullException(nameof(user));

            var order = new Order(dto.Volume, dto.Direction, user)
            {
                Id = _orderIdGenerator.Next()
            };
            order.OpenInfo.ClientPostTime = dto.ClientPostTime;


            return order;
        }

        /// <summary>
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="game"></param>
        /// <param name="user"></param>
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
        /// <param name="game"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        private Quotation GetOpenPrice(OpenOrderInfo openOrderInfo, Game game, string user)
        {
            if (game == null) throw new ArgumentNullException(nameof(game));

            var openPricePolicies = _pricePolicyStore.GetOpenPricePolicies(user);
            Quotation openPrice;
            foreach (var policy in openPricePolicies)
                if (policy.TryGetPrice(_qutationContext, openOrderInfo, game, out openPrice))
                    return openPrice;

            if (DefaultOpenOpenPricePolicy.TryGetPrice(_qutationContext, openOrderInfo, game, out openPrice))
                return openPrice;

            throw new OrderException("暂时无报价，请联系管理员.");
        }
    }
}