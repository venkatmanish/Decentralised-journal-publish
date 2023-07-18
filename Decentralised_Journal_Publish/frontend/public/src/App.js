import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ManuscriptList from "./components/ManuscriptList";
import ManuscriptDetails from "./components/ManuscriptDetails";
import UploadForm from "./components/UploadForm";
import api from "./api";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await api.checkUser();
        setUser(userData);
      } catch (error) {
        console.log("User not logged in");
      }
    };

    checkUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const userData = await api.login(email, password);
      setUser(userData);
    } catch (error) {
      console.log("Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setUser(null);
    } catch (error) {
      console.log("Logout failed");
    }
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {user ? (
              <ManuscriptList user={user} handleLogout={handleLogout} />
            ) : (
              <LoginForm handleLogin={handleLogin} />
            )}
          </Route>
          <Route path="/upload">
            {user ? (
              <UploadForm user={user} />
            ) : (
              <LoginForm handleLogin={handleLogin} />
            )}
          </Route>
          <Route path="/manuscripts/:id">
            {user ? (
              <ManuscriptDetails user={user} />
            ) : (
              <LoginForm handleLogin={handleLogin} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
