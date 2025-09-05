import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import { TextStyle } from "react-native";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  iconType?: "material" | "material-community" | "font-awesome" | "ionicons" | "ant-design"|"Octicons";
  style?: TextStyle
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#000",
  iconType = "material",
  style
}) => {
  switch (iconType) {
    case "material":
      return <MaterialIcon style={style} name={name} size={size} color={color} />;
    case "material-community":
      return <MaterialCommunityIcons style={style} name={name} size={size} color={color} />;
    case "font-awesome":
      return <FontAwesomeIcon style={style} name={name} size={size} color={color} />;
    case "ionicons":
      return <IoniconsIcon style={style} name={name} size={size} color={color} />;
    case "ant-design":
      return <AntDesignIcon style={style} name={name} size={size} color={color} />;
    case "Octicons":
      return <Octicons style={style} name={name} size={size} color={color} />;
    default:
      return <MaterialIcon style={style} name={name} size={size} color={color} />;
  }
};

export default Icon;