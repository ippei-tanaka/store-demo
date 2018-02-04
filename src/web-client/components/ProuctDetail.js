import React from 'react';
import {Form, Text} from 'react-form';

export default (
    {
        product,
        onSubmit = () => {}
    }) => (
    <div>
        <h1>{product.name}</h1>
        <p><img src={product.image} /></p>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <Form onSubmit={onSubmit}>
            {formApi => (
                <form onSubmit={formApi.submitForm}>
                    <label htmlFor="quantity">Quantity</label>:
                    <Text type="number" field="quantity" id="quantity"/>
                    <br/>
                    <button type="submit">Add to Cart</button>
                </form>
            )}
        </Form>
    </div>
);