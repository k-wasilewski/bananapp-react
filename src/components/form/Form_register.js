import React from 'react'
import { Formiz, useForm } from '@formiz/core'
import { isEmail } from '@formiz/validations' // Import some validations
import { Form_field } from './Form_field' // Import your field
import axios from "axios";
import { useState } from 'react'

//REGISTER

export const Form_register = () => {
    const myForm = useForm();
    const [redirect, setRedirect] = useState(0);

    const handleSubmit = (values) => {
        axios.post('http://localhost:8081/create-user',
            "username=" + values.email + "&" + "password=" + values.password
        ).then(function (response) {
            if (response.status === 200) {
                setRedirect(response.data);
            }
        });
    };

    let message = (<div/>);
    if (redirect == 'success') {
        message = (<div>Registration success</div>)
    } else if (redirect != 0) {
        message = (<div>E-mail already exists</div>)
    }

    return (
        <Formiz
            connect={myForm}
            onValidSubmit={handleSubmit}
        >
            {message}
            <form
                noValidate
                onSubmit={myForm.submit}
            >
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
                <Form_field
                    name="passwordConfirm"
                    label="Confirm password: "
                    type="password"
                    validations={[
                        {
                            rule: (value) => myForm.values.password === value,
                            deps: [myForm.values.password],
                            message: 'Passwords do not match',
                        }
                    ]}
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
};

