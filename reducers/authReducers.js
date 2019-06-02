import { FETCH_USER } from '../actions/types';

//lower case name because we are exporting a function
export default function(state = null, action) {
  //we are using null to include an in the middle state

  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    default:
      return state;
  }
}
