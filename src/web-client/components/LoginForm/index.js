import React, {Component} from 'react';
//import {Form, Text} from 'react-form';
import styles from '@/web-client/components/LoginForm/style.css';
//import uniqueId from 'lodash/uniqueId';

/*
export default ({onSubmit}) => (
    <Form
        onSubmit={onSubmit}
        defaultValues={{
            username: 'store-owner',
            password: 'password',
        }}
    >
        {formApi => (
            <form
                onSubmit={formApi.submitForm}
            >
                <div className={styles.inputContainer}>
                    <div className={styles.inputElementSet}>
                        <span className={styles.inputElementPart}>
                            <label htmlFor="username">User Name</label>
                        </span>
                        <span className={styles.inputElementPart}>
                            <Text className={styles.inputElement} field="username" type="text"/>
                        </span>
                    </div>
                    <div className={styles.inputElementSet}>
                        <span className={styles.inputElementPart}>
                            <label htmlFor="password">Password</label>
                        </span>
                        <span className={styles.inputElementPart}>
                            <Text className={styles.inputElement} field="password" type="password"/>
                        </span>
                    </div>
                </div>
                <div>
                    <button className={styles.submitButton} type="submit">Login</button>
                </div>
            </form>
        )}
    </Form>
);
*/

export default class LoginForm extends Component
{
    constructor (props)
    {
        super(props);
        this.formElements = {};
    }

    render ()
    {
        return (
            <form onSubmit={this.onSubmitForm.bind(this)}>
                <input
                    name="username"
                    type="text"
                    className={styles.inputElement}
                    ref={this.onReferenceElement.bind(this)}
                    placeholder="User Name"
                />
                <input
                    name="password"
                    type="password"
                    className={styles.inputElement}
                    ref={this.onReferenceElement.bind(this)}
                    placeholder="Password"
                />
                <button className={styles.submitButton} type="submit">Login</button>
            </form>
        );
    }

    onSubmitForm (event)
    {
        event.preventDefault();
        const {onSubmit} = this.props;
        const values = {};
        for (let key of Object.keys(this.formElements))
        {
            const element = this.formElements[key];
            let value = element.value;
            if (element.getAttribute('type') === 'number')
            {
                value = Number.parseInt(value);
            }
            values[key] = value;
        }
        onSubmit(values);
    }

    onReferenceElement (element)
    {
        if (!element) return;
        const name = element.getAttribute('name');
        this.formElements[name] = element;
        //element.value = this.props.defaultValues[name];
    }
}