import React from 'react';
import Navbar from './Navbar.jsx';
import Alert from '../common/Alert.jsx';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Alert />
      <main>{children}</main>
    </div>
  );
};

export default Layout;