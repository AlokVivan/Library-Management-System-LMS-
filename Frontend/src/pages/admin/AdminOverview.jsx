import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/api"; // ✅ centralized axios instance

const AdminOverview = () => {
  const { dashboardData } = useOutletContext();
  const [recentActivity, setRecentActivity] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [dueThisWeek, setDueThisWeek] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchExtraData = async () => {
      try {
        const [recentRes, overdueRes, dueWeekRes, graphRes] = await Promise.all([
          api.get("/dashboard/recent-activity"),
          api.get("/dashboard/overdue"),
          api.get("/dashboard/due-this-week"),
          api.get("/dashboard/borrowed-graph"),
        ]);

        setRecentActivity(recentRes.data);
        setOverdueBooks(overdueRes.data);
        setDueThisWeek(dueWeekRes.data);
        setChartData(graphRes.data);
      } catch (err) {
        console.error("Failed to fetch extra dashboard data", err);
      }
    };

    fetchExtraData();
  }, []);

  return (
    <div>
      <div className="overview-grid">
        <div className="card">
          <div className="icon blue">📚</div>
          <div>
            <p>Total Books</p>
            <h3>{dashboardData?.totalBooks || 0}</h3>
          </div>
        </div>
        <div className="card">
          <div className="icon teal">📖</div>
          <div>
            <p>Borrowed Books</p>
            <h3>{dashboardData?.borrowedBooks || 0}</h3>
          </div>
        </div>
        <div className="card">
          <div className="icon purple">👥</div>
          <div>
            <p>Registered Users</p>
            <h3>{dashboardData?.registeredUsers || 0}</h3>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <div className="recent-box">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivity.map((item, i) => (
              <li key={i}>
                <span>{item.student_name} borrowed {item.book_title}</span>
                <span>{new Date(item.borrowed_at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="recent-box">
          <h3>Overdue Returns</h3>
          <ul>
            {overdueBooks.map((item, i) => (
              <li key={i}>
                <span>{item.student_name} - {item.book_title}</span>
                <span>{new Date(item.due_date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="recent-box">
          <h3>Due This Week</h3>
          <ul>
            {dueThisWeek.map((item, i) => (
              <li key={i}>
                <span>{item.student_name} - {item.book_title}</span>
                <span>{new Date(item.due_date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="recent-box">
          <h3>Borrowed Books Graph</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
