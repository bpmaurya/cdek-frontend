import {
  DELIVERY_ADDRESS_REQUEST,
  DELIVERY_ADDRESS_SUCCESS,
  DELIVERY_ADDRESS_FAIL,
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
