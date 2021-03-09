import React, { Component } from 'react';
import Input from '../../../components/UI/Forms/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-form';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classess from './SubmitButton.css';
import classesss from '../../Table/Table.css';
import Aux from '../../../hoc/Aux'; 

class ContactData extends Component { 
    state = {
        orderForm: {
            firstName: {
                name: 'First Name',
                minReqChar: '2',
                elementType: 'input',
                elementConfig: {
                type: 'text',
                placeholder: 'Your first Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false
            },
            lastName: {
                name: 'Last Name',
                minReqChar: '2',
                elementType: 'input',
                elementConfig: {
                type: 'text',
                placeholder: 'Your last Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false
            },
            birthDate: {
                name: 'Birth Date',
                elementType: 'input',
                elementConfig: {
                type: 'date',
                placeholder: 'Your Birthdate'
                },
                value: '',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false,
                
            },
            birthPlace: {
                name: 'Birth-Place name',
                minReqChar: '2',
                elementType: 'input',
                elementConfig: {
                type: 'text',
                placeholder: 'Your birthplace'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2
                },
                valid: false,
                touched: false
            },
            addressl1: {
                name: 'Address',
                minReqChar: '5',
                elementType: 'input',
                elementConfig: {
                type: 'text',
                placeholder: 'Your Address Line 1'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            addressl2: {
                name: 'Address',
                minReqChar: '5',
                elementType: 'input',
                elementConfig: {
                type: 'text',
                placeholder: 'Your Address Line 2'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                name: 'Phone Number',
                minReqChar: '10',
                elementType: 'input',
                elementConfig: {
                type: 'number',
                placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: true,
        loading: false,
       // customers: [],
        items: [],
        editMode: false,
    }

    

    checkValidity(value, rules) {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.time) {
            
            isValid = value.min >= rules.years && isValid
        }
        return isValid;
    }
    
    onSubmitHandler = (event) => {
        event.preventDefault();
       

        

        this.setState({loading: true});
        const sdh = {
            firstName: this.state.orderForm.firstName.value,
            lastName: this.state.orderForm.lastName.value,
            birthDate: this.state.orderForm.birthDate.value,
            birthPlace: this.state.orderForm.birthPlace.value,
            addressl1: this.state.orderForm.addressl1.value,
            addressl2: this.state.orderForm.addressl2.value,
            phoneNumber: this.state.orderForm.phoneNumber.value
        }
        axios.post('/dataset.json', sdh)
        .then(response => {
            this.setState({loading: false});
        })
        .catch(error => {
            this.setState({loading: false});
        });

        let items = [...this.state.items];

        items.push({
            firstName: this.state.orderForm.firstName.value,
            lastName: this.state.orderForm.lastName.value,
            birthDate: this.state.orderForm.birthDate.value,
            birthPlace: this.state.orderForm.birthPlace.value,
            addressl1: this.state.orderForm.addressl1.value,
            addressl2: this.state.orderForm.addressl2.value,
            phoneNumber: this.state.orderForm.phoneNumber.value
        });
        this.setState({
            items : items,
        });
    }


    editDataHandler = (event, id) => {
        event.preventDefault();

       // let items = [...this.state.items];
       // items.filter(item => {
       //     item.id === id;
       //     console.log();
       // });

       const updatedOrderForm = {
           ...this.state.orderForm
       }

       const updatedFormElement = {
           ...updatedOrderForm[id]
       } 


       updatedFormElement.value = event.target.value;

       // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        //updatedFormElement.touched = true;
        updatedOrderForm[id] = updatedFormElement;
        
        let formIsValid = true;
        for(let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: !formIsValid})



    }

    deleteDataHandler = (id) => {


      //  axios.delete('https://formassignment-33325-default-rtdb.firebaseio.com/' + {id})
      //  .then(response => {
      //      console.log(response);
      //  })
      //  .catch(err => {
      //      console.log(err);
      //  });


        console.log(id);
        let items = [...this.state.items]
        //items.filter(item => {
        //    item.key !== id;
        //});
        items.splice(id, 1);
        this.setState({items: items})
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: !formIsValid})
    } 

    render () {

        const formElementsArray=[];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            }); 
        }

        let form  = (
            <form onSubmit={this.onSubmitHandler}>
                
                {formElementsArray.map(formElement => (
                    <Input 
                    name={formElement.config.name}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    touched = {formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                    minReqChar={formElement.config.minReqChar} />
                ))}
                <button 
                className={classess.SubmitButton} 
                disabled={this.state.formIsValid} 
                onClick={this.onSubmitHandler}>Submit</button>
            </form>
        );
        
        const items = this.state.items;
        return (
            <Aux>
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
            <div className={classesss.Table}>
                    <table>
                    <thead>
                        <tr>
                            <th>Number</th>
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
                        {items.map((item,id) => {              

                            return (
                                <tr key={id}>
                                <td scope="row">{id}</td>    
                                <td> {item.firstName} {item.lastName} </td>
                                <td> {item.birthDate} </td>
                                <td> {item.addressl1} , {item.addressl2} </td>
                                <td> {item.birthPlace} </td>
                                <td> {item.phoneNumber} </td> 
                                <td> <button onClick={(event) => this.editDataHandler(event,id)}> Edit </button> </td>
                                <td>  <button onClick={ () => this.deleteDataHandler(id)}> Delete </button></td>
                                </tr>
                            );
                        }) 
                            
                        }
                    </tbody>
                </table>
                </div>
            </Aux>
        );
    }
} 


export default ContactData;

/*
<Input elementType="..." elementConfig="..." value="..." />
<Input inputtype="input" type="text" name="lastName" placeholder="Your last Name" />
<Input inputtype="input" type="date" name="birthDate" placeholder="Your birthdate" />
<Input inputtype="input" type="text" name="birthPlace" placeholder="Your birthplace" />
<Input inputtype="input" type="text" name="addressl1" placeholder="Line 1 of your address" />
<Input inputtype="input" type="text" name="addressl2" placeholder="Line 1 of your address" />
<Input inputtype="input" type="text" name="phoneNumber" placeholder="Your Phone Number " />
*/
//w

/*componentDidMount() {
        axios.get('https://formassignment-33325-default-rtdb.firebaseio.com/.json')
        .then(response => {
            this.setState({firstName: response.data});
        });
    }*/

     //console.log(this.state.orderForm);
        /*const formData = {};
        for(let FormElementIdentifier in this.state.orderForm) {
            formData[FormElementIdentifier] = this.state.orderForm[FormElementIdentifier].value;
        }
        const order = {
            orderForm: formData
        }
        */

         //firstName: '',
            //lastName: '',
            //birthDate: '',
            //birthPlace: '',
            //addressl1:  '',
            //addressl2:  '',
            //phoneNumber: ''


              //axios.get('/dataset.json')
        //.then(res => {
            
            //console.log(res.data);
            //const fetchedData = [];
            //for(let key in res.data) {
              //  fetchedData.push({
                //    ...res.data[key],
                //    id: key,    
                //});
            //}
          //  this.setState({loading: false, customers: fetchedData});
        //})
        //.catch(err => {
        //    this.setState({loading: false});
        //});

       /* const customers = [];
        for (let key in items) {
            customers.push({
                ...items[key],
                id: key
            });
            this.setState({loading: false, customers: customers});
        }*/

        /*    submittedDataHandler = () => {
        this.setState({loading: true});
        const sdh = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthDate: this.state.birthDate,
            birthPlace: this.state.birthPlace,
            addressl1: this.state.addressl1,
            addressl2: this.state.addressl2,
            phoneNumber: this.state.phoneNumber
        }
        axios.post('/data.json', sdh)
        .then(response => {
            this.setState({loading: false});
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }
*/

//let customers = [this.state.customers];
        //customers.splice(id,1);

        // maxDate = {moment().subtract(18, "years")}