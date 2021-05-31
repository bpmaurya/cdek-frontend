import axios from "axios";
import {
    DELIVERY_ADDRESS_REQUEST,
    DELIVERY_ADDRESS_SUCCESS,
    DELIVERY_ADDRESS_FAIL,


    DELIVERY_ADDRESS_CREATE_REQUEST,
    DELIVERY_ADDRESS_CREATE_SUCCESS,
    DELIVERY_ADDRESS_CREATE_FAIL
  } from "../constants/deliveryConstant";

  import API from "../apiUrl.json";

  export const getUserAddress = ( ) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELIVERY_ADDRESS_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      var url = API.baseUrl;
      const { data } = await axios.get(`${url}/address/`, config);
  
      dispatch({
        type: DELIVERY_ADDRESS_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: DELIVERY_ADDRESS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  


  

//for create address action 
export const createAddress = ( address={} ) => async(dispatch,getState)=>{
  try{
      dispatch({
          type:DELIVERY_ADDRESS_CREATE_REQUEST,

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
      const {data} = await axios.post(`${url}/address/`,address, config)

      dispatch({
          type:DELIVERY_ADDRESS_CREATE_SUCCESS,
          payload:data
      })

  }
  catch(error){
      dispatch({
          type:DELIVERY_ADDRESS_CREATE_FAIL,
          payload:error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      })

  }
}