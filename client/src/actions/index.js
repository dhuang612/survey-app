import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
  //reduxthunk see a function and will call it immediately
  return function(dispatch) {
    //we are only using a relative path added another proxy.
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
