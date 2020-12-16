import styles from './Button.module.css'
import {useState} from 'react'

const Button = (props) => {
    let [disableButton,setDisableButton] = useState(false);
    let customClass = "";
    if(props.className === undefined){
        customClass = '';
    }else{
        customClass = props.className;
    }


    function clickHandler(){
        try{
            props.onClick();
            setDisableButton(true);
            setTimeout(()=>{
                setDisableButton(false);
            },2000)
        }catch(e){
            console.log(e);
        }
    }
    
    if (props.type === 'primary') {
        return (
            <button {...props} disabled={disableButton} className={customClass +' '+  styles.primaryButton +' '+ props.textAlign} onClick={clickHandler} >
                {props.children}
            </button>
        )
    } else if (props.type === 'secondary') {
        return (
            <button {...props} disabled={disableButton} className={customClass +' '+   styles.secondaryButton +' '+ props.textAlign} onClick={clickHandler} >
               {props.children}
            </button>
        )
    }
    else if (props.type === 'neutral') {
        return (
            <button {...props} disabled={disableButton} className={customClass +' '+   styles.neutralButton +' '+props.textAlign} onClick={clickHandler}>
               {props.children}
            </button>
        )
    }
}

export default Button;