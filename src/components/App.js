import React, { Component } from 'react';
import Parent from './Login';
import history from './prevHistory';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Profile from './profile';
export default function App(props) {
    var url = window.location.pathname;
    var userLoggedInFlag = false;
    if (localStorage.getItem('userDetails')) {
        var encodedUserDetails = localStorage.getItem('userDetails');
        var decodedUserDetails = atob(encodedUserDetails);
        var parseDecodedUserDetails = JSON.parse(decodedUserDetails);
        var usertoken = parseDecodedUserDetails.usertoken;
        if (usertoken !== undefined && usertoken !== '') {
            userLoggedInFlag = true;
        }
    }
    return (
        <React.Fragment>
            <Router history={history} >
                <Route path={url} render={() => (
                    (userLoggedInFlag ? <Redirect to='/userprofile' /> : <Redirect to='/login' />)

                )} />
                <Switch>
                    <Route path='/login' component={Parent} />
                    <Route path='/userprofile' component={Profile} />
                </Switch>
            </Router>
            {/* <div><Parent /></div> */}
        </React.Fragment >


    )
}