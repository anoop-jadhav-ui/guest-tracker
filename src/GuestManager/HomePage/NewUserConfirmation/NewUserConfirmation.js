import styles from './NewUserConfirmation.module.css'
import Input from '../../Components/Input/Input'
import FloatingPanel from '../../Components/FloatingPanel/FloatingPanel'

import { useEffect, useState } from 'react';
import Button from '../../Components/Button/Button';

const Confirmation = (props) => {

    let [isNewGuest, setIsNewGuest] = useState();
    let [options, setOptions] = useState([{
        id: 0,
        label: 'Yes',
        value: 'yes',
        checked: true
    }, {
        id: 1,
        label: 'No, Add a new Guest.',
        value: 'no',
        checked: false
    }]);

    useEffect(()=>{
        setIsNewGuest('yes');
    },[])
    
    function changeHandler(evt) {
        try {
            let inputName = evt.target.name;
            let inputValue = evt.target.value;
            switch (inputName) {
                case 'confirmationradio':
                    let optionsTemp = [...options];

                    optionsTemp.forEach(ele => {
                        if (ele.value === inputValue) {
                            ele.checked = true;
                        } else {
                            ele.checked = false;
                        }
                    })
                    setOptions(optionsTemp);
                    setIsNewGuest(inputValue);
                    break;
                default: break;
            }

        } catch (e) {
            console.log(e);
        }
    }
    function nextHandler(){
        try{
            if(isNewGuest === 'yes'){
                props.goToSection('allguests');
            }else if(isNewGuest === 'no'){
                props.goToSection('newguest');
            }
        }catch(e){
            console.log(e);
        }
    }
    return (
        <div className={styles.wrapper}>
            <Input label="" name="confirmationradio" type="radio" options={options} value={isNewGuest} onChange={changeHandler}></Input>
           <FloatingPanel>
            <Button type="primary" onClick={nextHandler}>Next</Button>
            </FloatingPanel>
        </div>
    )
}

export default Confirmation;