import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import AccountPage from "./Pages/AccountPage";
import { useState, useEffect } from "react/cjs/react.development";
import Profile from "./Pages/Profile";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const alreadyLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const data = await response.json();
      data === true ? setIsLogin(true) : setIsLogin(false);
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    alreadyLogin();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar isLogin ={isLogin}/>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/account"
            element={
              !isLogin ? (
                <AccountPage isLogin={isLogin} setIsLogin={setIsLogin} />
                ) : (
                  <Navigate to="/home" />
                  )
                }
          />
          <Route path="/Profile" element={
          isLogin?
          <Profile  setIsLogin={setIsLogin}/>
        :
        <Navigate to = '/home'/>
        } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
