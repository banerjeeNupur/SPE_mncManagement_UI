import React, {Component} from "react";
import projectService from "../services/projectService";
import {Link} from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Container from "reactstrap/es/Container";

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

                <Container>

                    <Row>
                        <Col md={6}>
                        <ul className="list-group">
                        {requests &&
                        requests.map((request, index) => (
                            <li className={"list-group-item " +(index === currentIndex ? "active" : "")}
                                onClick={() => this.setActiveRequest(request, index)}
                                key={index}>
                                Project ID : {request.projectId} <br/>
                            </li>
                        ))}
                    </ul>
                        </Col>

                        <Col md={6}>
                            <div>
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
                            
                       

                        <button type="submit" className="badge badge-success" onClick={this.updateRequest}>
                            Approve
                        </button>
                        <br/>
                        <button type="submit" className="badge badge-success" onClick={this.updateRequest}>
                            Reject
                        </button>
                        
                    </div>):(
                        <div>
                        <br />
                        <p>Click on a request to view details</p>
                        </div>)}
                            </div>        
                        </Col>
                    </Row>
                </Container>


            </div>
        )
    }

}

export default Requests