import {
    INCOMING_PACKAGE_REQUEST,
    INCOMING_PACKAGE_SUCCESS,
    INCOMING_PACKAGE_FAIL,

   INCOMING_PACKAGE_DETAIL_REQUEST,
   INCOMING_PACKAGE_DETAIL_SUCCESS,
   INCOMING_PACKAGE_DETAIL_FAIL,
   INCOMING_PACKAGE_DETAIL_RESET,

   PACKAGE_UPDATE_REQUEST,
   PACKAGE_UPDATE_SUCCESS,
   PACKAGE_UPDATE_FAIL,
   PACKAGE_UPDATE_RESET,


} from '../constants/incomingPackageConstant'


//THIS IS FOR FETCH ALL INCOMING PACKAGES
export const incomingPackageReducers =  ( state = { incomingPackages:[] },action)=>{
    switch(action.type){
        case INCOMING_PACKAGE_REQUEST:
            return{ loading:true,incomingPackages:[] }

        case INCOMING_PACKAGE_SUCCESS:
            return{ loading:false,incomingPackages: action.payload } 


        case INCOMING_PACKAGE_FAIL:
            return{ loading:false, error:action.payload}

        default:
            return state

    }

}

//THIS IS FOR FETCH SINGLE INCOMING PACKAGE DETAILS
export const incomingPackageDetailsReducers = ( state = { incomingPackage:[] },action)=>{
    switch(action.type){
        case INCOMING_PACKAGE_DETAIL_REQUEST:
            return{ ...state,loading:true }

        case INCOMING_PACKAGE_DETAIL_SUCCESS:
            return{ loading:false,incomingPackage: action.payload }


        case INCOMING_PACKAGE_DETAIL_FAIL:
            return{ loading:false, error:action.payload}

        case INCOMING_PACKAGE_DETAIL_RESET:
            return { incomingPackage : [] }

        default:
            return state

    }

}


//FOR update selected package for admin
export const packageUpdateReducers =  ( state = { item:{} },action)=>{
    switch(action.type){
        case PACKAGE_UPDATE_REQUEST:
            return{ loading:true }

        case PACKAGE_UPDATE_SUCCESS:
            return{ loading:false, success:true , item: action.payload } 


        case PACKAGE_UPDATE_FAIL:
            return{ loading:false}

        case PACKAGE_UPDATE_RESET:
            return{ item:{ } }

        default:
            return state

    }
}