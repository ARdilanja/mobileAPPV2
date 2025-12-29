import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const wp = (percent) => (width * percent) / 100;
