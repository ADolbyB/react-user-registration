import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[2001]} />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[1984]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[5150]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
              <Route path="lounge" element={<Lounge />} />
            </Route>
          cd </Route>
          {/* Catch All Else Route */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
  );
}

export default App;