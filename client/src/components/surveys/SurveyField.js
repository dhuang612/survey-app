/*SurveyField contains logic and 
we are separating this into its own component to customize labels and input fields with
props
we aren't making a full component atm
redux form allows us to wiring up the event handlers for changes to this input
*/
import React from 'react';
//we can access props even if we don't create a component
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  );
};
