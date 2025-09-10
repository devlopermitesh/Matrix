import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PlusButton from "../../../../src/components/atoms/PlusButton";

describe("PlusButton Component", () => {
  it("renders correctly with default styles", () => {
    const { getByTestId } = render(<PlusButton onPress={() => {}} style={{}} />);
    const button = getByTestId("plus-button");
    expect(button).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(<PlusButton onPress={mockPress} style={{}} />);
    const button = getByTestId("plus-button");
    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it("applies custom style when passed", () => {
    const customStyle = { backgroundColor: "red" };
    const { getByTestId } = render(<PlusButton onPress={() => {}} style={customStyle} />);
    const button = getByTestId("plus-button");
  expect(button.props.style).toEqual((expect.objectContaining(customStyle))
  );


  });
});
