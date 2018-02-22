import React, {Component} from 'react';
import styles from '@/web-client/components/AdminProductList/AdminProductList.css';
import {verifyProductName, verifyProductPrice, verifyProductDescription} from '@/validator/index';
import {Form, Text} from 'react-form';
import isNaN from 'lodash/isNaN';
import compact from 'lodash/compact';
import {BorderedList, BorderedListItem} from '@/web-client/components/BorderedList';
import {Button, ButtonMenu, ButtonThemes} from '@/web-client/components/Button';
import {DL, DT, DD} from '@/web-client/components/DictionaryList';
import {ModalBackground, ModalContentContainer} from '@/web-client/components/Modal';

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

    onSubmitForm (productId)
    {
        return function (product, event, {errors})
        {
            if (compact(Object.values(errors)).length !== 0)
            {
                return;
            }

            if (productId === newItemId)
            {
                this.props.onCreateProduct(product);
            } else {
                this.props.onUpdateProduct(productId, product);
            }

            this.setState({editedProductId: null});
        };
    }

    render ()
    {
        const {productList} = this.props;
        const {editedProductId} = this.state;
        const cancel = () => this.setState({editedProductId: null});
        return (
            <div>
                {editedProductId && (
                    <ModalBackground onClick={cancel} onEnterKeyDown={cancel}>
                        <ModalContentContainer>
                            <Form
                                defaultValues={productList.find(({id}) => id === editedProductId)}
                                onSubmit={this.onSubmitForm(editedProductId).bind(this)}
                                validateError={errorValidator}
                                preValidate={preValidate}
                                validateOnSubmit={true}
                                dontValidateOnMount={true}
                            >
                                {({submitForm, errors}) => (
                                    <form onSubmit={submitForm} className={styles.editForm} onClick={(e) => e.stopPropagation()}>
                                        <DL>
                                            <DT>Name</DT>
                                            <DD>
                                                <Text className={styles.input + ' ' + (errors.name && styles.inputError)} field="name" />
                                                {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                                            </DD>
                                            <DT>Description</DT>
                                            <DD>
                                                <Text className={styles.input + ' ' + (errors.description && styles.inputError)} field="description" />
                                                {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
                                            </DD>
                                            <DT>Price</DT>
                                            <DD>
                                                <Text className={styles.input + ' ' + (errors.price && styles.inputError)} type="number" field="price" />
                                                {errors.price && <span className={styles.errorMessage}>{errors.price.message}</span>}
                                            </DD>
                                        </DL>
                                        <ButtonMenu>
                                            <Button
                                                onClick={this.onClickCancelButton.bind(this)}
                                                title="Cancel"
                                            ><i className="fas fa-times-circle"></i></Button>
                                            <Button
                                                title="Save"
                                                type="submit"
                                                theme={ButtonThemes.ENCOURAGING}
                                            ><i className="fas fa-save"></i></Button>
                                        </ButtonMenu>
                                    </form>
                                )}
                            </Form>
                        </ModalContentContainer>
                    </ModalBackground>
                )}
                <div className={styles.addButtonContainer}>
                    <Button
                        onClick={this.onClickShowCreateButton.bind(this)}
                        title="Add a New Product"
                    ><i className="fas fa-plus"></i></Button>
                </div>
                <BorderedList>
                    {productList.map((product, index) => (
                        <BorderedListItem key={product.id}>
                            <span className={styles.productNumber}>#{index + 1}</span>
                            <DL>
                                <DT>Name</DT>
                                <DD>{product.name}</DD>
                                <DT>Description</DT>
                                <DD>{product.description}</DD>
                                <DT>Price</DT>
                                <DD>${product.price}</DD>
                            </DL>
                            <ButtonMenu>
                                <Button
                                    onClick={this.onClickEditButton.bind(this)}
                                    productid={product.id}
                                    title="Edit"
                                ><i className="fas fa-pencil-alt"></i></Button>
                                <Button
                                    onClick={this.onClickDeleteButton.bind(this)}
                                    productid={product.id}
                                    title="Delete"
                                    theme={ButtonThemes.WARNING}
                                ><i className="fas fa-trash"></i></Button>
                            </ButtonMenu>
                        </BorderedListItem>
                    ))}
                </BorderedList>
            </div>
        );
    }
}

