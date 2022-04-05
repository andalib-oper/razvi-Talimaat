import {
    REQ,
    REQ_SUCCESS,
    SET_NEW_AUTH_TOKEN,
    REQ_FAILURE,
    LOGOUT,
  } from './actionType';
  
  export const req = () => ({
    type: REQ_SUCCESS,
  });
  
  export const logout = () => ({type: LOGOUT});
  