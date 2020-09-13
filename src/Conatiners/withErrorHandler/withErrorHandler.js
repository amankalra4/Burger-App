import React, { useEffect, useState } from 'react';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [errorState, setError] = useState(null);
        useEffect(() => {
            let reqInterceptor, resInterCeptor;
            reqInterceptor = axios.interceptors.request.use(req => {
                setError(null);
                return req;
            })
            resInterCeptor = axios.interceptors.response.use(res => res, error => {
                setError(error);
            })
            // [] means component will be called for ComponentDidMount
            // returned function will be called on component unmount
            return () => {
                // When we dont need BurgerBuilder component, we can clean up the interceptors as
                // they might take up some memory.
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterCeptor);
            }
        }, []);
        return (
            <React.Fragment>
                <Modal show = {errorState} modalClosed = {() => setError(null)}>
                    {errorState ? errorState.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    }
}

export default withErrorHandler;