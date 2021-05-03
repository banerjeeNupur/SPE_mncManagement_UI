import React, {Component} from "react";
import projectService from "../services/projectService";
import {Link} from "react-router-dom";
class Requests extends Component{

    constructor(props) {
        super(props);
        this.retrieveRequests = this.retrieveRequests.bind(this)
        this.updateRequest = this.updateRequest.bind(this)
        this.state = {
            requests: [],
            currentRequest: null
        }
    }

    componentDidMount() {
        this.retrieveRequests();
    }

    retrieveRequests(){
        projectService.getRequests()
        .then(response => {
            this.setState({
                requests: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    setActiveRequest(request, index) {
        this.setState({
            currentRequest: request,
            currentIndex: index
        });
    }

    updateRequest(){
        projectService.updateRequest(
            this.state.currentRequest
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



    render() {
        const { requests, currentRequest, currentIndex } = this.state;
        return(
            <div>


                <div className="col-md-6">
                    <ul className="list-group">
                        {requests &&
                        requests.map((request, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveRequest(request, index)}
                                key={index}
                            >
                                {/*{tutorial.projectId} <br/>*/}
                                Project ID : {request.projectId} <br/>
                                {/*{tutorial.manager_id} <br/>*/}
                                {/*{tutorial.technology} <br/>*/}
                                {/*{tutorial.status} <br/>*/}

                            </li>
                        ))}

                    </ul>
                </div>
                <div className="col-md-6">
                    {currentRequest ?(
                        <div>
                            
                            <div>
                                <label>
                                    <strong>Project ID:</strong>
                                </label>{" "}
                                {currentRequest.projectId}
                            </div>
                            <div>
                                <label>
                                    <strong>Employee ID:</strong>
                                </label>{" "}
                                {currentRequest.empId}
                            </div>
                            <div>
                                <label>
                                    <strong>Employee skills:</strong>
                                </label>{" "}
                                {currentRequest.id}
                            </div>

                            {/* <Link
                                to={"/approveRequest/" + currentRequest.id}
                                className="badge badge-warning">
                                Approve
                            </Link> */}

                        <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateRequest}>
                        Update
                        </button>
                        
                    </div>):(
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

export default Requests