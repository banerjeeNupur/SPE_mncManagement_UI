import React, {Component} from "react";
import projectService from "../services/projectService";
import {Link} from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class ProjectList extends Component{

    constructor(props) {
        super(props);
        this.retrieveProjects = this.retrieveProjects.bind(this);
        this.state = {
            projects: [],
            currentProject: null,
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
            currentProject: null,
            currentIndex: -1
        });
    }

    setActiveProject(tutorial, index) {
        this.setState({
            currentProject: tutorial,
            currentIndex: index
        });
    }


    render() {
        const { projects, currentProject, currentIndex } = this.state;
        return(
            <div>

                <Row>
                    <Col md={6}>
                    <ul className="list-group">
                        {projects &&
                        projects.map((p, index) => (
                            <li
                                className={"list-group-item" +(index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveProject(p, index)}
                                key={index}>

                                Project ID : {p.projectId}<br/>
                                
                            </li>
                        ))}
                    </ul>
                    </Col>    
               <Col md={6}>
               <div>
                    {currentProject ?(
                        <div>
                            <h4>Project Details</h4>
                            
                            <div>
                                <label>
                                    <strong>Project ID:</strong>
                                </label>{" "}
                                {currentProject.projectId}
                            </div>

                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentProject.name}
                            </div>

                            <div>
                                <label>
                                    <strong>Technology:</strong>
                                </label>{" "}
                                {currentProject.technology}
                            </div>


                            <Link
                                to={"/view/" + currentProject.id}
                                className="badge badge-warning">
                                Edit
                            </Link>
                        </div>
                    ):  (
                        
                            <div>
                            <br />
                            <p>Click on a project to view details</p>
                        </div>
                     
                        )}


                     </div>
               </Col>
                
                </Row>
                <br/><br/>
                <Row>
                <Link
                    to={"/addProject"}
                    className="badge badge-warning">
                    Add a new Project
                </Link>
                </Row>
                


            </div>
        )
    }
}

export default ProjectList