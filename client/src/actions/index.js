import axios from 'axios';
import { FETCH_USER } from './types';
//refactored fetchuser action
export const fetchUser = () => async dispatch =>
  dispatch({
    type: FETCH_USER,
    payload: (await axios.get('/api/current_user')).data
  });
//handles credits that the end user purchases
export const handleToken = token => async dispatch =>
  dispatch({
    type: FETCH_USER,
    payload: (await axios.post('/api/stripe', token)).data
  });

export const submitSurvey = values => {
  return { type: 'submitSurvey' };
};
