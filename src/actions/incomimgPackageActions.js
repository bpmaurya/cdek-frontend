import  axios  from 'axios'
import {
    INCOMING_PACKAGE_REQUEST,
    INCOMING_PACKAGE_SUCCESS,
    INCOMING_PACKAGE_FAIL,

    INCOMING_PACKAGE_DETAIL_REQUEST,
    INCOMING_PACKAGE_DETAIL_SUCCESS,
    INCOMING_PACKAGE_DETAIL_FAIL

} from '../constants/incomingPackageConstant'
import API from '../apiUrl.json'

//This is for list of all incoming package
export const listIncomingPackage = () => async(dispatch) => {
    try {
        dispatch({type:INCOMING_PACKAGE_REQUEST})
        var url = API.baseUrl
        const  {data} = await axios.get(`${url}/incoming/`);

        dispatch({
            type:INCOMING_PACKAGE_SUCCESS,
            payload:data
        })
        // console.log(data);


    } catch (error) {

        dispatch({
            type:INCOMING_PACKAGE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

    }

}

//this is for single incoming package details

export const listIncomingPackageDetails = (_id) => async(dispatch) => {
    try {
        dispatch({type:INCOMING_PACKAGE_DETAIL_REQUEST})
        var url = API.baseUrl
        const  {data} = await axios.get(`${url}/incoming/${_id}`);

        dispatch({
            type:INCOMING_PACKAGE_DETAIL_SUCCESS,
            payload:data
        })
        // console.log(data);


    } catch (error) {

        dispatch({
            type:INCOMING_PACKAGE_DETAIL_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

    }

}