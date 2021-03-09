import React, { Component } from 'react';
import classes from './Table.css';
import axios from '../../axios-form';

class table extends Component {
    state = {
        customers: [],
        loading: true
    }

    /*componentDidMount () {
        axios.get('/dataset.json')
        .then(res => {
            
            console.log(res.data);
            const fetchedData = [];
            for(let key in res.data) {
                fetchedData.push({
                    ...res.data[key],
                    id: key,    
                });
            }
            this.setState({loading: false, customers: fetchedData});
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }*/

    
    render() {
        const customers = this.state.customers;
        //return (<div></div>);
        return(
            <div className={classes.Table}>
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>Place of Birth</th>
                    <th>Phone Number</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody> 
                {customers.map(customer => {              

                    return (
                        <tr>
                        <td> {customer.firstName} {customer.lastName} </td>
                        <td> {customer.birthDate} </td>
                        <td> {customer.addressl1} , {customer.addressl2} </td>
                        <td> {customer.birthPlace} </td>
                        <td> {customer.phoneNumber} </td> 
                        <td> <button id={customer.firstName}> Edit </button> </td>
                        <td>  <button id={customer.firstName}> Delete </button></td>
                        </tr>
                    );
                }) 
                    
                }
            </tbody>
        </table>
        </div>
        );
    }
 
}

export default table;
/*
{item.firstName} 
{item.lastName}
{item.birthDate} 
{item.birthPlace}
{item.addressl1} 
{item.addressl2} 
{item.phoneNumber}
*/