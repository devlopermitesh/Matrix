// __tests__/OnBoarding.test.tsx
import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import OnBoarding from "../../../src/screens/Onboarding";
import { slides } from "../../../src/data/constant";
import { navigate } from "../../../src/navigation/Navigationutils";

// mock navigation
jest.mock("../../../src/navigation/Navigationutils", () => ({
  navigate: jest.fn(),
}));

describe("OnBoarding Component", () => {
  it("renders all slides correctly", () => {
    const { getByText } = render(<OnBoarding />);
    // Check first slide title exists
    expect(getByText(slides[0].title)).toBeTruthy();
  });

  it("goes to next slide when Next is pressed", () => {
    const { getByText } = render(<OnBoarding />);
    const nextButton = getByText("Next");

    act(() => {
      fireEvent.press(nextButton);
    });

    // Expect second slide title to appear
    expect(getByText(slides[1].title)).toBeTruthy();
  });

  it("skips to last slide when Skip is pressed", () => {
    const { getByText } = render(<OnBoarding />);
    const skipButton = getByText("Skip");

    act(() => {
      fireEvent.press(skipButton);
    });

    // Expect last slide title to appear
    expect(getByText(slides[slides.length - 1].title)).toBeTruthy();
  });

  it("shows 'Get Started' on last slide and navigates to Home when pressed", () => {
    const { getByText } = render(<OnBoarding />);
    const skipButton = getByText("Skip");

    // move to last slide
    act(() => {
      fireEvent.press(skipButton);
    });

    const getStartedButton = getByText("Get Started");
    expect(getStartedButton).toBeTruthy();

    act(() => {
      fireEvent.press(getStartedButton);
    });

    expect(navigate).toHaveBeenCalledWith("Home");
  });
});
