import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './Input.css'

const Input = forwardRef((props, ref) => {

    let [errorMessage, setErrorMessage] = useState('');
    let inputRef = useRef();
    let errorEleRef = useRef();

    //Hook to allow parent to access child methods
    useImperativeHandle(ref, () => ({
        highlightInput,
        removeHighlights
    }));

    let highlightInput = (customError) => {
        try {
            inputRef.current.classList.add('error');
            errorEleRef.current.classList.add('show');

            if (customError) {
                setErrorMessage(customError)
            } else {
                setErrorMessage(`Please enter the ${props.label}.`)
            }
        } catch (e) {
            console.log(e);
        }
    }

    let removeHighlights = () => {
        try {
            inputRef.current.classList.remove('error');
            errorEleRef.current.classList.remove('show');
        } catch (e) {
            console.log(e);
        }
    }

    if (props.type === 'radio') {
        return (
            <React.Fragment>
                { props.label && <label htmlFor={props.name}>{props.label}</label>}
                {
                    props.options.map((ele) => {
                        return <div key={ele.id} className="radioWrapper"><input ref={inputRef} name={props.name} type="radio" value={ele.value} onChange={props.onChange} checked={ele.checked} disabled={props.disabled}/><span>{ele.label}</span></div>
                    })
                }
                <label ref={errorEleRef} className="error-label">{errorMessage}</label>
            </React.Fragment>
        )
    } if (props.type === 'textarea') {
        return (
            <React.Fragment>
                { props.label && <label htmlFor={props.name}>{props.label}</label>}
                <textarea ref={inputRef} className={props.className} value={props.value} name={props.name} type={props.type} onChange={props.onChange} placeholder={props.placeholder} disabled={props.disabled}></textarea>
                <label ref={errorEleRef} className="error-label">{errorMessage}</label>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                { props.label &&<label htmlFor={props.name}>{props.label}</label>}
                <input ref={inputRef} className={props.className} value={props.value} name={props.name} type={props.type} onChange={props.onChange} placeholder={props.placeholder} disabled={props.disabled}></input>
                <label ref={errorEleRef} className="error-label">{errorMessage}</label>
            </React.Fragment>
        )
    }

})

export default Input;