import React from 'react';
import { Navigate } from 'react-router-dom';

//admin
import CommitteeView from 'src/adminDashboard/views/committee/CommitteeListView';
import UserView from 'src/adminDashboard/views/user/UserListView';
import InsertView from 'src/adminDashboard/views/inserts/InsertListView';
import DashboardAdminLayout from 'src/adminDashboard/layouts/DashboardLayout';
import DashboardView from 'src/adminDashboard/views/reports/DashboardView';


// //basic
import MainAdminLayout from 'src/adminDashboard/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RestView from 'src/views/auth/RestView';



const routesAdmin = [
  {
    path: 'app/ourpage',
    element: <DashboardAdminLayout />,
    children: [
      { path: 'stores', element: <UserView /> },
      { path: 'rent', element: <CommitteeView /> },
      { path: 'inserts', element: <InsertView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainAdminLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'rest', element: <RestView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/ourpage/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];




export default routesAdmin;
