
import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';

class LoginMid extends Component{

    constructor(props){
        super(props)
        this.state = {
           credentials: this.props.location.credentials,
            user_id : this.props.location.credentials.empId,
            user_type : this.props.location.credentials.user_type,
        }
    }

    componentDidMount(){
        
        // localStorage.clear()
        localStorage.setItem('current_id',this.state.user_id)
        localStorage.setItem('current_user_type',this.state.user_type)
        localStorage.setItem('isLoggedIn',true)

        if(localStorage.getItem('current_user_type') === 'admin'){
            console.log('mid : admin loggen in')
            
        }
        else if(localStorage.getItem('current_user_type') === 'manager'){
            console.log('mgr : mgr loggen in')
           
        }

        
        console.log('mid mount: ',localStorage.getItem('current_user_type'))
    }

    render(){

        console.log('From login mid :',this.state.user_id,this.state.user_type)
        
        if(localStorage.getItem('current_user_type') === 'admin'){
            return (
                <AdminDashboard></AdminDashboard>  
            )
        }
        else return(
            <ManagerDashboard></ManagerDashboard>
        )

        
    }

}

export default LoginMid