import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoPage from "./pages/TodoPage";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./pages/TodoForm";
import TodoLayout from "./layouts/TodoLayout";
import { UserProvider } from "./contexts/UserContext";
import RegisterLayout from "./layouts/RegisterLayout";
import LoginLayout from "./layouts/LoginLayout";

function App() {
  return (
    <Routes>
      {/* User Provider */}
      <Route path="/" element={<UserProvider />}>
        {/*Todo Provider */}
        <Route path="/" element={<TodoProvider />}>
          {/* Todo Layout */}
          <Route path="/" element={<TodoLayout />}>
            {/* Pages */}
            <Route path="/" element={<TodoPage />} />
            <Route path="/add" element={<TodoForm />} />
            <Route path="/update/:id" element={<TodoForm />} />
          </Route>
          {/* Register Layout */}
          <Route path="/register" element={<RegisterLayout />} />
          {/* Login Layout */}
          <Route path="/login" element={<LoginLayout />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
