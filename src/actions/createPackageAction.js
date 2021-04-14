import  axios  from 'axios'
import {
    CREATE_PACKAGE_REQUEST,
    CREATE_PACKAGE_SUCCESS,
    CREATE_PACKAGE_FAIL

} from '../constants/createPackageConstant'
import API from '../apiUrl.json'



//for create package action 
export const createPackage = ( package ) => async(dispatch,getState)=>{
    try{
        dispatch({
            type:CREATE_PACKAGE_REQUEST,

        })
        const {
            userLogin:{userInfo},

        } = getState()

        const config={
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token} `
            }
        }
        var url = API.baseUrl
        const {data} = await axios.post(`${url}/add/create/`,package, config)

        dispatch({
            type:CREATE_PACKAGE_SUCCESS,
            payload:data
        })

    }
    catch(error){
        dispatch({
            type:CREATE_PACKAGE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

    }
}