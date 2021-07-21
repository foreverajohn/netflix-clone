import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      } else {
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          !user.subscription ? (
            <ProfileScreen />
          ) : (
            <Switch>
              <Route exact path="/">
                <HomeScreen />
              </Route>
              <Route path="/profile">
                <ProfileScreen />
              </Route>
            </Switch>
          )
        )}
      </Router>
    </div>
  );
}

export default App;
