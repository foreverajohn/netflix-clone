import React, { useEffect   } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import db, { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovieList, addSubscription, login, logout, selectUser, selectSubscription } from './features/userSlice'
import MyListScreen from './screens/MyListScreen/MyListScreen';
import GenreScreen from './screens/GenreScreen/GenreScreen';

function App() {
  const user = useSelector(selectUser)
  const subscription = useSelector(selectSubscription)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
        db.collection('customers')
          .doc(userAuth.uid)
          .collection('subscriptions')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
              dispatch(addSubscription({
                plan: subscription.data().role,
                start_date: subscription.data().current_period_end.seconds,
                end_date: subscription.data().current_period_start.seconds
              }))
            })
          })
        const list = []
        db.collection('customers')
          .doc(userAuth.uid)
          .collection('movie_list')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(async doc => {
              list.push(doc.data().id)
            })
            dispatch(loadMovieList(list))
          })
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
          !subscription ? (
            <ProfileScreen />
          ) : (
            <Switch>
              <Route exact path="/">
                <HomeScreen />
              </Route>
              <Route path="/profile">
                <ProfileScreen />
              </Route>
              <Route path="/my_list">
                <MyListScreen />
              </Route>
              <Route path="/byGenre/:genre">
                <GenreScreen />
              </Route>
            </Switch>
          )
        )}
      </Router>
    </div>
  );
}

export default App;
