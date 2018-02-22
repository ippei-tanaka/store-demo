import React, {Component} from 'react';
import styles from '@/web-client/components/AdminMediaList/AdminMediaList.css';
import {verifyProductName, verifyProductPrice, verifyProductDescription} from '@/validator/index';
import {Form, Text} from 'react-form';
import isNaN from 'lodash/isNaN';
import compact from 'lodash/compact';

const errorValidator = (values) => {
    return {
        name: verifyProductName(values.name) || null,
        description: verifyProductDescription(values.description) || null,
        price: verifyProductPrice(values.price) || null,
    };
};

const preValidate = (values) => {
    let price = Number.parseFloat(values.price);
    price = isNaN(price) ? '' : price;
    return Object.assign({}, values, {price});
};

const newItemId = Symbol('new-item');

export default class AdminProductList extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            editedProductId: null
        };
    }

    onClickEditButton (event)
    {
        event.preventDefault();
        const productId = event.currentTarget.getAttribute('productid');
        this.setState({
            editedProductId: productId
        });
    }

    onClickCancelButton (event)
    {
        event.preventDefault();
        this.setState({
            editedProductId: null
        });
    }

    onClickDeleteButton (event)
    {
        event.preventDefault();
        const productId = event.currentTarget.getAttribute('productid');
        this.props.onDeleteProduct(productId);
        this.setState({
            editedProductId: null
        });
    }

    onClickShowCreateButton (event)
    {
        event.preventDefault();
        this.setState({
            editedProductId: newItemId
        });
    }

    onSubmitNewItemForm (product, event, {errors})
    {
        if (compact(Object.values(errors)).length === 0)
        {
            this.props.onCreateProduct(product);
            this.setState({editedProductId: null});
        }
    }

    onSubmitExistingItemForm (product, event, {errors})
    {
        if (compact(Object.values(errors)).length === 0)
        {
            this.props.onUpdateProduct(product.id, product);
            this.setState({editedProductId: null});
        }
    }

    render ()
    {
        const {productList} = this.props;
        const {editedProductId} = this.state;
        return (
            <div>
                {editedProductId === newItemId && (
                    <div className={styles.newItemFormContainer} onClick={() => this.setState({editedProductId: null})}>
                        <Form
                            onSubmit={this.onSubmitNewItemForm.bind(this)}
                            validateError={errorValidator}
                            preValidate={preValidate}
                            validateOnSubmit={true}
                            dontValidateOnMount={true}
                        >
                            {({submitForm, errors}) => (
                                <form onSubmit={submitForm} className={styles.newItemForm} onClick={(e) => e.stopPropagation()}>
                                    <dl className={styles.productSpecList}>
                                        <dt className={styles.productSpecName}>Name</dt>
                                        <dd className={styles.productSpecValue}>
                                            <Text className={styles.input + ' ' + (errors.name && styles.inputError)} field="name" />
                                            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                                        </dd>
                                        <dt className={styles.productSpecName}>Description</dt>
                                        <dd className={styles.productSpecValue}>
                                            <Text className={styles.input + ' ' + (errors.description && styles.inputError)} field="description" />
                                            {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
                                        </dd>
                                        <dt className={styles.productSpecName}>Price</dt>
                                        <dd className={styles.productSpecValue}>
                                            <Text className={styles.input + ' ' + (errors.price && styles.inputError)} type="number" field="price" />
                                            {errors.price && <span className={styles.errorMessage}>{errors.price.message}</span>}
                                        </dd>
                                    </dl>
                                    <div>
                                        <button
                                            onClick={this.onClickCancelButton.bind(this)}
                                            className={styles.cancelButton}
                                            title="Cancel"
                                        ><i className="fas fa-times-circle"></i></button>
                                        <button
                                            className={styles.saveButton}
                                            title="Save"
                                            type="submit"
                                        ><i className="fas fa-save"></i></button>
                                    </div>
                                </form>
                            )}
                        </Form>
                    </div>
                )}
                <div className={styles.addButtonContainer}>
                    <button
                        onClick={this.onClickShowCreateButton.bind(this)}
                        className={styles.showCreateButton}
                        title="Add a New Product"
                    ><i className="fas fa-plus"></i></button>
                </div>
                <ul className={styles.productList}>
                    {productList.map((product, index) => product.id !== editedProductId ? (
                        <li className={styles.productListItem} key={product.id}>
                            <span className={styles.productNumber}>#{index + 1}</span>
                            <dl className={styles.productSpecList}>
                                <dt className={styles.productSpecName}>Name</dt>
                                <dd className={styles.productSpecValue}>{product.name}</dd>
                                <dt className={styles.productSpecName}>Description</dt>
                                <dd className={styles.productSpecValue}>{product.description}</dd>
                                <dt className={styles.productSpecName}>Price</dt>
                                <dd className={styles.productSpecValue}>${product.price}</dd>
                            </dl>
                            <div>
                                <button
                                    onClick={this.onClickEditButton.bind(this)}
                                    productid={product.id}
                                    className={styles.editButton}
                                    title="Edit"
                                ><i className="fas fa-pencil-alt"></i></button>
                                <button
                                    onClick={this.onClickDeleteButton.bind(this)}
                                    productid={product.id}
                                    className={styles.deleteButton}
                                    title="Delete"
                                ><i className="fas fa-trash"></i></button>
                            </div>
                        </li>
                    ) : (
                        <li className={styles.productListItem} key={product.id}>
                            <Form
                                defaultValues={product}
                                onSubmit={this.onSubmitExistingItemForm.bind(this)}
                                validateError={errorValidator}
                                preValidate={preValidate}
                                validateOnSubmit={true}
                            >
                                {({submitForm, errors}) => (
                                    <form onSubmit={submitForm}>
                                        <span className={styles.productNumber}>#{index + 1}</span>
                                        <dl className={styles.productSpecList}>
                                            <dt className={styles.productSpecName}>Name</dt>
                                            <dd className={styles.productSpecValue}>
                                                <Text className={styles.input + ' ' + (errors.name && styles.inputError)} field="name" />
                                                {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                                            </dd>
                                            <dt className={styles.productSpecName}>Description</dt>
                                            <dd className={styles.productSpecValue}>
                                                <Text className={styles.input + ' ' + (errors.description && styles.inputError)} field="description" />
                                                {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
                                            </dd>
                                            <dt className={styles.productSpecName}>Price</dt>
                                            <dd className={styles.productSpecValue}>
                                                <Text className={styles.input + ' ' + (errors.price && styles.inputError)} type="number" field="price" />
                                                {errors.price && <span className={styles.errorMessage}>{errors.price.message}</span>}
                                            </dd>
                                        </dl>
                                        <div>
                                            <button
                                                onClick={this.onClickCancelButton.bind(this)}
                                                className={styles.cancelButton}
                                                title="Cancel"
                                            ><i className="fas fa-times-circle"></i></button>
                                            <button
                                                className={styles.saveButton}
                                                title="Save"
                                                type="submit"
                                            ><i className="fas fa-save"></i></button>
                                        </div>
                                    </form>
                                )}
                            </Form>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

