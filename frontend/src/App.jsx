/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import NotFound from "./pages/notFound";
import Login from "./pages/login";

import StudentWorkPage from "./pages/Teacher/TaskGradePage";
import AdminPage from "./pages/Admin/AddUserpage";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to={routes[0].path} replace />} />
        {routes.map(({ path, layout: Layout, children }) => (
          <Route key={path} path={path} element={<Layout />}>
            {children.map(({ path: childPath, element }, idx) => (
              <Route
                key={idx}
                index={childPath === ""}
                path={childPath}
                element={element}
              />
            ))}
          </Route>
        ))}
      </Route>

      {/* Not found */}
      <Route path="/gradeWork" element={<StudentWorkPage/>}/>
      <Route path="/addUser" element={<AdminPage/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
