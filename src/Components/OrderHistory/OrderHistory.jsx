import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Table, ConfigProvider } from "antd";
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

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/customer/orders");
        console.log(response);
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
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  return (
    <div className="orders-container">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#87CEEB",
              rowHoverBg: "#E4F7FF"
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
