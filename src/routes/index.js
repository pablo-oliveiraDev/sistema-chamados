import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../Pages/SignIn/index';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Route from './SetRoutes';
import Profile from '../Pages/Profile';
import Customers from '../Pages/Customers';
import New from '../Pages/New'




export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate />
      <Route exact path="/new" component={New} isPrivate />
      <Route exact path="/new/:id" component={New} isPrivate />
    </Switch>
  )
}

