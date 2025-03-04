import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  FunnelChart,
  Funnel,
  LabelList,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  FaUsers,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const InstaEnrollDashboard = () => {
  // Sample data
  const [metrics, setMetrics] = useState({
    today: {
      totalOnboarded: 45,
      failedOnboarding: 12,
      successfulOnboarding: 33,
      approved: 28,
    },
  });

  const [failureBreakdown, setFailureBreakdown] = useState([
    { name: "OTP Verification", value: 35 },
    { name: "OCR Reading", value: 25 },
    { name: "Face Matching", value: 30 },
    { name: "Other Failures", value: 10 },
  ]);

  const [funnelData, setFunnelData] = useState([
    { name: "Account Type", value: 1000, fill: "#0088FE" },
    { name: "Account Sub type", value: 850, fill: " #FF8042" },
    { name: "Occupation", value: 620, fill: "#FFBB28" },
    { name: "Disability", value: 450, fill: "#00C49F" },
    { name: "image Details", value: 400, fill: "#0088FE" },
    { name: "Documents Uploaded", value: 390, fill: " #FF8042" },
    { name: "Verification Complete", value: 350, fill: "#FFBB28" },
    { name: "Pep details", value: 300, fill: "#00C49F" },
    
  ]);

  const [sevenDaysData, setSevenDaysData] = useState([
    { day: "Mon", onboarded: 40, failed: 10 },
    { day: "Tue", onboarded: 50, failed: 12 },
    { day: "Wed", onboarded: 45, failed: 9 },
    { day: "Thu", onboarded: 55, failed: 14 },
    { day: "Fri", onboarded: 60, failed: 15 },
    { day: "Sat", onboarded: 70, failed: 20 },
    { day: "Sun", onboarded: 65, failed: 18 },
  ]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const MetricCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold" style={{ color }}>
            {value}
          </p>
        </div>
        <div
          className={`p-3 rounded-full`}
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-start">
        Customer Onboarding Dashboard
      </h1>

      {/* Today's Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border-t shadow-md border-b-4 border-b-blue-800 rounded-md hover:scale-90 hover:transition-transform hover:-translate-y-2">
        <MetricCard 
          title="Total Onboarded Today"
          value={metrics.today.totalOnboarded}
          icon={<FaUsers className="text-blue-500 text-xl" />}
          color="#0088FE"
          
        />
        </div>
        <div className="border-t shadow-md border-b-4 border-b-blue-800 rounded-md hover:scale-90 hover:transition-transform hover:-translate-y-2">
        <MetricCard 
          title="Failed Onboarding Today"
          value={metrics.today.failedOnboarding}
          icon={<FaExclamationTriangle className="text-red-500 text-xl" />}
          color="#FF4444"
        />
        </div>
        <div className="border-t shadow-md border-b-4 border-b-blue-800 rounded-md hover:scale-90 hover:transition-transform hover:-translate-y-2">
        <MetricCard 
          title="Successful Onboarding Today"
          value={metrics.today.successfulOnboarding}
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          color="#00C49F"
        />
        </div>
        <div className="border-t shadow-md border-b-4 border-b-blue-800 rounded-md hover:scale-90 hover:transition-transform hover:-translate-y-2">
        <MetricCard 
          title="Average Onboarding Time"
          value="24 mins"
          icon={<FaClock className="text-yellow-500 text-xl" />}
          color="#FFBB28"
        />
        </div>
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Failure Breakdown Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md border-t">
          <h2 className="text-lg font-semibold mb-4">Failure Breakdown</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={failureBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {failureBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value, entry) => (
                    <span className="text-sm">{`${value} (${entry.payload.value})`}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Onboarding Funnel */}
        <div className="bg-white p-4 rounded-lg shadow-md border-t">
          <h2 className="text-lg font-semibold mb-4">Onboarding Funnel</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Funnel
                  data={funnelData}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive
                >
                  <LabelList
                    position="center"
                    fontSize="12px"
                    fill="#FFFFFF"
                    stroke="none"
                    dataKey="name"
                  />
                </Funnel>
                <Tooltip />
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 7 Days Onboarding Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md border-t mt-6">
        <h2 className="text-lg font-semibold mb-4">7 Days Onboarding Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sevenDaysData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onboarded" fill="#00C49F" name="Onboarded" />
              <Bar dataKey="failed" fill="#FF4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InstaEnrollDashboard;
