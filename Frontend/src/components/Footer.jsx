import { useEffect } from "react";

function EditorialDivider() {
  return (
    <svg
      className="editorial"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Define a linear gradient matching the footer */}
        <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 
             58-18 88-18s
             58 18 88 18 
             58-18 88-18 
             58 18 88 18
             v44h-352z"
        />
      </defs>
      <g className="parallax1">
        <use xlinkHref="#gentle-wave" x="50" y="3" fill="url(#footerGradient)" />
      </g>
      <g className="parallax2">
        <use xlinkHref="#gentle-wave" x="50" y="0" fill="url(#footerGradient)" />
      </g>
      <g className="parallax3">
        <use xlinkHref="#gentle-wave" x="50" y="9" fill="url(#footerGradient)" />
      </g>
      <g className="parallax4">
        <use xlinkHref="#gentle-wave" x="50" y="6" fill="url(#footerGradient)" />
      </g>
    </svg>
  );
}

export default function Footer() {
  useEffect(() => {
    const root = document.documentElement;
    root.className = "dark"; // Set the theme to dark
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg-dark: #0f172a;
          --text-dark: #e2e8f0;
          --accent: #6366f1;
          --divider-color: #1e293b; /* Fallback color if needed */
        }
        
        /* Editorial Divider styling */
        .editorial {
          display: block;
          width: 100%;
          height: 60px;
          max-height: 60px;
          margin: 0;
          z-index: 5;
          position: relative;
        }
        
        .parallax1 > use,
        .parallax2 > use,
        .parallax3 > use,
        .parallax4 > use {
          /* If gradient not supported, fallback to uniform color */
          fill: var(--divider-color) !important;
          /* Animation remains as before */
        }
        
        .parallax1 > use {
          animation: move-forever1 10s linear infinite;
          animation-delay: -2s;
        }
        .parallax2 > use {
          animation: move-forever2 8s linear infinite;
          animation-delay: -2s;
        }
        .parallax3 > use {
          animation: move-forever3 6s linear infinite;
          animation-delay: -2s;
        }
        .parallax4 > use {
          animation: move-forever4 4s linear infinite;
          animation-delay: -2s;
        }
        
        @keyframes move-forever1 {
          0% { transform: translate(85px, 0); }
          100% { transform: translate(-90px, 0); }
        }
        @keyframes move-forever2 {
          0% { transform: translate(-90px, 0); }
          100% { transform: translate(85px, 0); }
        }
        @keyframes move-forever3 {
          0% { transform: translate(85px, 0); }
          100% { transform: translate(-90px, 0); }
        }
        @keyframes move-forever4 {
          0% { transform: translate(-90px, 0); }
          100% { transform: translate(85px, 0); }
        }
        
        /* Footer styling */
        .footer {
          padding: 3rem 1rem;
          background: linear-gradient(to right, #1e293b, #1e293b);
          color: var(--text-dark);
          position: relative;
        }
        
        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
          max-width: 1200px;
          margin: auto;
        }
        
        .footer-section h2 {
          margin-bottom: 0.8rem;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .footer-section ul {
          list-style: none;
          padding: 0;
        }
        
        .footer-section ul li {
          margin-bottom: 0.4rem;
        }
        
        .footer-section ul li a {
          color: var(--text-dark);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }
        
        .footer-section ul li a:hover {
          color: var(--accent);
        }
        
        .footer-section button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--accent);
          background: transparent;
          color: var(--text-dark);
          cursor: pointer;
          border-radius: 8px;
          font-weight: 500;
        }
        
        .footer-section button:hover {
          background: var(--accent);
          color: white;
        }
        
        .footer-bottom {
          text-align: center;
          font-size: 0.85rem;
          margin-top: 2rem;
          color: #94a3b8;
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--accent);
        }
        
        .desc {
          font-size: 0.95rem;
          margin-top: 0.5rem;
          color: #cbd5e1;
        }
        
        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-section.right {
            align-self: flex-start;
          }
        }
      `}</style>
      
      {/* Editorial Divider rendered above the footer */}
      <EditorialDivider />
      
      <footer className="footer">
        <div className="footer-container">
          {/* Logo */}
          <div className="footer-section">
            <h1 className="logo">📚 MyLMS</h1>
            <p className="desc">Smart Library System for modern learners.</p>
          </div>
          
          {/* Links */}
          <div className="footer-section">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="#">🏠 Home</a></li>
              <li><a href="#">📖 Browse</a></li>
              <li><a href="#">👤 My Account</a></li>
              <li><a href="#">📬 Contact</a></li>
            </ul>
          </div>
          
          {/* Navigation / Back to top */}
          <div className="footer-section right">
            <h2>Navigation</h2>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              ⬆️ Back to Top
            </button>
          </div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} MyLMS. All rights reserved.
        </div>
      </footer>
    </>
  );
}
