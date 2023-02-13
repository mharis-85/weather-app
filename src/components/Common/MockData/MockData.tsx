import React, { ReactElement } from "react";
import "./MockData.scss";

type MockDataProps = {
  children: ReactElement;
  useMockData: boolean;
};

export const MockData = ({ children, useMockData }: MockDataProps) => {
  return (
    <>
      {useMockData ? (
        <>
          <div className="info-popup">
            The application is running in demo mode. To run the application with
            real data please check the{" "}
          </div>
          {children}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default MockData;
