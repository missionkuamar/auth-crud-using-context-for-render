import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ItemProvider } from './context/ItemContext.jsx';
import { AlertProvider } from './context/AlertContext.jsx';
import Layout from './components/layout/Layout.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import ItemList from './components/items/ItemList.jsx';
import PrivateRoute from './components/auth/PrivateRoute.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <ItemProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <ItemList />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Layout>
          </ItemProvider>
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;