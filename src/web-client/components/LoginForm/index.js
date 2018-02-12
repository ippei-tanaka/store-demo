import React, {Component} from 'react';
import styles from '@/web-client/components/LoginForm/style.css';

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
                <select
                    className={styles.select}
                    ref={this.referenceElement.bind(this)}
                    name="username"
                    onChange={this.onChangeUsernameSelect.bind(this)}
                >
                    <option value="">- Select User -</option>
                    <option value="store-owner" password="password">Store Owner</option>
                </select>
                <input
                    type="hidden"
                    name="password"
                    ref={this.referenceElement.bind(this)}
                />
                <button className={styles.submitButton} type="submit">Login</button>
            </form>
        );
    }

    onChangeUsernameSelect (event)
    {
        const selectElement = event.currentTarget;//.querySelector('opt');
        const value = selectElement.value;
        const optionElement = selectElement.querySelector(`option[value="${value}"]`);
        this.formElements.password.value = optionElement.getAttribute('password');
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

    referenceElement (element)
    {
        if (!element) return;
        const name = element.getAttribute('name');
        this.formElements[name] = element;

        const {defaultValues = {}} = this.props;
        if (defaultValues[name]) {
            element.value = defaultValues[name];
        }
    }
}