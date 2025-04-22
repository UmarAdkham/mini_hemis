import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import StudentTable from "./pages/Student/AllStudents";
function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<StudentTable />} />
      {/* Private Routes */}
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
      {/* Not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
