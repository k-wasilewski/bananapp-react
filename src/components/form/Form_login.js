import React from 'react'
import { Formiz, useForm } from '@formiz/core'
import { isEmail } from '@formiz/validations' // Import some validations
import { Form_field } from './Form_field'
import axios from "axios";
import {Redirect} from "react-router-dom";
import { useState } from 'react'

//LOGIN

export const Form_login = () => {

    const myForm = useForm();

    const [redirect, setRedirect] = useState(0);

    const handleSubmit = (values, event) => {
        axios.post('http://localhost:8081',
            "username=" + values.email + "&" + "password=" + values.password
        ).then(function (response) {
            if (response.status === 200) {
                setRedirect(response.data);
            }
        });
        axios.post('http://localhost:8082/auth/user',
            "uname=" + values.email
        ).then(function (response) {
            if (response.status === 200) {
                setRedirect(response.data);
            }
        });
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
                    <Form_field
                        name="email"
                        label="E-mail: "
                        validations={[
                            {
                                rule: isEmail(),
                                message: 'This is not a valid email',
                            },
                        ]}
                    />
                    <Form_field
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
        return (<Redirect to='/success'/>);
    }
};