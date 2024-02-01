import { FC } from "react";
import "../styles/ErrorPage.css";

const ErrorPage: FC = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title">Unexpected Application Error!</h1>
      <p className="error-page__support-message">
        Please try again later or contact support.
      </p>
    </div>
  );
};

export default ErrorPage;
