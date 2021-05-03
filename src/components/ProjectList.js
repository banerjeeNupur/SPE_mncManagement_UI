import React, {Component} from "react";
import Project from "./Project";
import projectService from "../services/projectService";
import {Link, Route} from "react-router-dom";

class ProjectList extends Component{

    constructor(props) {
        super(props);
        this.retrieveProjects = this.retrieveProjects.bind(this);
        this.state = {
            projects: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
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

    refreshList() {
        this.retrieveProjects();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }


    render() {
        const { searchTitle, projects, currentTutorial, currentIndex } = this.state;
        return(
            <div>


                <div className="col-md-6">
                    <ul className="list-group">
                        {projects &&
                        projects.map((tutorial, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveTutorial(tutorial, index)}
                                key={index}
                            >
                                {/*{tutorial.projectId} <br/>*/}
                                {tutorial.name} <br/>
                                {/*{tutorial.manager_id} <br/>*/}
                                {/*{tutorial.technology} <br/>*/}
                                {/*{tutorial.status} <br/>*/}

                            </li>
                        ))}

                    </ul>
                </div>
                <div className="col-md-6">
                    {currentTutorial ?(
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTutorial.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTutorial.name}
                            </div>


                            <Link
                                to={"/view/" + currentTutorial.id}
                                className="badge badge-warning">
                                Edit
                            </Link>
                        </div>
                    ):  (
                        <div>
                        <br />
                        <p>Please click on a Project...</p>
                        </div>)}


                </div>

                <Link
                    to={"/addProject"}
                    className="badge badge-warning">
                    Add
                </Link>


            </div>
        )
    }
}

export default ProjectList