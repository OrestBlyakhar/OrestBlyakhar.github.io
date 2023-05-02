import React from 'react';
import { Form, Button, ButtonToolbar, Schema } from 'rsuite';
import style from "./LoginPage.module.scss"

const TextField = (props) => {
    const {name, accepter, placeholder, ...rest} = props;
    return (
        <Form.Group controlId={style.form}>
            <Form.Control name={name} accepter={accepter} placeholder={placeholder} {...rest} />
        </Form.Group>
    );
};
const {StringType} = Schema.Types;

const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),

    password: StringType()
        .isRequired('This field is required.')
        .minLength(6, 'Minimum 6 characters required'),
});

const Login = ({handleLogin}) => {
    const formRef = React.useRef();
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
    });

    const handleSubmit = () => {
        if (!formRef.current.check()) {
            return;
        }
        console.log('onSubmit', formValue);
        handleLogin(formValue);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.main}>
                <h2>Login</h2>
                <Form
                    model={model}
                    ref={formRef}
                    onChange={setFormValue}
                    formValue={formValue}
                >
                    <TextField name="email" placeholder="Email" label="Email"/>
                    <TextField name="password" placeholder="Password" type="password" autoComplete="off" />
                    <ButtonToolbar>
                        <Button className={style.btnLogin} appearance="primary" type="submit" onClick={handleSubmit}>
                            Login
                        </Button>
                    </ButtonToolbar>
                </Form>
            </div>
        </div>
    )
};

export default Login;