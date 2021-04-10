import {
    INCOMING_PACKAGE_REQUEST,
    INCOMING_PACKAGE_SUCCESS,
    INCOMING_PACKAGE_FAIL,

   INCOMING_PACKAGE_DETAIL_REQUEST,
   INCOMING_PACKAGE_DETAIL_SUCCESS,
   INCOMING_PACKAGE_DETAIL_FAIL


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
            return{ loading:true, incomingPackage:[] }

        case INCOMING_PACKAGE_DETAIL_SUCCESS:
            return{ loading:false,incomingPackage: action.payload }


        case INCOMING_PACKAGE_DETAIL_FAIL:
            return{ loading:false, error:action.payload}

        default:
            return state

    }

}