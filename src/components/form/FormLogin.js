import React from 'react'
import { Formiz, useForm } from '@formiz/core'
import { isEmail } from '@formiz/validations' // Import some validations
import { FormField } from './FormField'
import axios from "axios";
import {Redirect} from "react-router-dom";
import { useState } from 'react'

export const FormLogin = () => {

    const myForm = useForm();

    const [redirect, setRedirect] = useState(0);
    const [username, setUsername] = useState(0);

    const handleSubmit = (values) => {
        axios.post('http://localhost:8081',
            "username=" + values.email + "&" + "password=" + values.password,
            {withCredentials: true}
        ).then(function (response) {
            if (response.status === 200) {
                setUsername(values.email);
                setRedirect('success');
            }
        });
        axios.post('http://localhost:8082/auth/user',
            "uname=" + values.email
        );
    };

    let error_msg = (<div/>);
    if (redirect != 'success' && redirect != 0) {
        error_msg = (<div>Login failed</div>)
    }

    if (redirect != 'success') {
        return (
            <Formiz
                connect={myForm}
                onValidSubmit={handleSubmit}
            >
                <form
                    noValidate
                    onSubmit={myForm.submit}
                >
                    {error_msg}
                    <FormField
                        name="email"
                        label="E-mail: "
                        validations={[
                            {
                                rule: isEmail(),
                                message: 'This is not a valid email',
                            },
                        ]}
                    />
                    <FormField
                        name="password"
                        label="Password: "
                        type="password"
                    />
                    <button
                        type="submit"
                        disabled={!myForm.isValid}
                    >
                        Submit
                    </button>
                </form>
            </Formiz>
        );
    } else if (redirect == "success") {
        return (<Redirect to={{
            pathname: '/success',
            state: {username: username}}}/>
        );
    }
};

