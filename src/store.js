import {createStore, combineReducers,applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { incomingPackageReducers,incomingPackageDetailsReducers } from './reducers/incomingPackageReducer'
import { userLoginReducers,userRegistrationReducers, userDetailsReducers,userUpdateProfileReducers,userListReducers,userDeleteReducers } from './reducers/userReducer'
import { createPackageReducers } from './reducers/createPackageReduser'

const reducer = combineReducers({
      incomingPackageList : incomingPackageReducers,
      incomingPackageDetails : incomingPackageDetailsReducers,
      userLogin:userLoginReducers,
      userRegister:userRegistrationReducers,
      userDetails:userDetailsReducers,
      userUpdateProfile:userUpdateProfileReducers,
      userList:userListReducers,
      userDelete:userDeleteReducers,
      createPackage:createPackageReducers
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
     JSON.parse(localStorage.getItem('userInfo')):null


const initialState = {
      userLogin:{userInfo:userInfoFromStorage}
 }

const middleware = [thunk]

const store = createStore(reducer,initialState,
      composeWithDevTools(applyMiddleware(...middleware)))

export default store

