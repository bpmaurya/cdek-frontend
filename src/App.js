import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import Office from './screens/Office'
import OutGoingPackage from './screens/OutGoingPackage'
import IncomingPackage from './screens/IncomingPackage'
import Contact from './components/Contact'
import AddNewIncomingPck from './screens/AddNewIncomingPck'
import IncomingPackageDetails from './screens/IncomingPackageDetails'
import Login from './screens/Login'
import Register from './screens/Register'
import UserProfile from './screens/UserProfile'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen  from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

function App() {

  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo === undefined || userInfo === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  });

  return (
    <Router>
      <Header />
      <main className="py-3" >
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path ='/login' component={Login} exact />
          <Route path ='/register' component={Register} exact />
          <Route path='/contact' component={Contact}  exact/>


          <Route path='/admin/userlist' component={UserListScreen} exact />
          <Route path='/admin/user/:_id/edit' component={UserEditScreen} exact />
          <Route path='/mypage' component={Office} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/incoming' component={IncomingPackage}  exact/>
          <Route path='/outgoing' component={OutGoingPackage}  exact/>
          <Route path='/add-incoming' component={AddNewIncomingPck} exact />
          <Route path='/incoming/:_id' component={IncomingPackageDetails} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
