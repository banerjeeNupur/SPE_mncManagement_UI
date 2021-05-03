import React, { Component } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: "",
            user_type: null,
            empId: null,
            loggedId: false,
            admin: false,
            manager: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { username, password } = this.state;

        axios
            .post(
                "http://localhost:8764/login",
                {

                        username: username,
                        password: password
                },
                // { withCredentials: true }
            )
            .then(response => {
                console.log('response is :',response.data)
                this.setState({
                    user_type: response.data.user_type,
                    empId: response.data.empId,
                    loggedIn: true
                })

                if(response.data.user_type === 'admin'){
                    this.setState({
                        admin: true
                    })
                }
                else if(response.data.user_type === 'manager'){
                    this.setState({
                        manager:true
                })
                }
            })
            .catch(error => {
                console.log("login error", error);
            });
        event.preventDefault();
    }

    render() {
        const { loggedIn } = this.state.loggedIn;
        const { admin } = this.state.admin;
        const { manager } = this.state.manager;

        return (
            <div>
                {loggedIn ? (
                    // { admin ?  (
                    //         <AdminDashboard ></AdminDashboard>
                    //     ) : (
                    //         <ManagerDashboard></ManagerDashboard>
                    //     )
                    // }

                    <AdminDashboard ></AdminDashboard>
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Email"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />

                        <button type="submit">Login</button>
                    </form>)

                }
            </div>
        );
    }
}