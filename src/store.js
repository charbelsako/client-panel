import { createStore, compose, combineReducers } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDpe-uIEia7SiyqbhGY-zGY_ydPqpijzoY',
  authDomain: 'react-client-panel-1e6bd.firebaseapp.com',
  databaseURL: 'https://react-client-panel-1e6bd.firebaseio.com',
  projectId: 'react-client-panel-1e6bd',
  storageBucket: 'react-client-panel-1e6bd.appspot.com',
  messagingSenderId: '248590649918',
}

// React Redux Firebase
const rrfconfig = { userProfile: 'users', useFirestoreForProfile: true }

//Firebase Initialization
firebase.initializeApp(firebaseConfig)
//Firestore Init
//Silencing the DATE error
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfconfig),
  reduxFirestore(firebase),
)(createStore)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

const initialState = {}

//Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)

export default store
