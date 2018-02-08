import React, {Component} from 'react';
import styles from '@/web-client/components/AdminProductList/style.css';
import isNaN from 'lodash/isNaN';

export default class AdminProductList extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            editedProductId: null,
            validationErrors: {}
        };
        this.formElements = {};
    }

    onClickEditButton (event)
    {
        event.preventDefault();
        const productId = event.currentTarget.getAttribute('productid');
        this.setState({
            editedProductId: productId,
            validationErrors: {},
            creatingNewProduct: false,
        });
    }

    onClickSaveButton (event)
    {
        event.preventDefault();
        const data = {};
        const errors = {};
        for (let key of Object.keys(this.formElements))
        {
            const element = this.formElements[key];
            const value = element.getAttribute('type') === 'number'
                ? Number.parseInt(element.value) : element.value;

            if (typeof value !== 'string' && typeof value !== 'number')
            {
                errors[key] = true;
                continue;
            }

            if (value === '' || isNaN(value) || value <= 0)
            {
                errors[key] = true;
                continue;
            }

            data[key] = value;
        }

        if (Object.keys(errors).length === 0)
        {
            if (this.state.editedProductId)
            {
                this.props.onUpdateProduct(
                    this.state.editedProductId,
                    data
                );
            } else {
                this.props.onCreateProduct(
                    data
                );
            }
            this.setState({
                editedProductId: null,
                validationErrors: {},
                creatingNewProduct: false
            });
        } else {
            this.setState({
                validationErrors: errors
            });
        }
    }

    onClickCancelButton (event)
    {
        event.preventDefault();
        this.setState({
            editedProductId: null,
            validationErrors: {},
            creatingNewProduct: false
        });
    }

    onClickDeleteButton (event)
    {
        event.preventDefault();
        const productId = event.currentTarget.getAttribute('productid');
        this.props.onDeleteProduct(productId);
        this.setState({
            editedProductId: null,
            validationErrors: {},
            creatingNewProduct: false
        });
    }

    onClickShowCreateButton (event)
    {
        event.preventDefault();
        this.setState({
            editedProductId: null,
            validationErrors: {},
            creatingNewProduct: true
        });
    }

    render ()
    {
        const {productList} = this.props;
        const {editedProductId, validationErrors, creatingNewProduct} = this.state;
        return (
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <td className={styles.valueColumn}>Name</td>
                            <td className={styles.valueColumn}>Description</td>
                            <td className={styles.valueColumn}>Price</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((product, index) => {
                            return product.id !== editedProductId ? (
                                <tr key={product.id}>
                                    <th>{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td>
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
                                    </td>
                                </tr>
                            ) : (
                                <tr key={product.id} className={styles.editedProductRow}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={product.name}
                                            className={styles.input + ' ' + (validationErrors.name ? styles.inputError : '')}
                                            ref={i => this.formElements.name = i}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="description"
                                            defaultValue={product.description}
                                            className={styles.input + ' ' + (validationErrors.description ? styles.inputError : '')}
                                            ref={i => this.formElements.description = i}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="price"
                                            defaultValue={product.price}
                                            className={styles.input + ' ' + (validationErrors.price ? styles.inputError : '')}
                                            ref={i => this.formElements.price = i}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={this.onClickCancelButton.bind(this)}
                                            productid={product.id}
                                            className={styles.cancelButton}
                                            title="Cancel"
                                        ><i className="fas fa-times-circle"></i></button>
                                        <button
                                            onClick={this.onClickSaveButton.bind(this)}
                                            productid={product.id}
                                            className={styles.saveButton}
                                            title="Save"
                                        ><i className="fas fa-save"></i></button>
                                    </td>
                                </tr>
                            );
                        })}
                        {creatingNewProduct ? (
                            <tr key="newProduct" className={styles.editedProductRow}>
                                <th>?</th>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        className={styles.input + ' ' + (validationErrors.name ? styles.inputError : '')}
                                        ref={i => this.formElements.name = i}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="description"
                                        className={styles.input + ' ' + (validationErrors.description ? styles.inputError : '')}
                                        ref={i => this.formElements.description = i}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="price"
                                        className={styles.input + ' ' + (validationErrors.price ? styles.inputError : '')}
                                        ref={i => this.formElements.price = i}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={this.onClickCancelButton.bind(this)}
                                        className={styles.cancelButton}
                                        title="Cancel"
                                    ><i className="fas fa-times-circle"></i></button>
                                    <button
                                        onClick={this.onClickSaveButton.bind(this)}
                                        className={styles.saveButton}
                                        title="Save"
                                    ><i className="fas fa-save"></i></button>
                                </td>
                            </tr>
                        ) : null}
                        <tr>
                            <td colSpan="5">
                                <div className={styles.showCreateButtonContainer}>
                                    <button
                                        onClick={this.onClickShowCreateButton.bind(this)}
                                        className={styles.showCreateButton}
                                        title="Add a New Product"
                                    ><i className="fas fa-plus"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

