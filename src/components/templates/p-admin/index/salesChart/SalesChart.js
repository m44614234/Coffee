"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const SalesChart = () => {
  const data = [
    {
      name: "1402/1/1",
      uv: 2000,
      pv: 1400,
      amt: 2400,
    },
    {
      name: "1402/3/1",
      uv: 1000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "1402/5/1",
      uv: 2500,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "1402/7/1",
      uv: 1180,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "1402/9/1",
      uv: 3890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "1402/11/1",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="92.7%">
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#000" fill="#711D1C" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
