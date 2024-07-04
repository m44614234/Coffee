"use client"
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: '1402/1/1',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: '1402/2/1',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: '1402/3/1',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: '1402/5/1',
    uv: 2780,
    pv: 3908,
    amt: 2000
  } 
];

export function GrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="92.7%">
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#711D1C"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#000" />
    </LineChart>
    </ResponsiveContainer>
  );
}
