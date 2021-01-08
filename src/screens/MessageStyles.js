import { StyleSheet } from "react-native";
import CommonColors from "../utils/CommonColors";

export default MessageStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  systemMessageWrapper: {
    backgroundColor: "#6646ee",
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  down_arrow: {
    width: 18,
    height: 18,
    transform: [{ rotate: "90deg" }],
    alignSelf: "center",
    tintColor: CommonColors.BLUE,
  },
  send_image: {
    width: 18,
    height: 18,
    alignSelf: "center",
    tintColor: "white",
  },
  button_view: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    marginBottom: 6,
    justifyContent: "center",
    backgroundColor: CommonColors.BLUE,
  },
});
