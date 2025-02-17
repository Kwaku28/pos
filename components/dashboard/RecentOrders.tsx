import { fetchRecentOrders } from "@/lib/actions/order.actions";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const RecentOrders = async () => {
  const fetchedOrders = await fetchRecentOrders();
  const orderDetails = fetchedOrders.map(order => {
    const orderNoMatch = order.id.match(/\d{1,8}/); // Match the first 1 to 5 digits
    const orderNo = orderNoMatch ? parseInt(orderNoMatch[0], 10) : 0; // Default to 0 if no match
    return {
      orderNo: orderNo,
      order_type: order.order_type,
      orderItems: order.orderItems,
      customer_name: order.customer_name || '',
      status: order.status || ''
    };
  });

  return (
    <div>
      <h1 className="heading mb-2 pl-5">Recent Orders</h1>
      <div className="flex flex-col items-center">
        <InfiniteMovingCards
          items={orderDetails}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
};

export default RecentOrders;
