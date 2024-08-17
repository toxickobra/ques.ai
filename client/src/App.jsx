import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CreateProject from './pages/CreateProject';
import Login from "./pages/Login";
import ProjectDetails from './pages/ProjectDetails';
import Register from './pages/Register';
// PrivateRoute component to protect routes that need authentication
const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addyourproject" element={<PrivateRoute element={<CreateProject />} />} />
            <Route path="/addyourproject/:projectId" element={<PrivateRoute element={<ProjectDetails />} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
