import styles from './Button.module.css'

const Button = (props) => {
    let customClass = "";
    if(props.className === undefined){
        customClass = '';
    }else{
        customClass = props.className;
    }
    
    if (props.type === 'primary') {
        return (
            <button className={customClass +' '+  styles.primaryButton +' '+ props.textAlign} onClick={props.onClick}>
                {props.children}
            </button>
        )
    } else if (props.type === 'secondary') {
        return (
            <button className={customClass +' '+   styles.secondaryButton +' '+ props.textAlign} onClick={props.onClick}>
               {props.children}
            </button>
        )
    }
    else if (props.type === 'neutral') {
        return (
            <button className={customClass +' '+   styles.neutralButton +' '+props.textAlign} onClick={props.onClick}>
               {props.children}
            </button>
        )
    }
}

export default Button;