namespace Orders
{
    public enum OrderStatus
    {
        /// <summary>
        ///     创建成功，但是没有获取建仓价格
        /// </summary>
        Created,

        /// <summary>
        ///     建仓成功
        /// </summary>
        Opening,

        /// <summary>
        ///     完成
        /// </summary>
        Completed,

        /// <summary>
        ///     失败
        /// </summary>
        Fail,

        /// <summary>
        ///     取消。
        /// </summary>
        Cancel
    }
}