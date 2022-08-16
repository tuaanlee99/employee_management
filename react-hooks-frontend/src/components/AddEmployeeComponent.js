import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailID, setEmailID] = useState('')
    const navigate = useNavigate();
    const {id} = useParams()

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {firstName, lastName, emailID}

        if(id){
            EmployeeService.updateEmployee(id, employee).then((Response) =>{
                navigate('/employees')
            }).catch(error =>{
                console.log(error)
            })

        }else{
            EmployeeService.createEmployee(employee).then((Response) =>{
                console.log(Response.data)
    
                navigate('/employees');
    
            }).catch(error => {
                console.log(error)
            })
        }       
    }

    useEffect(() => {
      
        EmployeeService.getEmployeeById(id).then((Response) =>{
            setFirstName(Response.data.firstName)
            setLastName(Response.data.lastName)
            setEmailID(Response.data.emailID)
        }).catch(error =>{
            console.log(error)
        })
    }, [])

    const title = () => {
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }
    

    return (
        <div>
            <br></br>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 '>
                        {
                            title()
                        }
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input
                                    type="text"
                                    placeholder='enter first name'
                                    name='firstName'
                                    className='form-control'
                                    value={firstName}
                                    onChange = {(e) => setFirstName(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input
                                    type="text"
                                    placeholder='enter last name'
                                    name='lastName'
                                    className='form-control'
                                    value={lastName}
                                    onChange = {(e) => setLastName(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email ID</label>
                                <input
                                    type="text"
                                    placeholder='enter email id'
                                    name='emailID'
                                    className='form-control'
                                    value={emailID}
                                    onChange = {(e) => setEmailID(e.target.value)}
                                >
                                </input>
                            </div>

                            <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                            <Link to = '/employees' className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployeeComponent