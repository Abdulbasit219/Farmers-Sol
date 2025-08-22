import React from "react";
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useCategoryFilter from "../../../../hooks/useCategoryFilter";
import { useGetProductsQuery } from "../../../../redux/ApiSlice";

function AreaChart() {
  const { categories } = useCategoryFilter();
  const { data: allProducts } = useGetProductsQuery({ page: 1, admin: true });

  const chartData = categories.map((cat) => {
    const count = allProducts?.adminProducts?.filter(
      (p) => p.category === cat._id
    ).length;

    return { name: cat.name, products: count };
  });

  return (
    <div className="overflow-hidden w-[100%] h-[400px] ">
      <ResponsiveContainer>
        <ReAreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="products"
            stroke="#4C7C4A"
            fill="#C3D5A0"
            fillOpacity={0.6}
          />
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChart;
