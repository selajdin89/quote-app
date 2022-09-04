import "./App.css";
import Auth from "./pages/Auth";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuoteDisplay from "./pages/QuoteDisplay";
import MainNavigation from "./components/Layout/MainNavigation";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  const auth = authCtx.isLoggedIn;
  return (
    <div>
      <MainNavigation />

      <Routes>
        {!auth && <Route path="/" element={<HomePage />}></Route>}
        {auth && <Route path="/quote" element={<QuoteDisplay />}></Route>}
        {!auth && <Route path="/auth" element={<Auth />}></Route>}
        {auth && <Route path="/profile" element={<ProfilePage />}></Route>}
        <Route path="*" element={<Navigate to="/quote" replace />} />
      </Routes>
    </div>
  );
}

export default App;
