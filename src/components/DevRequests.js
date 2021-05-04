import React, { Component } from 'react';
import projectService from "../services/projectService";
import {Link, Route} from "react-router-dom";


class DevRequests extends Component{

    constructor(props) {
        super(props);
        this.retrieveRequests = this.retrieveRequests.bind(this);
        this.state = {
            requests: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",
            loaded: false
        };
    }

    componentDidMount() {
        this.retrieveRequests(localStorage.getItem('current_user_id'));
    }

    retrieveRequests(id) {
        projectService.getEmpRequest(id)
            .then(response => {
                this.setState({
                    requests: response.data,
                    loaded: true
                });
                console.log(response.data);
                console.log('requests : ',this.state.requests)
                
            })
            .catch(e => {
                console.log(e);
            });
        
    }

    render(){

        const { requests } = this.state.requests;
        // console.log('request in render: ',requests)  -------- empty list 
        console.log('request in render: ',this.state.requests)
        return this.state.requests.length ? (
           
                <div >
                <h3>Request list</h3>
                    <ul className="list-group">
                        {requests &&
                        requests.map((request) => (
                       
                            <li className={"list-group-item "}>
                                {request.data.projectId} 
                            </li>
                        ))}

                    </ul>
                
                    
            </div>
        ) : <span>Loading </span>

    }
}

export default DevRequests