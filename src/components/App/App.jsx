import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LinkAccountPage from '../LinkAccountPage/LinkAccountPage';
import RemoveUserAccount from '../RemoveUserAccount/RemoveUserAccount';
import UserStats from '../UserStats/UserStats';
import AdminPage from '../AdminPage/AdminPage';
import AccountStats from '../AccountStats/AccountStats';
import MyFriends from '../MyFriends/MyFriends';
import MyStack from '../MyStack/MyStack';
import AddFriendPage from '../AddFriendPage/AddFriendPage';
import RemoveFriendPage from '../RemoveFriendPage/RemoveFriendPage';
import './App.css';
import FAQPage from '../FAQPage/FAQPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user.userReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <>
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact path='/linkAccount'>
              <LinkAccountPage/>
          </ProtectedRoute>

          <ProtectedRoute
            exact path='/removeUserAccount'>
              <RemoveUserAccount/>
          </ProtectedRoute>

          <ProtectedRoute
            exact path='/userStats'>
              <UserStats/>
          </ProtectedRoute>


          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {
              user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <ProtectedRoute exact path = '/admin'>
            <AdminPage/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/accountStats/:player'>
            <AccountStats/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/myFriends'>
            <MyFriends/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/myStack'>
            <MyStack />
          </ProtectedRoute>

          <ProtectedRoute exact path = '/addFriend'>
            <AddFriendPage/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/faq'>
            <FAQPage/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/removeFriend'>
            <RemoveFriendPage/>
          </ProtectedRoute>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Login page
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        
      </div>
    </Router>
    
    <div className="light x1"></div>
        <div className="light x2"></div>
        <div className="light x3"></div>
        <div className="light x4"></div>
        <div className="light x5"></div>
        <div className="light x6"></div>
        <div className="light x7"></div>
        <div className="light x8"></div>
        <div className="light x9"></div>

        
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
    </>
  );
}

export default App;
