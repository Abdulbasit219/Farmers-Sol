import { useState } from "react";
import {
  PieChart as RePieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useCategoryFilter from "../../../../hooks/useCategoryFilter";
import { useGetProductsQuery } from "../../../../redux/ApiSlice";

function PieChart() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { categories } = useCategoryFilter();
  const { data: allProducts } = useGetProductsQuery({ page: 1, admin: true });

  const chartData = categories.map((cat) => {
    const count = allProducts?.adminProducts?.filter(
      (p) => p.category === cat._id
    ).length;
    return { name: cat.name, value: count };
  });

  const generateColors = (count) => {
    const baseHue = 120; // Green
    const saturation = 35; // Soft saturation
    const lightnessStart = 25; // Darkest shade
    const lightnessStep = 50 / count; // Step to make them lighter gradually

    return Array.from({ length: count }, (_, i) => {
      const lightness = lightnessStart + i * lightnessStep;
      return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
    });
  };

  const COLORS = generateColors(chartData.length);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-[400px] p-4 rounded-lg overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            activeIndex={activeIndex}
            data={chartData}
            dataKey="value"
            outerRadius={window.innerWidth > 768 ? 120 : 80}
            cx="50%"
            cy="50%"
            onMouseEnter={onPieEnter}
            style={{ cursor: "pointer", outline: "none" }}
            labelLine={false}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign={window.innerWidth > 768 ? "middle" : "bottom"}
            align={window.innerWidth > 768 ? "right" : "center"}
            layout={window.innerWidth > 768 ? "vertical" : "horizontal"}
          />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChart;
