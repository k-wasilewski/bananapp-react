import React, {useState} from 'react'
import { Formiz, useForm } from '@formiz/core'
import { isEmail } from '@formiz/validations' // Import some validations
import { FormField } from './FormField' // Import your field
import axios from 'axios';

export const FormRegister = () => {
    const myForm = useForm();
    const [message, setMessage] = useState('');

    const handleSubmit = (values) => {
        axios.post('http://localhost:8081/create-user',
            `username=${values.email}&password=${values.password}`
        ).then(function (response) {
            if (response.status === 200) {
                if (response.data==='success')
                    setMessage('Registration success');
                else
                    setMessage('Registration failed');
            }
        });
    };

    return (
        <Formiz connect={myForm} onValidSubmit={handleSubmit} >
            <div id='msg'>{message}</div>
            <form noValidate onSubmit={myForm.submit} id='form'>
                <FormField name='email' label='E-mail: ' id='emailField' validations=
                    {[{
                            rule: isEmail(),
                            message: 'This is not a valid email',
                        }]}
                />
                <FormField name='password' label='Password: ' id='passwordField'
                           type='password' />
                <FormField name='passwordConfirm' label='Confirm password: ' type='password'
                    validations=
                        {[{
                            rule: (value) => myForm.values.password === value,
                            deps: [myForm.values.password],
                            message: 'Passwords do not match',
                        }]}
                />
                <button className='formBtn' type='submit' id='submit'
                        disabled={!myForm.isValid}>
                    Submit
                </button>
            </form>
        </Formiz>
    );
};

