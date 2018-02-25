import React, {Component} from 'react';
import styles from '@/web-client/components/AdminProductList/AdminProductList.css';
import {verifyProductName, verifyProductPrice, verifyProductDescription} from '@/validator';
import {Form, Text} from '@/web-client/components/Form';
import isNaN from 'lodash/isNaN';
import {
    BorderedList,
    BorderedListItem,
    BorderedListItemContainer,
    BorderedListItemIndex
} from '@/web-client/components/BorderedList';
import {Button, ButtonMenu, ButtonThemes} from '@/web-client/components/Button';
import {DL, DT, DD} from '@/web-client/components/DictionaryList';
import {ModalBackground, ModalContentContainer} from '@/web-client/components/Modal';

const validator = (values) => {
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
        return function (product)
        {
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
                                className={styles.editForm}
                                defaultValues={productList.find(({id}) => id === editedProductId)}
                                onSubmit={this.onSubmitForm(editedProductId).bind(this)}
                                validator={validator}
                                preValidate={preValidate}>
                                <div className={styles.specListContainer}>
                                    <DL>
                                        <DT>Name</DT>
                                        <DD><Text name="name" /></DD>
                                        <DT>Description</DT>
                                        <DD><Text name="description" /></DD>
                                        <DT>Price</DT>
                                        <DD><Text name="price" type="number" /></DD>
                                        <DT>Medium ID (Image)</DT>
                                        <DD><Text name="imageId" /></DD>
                                    </DL>
                                </div>
                                <ButtonMenu>
                                    <Button
                                        title="Save"
                                        type="submit"
                                        theme={ButtonThemes.ENCOURAGING}
                                    ><i className="fas fa-save"></i></Button>
                                    <Button
                                        onClick={this.onClickCancelButton.bind(this)}
                                        title="Cancel"
                                    ><i className="fas fa-times-circle"></i></Button>
                                </ButtonMenu>
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
                            <BorderedListItemContainer>
                                <BorderedListItemIndex index={index + 1} />
                                <div>
                                    <div className={styles.specListContainer}>
                                        <DL>
                                            <DT>Name</DT>
                                            <DD>{product.name}</DD>
                                            <DT>Description</DT>
                                            <DD>{product.description}</DD>
                                            <DT>Price</DT>
                                            <DD>${product.price}</DD>
                                            {product.imageSrc && (
                                                <DT>Image</DT>
                                            )}
                                            {product.imageSrc && (
                                                <DD><img src={product.imageSrc} className={styles.productImage} /></DD>
                                            )}
                                        </DL>
                                    </div>
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
                                </div>
                            </BorderedListItemContainer>
                        </BorderedListItem>
                    ))}
                </BorderedList>
            </div>
        );
    }
}

