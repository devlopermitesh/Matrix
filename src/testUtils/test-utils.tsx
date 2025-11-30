import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from '../utils/ThemeContext';

jest.mock('../state/userState', () => ({
  __esModule: true,        // <-- SUPER IMPORTANT
  default: jest.fn(() => ({
    user: null,
    theme: "Light",
    NotificationOn: true,
    firstVisit: false,
    updateProfile: jest.fn(),
    updateTheme: jest.fn(),
    toggleNotification: jest.fn(),
    visited: jest.fn(),
  })),
}));


// Mock navigation ref
export const mockNavigationRef = {
  current: null,
};

const MockNavigationContainer = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

// All providers wrapper
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
          <MockNavigationContainer>
        {children}
      </MockNavigationContainer>

    </ThemeProvider>
  );
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from @testing-library/react-native
export * from '@testing-library/react-native';

// Override render method
export { customRender as render };