import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/Login" element={<h1>Login</h1>} />
        <Route path="/Register" element={<h1>Register</h1>} />
        <Route path="/Tasks" element={<h1>Tasks</h1>} />
        <Route path="/add-tasks" element={<h1>Add Tasks</h1>} />
        <Route path="/tasks/:id" element={<h1>Update Task</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
