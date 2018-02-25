import React, {Component} from 'react';
import styles from '@/web-client/components/AdminMediumList/AdminMediumList.css';
//import {verifyProductName, verifyProductPrice, verifyProductDescription} from '@/validator';
import {Form, File} from '@/web-client/components/Form';
//import isNaN from 'lodash/isNaN';
import {
    BorderedList,
    BorderedListItem,
    BorderedListItemContainer,
    BorderedListItemIndex
} from '@/web-client/components/BorderedList';
import {Button, ButtonMenu, ButtonThemes} from '@/web-client/components/Button';
import {DL, DT, DD} from '@/web-client/components/DictionaryList';
import {ModalBackground, ModalContentContainer} from '@/web-client/components/Modal';

const validator = () => {
    return {
        medium: null,
    };
};

const newItemId = Symbol('new-item');

export default class AdminMediaList extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            editedMediumId: null
        };
    }

    onClickCancelButton (event)
    {
        event.preventDefault();
        this.setState({
            editedMediumId: null
        });
    }

    onClickDeleteButton (event)
    {
        event.preventDefault();
        const mediumId = event.currentTarget.getAttribute('mediumid');
        this.props.onDeleteMedium(mediumId);
        this.setState({
            editedMediumId: null
        });
    }

    onClickShowCreateButton (event)
    {
        event.preventDefault();
        this.setState({
            editedMediumId: newItemId
        });
    }

    onSubmitForm (mediumId)
    {
        return function (medium)
        {
            if (mediumId === newItemId)
            {
                this.props.onUploadMedium(medium);
            }
            this.setState({editedMediumId: null});
        };
    }

    render ()
    {
        const {mediumList} = this.props;
        const {editedMediumId} = this.state;
        const cancel = () => this.setState({editedMediumId: null});
        return (
            <div>
                {editedMediumId && (
                    <ModalBackground onClick={cancel} onEnterKeyDown={cancel}>
                        <ModalContentContainer>
                            <Form
                                className={styles.editForm}
                                defaultValues={mediumList.find(({id}) => id === editedMediumId)}
                                onSubmit={this.onSubmitForm(editedMediumId).bind(this)}
                                validator={validator}>
                                {({values}) => {
                                    const media = Array.from(values.media || []);
                                    return (
                                        <div>
                                            <div className={styles.specListContainer}>
                                                <DL>
                                                    <DT>Medium</DT>
                                                    <DD><File name="media" /></DD>
                                                </DL>
                                            </div>
                                            <ul className={styles.mediumPreviewList}>
                                                {media.map((file, index) => (
                                                    <li key={index}><img src={window.URL.createObjectURL(file)}/></li>
                                                ))}
                                            </ul>
                                            <ButtonMenu>
                                                <Button
                                                    title="Upload"
                                                    type="submit"
                                                    theme={ButtonThemes.ENCOURAGING}
                                                ><i className="fas fa-upload"></i></Button>
                                                <Button
                                                    onClick={this.onClickCancelButton.bind(this)}
                                                    title="Cancel"
                                                ><i className="fas fa-times-circle"></i></Button>
                                            </ButtonMenu>
                                        </div>
                                    );
                                }}
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
                    {mediumList.map((medium, index) => (
                        <BorderedListItem key={medium.id}>
                            <BorderedListItemContainer>
                                <BorderedListItemIndex index={index + 1} />
                                <div>
                                    <div className={styles.specListContainer}>
                                        <DL>
                                            <DT>Medium ID</DT>
                                            <DD>{medium.id}</DD>
                                            <DT>Type</DT>
                                            <DD>{medium.type}</DD>
                                            <DT>Medium</DT>
                                            <DD><img className={styles.mediumImage} src={medium.src} /></DD>
                                        </DL>
                                    </div>
                                    <ButtonMenu>
                                        <Button
                                            onClick={this.onClickDeleteButton.bind(this)}
                                            mediumid={medium.id}
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

