import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import employeeService from "../services/employeeService";

class UserList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            currentEmployee: null,
            currentIndex: -1,
            searchTitle: ""
        }
        this.retrieveEmployees = this.retrieveEmployees.bind(this);
        this.setActiveEmployee = this.setActiveEmployee.bind(this);
    }

    componentDidMount() {
        console.log('in user list')
        this.retrieveEmployees();
    }

    retrieveEmployees() {
        employeeService.getAll()
            .then(response => {
                this.setState({
                    employees: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setActiveEmployee(emp, index){
        this.setState({
            currentEmployee: emp,
            currentIndex: index
        });
    }



    render() {
        const { searchTitle, employees, currentEmployee, currentIndex } = this.state;
        return(
            <div>
                <div className="col-md-6">
                    <ul className="list-group">
                        {employees &&
                        employees.map((emp, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveEmployee(emp, index)}
                                key={index}
                            >
                                {emp.username} <br/>

                            </li>
                        ))}

                    </ul>
                </div>
                <div className="col-md-6">
                    {currentEmployee ?(
                        <div>
                            <h4>Employee Details</h4>
                            <div>
                                <label>
                                    <strong>Username:</strong>
                                </label>{" "}
                                {currentEmployee.username}
                            </div>
                            <div>
                                <label>
                                    <strong>User Type:</strong>
                                </label>{" "}
                                {currentEmployee.user_type}
                            </div>


                            <Link
                                to={"/empDetails/" + currentEmployee.id}
                                className="badge badge-warning">
                                Edit
                            </Link>
                        </div>
                    ):  (
                        <div>
                            <br />
                            <p>Click on an employee to view details</p>
                        </div>)}


                </div>




            </div>
        )
    }
}

export default UserList