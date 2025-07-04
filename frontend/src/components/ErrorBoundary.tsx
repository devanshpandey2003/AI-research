import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-100 px-8 py-4">
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 max-w-md w-full text-center mx-8">
            <div className="w-12 h-12 mx-auto mb-3 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h1 className="text-lg text-red-400 font-semibold mb-2">
              Application Error
            </h1>
            
            <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
              Something went wrong. This could be due to a network issue or an API error.
            </p>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="flex-1 text-xs h-8"
              >
                Try Again
              </Button>
              <Button
                variant="destructive"
                onClick={() => window.location.reload()}
                className="flex-1 text-xs h-8"
              >
                Refresh Page
              </Button>
            </div>
            
            {this.state.error && (
              <details className="mt-3 text-left">
                <summary className="text-xs text-neutral-400 cursor-pointer hover:text-neutral-300">
                  Error Details
                </summary>
                <pre className="text-xs text-red-300 mt-1 p-2 bg-neutral-900/50 rounded overflow-auto max-h-24">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
