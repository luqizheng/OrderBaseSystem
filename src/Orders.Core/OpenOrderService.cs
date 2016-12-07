using System;
using System.Collections.Generic;
using Orders.Policy;
using Orders.Policy.PricePolicies;
using Orders.Quotations;
using Orders.Stores;

namespace Orders
{
    public class OpenOrderService
    {
        private readonly OrderContext _orderContext;
        private readonly IOrderStore _orderStore;

        /// <summary>
        /// </summary>
        /// <param name="orderContext"></param>
        /// <param name="qutationContext"></param>
        /// <param name="orderStore"></param>
        public OpenOrderService(OrderContext orderContext, QuotationContext qutationContext, IOrderStore orderStore)
        {
            if (orderContext == null) throw new ArgumentNullException(nameof(orderContext));
            _orderContext = orderContext;
            _orderStore = orderStore;
            OpenOrderPolicies = new List<IOrderPolicy>();
            OpenPricePolicies = new List<IOpenPricePolicy>();


            DefaultOpenOpenPricePolicy = new RealTimeOpenOpenPricePolicy(qutationContext);
        }

        /// <summary>
        /// </summary>
        public IOpenPricePolicy DefaultOpenOpenPricePolicy { get; }

        /// <summary>
        /// </summary>
        public IList<IOrderPolicy> OpenOrderPolicies { get; }

        /// <summary>
        /// </summary>
        public IList<IOpenPricePolicy> OpenPricePolicies { get; }


        /// <summary>
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public Order CreateOrder(OrderCreateDto dto, string user)
        {
            foreach (var policy in OpenOrderPolicies)
                if (!policy.IsPass(dto, _orderContext))
                    throw new OrderCreatingException(policy.Message);

            var order = new Order(dto.Amount, dto.Direction) {User = user};
            order.Confirm(GetOpenPrice(dto));

            _orderContext.UncloseOrders.Add(order);
            return order;
        }

        /// <summary>
        /// </summary>
        /// <param name="orderCreateDto"></param>
        /// <returns></returns>
        private Quotation GetOpenPrice(OrderCreateDto orderCreateDto)
        {
            Quotation openPrice;
            foreach (var policy in OpenPricePolicies)
                if (policy.TryGetPrice(orderCreateDto, out openPrice))
                    return openPrice;
            if (DefaultOpenOpenPricePolicy.TryGetPrice(orderCreateDto, out openPrice))
                return openPrice;
            throw new OrderCreatingException(DefaultOpenOpenPricePolicy.Message);
        }
    }
}