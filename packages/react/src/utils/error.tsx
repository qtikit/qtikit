import React from 'react';

export const useThrowError = () => {
  const [, setState] = React.useState();

  return React.useMemo(
    () => (error: {error: Error | string | null}) =>
      setState(() => {
        throw typeof error === 'string' ? new Error(error) : error;
      }),
    []
  );
};

export class QtiViewerErrorBoundary extends React.Component<{children: any}, {hasError: false; error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: any) {
    this.setState({
      error: error,
    });
  }

  render() {
    return this.state.hasError ? (
      <h3 style={{color: 'red'}}>{this.state.error && this.state.error.toString()}</h3>
    ) : (
      this.props.children
    );
  }
}
