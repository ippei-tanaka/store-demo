import React from 'react';
import {Form, Text} from 'react-form';
import styles from '@/web-client/components/LoginForm/style.css';

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