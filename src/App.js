
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
          {/* <PostApp></PostApp>
          { this.state.mountCmp && <Lifecycle dosto={this.state.dosto} updateProps={this.updateProps.bind(this)} unMount={this.unMount.bind(this)}></Lifecycle>} */}
          {/* <HigherOrderFun></HigherOrderFun> */}
          {/* <GuestTracker></GuestTracker> */}
          <GuestManager></GuestManager>
        </div>
      </div> 
    )
  }
}

export default App;

// https://jsonplaceholder.typicode.com/posts

  // getPositionData() {
  //   let promise = new Promise((resolve, reject) => {

  //     navigator.geolocation.getCurrentPosition((posData) => {
  //       resolve(posData)
  //     }, (err) => {
  //       reject(err);
  //     })

  //   })
  //   return promise;
  // }

  // clickHandler() {
  //   console.clear();

  //   console.log(this.getPositionData()
  //   .then(posData => {
  //     console.log(posData);
  //   })
  //   .catch(err => console.log(err) ))

  //   // let response = fetch('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
  //   // let json = await response.json();
  //   // console.log(json[0].word);

  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then(res => {
  //    return res.json()
  //   })
  //   .then(res=>{
  //     console.log(res);
  //   })
  //   console.log('after click');
  // }


  // async clickHandler() {
  //   console.clear();
  //   try {
  //     await this.getPositionData().then(posData => {
  //       console.log(posData);
  //     })
  //     let response = await fetch('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
  //     let json = await response.json();
  //     console.log(json[0].word);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   console.log('after click');
  // }
