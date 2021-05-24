import axios from "axios";
import {
    CREATE_CALCULATOR_REQUEST,
    CREATE_CALCULATOR_SUCCESS,
    CREATE_CALCULATOR_FAIL,

    CREATE_SHIPPING_RATE_REQUEST,
    CREATE_SHIPPING_RATE_SUCCESS,
    CREATE_SHIPPING_RATE_FAIL,
  } from "../constants/calculatorConstant";

  import API from "../apiUrl.json";


  export const getCalculator = ( ) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_CALCULATOR_REQUEST,
      });

      var url = API.baseUrl;
      const { data } = await axios.get(`${url}/calc/`);
  
      dispatch({
        type: CREATE_CALCULATOR_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: CREATE_CALCULATOR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


//for shippingRate action
export const createShippingRate = ( shipping_rate = { } ) => async(dispatch,getState)=>{
  try{
      dispatch({
          type:CREATE_SHIPPING_RATE_REQUEST,

      })
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
      const {data} = await axios.post(`${url}/calc/`, shipping_rate ,config)

      dispatch({
          type:CREATE_SHIPPING_RATE_SUCCESS,
          payload:data
      })

  }
  catch(error){
      dispatch({
          type:CREATE_SHIPPING_RATE_FAIL,
          payload:error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      })
  }
}