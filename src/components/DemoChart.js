import React, {Component} from "react";
import projectService from "../services/projectService";
import {Chart} from "react-chartjs-2";

class DemoChart extends Component{

    constructor(props) {
        super(props);
        this.generateChart = this.generateChart.bind(this);
        this.retrieveProjects = this.retrieveProjects.bind(this);

        this.state = {
            projects: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",
            result : [],

        };
    }

     componentDidMount() {
         this.retrieveProjects()

    }

    retrieveProjects() {
        projectService.getAll()
            .then(response => {
                this.setState({
                    projects: response.data
                });
                console.log('response data',response.data);
                this.generateChart()
            })
            .catch(e => {
                console.log(e);
            });

    }

    generateChart(){
        console.log('from the state',this.state.projects)
        this.state.result = this.state.projects.map(project => ({status : project.status}))
        console.log('this is the result',this.state.result)

        let active = 0;
        let complete = 0;
        let count = [];
        for (let i = 0; i < this.state.result.length; i++) {
            count[i] = this.state.result[i].status
            if(this.state.result[i].status === 'active') active++;
            else if(this.state.result[i].status === 'temp') complete++;
        }
        console.log('count array : ',count)
        console.log('active : ',active,'  complete: ',complete)

        let myChart = document.getElementById('myChart').getContext('2d')
        let chart = new Chart(myChart,
            {
                type: "pie",
                data:{
                    labels: ['active','complete'],
                    datasets: [{
                        label: 'count',
                        data: [active,complete],
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

    render() {
        return(
            <div>
                <div className="container">
                    <h3>Demo chart component</h3>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        )
    }

}

export default DemoChart