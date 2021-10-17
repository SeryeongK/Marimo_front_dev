import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import Orientation from "react-native-orientation";
import styled from "styled-components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import preURL from "../../preURL/preURL";

const StoryLoading = ({ route, navigation }) => {
  const [response, setResponse] = useState("");
  const { userID, taleName } = route.params;

  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(onOrientaionChange);
    return () => {
      Orientation.unlockAllOrientations(),
        Orientation.removeOrientationListener(onOrientaionChange);
    };
  }, []);
  const onOrientaionChange = (orientation) => {
    if (orientation === "LANDSCAPE-RIGHT") {
      console.log(orientation);
      Orientation.lockToLandscapeLeft();
    }
  };
  
  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 140) : (cntrMargin = 100);
  let chMargin = 0;
  Platform.OS === "ios" ? (chMargin = 130) : (chMargin = 20);

  const postResult = async () => {
    const data1 = {
      userId: userID,
      taleName: taleName,
      lastpage: 1,
    };
    console.log("data1:", data1);
    axios
      .post(preURL.preURL + "/marimo/tale/save", data1)
      .then((res) => {
        setResponse(res.data);
        console.log("저장:", response);
      })
      .catch((err) => {
        console.log("전송에 실패 ");
        console.log(err);
      });
  };

  return (
    <View style={{ display: "flex", flex: 1, backgroundColor: "#FFFBF8" }}>
      <Container style={{ marginTop: cntrMargin }}>
        <Text
          style={[
            styles.title,
            {
              marginBottom: "10%",
              color: "#464D46",
              fontSize: hp(4),
              fontFamily: "Cafe24Ssurround",
            },
          ]}
        >
          호랑이의 생일잔치
        </Text>
        <Image
          source={require("../../assets/images/story/Story1Page1.png")}
          style={styles.loadingImg}
        />
        <View style={[styles.btnContainer]}>
          <TouchableOpacity
            style={[styles.selectAg, { marginBottom: 20 }]}
            onPress={() => {
              navigation.navigate("Story1"), postResult();
            }}
          >
            <Text style={styles.btnText}>계속 모험을 진행할래요!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectAg}
            onPress={() => navigation.navigate("StoryMain")}
          >
            <Text style={styles.btnText}>아니요, 다른 모험을 선택할래요!</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 35,
    marginBottom: 30,
    fontSize: 20,
  },
  loadingImg: {
    height: 300,
    width: 300,
    marginBottom: 30,
    borderRadius: 150,
  },
  btnContainer: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  selectAg: {
    width: 343,
    height: 56,
    backgroundColor: "#B16CF7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginTop: 10,
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
});

export default StoryLoading;
const Container = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
