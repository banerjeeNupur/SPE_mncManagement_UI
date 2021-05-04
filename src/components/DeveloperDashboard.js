import React, {Component} from "react";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Header from "./Header";
import {Switch} from "react-router";
import {Container} from "reactstrap";
import UserProfile from "./UserProfile";
import DevRequests from "./DevRequests"

class DeveloperDashboard extends Component{

    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(){
        console.log('Dev is logging out. Clearing local storage.')
        localStorage.removeItem('current_user_id')
        localStorage.removeItem('current_user_type')
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
                            <ListGroupItem><Link to="/DeveloperDashboard">Home</Link></ListGroupItem>
                            <ListGroupItem><Link to="/Profile">Profile</Link></ListGroupItem>
                            <ListGroupItem><Link to="/ProjectsAvailable">Projects available</Link></ListGroupItem>
                            <ListGroupItem><Link to="/Requests">Request status</Link></ListGroupItem>
                            <ListGroupItem><Link to="/Login" onClick={this.logout} >Logout</Link></ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={8}>
                        <Switch>
                            <Route exact path="/Profile" component={UserProfile}/>
                            <Route exact path="/Requests" component={DevRequests}/>
                            {/* <Route path="/empDetails/:id" component={EmployeeDetails} /> */}
                        </Switch>


                    </Col>
                </Row>
            </Container>
        </Router>
        )
    }
}

export default DeveloperDashboard