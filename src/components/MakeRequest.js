import React, { Component } from 'react';
import {Link} from "react-router-dom";
import projectService from "../services/projectService";


class MakeRequest extends Component{

    constructor(props) {
        super(props);
        this.retrieveProjects = this.retrieveProjects.bind(this);
        this.state = {
            projects: [],
            currentProject: null,
            currentIndex: null
        };
    }

    componentDidMount() {
        this.retrieveProjects();
    }

    retrieveProjects() {
        projectService.getAll()
            .then(response => {
                this.setState({
                    projects: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setActiveProject(project, index) {
        this.setState({
            currentProject: project,
            currentIndex: index
        });
    }

    sendRequest(){
        projectService.makeRequest(
            this.state.currentProject
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The request was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render(){
        const { projects, currentProject, currentIndex } = this.state;

        return(
             <div>


                <div className="col-md-6">
                    <ul className="list-group">
                        {projects &&
                        projects.map((project, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveProject(project, index)}
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
                </div>
                <div className="col-md-6">
                    {currentProject ?(
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentProject.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentProject.name}
                            </div>

                            <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.sendRequest}>
                        Make request
                        </button>

                        </div>
                    ):  (
                        <div>
                        <br />
                        <p>Please click on a Project...</p>
                        </div>)}


                </div>



            </div>
        )
    }

}

export default MakeRequest