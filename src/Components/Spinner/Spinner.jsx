import React, { useRef, useEffect } from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

import './spinner.scss';

const Spinner = () => {

    const spinnerRef = useRef();

    useEffect(() => {
        const setColorsInteval = setInterval(() => {
            spinnerRef.current.style.color = `#${Math.random().toString().slice(2,8)}`;//not all colors only (#000000-#999999)
        }, 500);

        return () => {
            clearInterval(setColorsInteval);
        }
        
    }, []);

    return (
        <div className="spinner-container">
            <BootstrapSpinner ref={spinnerRef} className="spinner-container-spinner" animation="border" role="status">
                loading
            </BootstrapSpinner>
        </div>
    )
}

export default Spinner;