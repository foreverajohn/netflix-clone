import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { auth } from './firebase';

function App() {
  const user = null

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log(userAuth);
      } else {

      }
    })
    return unsubscribe
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
          </Switch>
        )}
      </Router>

    </div>
  );
}

export default App;
