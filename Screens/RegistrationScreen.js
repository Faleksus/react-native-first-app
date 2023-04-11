import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import Container from "./Container";
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

import * as Font from "expo-font";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });
};

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const passwordShowToggle = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bg}
          source={require("../assets/images/bg.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Container>
              <View style={styles.form}>
                <View style={styles.viewImg}>
                  {/* <Image
                    style={styles.img}
                    source={require("../assets/images/avatar.jpeg")}
                  /> */}
                  <Pressable style={styles.addAvatar}>
                    <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                    {/* <AntDesign name="closecircleo" size={24} color="#E8E8E8" /> */}
                  </Pressable>
                </View>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Реєстрація</Text>
                </View>
                <View style={styles.viewInput}>
                  {/* <Text style={styles.placeholder}>Логін</Text> */}
                  <TextInput
                    style={{ ...styles.input, width: dimensions }}
                    placeholder="Введіть логін"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                    value={state.login}
                  />
                </View>
                <View style={styles.viewInput}>
                  {/* <Text style={styles.placeholder}>Адреса электроної пошти</Text> */}
                  <TextInput
                    style={{ ...styles.input, width: dimensions }}
                    placeholder="Введіть адресу электроної пошти"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    value={state.email}
                  />
                </View>
                <View style={styles.viewInput}>
                  {/* <Text style={styles.placeholder}>Пароль</Text> */}
                  <TextInput
                    style={{ ...styles.input, width: dimensions }}
                    placeholder="Введіть пароль"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isSecureTextEntry}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    value={state.password}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.buttonViewPass}
                  >
                    <Text
                      style={styles.textViewPass}
                      onPress={passwordShowToggle}
                    >
                      Показати
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    ...styles.button,
                    display: isShowKeyboard ? "none" : "flex",
                  }}
                  onPress={keyboardHide}
                >
                  <Text style={styles.textButton}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    ...styles.buttonEnter,
                    marginBottom: isShowKeyboard ? 32 : 78,
                  }}
                >
                  <Text
                    style={{
                      ...styles.textEnter,
                      display: isShowKeyboard ? "none" : "flex",
                    }}
                  >
                    Вже є аккаунт? Увійти
                  </Text>
                </TouchableOpacity>
              </View>
            </Container>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {},
  viewImg: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignSelf: "center",
    marginTop: -60,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    marginBottom: "-30%",
  },
  addAvatar: {
    width: 25,
    height: 25,
    marginRight: -12.5,
    marginBottom: 14,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  header: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 33,
  },
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },
  placeholder: {
    color: "#BDBDBD",
    fontSize: 16,
    position: "absolute",
    top: 10,
    left: 32,
    zIndex: 1,
  },
  viewInput: {
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  buttonViewPass: {
    position: "absolute",
    right: 32,
    // top: Platform.OS === "ios" ? 16 : 10,
    ...Platform.select({
      ios: {
        top: 16,
      },
      android: {
        top: 10,
      },
    }),
  },
  textViewPass: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  button: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    borderRadius: 100,
    marginTop: 27,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
  },
  buttonEnter: {
    marginTop: 16,
    alignItems: "center",
    // marginBottom: 78,
  },
  textEnter: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default RegistrationScreen;
