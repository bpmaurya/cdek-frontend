import {
    OUTGOING_PACKAGE_CREATE_REQUEST,
    OUTGOING_PACKAGE_CREATE_SUCCESS,
    OUTGOING_PACKAGE_CREATE_FAIL,

    OUTGOING_PACKAGE_REQUEST,
    OUTGOING_PACKAGE_SUCCESS,
    OUTGOING_PACKAGE_FAIL,

    OUTGOING_PACKAGE_DELETE_REQUEST,
    OUTGOING_PACKAGE_DELETE_SUCCESS,
    OUTGOING_PACKAGE_DELETE_FAIL,

    OUTGOING_PACKAGE_DETAIL_REQUEST,
    OUTGOING_PACKAGE_DETAIL_SUCCESS,
    OUTGOING_PACKAGE_DETAIL_FAIL,
    OUTGOING_PACKAGE_DETAIL_RESET,

    OUTGOING_PACKAGE_UPDATE_REQUEST,
    OUTGOING_PACKAGE_UPDATE_SUCCESS,
    OUTGOING_PACKAGE_UPDATE_FAIL,

} from '../constants/outgoingPackageConstant'




//THIS IS FOR FETCH ALL OUTGOING PACKAGES
export const outgoingPackageReducers =  ( state = { outgoingPackages:[] },action)=>{
    switch(action.type){
        case OUTGOING_PACKAGE_REQUEST:
            return{ loading:true,outgoingPackages:[] }

        case OUTGOING_PACKAGE_SUCCESS:
            return{ loading:false,outgoingPackages: action.payload } 


        case OUTGOING_PACKAGE_FAIL:
            return{ loading:false, error:action.payload}

        default:
            return state

    }

}

//for create outgoing package
export const createOutgoingReducers = ( state = { }, action)=>{
    switch(action.type){
        case OUTGOING_PACKAGE_CREATE_REQUEST:
            return{ loading:true }

        case OUTGOING_PACKAGE_CREATE_SUCCESS:
            return{ loading:false, success:true, createOutgoing: action.payload }


        case OUTGOING_PACKAGE_CREATE_FAIL:
            return{ loading:false, error:action.payload}

        default:
            return state

    }

}


//for delete outgoing package
export const outgoingDeleteReducers =  ( state = { },action)=>{
    switch(action.type){
        case OUTGOING_PACKAGE_DELETE_REQUEST:
            return{ loading:true }

        case OUTGOING_PACKAGE_DELETE_SUCCESS:
            return{ loading:false, success:true } 


        case OUTGOING_PACKAGE_DELETE_FAIL:
            return{ loading:false, success:true }

        default: 
            return state

    }
}

//for get single outgoing Package
export const outgoingPackageDetailsReducers = ( state = { singlePackage:[] },action)=>{
    switch(action.type){
        case OUTGOING_PACKAGE_DETAIL_REQUEST:
            return{ ...state,loading:true }

        case OUTGOING_PACKAGE_DETAIL_SUCCESS:
            return{ loading:false,singlePackage: action.payload }


        case OUTGOING_PACKAGE_DETAIL_FAIL:
            return{ loading:false, error:action.payload}

        case OUTGOING_PACKAGE_DETAIL_RESET:
            return { singlePackage : [] }

        default:
            return state

    }

}

//for outgoing package update

export const outgoingUpdateReducers =  ( state = { item:{} },action)=>{
    switch(action.type){
        case OUTGOING_PACKAGE_UPDATE_REQUEST:
            return{ loading:true }

        case OUTGOING_PACKAGE_UPDATE_SUCCESS:
            return{ loading:false, success:true , item: action.payload } 


        case OUTGOING_PACKAGE_UPDATE_FAIL:
            return{ loading:false}

        // case PACKAGE_UPDATE_RESET:
        //     return{ item:{ } }

        default:
            return state

    }
}