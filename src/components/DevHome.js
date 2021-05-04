import React, { Component } from 'react'
import {Chart} from "react-chartjs-2";
import { Container } from 'reactstrap';
import projectService from "../services/projectService";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class DevHome extends Component{

    constructor(props) {
        super(props);
        this.generateChart = this.generateChart.bind(this);
        this.getActiveProjects = this.getActiveProjects.bind(this);
        this.getCompletedProjects = this.getCompletedProjects.bind(this);

        this.state = {
            active: [],
            complete: [],
            loadActive : false,
            loadComplete: false
        };
    }

    componentDidMount() {
        this.getActiveProjects(localStorage.getItem('current_user_id'))
        this.getCompletedProjects(localStorage.getItem('current_user_id'))
    }

    getActiveProjects(id){
        projectService.getActiveProjects(id)
            .then(response => {
                this.setState({
                    active: response.data,
                    loadActive: true
                });
                console.log('response data',response.data);
                this.generateChart()
            })
            .catch(e => {
                console.log(e);
            });

    }

    getCompletedProjects(id){
        projectService.getCompletedProjects(id)
            .then(response => {
                this.setState({
                    complete: response.data,
                    loadComplete: true
                });
                console.log('complete data',response.data);
                
            })
            .catch(e => {
                console.log(e);
            });

    }

    generateChart(){
        console.log('generate : active :',this.state.active)

        const result = this.state.active.map(project => ({technology : project.technology}))
        console.log('this is the result',result)

        let backend = 0;
        let frontend = 0;
        let devops = 0;
        // let count = [];
        for (let i = 0; i < result.length; i++) {
            // count[i] = this.state.result[i].status
            if(result[i].technology === 'backend') backend++;
            else if(result[i].technology === 'frontend') frontend++;
            else devops++;
        }
     
        let myChart = document.getElementById('myChart').getContext('2d')
        let chart = new Chart(myChart,
            {
                type: "pie",
                data:{
                    labels: ['frontend','backend','devops'],
                    datasets: [{
                        label: 'count',
                        data: [frontend,backend,devops],
                        backgroundColor:['rgba(120, 202, 211)','rgba(179, 255, 204)'],
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'black'
                    }]
                },
                options:{
                    title:{
                        display: true,
                        text: 'Status of projects',
                        fontSize: 25
                    },
                    legend:{
                        display: true,
                        position: 'right',
                        labels:{
                            fontColor: 'black'
                        }
                    },
                    layout:{
                        padding:{
                            left:50,
                            right:0,
                            top:0,
                            bottom:0
                        }
                    },
                    tooltips:{
                        enabled: false
                    }
                }
            })

    }

    render(){

        if(!this.state.loadActive && !this.state.loadComplete){
            return(
                <div>Loading...</div>
            )
        }

        const { active, complete } = this.state

        return(
            <Container>
                <Row>
                    <div className="container">
                        <canvas id="myChart"></canvas>
                    </div>
                </Row>
                <Row>
                    
                    <Col md={6}>
                        <h3>active list</h3>
                        <ul className="list-group">
                            {active && active.map((a, index) => (
                                <li className={"list-group-item"}>
                                    {a.name} <br/>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    <Col md={6}>
                        <h3>completed list</h3>
                        <ul className="list-group">
                            {complete && complete.map((c, index) => (
                                <li className={"list-group-item"}>
                                    {c.name} <br/>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
            
        )
        
    }
}

export default DevHome