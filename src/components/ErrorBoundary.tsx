import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import content from "../data";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const language = (localStorage.getItem('language') === 'en' ? 'en' : 'uk');
      const { ui } = content[language];
      
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto text-3xl">
              !
            </div>
            <h1 className="text-3xl font-bold text-union-primary">
              {ui.errorTitle}
            </h1>
            <p className="text-muted-foreground">
              {ui.errorDescription}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-union-primary text-white rounded-full font-bold hover:bg-union-accent transition-colors"
            >
              {ui.errorButton}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
