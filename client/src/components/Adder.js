import React from 'react';

const Adder = props => {
  return (
    <div className="adder-container">
      <div className="adder">
        <button 
          onClick={() => {
            props.setAdderActive(true);
            document.body.style.overflow = 'hidden';
          }}
          >Add a pup.
        </button>
      </div>
    </div>
  )
}

export default Adder;