import ChildCmp from '../ChildCmp/ChildCmp';
import Wrapper from '../HOF/Wrapper'
import hofWrapper from '../HOF/hofWrapper'
import styles from './ParentCmp.module.css'

const ParentCmp = () => {
    console.log('Inside Parent Component')
    return (
        // Wrapper Higher order function Component helps in returning siblings 
        <Wrapper>
            <div className={styles.parent}>Parent</div>
            <ChildCmp></ChildCmp>
        </Wrapper>
    )
}

// export default ParentCmp;
export default hofWrapper(ParentCmp,'some random text');