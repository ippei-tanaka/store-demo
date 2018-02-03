import React from 'react';
import {Form, Text, Password} from 'react-form';

export default ({onSubmit}) => (
    <Form onSubmit={onSubmit}>
        {formApi => (
            <form onSubmit={formApi.submitForm} id="form2">
                <label htmlFor="username">User Name</label>
                <Text field="username" id="username"/>
                <br/>
                <label htmlFor="password">Password</label>
                <Text field="password" id="password"/>
                <br/>
                <button type="submit">Login</button>
            </form>
        )}
    </Form>
);