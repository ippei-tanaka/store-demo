import React from 'react';
import {Form, Text} from '@/web-client/components/Form';
import styles from '@/web-client/components/ShopProductDetail/ShopProductDetail.css';
import uniqueId from 'lodash/uniqueId';
import isInteger from 'lodash/isInteger';
import clone from 'lodash/clone';

const errorValidator = (values) => {
    const {quantity} = values;
    return {
        quantity: (!quantity || !isInteger(quantity) || quantity <= 0) ? 'Error' : null
    };
};

const ShopProductDetail = ({
    product = {},
    onSubmit = () => {}
}) => {
    const idPrefix = uniqueId('ShopProductDetail');
    return (
        <article className={styles.container}>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.imagePaneContainer}>
                {product.imageSrc ? (
                    <img className={styles.image} src={product.imageSrc} />
                ) : (
                    <div className={styles.noImagePane}>No Image</div>
                )}
            </div>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>${product.price}</p>
            <Form
                className={styles.form}
                onSubmit={onSubmit}
                validator={errorValidator}
                defaultValues={{quantity: 1}}
                preValidate={values => {
                    const _values = clone(values);
                    _values.quantity = Number.parseInt(_values.quantity);
                    return _values;
                }}>
                <label className={styles.label} htmlFor={idPrefix + 'quantity'}>Quantity</label>
                <Text
                    className={styles.input}
                    min="1"
                    type="number"
                    name="quantity"
                    id={idPrefix + 'quantity'}
                />
                <button className={styles.button} type="submit">Add to Cart</button>
            </Form>
        </article>
    );
};

export default ShopProductDetail;