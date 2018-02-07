import React from 'react';
import {Form, Text, TextArea} from 'react-form';

export default ({onSubmit, defaultValues}) => {
    return (
        <Form
            onSubmit={onSubmit}
            defaultValues={defaultValues}
        >
            {formApi => (
                <form onSubmit={formApi.submitForm}>
                    <label htmlFor="product-name">Product Name</label>
                    <Text field="name" type="text" id="product-name"/>
                    <br/>
                    <label htmlFor="product-description">Description</label>
                    <TextArea field="description" id="product-description"/>
                    <br/>
                    <label htmlFor="product-price">Price</label>
                    <Text field="price" type="number" id="product-price"/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            )}
        </Form>
    );
}