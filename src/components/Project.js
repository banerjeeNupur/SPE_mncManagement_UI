import React, {Component} from "react";
import ProjectService from "../services/projectService";
import projectService from "../services/projectService";

class Project extends Component{

    constructor(props) {
        super(props);
        this.getProject = this.getProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeManager = this.onChangeManager.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeTechnology = this.onChangeTechnology.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.state = {
            id: this.props.match.params.id,
            currentProject: {
                id: null,
                name: "",
                status: "",
                manager_id: "",
                technology: "",
                projectId: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        if(this.state.id === undefined){
            this.setState({
                    id: JSON.parse(localStorage.getItem('idValue'))
                }, () => this.getProject(this.state.id))
        }
        else{
            localStorage.setItem('idValue', JSON.stringify(this.state.id))
            this.getProject(this.state.id);
        }
    }

    getProject(id) {
        ProjectService.get(id)
            .then(response => {
                this.setState({
                    currentProject: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                alert('an error occured! Please refresh the page or try logging back in!');
            });
    }

    updateProject() {
        ProjectService.update(
            this.state.currentProject
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The project was updated successfully!"
                    
                });
                alert("The project was updated successfully!");
                this.props.history.push('/ProjectList')
            })
            .catch(e => {
                console.log(e);
                alert('an error occured! Please refresh the page or try logging back in!');
            });
    }

    onChangeName(e) {
        const name = e.target.value;
        this.setState(function(prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentProject,
                    name: name
                }
            };
        });
    }

    onChangeTechnology(e) {
        const technology = e.target.value;
        this.setState(function(prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentProject,
                    technology: technology
                }
            };
        });
    }

    onChangeStatus(e) {
        const status = e.target.value;
        this.setState(function(prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentProject,
                    status: status
                }
            };
        });
    }

    onChangeManager(e) {
        const manager_id = e.target.value;
        this.setState(function(prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentProject,
                    manager_id: manager_id
                }
            };
        });
    }
 
    deleteProject() {
        console.log('in delete project: ',this.state.currentProject)
        projectService.delete(this.state.currentProject.id)
            .then(response => {
                console.log('in the response section',response.data);
                alert('Project deleted!')
                this.props.history.push('/ProjectList')
                
            })
            .catch(e => {
                console.log(e);
                alert('an error occured! Please refresh the page!');
            });
    }

    render() {
        const { currentProject } = this.state;

        return(
            <div> {currentProject ? (
                <div className="edit-form">

                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Project ID : {currentProject.projectId} </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={currentProject.name}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="technology">Technology</label>
                            <input
                                type="text"
                                className="form-control"
                                id="technology"
                                value={currentProject.technology}
                                onChange={this.onChangeTechnology}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <input
                                type="text"
                                className="form-control"
                                id="status"
                                value={currentProject.status}
                                onChange={this.onChangeStatus}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mgrId">Manager ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mgrId"
                                value={currentProject.manager_id}
                                onChange={this.onChangeManager}
                            />
                        </div>


                    </form>



                    <button
                        className="badge badge-danger mr-2"
                        onClick={this.deleteProject}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateProject}
                    >
                        Update
                    </button>
                    
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Project to view details...</p>
                </div>
            )} </div>
        )
    }
}

export default Project