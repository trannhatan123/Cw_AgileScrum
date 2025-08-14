// src/features/Admin/Dashboard/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAnalyticsStats,
  getPopular,
  getQuizCompletionRate,
} from "../../../services/analyticsService";
import { getPageviewStats } from "../../../services/pageviewService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [overviewPeriod, setOverviewPeriod] = useState("6m"); // '1m','3m','6m','12m'
  const [pageviews, setPageviews] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [popularPlanets, setPopularPlanets] = useState([]);
  const [popularQuizzes, setPopularQuizzes] = useState([]);
  const [quizCompletion, setQuizCompletion] = useState({
    totalCorrect: 0,
    totalAnswers: 0,
    percent: 0,
  });
  const [actionOpen, setActionOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch analytics for Overview
  useEffect(() => {
    getAnalyticsStats(overviewPeriod).then((res) => setStats(res.data));
  }, [overviewPeriod]);

  // Initial fetch for other data
  useEffect(() => {
    getPopular("planets").then((res) => setPopularPlanets(res.data));
    getPopular("quizzes").then((res) => setPopularQuizzes(res.data));
    getQuizCompletionRate().then((res) => setQuizCompletion(res.data));
  }, []);

  // Fetch pageviews
  useEffect(() => {
    getPageviewStats(period).then((res) => setPageviews(res.data));
  }, [period]);

  if (!stats) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div className="admin-content space-y-8">
      {/* Dashboard Header with Quick Actions */}
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Tổng quan số liệu & xu hướng khám phá Hệ Mặt Trời
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setActionOpen((open) => !open)}
            className="actions-toggle"
            aria-label="Open actions menu"
          >
            <img src="/icons/option.svg" alt="Options" className="w-6 h-6" />
          </button>
          {actionOpen && (
            <ul className="actions-menu">
              <li>
                <button
                  onClick={() => {
                    navigate("/admin/planets/new");
                    setActionOpen(false);
                  }}
                >
                  + Add Planet
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/admin/quizzes/new");
                    setActionOpen(false);
                  }}
                >
                  + Add Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/admin/users/new");
                    setActionOpen(false);
                  }}
                >
                  + Add User
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/admin/events/new");
                    setActionOpen(false);
                  }}
                >
                  + Add Event
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Overview Section */}
      <div className="list-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="chart-header">Overview</h2>
          <select
            value={overviewPeriod}
            onChange={(e) => setOverviewPeriod(e.target.value)}
            className="form-select max-w-xs"
          >
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
          </select>
        </div>
        <div className="stats-grid">
          {[
            ["Total Users", stats.totals.userCount],
            ["Total Planets", stats.totals.planetCount],
            ["Total Quizzes", stats.totals.quizCount],
            ["Total Events", stats.totals.eventCount],
          ].map(([label, value]) => (
            <div key={label} className="stats-card">
              <span className="stats-label">{label}</span>
              <span className="stats-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Growth Section */}
      <div className="chart-card">
        <h2 className="chart-header">User Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={stats.usersByMonth}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pageviews Section */}
      <div className="chart-card">
        <h2 className="chart-header">Pageviews</h2>
        <div className="mb-4">
          {["daily", "weekly", "monthly"].map((p) => (
            <button
              key={p}
              aria-label={`${p} pageviews`}
              className={`px-3 py-1 mr-2 rounded ${
                period === p ? "button-primary" : "button-secondary"
              }`}
              onClick={() => setPeriod(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={pageviews}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Viewed Section - Bar Charts */}
      <div className="chart-grid">
        <div className="chart-card">
          <h2 className="chart-header">Top Planets</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={popularPlanets}
              layout="vertical"
              margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="label" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="views" fill="var(--color-primary)" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h2 className="chart-header">Top Quizzes</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={popularQuizzes}
              layout="vertical"
              margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="label" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="views" fill="var(--color-secondary)" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quiz Completion Section */}
      <div className="chart-card flex flex-col items-center">
        <h2 className="chart-header">Quiz Completion</h2>
        <PieChart width={200} height={200}>
          <Pie
            data={[
              { name: "Correct", value: quizCompletion.totalCorrect },
              {
                name: "Incorrect",
                value:
                  quizCompletion.totalAnswers - quizCompletion.totalCorrect,
              },
            ]}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            <Cell fill="#4ade80" />
            <Cell fill="#f87171" />
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
        <p className="mt-2 text-lg font-medium text-[var(--color-text)]">
          {quizCompletion.percent}% Correct
        </p>
      </div>
    </div>
  );
}
