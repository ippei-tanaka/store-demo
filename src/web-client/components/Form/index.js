import React, {Component} from 'react';
import styles from '@/web-client/components/Form/Form.css';
import createReactContext from 'create-react-context';
import compact from 'lodash/compact';

const ValueContext = createReactContext({});
const ErrorContext = createReactContext({});
const ControllerContext = createReactContext({});

export class Form extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            values: Object.assign({}, props.defaultValues),
            errors: {}
        };
        this.controllers = {
            setValue: this._setValue.bind(this)
        };
    }

    _setValue (name, value)
    {
        this.setState({
            values: {...this.state.values, [name]: value}
        });
    }

    _onSubmit (event)
    {
        event.preventDefault();
        const {validator, preValidate} = this.props;
        const values = preValidate(this.state.values);
        const errors = validator(values);
        this.setState({errors});

        if (compact(Object.values(errors)).length === 0)
        {
            this.props.onSubmit(this.state.values, event);
        }
    }

    render ()
    {
        const {className, children} = this.props;

        return (
            <ControllerContext.Provider value={this.controllers}>
                <ErrorContext.Provider value={this.state.errors}>
                    <ValueContext.Provider value={this.state.values}>
                        <form onSubmit={this._onSubmit.bind(this)} className={className}>
                            {children}
                        </form>
                    </ValueContext.Provider>
                </ErrorContext.Provider>
            </ControllerContext.Provider>
        );
    }
}

const Consumer = ({children}) => {
    return (
        <ControllerContext.Consumer>
            {controllers => (
                <ErrorContext.Consumer>
                    {errors => (
                        <ValueContext.Consumer>
                            {values => children({controllers, errors, values})}
                        </ValueContext.Consumer>
                    )}
                </ErrorContext.Consumer>
            )}
        </ControllerContext.Consumer>
    );
};

export const Text = ({name, className, ...rest}) => {
    return (
        <Consumer>
            {({values, errors, controllers}) => {
                return (
                    <span>
                        <input
                            name={name}
                            value={values[name] || ''}
                            className={styles.input + (errors[name] ? ' ' + styles.inputError : '') +
                            (className ? ' ' + className : '')}
                            onChange={(e) => controllers.setValue(name, e.target.value)}
                            {...rest}
                        />
                        {errors[name] && <span className={styles.errorMessage}>{errors[name].message}</span>}
                    </span>
                );
            }}
        </Consumer>
    );
};