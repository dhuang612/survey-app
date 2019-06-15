/*SurveyField contains logic and 
we are separating this into its own component to customize labels and input fields with
props
we aren't making a full component atm
redux form allows us to wiring up the event handlers for changes to this input
*/
import React from 'react';
//we can access props even if we don't create a component
export default ({ input, label, meta: { error, touched } }) => {
  console.log(input);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" stlye={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
