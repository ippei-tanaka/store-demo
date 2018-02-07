import React from 'react';
import {Form, Text} from 'react-form';

export default ({onSubmit}) => (
    <Form onSubmit={onSubmit} defaultValues={{username:'store-owner', password:'password'}}>
        {formApi => (
            <form onSubmit={formApi.submitForm}>
                <label htmlFor="username">User Name</label>
                <Text field="username" type="text"/>
                <br/>
                <label htmlFor="password">Password</label>
                <Text field="password" type="password"/>
                <br/>
                <button type="submit">Login</button>
            </form>
        )}
    </Form>
);