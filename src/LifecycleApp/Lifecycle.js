import { Component } from 'react'
import styles from './Lifecycle.module.css'

class Lifecycle extends Component {

    constructor() {
        super()
        console.log('%cconstructor', 'color:yellow;font-weight:bold');
        this.state = {
            mount: ['constructor', 'getDerivedStateFromProps', 'render', 'componentDidMount'],
            updateProps: ['getDerivedStateFromProps', 'shouldComponentUpdate', 'render', 'getSnapshotBeforeUpdate', 'componentDidUpdate'],
            updateState: ['getDerivedStateFromProps', 'shouldComponentUpdate', 'render', 'getSnapshotBeforeUpdate', 'componentDidUpdate'],
            unMount: ['componentWillUnmount']
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log('%cgetDerivedStateFromProps', 'color:yellow;font-weight:bold');
        console.log(
            '%cstate -> ' + JSON.stringify(state), 'color:orange'
        );
        console.log(
            '%cprops ->' + JSON.stringify(props), 'color:aqua'
        );
        return state;
    }

    shouldComponentUpdate() {
        console.log('%cshouldComponentUpdate', 'color:yellow;font-weight:bold');
        return true;
    }

    updateState() {
        this.setState({
            updateState: ['stateUpdated','getDerivedStateFromProps', 'shouldComponentUpdate', 'render', 'getSnapshotBeforeUpdate', 'componentDidUpdate'],
        })
    }

    render() {
        console.log('%crender', 'color:yellow;font-weight:bold');

        return (
            <div className={styles.lifecycleApp}>

                <div>Lifecycle Methods</div>
                <div>
                    <div>Mounting</div>
                    <div>
                        {
                            this.state.mount.map((ele, index) => {
                                return (
                                    <div key={index} className={ ele === 'render' ? styles.render : ele === 'getDerivedStateFromProps' ? styles.getDerivedStateFromProps : ''}>{ele}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div>Update (Props)</div>
                    <div>
                        {
                            this.state.updateProps.map((ele, index) => {
                                return (
                                    <div key={index} className={ ele === 'render' ? styles.render : ele === 'getDerivedStateFromProps' ? styles.getDerivedStateFromProps : ''} onClick={() => this.props.updateProps('duniyadaari' + Math.floor(Math.random() * 100))}>{ele}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div>Update (State)</div>
                    <div>
                        {
                            this.state.updateState.map((ele, index) => {
                                return (
                                    <div key={index} className={ ele === 'render' ? styles.render : ele === 'getDerivedStateFromProps' ? styles.getDerivedStateFromProps : ''} onClick={this.updateState.bind(this)}>{ele}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div>Unmounting</div>
                    <div>
                        {
                            this.state.unMount.map((ele, index) => {
                                return (
                                    <div key={index} onClick={() => this.props.unMount()}>{ele}</div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        )

    }

    componentDidMount() {
        console.log('%ccomponentDidMount', 'color:yellow;font-weight:bold');
    }
    getSnapshotBeforeUpdate(prevProps, preState, snapshot) {
        console.log('%cgetSnapshotBeforeUpdate', 'color:yellow;font-weight:bold');
        console.log(
            '%cstate -> ' + JSON.stringify(preState), 'color:orange'
        );
        console.log(
            '%cprops ->' + JSON.stringify(prevProps), 'color:aqua'
        );
        return null;
    }
    componentDidUpdate() {
        console.log('%ccomponentDidUpdate', 'color:yellow;font-weight:bold');
    }
    componentWillUnmount(){
        console.log('%ccomponentWillUnmount', 'color:yellow;font-weight:bold');
    }

}


export default Lifecycle;