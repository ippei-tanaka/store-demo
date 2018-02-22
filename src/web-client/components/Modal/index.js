import React, {Component} from 'react';
import styles from '@/web-client/components/Modal/Modal.css';

const ENTER_KEY = 13;

export const ModalBackground = ({children, className, onEnterKeyDown = () => {}, ...rest}) => {
    return (
        <div
            className={styles.modalBackground + (className ? ' ' + className : '')}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.keyCode === ENTER_KEY)
                {
                    onEnterKeyDown();
                }
            }}
            {...rest}>
            {children}
        </div>
    );
};

export class ModalContentContainer extends Component {

    componentDidMount() {
        this.container.focus();
    }

    render() {
        const {children, className, ...rest} = this.props;
        return (
            <div className={styles.modalContentContainer + (className ? ' ' + className : '')}
                tabIndex={0}
                ref={el => {this.container = el;}}
                {...rest}>
                {children}
            </div>
        );
    }

}