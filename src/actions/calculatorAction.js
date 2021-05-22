import axios from "axios";
import {
    CREATE_CALCULATOR_REQUEST,
    CREATE_CALCULATOR_SUCCESS,
    CREATE_CALCULATOR_FAIL
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