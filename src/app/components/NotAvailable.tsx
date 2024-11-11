import React from 'react';

type CenteredErrorMessageProps = {
  title: string;
  description: string;
};

const NotAvaiable: React.FC<CenteredErrorMessageProps> = ({ title, description }) => {
  return (
    <div className="flex items-center justify-center m-5 w-1/2 mx-auto min-h-[90vh]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{title}</h1>
        <p className="text-foreground">{description}</p>
      </div>
    </div>
  );
};

export default NotAvaiable;
