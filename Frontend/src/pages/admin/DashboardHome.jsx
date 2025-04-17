import React from "react";
import { Book, Users } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const DashboardHome = () => {
  const { dashboardData } = useOutletContext();

  if (!dashboardData) {
    return (
      <p style={{ padding: "2rem", fontSize: "1.2rem" }}>
        ⏳ Loading dashboard data...
      </p>
    );
  }

  return (
    <section className="overview-grid">
      <div className="card">
        <div className="icon blue">
          <Book size={24} />
        </div>
        <div>
          <p>Total Books</p>
          <h3>{dashboardData.totalBooks}</h3>
        </div>
      </div>
      <div className="card">
        <div className="icon teal">
          <Book size={24} />
        </div>
        <div>
          <p>Borrowed Books</p>
          <h3>{dashboardData.borrowedBooks}</h3>
        </div>
      </div>
      <div className="card">
        <div className="icon purple">
          <Users size={24} />
        </div>
        <div>
          <p>Registered Users</p>
          <h3>{dashboardData.registeredUsers}</h3>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
