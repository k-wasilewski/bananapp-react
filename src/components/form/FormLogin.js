import React from 'react'
import { Formiz, useForm } from '@formiz/core'
import { isEmail } from '@formiz/validations' // Import some validations
import { FormField } from './FormField'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { useState } from 'react'

export const FormLogin = () => {

    const myForm = useForm();

    const [redir, setRedir] = useState(0);
    const [username, setUsername] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (values) => {
        axios.post('http://localhost:8081',
            `username=${values.email}&password=${values.password}`,
            {withCredentials: true}
        ).then(function (response) {
            if (response.data === 'success') {
                setUsername(values.email);
                setRedir('success');
                setErrorMsg('');
            } else {
                setRedir('fail');
                setErrorMsg('Login failed');
            }
        });
        axios.post('http://localhost:8082/auth/user',
            'uname=' + values.email
        );
    };

    if (redir !== 'success') {
        return (
            <Formiz connect={myForm} onValidSubmit={handleSubmit}>
                <form noValidate onSubmit={myForm.submit} id='form'>
                    <div id='errorMsg'>{errorMsg}</div>
                    <FormField name='email' label='E-mail: ' id='emailField' validations=
                        {[{
                                rule: isEmail(),
                                message: 'This is not a valid email',
                            }]}
                    />
                    <FormField name='password' label='Password: ' id='passwordField'
                               type='password' />
                    <button className='formBtn' type='submit' id='submit'
                            disabled={!myForm.isValid}>
                        Submit
                    </button>
                </form>
            </Formiz>
        );
    } else if (redir === 'success') {
        return (<Redirect to={{
            pathname: '/success',
            state: {username: username}}}/>
        );
    }
};

