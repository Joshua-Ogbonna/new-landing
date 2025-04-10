// components/BarChart.tsx
"use client"
// components/BarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Define the data type
interface DataItem {
  name: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: DataItem[];
  xAxisDataKey: string;
  barDataKey: string;
  barColor?: string;
  hoverColor?: string;
  title?: string;
  borderRadius?: number;
}

const CustomBarChart: React.FC<BarChartProps> = ({
  data,
  xAxisDataKey,
  barDataKey,
  barColor = "#313133", // Dark gray as default
  hoverColor = "#C2EE03", // Bright green on hover
  title,
  borderRadius = 12 // 2xl rounded corners (16px is roughly equivalent to Tailwind's 2xl)
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full pt-6">
      {title && <h2 className="text-xl font-bold my-4 text-center">{title}</h2>}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onMouseLeave={handleMouseLeave}
        >
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey={barDataKey} 
            onMouseEnter={handleMouseEnter}
            // Set rounded corners for all bars
            radius={[borderRadius, borderRadius, 0, 0]} // [top-left, top-right, bottom-right, bottom-left]
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={activeIndex === index ? hoverColor : barColor} 
                cursor="pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;