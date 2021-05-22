import {
    CREATE_CALCULATOR_REQUEST,
    CREATE_CALCULATOR_SUCCESS,
    CREATE_CALCULATOR_FAIL
  

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