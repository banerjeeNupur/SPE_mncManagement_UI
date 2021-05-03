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
import Profile from "./Profile";
import Login from "./Login"

class ManagerDashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            // credentials : this.props.location.credentials
            
        }
        this.logout = this.logout.bind(this);
        
    }

    componentDidMount(){
        // console.log('mgr : ',this.state.credentials);
        
        
    }

    logout(){
        console.log('clearing local storage')
        localStorage.clear()
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
                                {/* target='_blank' */}
                                <ListGroupItem><Link to="/Login" onClick={this.logout} >Logout</Link></ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={8}>
                            <Switch>
                                <Route exact path="/ProjectList" component={ProjectList}/>
                                <Route path="/view/:id" component={Project} />
                                <Route path="/addProject" component={AddProject} />
                                <Route path="/DemoChart" component={DemoChart}/>
                                <Route path="/UserProfile" component={Profile}/>
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
