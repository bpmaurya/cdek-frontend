import  axios  from 'axios'
import {
    INCOMING_PACKAGE_REQUEST,
    INCOMING_PACKAGE_SUCCESS,
    INCOMING_PACKAGE_FAIL,

    INCOMING_PACKAGE_DETAIL_REQUEST,
    INCOMING_PACKAGE_DETAIL_SUCCESS,
    INCOMING_PACKAGE_DETAIL_FAIL,

    PACKAGE_UPDATE_REQUEST,
    PACKAGE_UPDATE_SUCCESS,
    PACKAGE_UPDATE_FAIL,

} from '../constants/incomingPackageConstant'
import API from '../apiUrl.json'

//This is for list of all incoming package
export const listIncomingPackage = () => async(dispatch,getState) => {
    try {
        dispatch({type:INCOMING_PACKAGE_REQUEST})
        const {
            userLogin:{userInfo},

        } = getState()

        const config={
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        var url = API.baseUrl
        const  {data} = await axios.get(`${url}/incoming/`,config);

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
        const  {data} = await axios.get(`${url}/incoming/${_id}/`);

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

//for update package actions for admin
export const updatePackage = (item={}) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PACKAGE_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token} `,
        },
      };
      var url = API.baseUrl;
      const { data } = await axios.put(
        `${url}/incoming/edit/${item._id}/`,
        item,
        config
      );
  
      dispatch({
        type: PACKAGE_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: INCOMING_PACKAGE_DETAIL_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: PACKAGE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };