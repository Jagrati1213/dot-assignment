import { Space } from "antd";
import { Axios } from "../../global";
import React, { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function HomeComponent() {
  const [productsData, setProductsData] = useState([]);
  // Colors for chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Average Price of total products
  const averagePrice = useMemo(
    () =>
      (
        productsData.reduce((sum, product) => sum + product.price, 0) /
        productsData?.length
      ).toFixed(2),
    [productsData]
  );

  // Compute product distribution by category
  const categoryDistribution = useMemo(() => {
    const distribution = {};
    productsData.forEach((product) => {
      distribution[product.category] =
        (distribution[product.category] || 0) + 1;
    });
    return Object.entries(distribution).map(([category, count]) => ({
      category,
      count,
    }));
  }, [productsData]);

  // Handler for get all products
  const handleGetAllProducts = async () => {
    try {
      const response = await Axios.get("products");
      setProductsData(response.data);
    } catch (error) {
      console.log("Error in fetching all products", error?.message);
    }
  };

  // Called the fetch handler
  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div>
      <Space direction="vertical" className="gap-2">
        <p className="text-lg">
          <strong>Total Products : </strong>
          {productsData?.length ? productsData.length : 0}
        </p>
        <p className="text-lg">
          <strong>Average Price : </strong>
          {averagePrice ? `₹${averagePrice}` : 0}
        </p>
      </Space>

      {/* Pie Chart */}
      <div className="p-5 border mt-10">
        <h3 className="text-lg font-semibold mb-10">Category Distribution</h3>
        <div className="w-full" style={{ height: "300px" }}>
          <ResponsiveContainer>
            <PieChart width={730} height={250}>
              <Pie
                data={categoryDistribution}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label={(entry) => `${entry.category} (${entry.count})`}
              >
                {categoryDistribution.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
