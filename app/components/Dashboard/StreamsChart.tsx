"use client";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axiosInstance from "@/db/server";

interface MonthlyStatsItem {
  month: string;
  plays: number;
}

export default function StreamsChart() {
  const [data, setData] = useState<{ month: string; streams: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        const response = await axiosInstance.get("/streams");
        const monthlyStats: MonthlyStatsItem[] = response?.data?.data?.monthlyStats?.plays || [];

        const transformedData = monthlyStats.map((item: MonthlyStatsItem) => ({
          month: new Date(item.month).toLocaleString("default", {
            month: "short",
          }),
          streams: item.plays || 0,
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching stream data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreamData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#1F1F1F] rounded-xl p-8 md:w-[851px] w-full min-h-[364px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C2EE03]"></div>
      </div>
    );
  }


  // NOTE: The instruction "make this component highly responsive" typically involves modifying the JSX structure and CSS classes below.
  // The insertion point is before the return statement, which is unusual.
  // Assuming the intent is to modify the returned JSX, here is the modified return block.
  // If the loading state also needs modification, that code is located *before* this insertion point.
  // Key changes for responsiveness:
  // 1. Removed fixed width `md:w-[851px]` from the main container.
  // 2. Changed padding `p-8` to responsive padding `p-4 sm:p-6 lg:p-8`.
  // 3. Changed header margin `mb-6` to `mb-4 sm:mb-6`.
  // 4. Changed chart container height `h-[280px]` to responsive height `h-[200px] sm:h-[240px] md:h-[280px]`.
  // 5. Changed ResponsiveContainer width from `90%` to `100%` and removed the centering margin style.

  /*
  // Original return statement for reference:
  return (
    <div className="bg-[#1F1F1F] rounded-xl p-8 md:w-[851px] w-full min-h-[364px]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="w-2 h-2 bg-[#C2EE03] rounded-full mr-2"></span>
          <h3 className="text-sm font-medium">Streams</h3>
        </div>
        <div className="bg-[#2D2D2D] px-3 py-1 rounded-md text-xs">
          Feb, 26 2025
        </div>
      </div>
      <div className="h-[280px] relative">
        // Grid lines ...
        <ResponsiveContainer
          width={"90%"}
          height={"100%"}
          style={{ margin: "auto" }}
        >
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: -30, bottom: 10 }}
          >
            // Defs, XAxis, YAxis, Area ...
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  */

  // Modified return statement for better responsiveness:
  return (
    // Removed md:w-[851px], changed p-8 to responsive padding
    <div className="bg-[#1F1F1F] rounded-xl p-4 sm:p-6 lg:p-8 w-full min-h-[364px]">
      {/* Changed mb-6 to responsive margin */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center">
          <span className="w-2 h-2 bg-[#C2EE03] rounded-full mr-2"></span>
          <h3 className="text-sm font-medium">Streams</h3>
        </div>
        {/* Consider making the date dynamic if needed */}
        <div className="bg-[#2D2D2D] px-3 py-1 rounded-md text-xs">
          Feb, 26 2025
        </div>
      </div>
      {/* Changed h-[280px] to responsive height */}
      <div className="h-[200px] sm:h-[240px] md:h-[280px] relative">
        {/* Grid lines - kept structure, ensure labels/lines look okay on small screens */}
        <div className="absolute inset-0 flex flex-col justify-between py-4">
          {[350, 300, 250, 200, 150, 100].map((value) => (
            <div
              key={value}
              className="h-px border-t border-dashed border-gray-700/30 relative"
            >
              <span className="absolute -top-3 text-xs text-gray-500">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Chart visualization using Recharts */}
        {/* Changed width to 100%, removed style={{ margin: 'auto' }} */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            // Kept negative left margin assuming YAxis labels are hidden and space needs reclaiming
            margin={{ top: 0, right: 0, left: -30, bottom: 10 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C2EE03" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#C2EE03" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10} // Adjust vertical position of ticks if needed
            />
            <YAxis hide domain={[100, 350]} /> {/* Domain might need adjustment based on actual data range */}
            <Area
              type="monotone"
              dataKey="streams"
              stroke="#C2EE03"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#chartGradient)"
              activeDot={{ r: 5, strokeWidth: 2, fill: '#1F1F1F', stroke: '#C2EE03' }}
              dot={false} // Hide default dots unless needed
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}