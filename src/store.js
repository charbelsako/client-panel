import { createStore, combineReducers, compose } from 'redux'
import 'firebase/compat/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
// Reducers
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB0P5tcJB2car3m1pMS6AxDYeJDqY02doY',
  authDomain: 'react-client-panel-afaa7.firebaseapp.com',
  databaseURL: 'https://react-client-panel-afaa7.firebaseio.com',
  projectId: 'react-client-panel-afaa7',
  storageBucket: 'react-client-panel-afaa7.appspot.com',
  messagingSenderId: '135730241089'
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Init firebase instance
firebase.initializeApp(firebaseConfig)
// Init firestore
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
})

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false
  }

  // Set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
)

export default store
