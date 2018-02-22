import React from 'react';
import {Form, Text} from 'react-form';
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
        <div className={styles.container}>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.imagePaneContainer}>
                <div className={styles.noImagePane}>No Image</div>
            </div>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>${product.price}</p>
            <Form
                onSubmit={onSubmit}
                validateError={errorValidator}
                defaultValues={{quantity: 1}}
                preValidate={values => {
                    const _values = clone(values);
                    _values.quantity = Number.parseInt(_values.quantity);
                    return _values;
                }}>
                {formApi => (
                    <form
                        onSubmit={formApi.submitForm}
                        className={styles.form}>
                        <div>
                            <label className={styles.label} htmlFor={idPrefix + 'quantity'}>Quantity</label>
                            <Text
                                className={styles.input + (formApi.errors.quantity ? ` ${styles.inputError}` : '')}
                                min="1"
                                type="number"
                                field="quantity"
                                id={idPrefix + 'quantity'}
                            />
                        </div>
                        <button className={styles.button} type="submit">Add to Cart</button>
                    </form>
                )}
            </Form>
        </div>
    );
};

export default ShopProductDetail;