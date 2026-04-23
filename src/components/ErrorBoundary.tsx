import React from "react";
import type { ReactNode } from "react";
import "./errorBoundary.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const isDevelopment = import.meta.env.DEV;

/**
 * Error Boundary component to catch React errors and display fallback UI
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    // Optionally reload the page
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <h1 className="error-boundary-title">Oops! Something went wrong</h1>
            <p className="error-boundary-message">
              We apologize for the inconvenience. An unexpected error has
              occurred.
            </p>
            {isDevelopment && this.state.error && (
              <details className="error-boundary-details">
                <summary className="error-boundary-summary">
                  Error Details (Development Only)
                </summary>
                <pre className="error-boundary-trace">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div className="error-boundary-actions">
              <button
                className="error-boundary-button"
                onClick={this.handleReset}
              >
                Go to Home
              </button>
              <button
                className="error-boundary-button error-boundary-button-secondary"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
