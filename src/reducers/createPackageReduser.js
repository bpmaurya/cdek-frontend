import {
    CREATE_PACKAGE_REQUEST,
    CREATE_PACKAGE_SUCCESS,
    CREATE_PACKAGE_FAIL

} from '../constants/createPackageConstant'



export const createPackageReducers = ( state = { }, action)=>{
    switch(action.type){
        case CREATE_PACKAGE_REQUEST:
            return{ loading:true }

        case CREATE_PACKAGE_SUCCESS:
            return{ loading:false, success:true, createPackage: action.payload }


        case CREATE_PACKAGE_FAIL:
            return{ loading:false, error:action.payload}

        default:
            return state

    }

}