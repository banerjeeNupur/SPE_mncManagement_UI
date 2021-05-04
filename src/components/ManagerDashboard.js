import React, {Component} from "react";
import {Container} from "reactstrap";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Header from "./Header";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from "react-router-dom";
import ProjectList from "./ProjectList";
import Project from "./Project";
import {Switch} from "react-router";
import AddProject from "./AddProject";
import DemoChart from "./DemoChart";
import UserProfile from "./UserProfile";
import Requests from "./Requests"
import DevList from "./DevList"


class ManagerDashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
        }
        this.logout = this.logout.bind(this);
        
    }

    componentDidMount(){

    }

    logout(){
        console.log('clearing local storage')
        localStorage.removeItem('current_user_type')
        localStorage.removeItem('current_user_id')
        this.props.history.push({
            pathname: '/Login',
        });
    }

    render() {

        return(
            
            <Router>
                <Container>
                    <Header></Header>
                    <Row>
                        <Col md={4}>

                            <ListGroup>
                                <ListGroupItem><Link to="/DemoChart">Home</Link></ListGroupItem>
                                <ListGroupItem><Link to="/ProjectList">Projects</Link></ListGroupItem>
                                <ListGroupItem><Link to="/Requests">Project requests</Link></ListGroupItem>
                                <ListGroupItem><Link to="/UserProfile">Profile</Link></ListGroupItem>
                                <ListGroupItem><Link to="/DevList">Developer details</Link></ListGroupItem>
                                <ListGroupItem><Link to="/Login" onClick={this.logout} >Logout</Link></ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={8}>
                            <Switch>
                                <Route exact path="/ProjectList" component={ProjectList}/>
                                <Route path="/view/:id" component={Project} />
                                <Route path="/addProject" component={AddProject} />
                                <Route path="/DemoChart" component={DemoChart}/>
                                <Route path="/UserProfile" component={UserProfile}/>
                                <Route path="/Requests" component={Requests}  />
                                <Route path="/DevList" component={DevList}/>
                                <Route path="/" component={DemoChart}/>

                            </Switch>


                        </Col>
                        
                    </Row>
                </Container>
            </Router>

        )
        
        
    }
}

export default ManagerDashboard
