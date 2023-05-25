import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useArenaContext } from "./hooks/useArenaContext";
import "./App.css";
// pages and components
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import Arena from "./pages/Arena/Arena";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import CreateArena from "./pages/Arena/CreateArena/CreateArena";
import JoinArena from "./pages/Arena/JoinArena/JoinArena";

function App() {
  const { user } = useAuthContext();
  const { arena } = useArenaContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}>
            </Route>
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}>
            </Route>
            <Route
              path="/arena"
              element={<Arena />}>
            </Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/arena/create"
              element={!arena ? <CreateArena /> : <Navigate to="/arena" />}
            />
            <Route
              path="/arena/join"
              element={!arena ? <JoinArena /> : <Navigate to="/arena" />}
            />
            <Route
              path="/about"
              element={<About />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
