import {createStore, combineReducers,applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { incomingPackageReducers,incomingPackageDetailsReducers ,packageUpdateReducers} from './reducers/incomingPackageReducer'
import { userLoginReducers,userRegistrationReducers, userDetailsReducers,userUpdateProfileReducers,userListReducers,userDeleteReducers,userUpdateReducers } from './reducers/userReducer'
import { createPackageReducers } from './reducers/createPackageReduser'
import { getAddressReducers,createAddressReducers } from './reducers/deliveryAddressReduser'
import { getCalculatorReducers,createShippingRateReducers,rateDeleteReducers } from './reducers/calculatorReduser'
import { deleteRates } from './actions/calculatorAction'
import {createOutgoingReducers ,outgoingPackageReducers,outgoingDeleteReducers } from './reducers/outgoingReducer'


const reducer = combineReducers({
      incomingPackageList : incomingPackageReducers,
      incomingPackageDetails : incomingPackageDetailsReducers,
      packageUpdate:packageUpdateReducers,
      userLogin:userLoginReducers,
      userRegister:userRegistrationReducers,
      userDetails:userDetailsReducers,
      userUpdateProfile:userUpdateProfileReducers,
      userList:userListReducers,
      userDelete:userDeleteReducers,
      userUpdate:userUpdateReducers,


      createIncomingPackage:createPackageReducers,
      getAddress:getAddressReducers,
      createAddress:createAddressReducers,
      getCalculators:getCalculatorReducers,
      shippingRate:createShippingRateReducers,
      rateDelete:rateDeleteReducers,

      //for outgoing package
      outgoingCreate:createOutgoingReducers ,
      getOutgoingPackage:outgoingPackageReducers,
      deleteOutgoingPackage:outgoingDeleteReducers
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

