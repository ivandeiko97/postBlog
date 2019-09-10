import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

export default function Blog({ children }) {
  return (
    <div>
      <header className="header">
        <nav className="header-nav">
          <ul className="header-list">
            <li className="header-li">
              <Link to="/" className="header-link">Posts</Link>
            </li>
            <li className="header-li">
              <Link to="/add" className="header-link">Add Posts</Link>
            </li>
          </ul>
        </nav>
      </header> 
      <main>
        { children }
      </main>
    </div>
  )
}
