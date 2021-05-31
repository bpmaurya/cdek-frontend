import {
  DELIVERY_ADDRESS_REQUEST,
  DELIVERY_ADDRESS_SUCCESS,
  DELIVERY_ADDRESS_FAIL,

  DELIVERY_ADDRESS_CREATE_REQUEST,
  DELIVERY_ADDRESS_CREATE_SUCCESS,
  DELIVERY_ADDRESS_CREATE_FAIL,

} from "../constants/deliveryConstant";

//FOR USER ADDRESS REDUCERS
export const getAddressReducers =  ( state = { address:[] },action)=>{
    switch(action.type){
        case DELIVERY_ADDRESS_REQUEST:
            return{ loading:true}

        case DELIVERY_ADDRESS_SUCCESS:
            return{ loading:false,address: action.payload } 


        case DELIVERY_ADDRESS_FAIL:
            return{ loading:false, error:action.payload}

        default:
            return state

    }

}


//for create address
export const createAddressReducers = ( state = { }, action)=>{
    switch(action.type){
        case DELIVERY_ADDRESS_CREATE_REQUEST:
            return{ loading:true }

        case DELIVERY_ADDRESS_CREATE_SUCCESS:
            return{ loading:false, success:true, createAddress: action.payload }


        case DELIVERY_ADDRESS_CREATE_FAIL:
            return{ loading:false, error:action.payload}

        default:
            return state

    }

}
