import {
    CREATE_CALCULATOR_REQUEST,
    CREATE_CALCULATOR_SUCCESS,
    CREATE_CALCULATOR_FAIL,

    CREATE_SHIPPING_RATE_REQUEST,
    CREATE_SHIPPING_RATE_SUCCESS,
    CREATE_SHIPPING_RATE_FAIL,

    DELETE_SHIPPING_RATE_REQUEST,
    DELETE_SHIPPING_RATE_SUCCESS,
    DELETE_SHIPPING_RATE_FAIL,
  

} from '../constants/calculatorConstant'


export const getCalculatorReducers =  ( state = { calculator:[] },action)=>{
    switch(action.type){
        case CREATE_CALCULATOR_REQUEST:
            return{ loading:true}

        case CREATE_CALCULATOR_SUCCESS:
            return{ loading:false,calculator: action.payload } 


        case CREATE_CALCULATOR_FAIL:
            return{ loading:false, error:action.payload}

        default:
            return state

    }

}

export const createShippingRateReducers = ( state = [ ], action)=>{
    switch(action.type){
        case CREATE_SHIPPING_RATE_REQUEST:
            return{ loading1:true }

        case CREATE_SHIPPING_RATE_SUCCESS:
            return{ loading1:false, success1:true, createShippingRate: action.payload }


        case CREATE_SHIPPING_RATE_FAIL:
            return{ loading1:false, error1:action.payload}

        default:
            return state

    }

}

//FOR Delete selected Shipping rate 
export const rateDeleteReducers =  ( state = { },action)=>{
    switch(action.type){
        case DELETE_SHIPPING_RATE_REQUEST:
            return{ loading:true }

        case DELETE_SHIPPING_RATE_SUCCESS:
            return{ loading:false, success:true } 


        case DELETE_SHIPPING_RATE_FAIL:
            return{ loading:false, success:true }

        default:
            return state

    }
}