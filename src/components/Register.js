import React, {Component} from "react";
import employeeService from '../services/employeeService'
class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user_type: "",
            id: null,
            error_message: false
        }
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.user_type.length>0;
    }

    addUser(){
        var data={
            username: this.state.username,
            password: this.state.password,
            user_type: this.state.user_type
        }

        employeeService.add(data)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    id: response.data.id,
                    submitted: true
                });
                if(response.data.username === null) this.setState({error_message: true, submitted: false})
                console.log('error message : ',this.state.error_message,response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }




    render() {
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>

                        {/*<h4>You submitted successfully!</h4>*/}
                        <button className="btn btn-success" >
                            Add
                        </button>
                    </div>
                ) : (

                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>

                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                required
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                required
                                onChange={this.handleChange}
                                name="password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="user_type">User Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="user_type"
                                required
                                onChange={this.handleChange}
                                name="user_type"
                            />
                        </div>



                        <button onClick={this.addUser} className="btn btn-success">
                            Submit
                        </button>

                        <h3 style={{display: this.state.error_message ? "block" : "none"}}>
                            Username already exists!
                        </h3>
                    </div>
                )}
            </div>
        )
    }
}

export default Register