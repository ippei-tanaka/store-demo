import React, {Component} from 'react';
import uniqueId from 'lodash/uniqueId';

export default class AdminProductForm extends Component
{
    constructor (props)
    {
        super(props);
        this.formElements = {};
        this.uniqueId = uniqueId('AdminProductForm');
    }

    render ()
    {
        return (
            <form onSubmit={this.onSubmitForm.bind(this)}>
                <label htmlFor={`${this.uniqueId}-Name`}>Product Name</label>
                <input
                    name="name"
                    type="text"
                    id={`${this.uniqueId}-Name`}
                    ref={this.onReferenceElement.bind(this)}
                />
                <br/>
                <label htmlFor={`${this.uniqueId}-Description`}>Description</label>
                <input
                    name="description"
                    type="text"
                    id={`${this.uniqueId}-Description`}
                    ref={this.onReferenceElement.bind(this)}
                />
                <br/>
                <label htmlFor={`${this.uniqueId}-Price`}>Price</label>
                <input
                    name="price"
                    type="number"
                    id={`${this.uniqueId}-Price`}
                    ref={this.onReferenceElement.bind(this)}
                />
                <br/>
                <button type="submit">Submit</button>
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
        element.value = this.props.defaultValues[name];
    }
}