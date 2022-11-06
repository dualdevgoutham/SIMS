import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/faculty/Login";
import Register from "./pages/faculty/Register";
import Home from "./pages/Home";
import "./styles/theme.css";
import "./styles/layout.css";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";
import FacultyHome from "./pages/faculty/FacultyHome";
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./pages/faculty/Students";
import AddStudent from "./pages/faculty/AddStudent";
import EditStudent from "./pages/faculty/EditStudent";
import PublicRoute from "./components/PublicRoute";
import Resutls from "./pages/faculty/Results";
import AddResult from "./pages/faculty/AddResult";
import EditResult from "./pages/faculty/EditResult";
import ResultCheck from "./pages/ResultCheck";

function App() {
  const { loading } = useSelector((state) => state.alert);

  return (
    <div className="App">
      {loading && <Spinner />}
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result/:resultId" element={<ResultCheck />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="faculty"
            element={
              <ProtectedRoute>
                <FacultyHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty/students/add"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty/students/edit/:rollNo"
            element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty/results"
            element={
              <ProtectedRoute>
                <Resutls />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty/results/add"
            element={
              <ProtectedRoute>
                <AddResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty/results/edit/:resultId"
            element={
              <ProtectedRoute>
                <EditResult />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
