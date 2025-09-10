import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "../atoms/Icon";
import { RFValue } from "react-native-responsive-fontsize";
import { navigate } from "../../navigation/Navigationutils";

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <Image
        testID="tick-icon" 
          source={require("../../asset/Images/tickicon.png")}
          style={{ 
            height: RFValue(25),
            width: RFValue(25),
          }}
        />
        <Text style={styles.text}>FocusMatrix</Text>
      </View>

      {/* Right Section */}
      <TouchableOpacity testID="settings-button" onPress={() =>navigate("Profile")}>
        <Image
        testID="settings-icon" 

          source={require("../../asset/Images/settingicon.png")}
          style={styles.settingIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: RFValue(50),
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: RFValue(12),

    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    // shadow for Android
    elevation: 3,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(6),
  },
  text: {
    fontWeight: "700",
    fontSize: RFValue(18),
    color: "#000",
  },
  settingIcon: {
    height: RFValue(26),
    width: RFValue(26),
    resizeMode: "contain",
  },
});
