import React, { useEffect, useState } from "react";
import { BookOpen, BookCopy, Users } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import "../styles/DashboardHome.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardHome = () => {
  const { dashboardData } = useOutletContext();
  const [recentActivity, setRecentActivity] = useState([]);
  const [overdueReturns, setOverdueReturns] = useState([]);
  const [dueThisWeek, setDueThisWeek] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchExtraData = async () => {
      try {
        const [recentRes, overdueRes, dueRes, graphRes] = await Promise.all([
          fetch("http://localhost:5000/api/dashboard/recent-activity"),
          fetch("http://localhost:5000/api/dashboard/overdue"),
          fetch("http://localhost:5000/api/dashboard/due-this-week"),
          fetch("http://localhost:5000/api/dashboard/borrowed-graph"),
        ]);

        const [recent, overdue, due, graph] = await Promise.all([
          recentRes.json(),
          overdueRes.json(),
          dueRes.json(),
          graphRes.json(),
        ]);

        console.log("📊 Raw graph data from backend:", graph);

        setRecentActivity(recent);
        setOverdueReturns(overdue);
        setDueThisWeek(due);
        setGraphData(
          graph.map((item) => ({
            month: new Date(item.month + "-01").toLocaleString("default", {
              month: "short",
            }),
            count: Number(item.total),
          }))
        );
      } catch (err) {
        console.error("Error loading dashboard sections", err);
      }
    };

    fetchExtraData();
  }, []);

  if (!dashboardData) {
    return <p style={{ padding: "2rem" }}>⏳ Loading dashboard data...</p>;
  }

  return (
    <div className="dashboard-content">
      {/* Overview Cards */}
      <section className="overview-grid">
        <div className="card">
          <div className="icon blue">
            <BookOpen size={28} />
          </div>
          <div>
            <p>Total Books</p>
            <h3>{dashboardData.totalBooks}</h3>
          </div>
        </div>

        <div className="card">
          <div className="icon teal">
            <BookCopy size={28} />
          </div>
          <div>
            <p>Borrowed Books</p>
            <h3>{dashboardData.borrowedBooks}</h3>
          </div>
        </div>

        <div className="card">
          <div className="icon purple">
            <Users size={28} />
          </div>
          <div>
            <p>Registered Users</p>
            <h3>{dashboardData.registeredUsers}</h3>
          </div>
        </div>
      </section>

      {/* Grid Panels */}
      <section className="dashboard-panels">
        {/* Recent Activity */}
        <div className="panel">
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.length === 0 ? (
              <li>No recent activity available.</li>
            ) : (
              recentActivity.map((item, i) => (
                <li key={i}>
                  {item.student_name} borrowed <strong>{item.book_title}</strong>{" "}
                  on {new Date(item.borrowed_at).toLocaleDateString()}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Overdue Returns */}
        <div className="panel">
          <h2>Overdue Returns</h2>
          <ul>
            {overdueReturns.length === 0 ? (
              <li>No overdue books.</li>
            ) : (
              overdueReturns.map((item, i) => (
                <li key={i}>
                  {item.student_name} - <strong>{item.book_title}</strong> due on{" "}
                  {new Date(item.due_date).toLocaleDateString()}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Due This Week */}
        <div className="panel">
          <h2>Due This Week</h2>
          <ul>
            {dueThisWeek.length === 0 ? (
              <li>No books due this week.</li>
            ) : (
              dueThisWeek.map((item, i) => (
                <li key={i}>
                  {item.student_name} - <strong>{item.book_title}</strong> due on{" "}
                  {new Date(item.due_date).toLocaleDateString()}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Borrowed Books Graph */}
        <div className="panel full-width">
          <h2>Borrowed Books Graph</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={graphData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
