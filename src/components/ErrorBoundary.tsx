import { Component, ReactNode } from "react";
import ErrorPage from "../pages/ErrorPage";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary class component for handling errors in React applications.
 *
 * @description
 *
 * - Used to prevent the entire app from unmounting due to errors thrown during the React lifecycle.
 * - Wrap components that can potentially have errors to provide graceful error handling.
 *
 * - Limitations: ErrorBoundary does not catch async code and event handlers.
 * - Combine with `useThrowAsyncError` for uber error handling.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }
}

export default ErrorBoundary;
