import React, {Component} from "react";
import {Container} from "reactstrap";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Header from "./Header";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from "react-router-dom";
import {Switch} from "react-router";
import Register from "./Register";
import UserList from "./UserList";

import EmployeeDetails from "./EmployeeDetails";
class AdminDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            empId: null,
            user_type: ""
        }
    }
    componentDidMount() {

        console.log('from the admin: ',this.props.empId)
    }

    render() {

        return(
            <Router>
                <Container>
                    <Header></Header>
                    <Row>
                        <Col md={4}>

                            <ListGroup>
                                <ListGroupItem><Link to="/AdminDashboard">Home</Link></ListGroupItem>
                                <ListGroupItem><Link to="/Add">Register a new User</Link></ListGroupItem>
                                <ListGroupItem><Link to="/ViewAll">Employee List</Link></ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={8}>
                            <Switch>
                                <Route exact path="/Add" component={Register}/>
                                <Route path="/ViewAll" component={UserList} />
                                <Route path="/empDetails/:id" component={EmployeeDetails} />
                            </Switch>


                        </Col>
                    </Row>
                </Container>
            </Router>

        )
    }
}

export default AdminDashboard