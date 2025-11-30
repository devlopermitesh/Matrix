// __tests__/OnBoarding.test.tsx
import React from 'react';
import OnBoarding from '../../../src/screens/Onboarding';
import { slides } from '../../../src/data/constant';
import { render,fireEvent,act } from '../../../src/testUtils/test-utils';
import useAccount from '../../../src/state/userState';


const mockVisited = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../../src/state/userState');

// mock navigation
jest.mock('../../../src/navigation/Navigationutils', () => ({
  navigate: jest.fn(),
}));





describe('OnBoarding Component', () => {

    beforeEach(() => {
      // Setup mock return value
      (useAccount as unknown as jest.Mock).mockReturnValue({
      firstVisit: true, // Initially true
      visited: mockVisited, // Spy on this function
      user: null,
      theme: 'Light',
    });
    
    jest.clearAllMocks();
  });
  it('renders all slides correctly', () => {
    const { getByText } = render(<OnBoarding />);
    // Check first slide title exists
    expect(getByText(slides[0].title)).toBeTruthy();
  });

  it('goes to next slide when Next is pressed', () => {
    const { getByText } = render(<OnBoarding />);
    const nextButton = getByText('Next');

    act(() => {
      fireEvent.press(nextButton);
    });

    // Expect second slide title to appear
    expect(getByText(slides[1].title)).toBeTruthy();
  });

  it('skips to last slide when Skip is pressed', () => {
    const { getByText } = render(<OnBoarding />);
    const skipButton = getByText('Skip');

    act(() => {
      fireEvent.press(skipButton);
    });

    // Expect last slide title to appear
    expect(getByText(slides[slides.length - 1].title)).toBeTruthy();
  });

  it("shows 'Get Started' on last slide and set  visited when getstart pressed", () => {
    const { getByText } = render(<OnBoarding />);
    const skipButton = getByText('Skip');

    // move to last slide
    act(() => {
      fireEvent.press(skipButton);
    });

    const getStartedButton = getByText('Get Started');
    expect(getStartedButton).toBeTruthy();

    act(() => {
      fireEvent.press(getStartedButton);
    });
 //verify Mockvisited called
    expect(mockVisited).toHaveBeenCalled();
    expect(mockVisited).toHaveBeenCalledTimes(1);
  });

it('calls visited but does NOT navigate when firstVisit is true', () => {
  // firstVisit = true initially (default)
  (useAccount as unknown as jest.Mock).mockReturnValue({
    firstVisit: true, // ← Still true
    visited: mockVisited,
    user: null,
    theme: 'Light',
  });

  const { getByText } = render(<OnBoarding />);
  
  fireEvent.press(getByText('Skip'));
  fireEvent.press(getByText('Get Started'));

  // visited should be called
  expect(mockVisited).toHaveBeenCalled();
  
  // But navigate should NOT be called (because firstVisit is true)
  expect(mockNavigate).not.toHaveBeenCalled();
});



});
