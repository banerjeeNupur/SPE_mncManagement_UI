import React, { Component } from 'react';
import projectService from "../services/projectService";
import {Link, Route} from "react-router-dom";

class AvailableProjects extends Component{

    constructor(props){
        super(props)
        this.state = {
            loaded : false,
            projects: [],
            currentProject : null,
            currentIndex: -1
        }
        this.loadProjects = this.loadProjects.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
        this.refreshList = this.refreshList.bind(this)
     }

     componentDidMount(){
         this.loadProjects(localStorage.getItem('current_user_id'))
     }

     loadProjects(id){
        projectService.getAvailableProjects(id)
            .then(response => {
                this.setState({
                    projects: response.data,
                    loaded: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    sendRequest(project,index){
        var data = {
            empId: localStorage.getItem('current_user_id'),
            projectId: project.projectId,
            status: 'pending'
        }

        console.log(data)
        projectService.makeRequest(data)
            .then(response => {
                console.log(response.data);
                this.refreshList()
                this.setState({
                    loaded:false,
                    message: "The request was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });

        console.log(this.state.currentProject)
    }

    refreshList(){
        this.loadProjects(localStorage.getItem('current_user_id'))
    }

    render(){

        if(!this.state.loaded){
            return(
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }

        const { projects, currentIndex} = this.state
        return(
            <div className="col-md-6">
                    <ul className="list-group">
                        {projects &&
                        projects.map((project, index) => (
                            <li className={ "list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => this.sendRequest(project, index)}
                                key={index}
                            >
                                {/*{tutorial.projectId} <br/>*/}
                                {project.name} <br/>
                                {/*{tutorial.manager_id} <br/>*/}
                                {/*{tutorial.technology} <br/>*/}
                                {/*{tutorial.status} <br/>*/}

                            </li>
                        ))}

                    </ul>

                    <br/>
                    <br/>
                    <p>{this.state.message}</p>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.refreshList}
                    >
                        Refresh list
                    </button>
                </div>
        )
    }

}

export default AvailableProjects