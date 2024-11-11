import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center p-10 min-h-[50vh]">
    <div className="animate-spin rounded-full border-t-2 border-blue-600 w-12 h-12"></div>
  </div>
);

export default Spinner;
