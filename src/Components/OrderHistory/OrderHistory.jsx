import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import useRetryRequest from "../../api/useRetryRequest"; // Import the retry hook
import { Table, ConfigProvider, message } from "antd";
import "./OrderHistory.css";

// Define the columns for the Ant Design Table
const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
  },
  {
    title: "Order No.",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Sub Total",
    dataIndex: "subTotal",
    key: "subTotal",
    align: "center",
  },
  {
    title: "Tax",
    dataIndex: "tax",
    key: "tax",
    align: "center",
  },
  {
    title: "Grand Total",
    dataIndex: "total",
    key: "total",
    align: "center",
  },
];

const OrderHistory = ({ setIsLoading }) => {
  const [orders, setOrders] = useState([]);
  const retryRequest = useRetryRequest(); // Use the retry hook

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await retryRequest(() =>
          axiosInstance.get("/customer/orders")
        );
        const transformedData = response.data.data.map((order) => ({
          key: order.Id,
          date: new Date(order.CreatedOnUtc).toLocaleDateString(),
          id: order.Id,
          subTotal: "$" + order.OrderSubtotalInclTax.toFixed(2),
          tax: "$" + order.OrderTax.toFixed(2),
          total: "$" + order.OrderTotal.toFixed(2),
        }));
        setOrders(transformedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        message.error("Failed to load order history.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [retryRequest, setIsLoading]);

  return (
    <div className="orders-container">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#87CEEB",
              rowHoverBg: "#E4F7FF",
            },
          },
        }}
      >
        <Table
          scroll={{ x: "max-content" }}
          align="center"
          dataSource={orders}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default OrderHistory;
