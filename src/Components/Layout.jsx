import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './layout.css';

const Layout = () => (
  <div className="layout">
    <Sidebar />
    <div className="content">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);

export default Layout;
