import React from 'react'
import { Formiz, useForm } from '@formiz/core'
import { isEmail } from '@formiz/validations' // Import some validations
import { FormField } from './FormField' // Import your field
import axios from 'axios';
import { useState } from 'react'

export const FormRegister = () => {
    const myForm = useForm();
    const [redirect, setRedirect] = useState(0);

    const handleSubmit = (values) => {
        axios.post('http://localhost:8081/create-user',
            `username=${values.email}&password=${values.password}`
        ).then(function (response) {
            if (response.status === 200) {
                setRedirect(response.data);
            }
        });
    };

    let message = (<div/>);
    if (redirect === 'success') {
        message = (<div>Registration success</div>);
    } else if (redirect !== 0) {
        message = (<div>Registration failed</div>);
    }

    return (
        <Formiz connect={myForm} onValidSubmit={handleSubmit} >
            {message}
            <form noValidate onSubmit={myForm.submit}>
                <FormField name='email' label='E-mail: ' validations=
                    {[{
                            rule: isEmail(),
                            message: 'This is not a valid email',
                        }]}
                />
                <FormField name='password' label='Password: ' type='password' />
                <FormField name='passwordConfirm' label='Confirm password: ' type='password'
                    validations=
                        {[{
                            rule: (value) => myForm.values.password === value,
                            deps: [myForm.values.password],
                            message: 'Passwords do not match',
                        }]}
                />
                <button className='formBtn' type='submit' disabled={!myForm.isValid}>
                    Submit
                </button>
            </form>
        </Formiz>
    );
};

