
import  axios  from 'axios'
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

    OUTGOING_PACKAGE_UPDATE_REQUEST,
    OUTGOING_PACKAGE_UPDATE_SUCCESS,
    OUTGOING_PACKAGE_UPDATE_FAIL,

} from '../constants/outgoingPackageConstant'
import API from '../apiUrl.json'



//This is for list of all outgoing Package
export const listOutgoingPackage = () => async(dispatch,getState) => {
    try {
        dispatch({type:OUTGOING_PACKAGE_REQUEST})
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
        const  {data} = await axios.get(`${url}/outgoing/`,config);

        dispatch({
            type:OUTGOING_PACKAGE_SUCCESS,
            payload:data
        })
        // console.log(data);


    } catch (error) {

        dispatch({
            type:OUTGOING_PACKAGE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

    }

}




//for create Package action 
export const createOutgoing = ( Package={} ) => async(dispatch,getState)=>{
    try{
        dispatch({
            type:OUTGOING_PACKAGE_CREATE_REQUEST,

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
        const {data} = await axios.post(`${url}/outgoing/`,Package, config)

        dispatch({
            type:OUTGOING_PACKAGE_CREATE_SUCCESS,
            payload:data
        })

    }
    catch(error){
        dispatch({
            type:OUTGOING_PACKAGE_CREATE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })

    }
}

//for delete outgoing package
export const deleteOutgoing = (_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: OUTGOING_PACKAGE_DELETE_REQUEST,
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
      const { data } = await axios.delete(
        `${url}/outgoing/delete/${_id}/`,
        config
      );
  
      dispatch({
        type: OUTGOING_PACKAGE_DELETE_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: OUTGOING_PACKAGE_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  //this is for single outgoing package details

export const outgoingPackageDetails = (_id) => async(dispatch) => {
  try {
      dispatch({type:OUTGOING_PACKAGE_DETAIL_REQUEST})
      var url = API.baseUrl
      const  {data} = await axios.get(`${url}/outgoing/${_id}/`);

      dispatch({
          type:OUTGOING_PACKAGE_DETAIL_SUCCESS,
          payload:data
      })
      // console.log(data);


  } catch (error) {

      dispatch({
          type:OUTGOING_PACKAGE_DETAIL_FAIL,
          payload:error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      })

  }

}

//for update outgoing package


export const updateOutgoingPackage = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OUTGOING_PACKAGE_UPDATE_REQUEST,
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
      `${url}/outgoing/update/${item._id}/`,
      item,
      config
    );

    dispatch({
      type: OUTGOING_PACKAGE_UPDATE_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: OUTGOING_PACKAGE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};