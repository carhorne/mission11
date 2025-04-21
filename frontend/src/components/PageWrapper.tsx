// src/components/PageWrapper.tsx
import React from 'react';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="d-flex justify-content-center align-items-start min-vh-100 py-5 px-3">
    <div className="w-100" style={{ maxWidth: "800px"}}>
      {children}
    </div>
  </div>
);

export default PageWrapper;
