
import {Component } from 'react'
import styles from './App.module.css'
// import PostApp from './PostApp/PostApp'
// import Lifecycle from './LifecycleApp/Lifecycle'
// import HigherOrderFun from './HigherOrderFunc/HigherOrderFunc'
// import GuestTracker from './GuestTracker/GuestTracker'
import GuestManager from './GuestManager/GuestManager' 

class App extends Component {
  constructor(){
    super();
    this.state = {
      dosto : 'ki yaaro ki',
      mountCmp : true
    }
  }
  updateProps(newValue){
    this.setState({
        dosto : newValue
    })
  }
  unMount(){
    this.setState({
      mountCmp : false
    })
  }
 
  render() {
    return (
      <div className={styles.App}>
        {/* <div className={styles.appTitle}>
          <span className={styles.baburao}>{' :\{ '}</span><span className={styles.header}>miBaburao</span>
        </div> */}
        <div className={styles.appWrapper}>
          {/* <PostApp></PostApp> */}
          {/* { this.state.mountCmp && <Lifecycle dosto={this.state.dosto} updateProps={this.updateProps.bind(this)} unMount={this.unMount.bind(this)}></Lifecycle>} */}
          {/* {/* <HigherOrderFun></HigherOrderFun> */}
          <GuestManager></GuestManager>
        </div>
      </div> 
    )
  }
}

export default App;

