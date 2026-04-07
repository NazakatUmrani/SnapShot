import * as React from 'react';
import { Spinner } from './ui/spinner';
import { Button } from './ui/button';

interface IMyButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  spinnerPosition?: 'left' | 'right';
}

const MyButton: React.FunctionComponent<IMyButtonProps> = ({ 
  isLoading = false, 
  loadingText = 'Loading',
  children,
  disabled = false,
  spinnerPosition = 'left',
  ...props 
}) => {
  const spinner = isLoading && <Spinner data-icon="inline-start" />;
  
  return (
    <Button 
      disabled={isLoading || disabled} 
      {...props}
    >
      {spinnerPosition === 'left' && spinner}
      {isLoading && loadingText ? loadingText : children}
      {spinnerPosition === 'right' && spinner}
    </Button>
  );
};

export default MyButton;