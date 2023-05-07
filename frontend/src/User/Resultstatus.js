
import React from 'react';
import './FinancialAidResult.css'; // Import the CSS file for styling

function FinancialAidResult({ approved }) {
  return (
    <div className={`status ${approved ? 'approved' : 'rejected'}`}>
      {approved ? (
        <h2>Your financial aid application has been approved!</h2>
      ) : (
        <h2>Your financial aid application has been rejected.</h2>
      )}
    </div>
  );
}

export default FinancialAidResult;
