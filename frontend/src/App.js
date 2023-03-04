import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// pages and components
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";

function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route 
            path="/"
            element={<Home/>}>
          </Route>
          <Route 
            path="/profile"
            element={user ? <Profile/> : <Navigate to="/login"/>}>
          </Route>
          <Route
            path="/login"
            element={!user ? <Login/> : <Navigate to="/"/>}
          />
          <Route
            path="/signup"
            element={!user ? <Signup/> : <Navigate to="/"/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
