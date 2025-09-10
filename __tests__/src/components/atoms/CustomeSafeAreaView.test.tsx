import { render } from "@testing-library/react-native"
import CustomeSafeAreaView from "../../../../src/components/atoms/CustomeSafeAreaView"
import { Text } from "react-native"

describe("CustomeSafeAreaView",()=>{
    it("Should render the children in SafeArevew",()=>{
        const {getByText}=render(
            <CustomeSafeAreaView>
                <Text>Hello world</Text>
            </CustomeSafeAreaView>
        )
        expect(getByText("Hello world")).toBeTruthy()
    })
    it("Should render StatusBar",()=>{
        const { UNSAFE_getByType}=render(
            <CustomeSafeAreaView>
                <Text>Hello</Text>
            </CustomeSafeAreaView>
        )
          expect(UNSAFE_getByType(require("react-native").StatusBar)).toBeTruthy();
    })
})