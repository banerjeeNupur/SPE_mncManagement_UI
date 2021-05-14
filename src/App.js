import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProjectList from "./components/ProjectList";
import ManagerDashboard from "./components/ManagerDashboard";
import Register from "./components/Register";
import Project from "./components/Project";
import LoginMid from "./components/LoginMid";
import Requests from "./components/Requests";
import MakeRequest from "./components/MakeRequest";
import DeveloperDashboard from "./components/DeveloperDashboard"
import AddProject from "./components/AddProject";
import ManagerChart from "./components/ManagerChart";
import UserProfile from "./components/UserProfile";

import DevList from "./components/DevList";
class App extends Component{

    render(){
        return(
            <Router>
                <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/ManagerDashboard" component={ManagerDashboard}/>
                <Route exact path="/AdminDashboard" component={AdminDashboard}/>
                <Route exact path="/LoginMid" component={LoginMid}/>
                <Route exact path="/Requests" component={Requests}/>
                <Route exact path="/MakeRequest" component={MakeRequest}/>
                <Route exact path="/DeveloperDashboard" component={DeveloperDashboard}/>
                <Route exact path="/ProjectList" component={ManagerDashboard} />
                <Route path="/addProject" component={ManagerDashboard} />
                <Route path="/ManagerHome" component={ManagerDashboard} />
                <Route path="/ManagerUserProfile" component={ManagerDashboard} />
                <Route path="/Requests" component={ManagerDashboard} />
                <Route path="/DevList" component={ManagerDashboard} />
                <Route path="/view/:id" component={ManagerDashboard} />
                <Route exact path="/DevProfile" component={DeveloperDashboard} />
                <Route exact path="/DevRequests" component={DeveloperDashboard} />
                <Route exact path="/AvailableProjects" component={DeveloperDashboard} />
                <Route path="/DevHome" component={DeveloperDashboard} />
                <Route exact path="/Add" component={AdminDashboard} />
                <Route path="/ViewAll" component={AdminDashboard} />
                </Switch>
            </Router>
        )
    }
}

export default App;