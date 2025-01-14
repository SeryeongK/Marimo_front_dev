import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import Orientation from "react-native-orientation";
import StoryMain from "./StoryMain";
import Sound from "react-native-sound";

const path1 = require("../../assets/sounds/story1page1.m4a");
const path2 = require("../../assets/sounds/story1page2.m4a");
const path3 = require("../../assets/sounds/story1page3.mp3");
const path4 = require("../../assets/sounds/story1page4.m4a");

let music1 = new Sound(path1, null, (error) => {
  if (error) {
    console.log("play failed");
  }
});

let music2 = new Sound(path2, null, (error) => {
  if (error) {
    console.log("play failed");
  }
});

let music3 = new Sound(path3, null, (error) => {
  if (error) {
    console.log("play failed");
  }
});

let music4 = new Sound(path4, null, (error) => {
  if (error) {
    console.log("play failed");
  }
});

const StoryOne = ({ navigation, route }) => {
  const { userID, statusBar, screenHeight } = route.params;

  console.log("ID:", userID);

  const [pageNum, setPageNum] = useState(1);

  const handleBackButtonClick = () => {
    music1.stop(() => console.log("music stop"));
    music2.stop(() => console.log("music stop"));
    music3.stop(() => console.log("music stop"));
    music4.stop(() => console.log("music stop"));
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    console.log("ID:", userID);
    Orientation.lockToLandscapeRight();
    Orientation.addOrientationListener(onOrientaionChange);
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      Orientation.unlockAllOrientations(),
        Orientation.removeOrientationListener(onOrientaionChange);
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  const onOrientaionChange = (orientation) => {
    if (orientation === "LANDSCAPE_RIGHT") {
      Orientation.lockToLandscape();
    }
  };

  if (pageNum == 1) {
    music2.stop(() => console.log("music stop"));
    music3.stop(() => console.log("music stop"));
    music4.stop(() => console.log("music stop"));
    console.log("====================== page 1 ======================");
    music1.play();
  } else if (pageNum == 2) {
    music1.stop(() => console.log("music stop"));
    music3.stop(() => console.log("music stop"));
    music4.stop(() => console.log("music stop"));
    console.log("====================== page 2 ======================");
    music2.play();
  } else if (pageNum == 3) {
    music1.stop(() => console.log("music stop"));
    music2.stop(() => console.log("music stop"));
    music4.stop(() => console.log("music stop"));
    console.log("====================== page 3 ======================");
    music3.play();
  } else if (pageNum == 4) {
    music1.stop(() => console.log("music stop"));
    music2.stop(() => console.log("music stop"));
    music3.stop(() => console.log("music stop"));
    console.log("====================== page 4 ======================");
    music4.play();
  } else {
    console.log("동화1 끝!");
  }

  return (
    <View>
      {pageNum == 1 ? (
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/story/Story1Page1.png")}
            style={{
              width: "100%",
              height: screenHeight,
              marginTop: statusBar,
            }}
            resizeMode="stretch"
          >
            <Text style={styles.pageIndex}>{pageNum}/4</Text>
            <TouchableOpacity
              style={{
                width: 265,
                height: 90,
                position: "absolute",
                top: "-2%",
                left: "32%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "침대",
                  LastPage: 1,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>침대</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 290,
                height: 120,
                position: "absolute",
                top: "65%",
                left: "27%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "이불",
                  LastPage: 1,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>이불</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                top: "50%",
                left: "66%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "시계",
                  LastPage: 1,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>시계</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 70,
                height: 70,
                position: "absolute",
                top: "56%",
                left: "88.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "축구공",
                  LastPage: 1,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>축구공</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 120,
                height: 70,
                position: "absolute",
                top: "17%",
                left: "72.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music1.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "액자",
                  LastPage: 1,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>액자</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  music1.stop(() => console.log("music stop"));
                  navigation.navigate("StoryMain", { userID: userID });
                }}
              >
                <Text style={styles.navBoxText}> 이전</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(2);
                }}
              >
                <Text style={styles.navBoxText}>다음 </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : pageNum == 2 ? (
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/story/Story1Page2.png")}
            style={{
              width: "100%",
              height: screenHeight,
              marginTop: statusBar,
            }}
            resizeMode="stretch"
          >
            <Text style={styles.pageIndex}>{pageNum}/4</Text>
            <TouchableOpacity
              style={{
                width: 130,
                height: 230,
                position: "absolute",
                top: "1%",
                left: "0%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "냉장고",
                  LastPage: 2,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>냉장고</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                top: "75%",
                left: "32%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "사과",
                  LastPage: 2,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>사과</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                top: "67%",
                left: "51.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "포도",
                  LastPage: 2,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>포도</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                top: "70%",
                left: "68.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "수박",
                  LastPage: 2,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>수박</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                top: "54%",
                left: "85%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "바나나",
                  LastPage: 2,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>바나나</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 90,
                position: "absolute",
                top: "20%",
                left: "78.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music2.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "달력",
                  LastPage: 2,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>달력</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(1);
                }}
              >
                <Text style={styles.navBoxText}> 이전</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPageNum(3);
                }}
              >
                <Text style={styles.navBoxText}>다음 </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : pageNum == 3 ? (
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/story/Story1Page3.png")}
            style={{
              width: "100%",
              height: screenHeight,
              marginTop: statusBar,
            }}
            resizeMode="stretch"
          >
            <Text style={styles.pageIndex}>{pageNum}/4</Text>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  music3.stop(() => console.log("music stop"));
                  setPageNum(2);
                }}
              >
                <Text style={styles.navBoxText}> 이전</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  music3.stop(() => console.log("music stop"));
                  setPageNum(4);
                }}
              >
                <Text style={styles.navBoxText}>다음 </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : pageNum == 4 ? (
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/story/Story1Page4.png")}
            style={{
              width: "100%",
              height: screenHeight,
              marginTop: statusBar,
            }}
            resizeMode="stretch"
          >
            <Text style={styles.pageIndex}>{pageNum}/4</Text>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                top: "82%",
                left: "16%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "기차",
                  LastPage: 4,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>기차</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 200,
                height: 120,
                position: "absolute",
                top: "73%",
                left: "30.7%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "자전거",
                  LastPage: 4,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>자전거</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                top: "40%",
                left: "60.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "색연필",
                  LastPage: 4,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>색연필</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 80,
                height: 50,
                position: "absolute",
                top: "86.5%",
                left: "60.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "도토리",
                  LastPage: 4,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>도토리</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 85,
                height: 85,
                position: "absolute",
                top: "53%",
                left: "73.5%",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                music4.stop(() => console.log("music stop"));
                navigation.navigate("Practice", {
                  userID: userID,
                  statusBar: statusBar,
                  screenHeight: screenHeight,
                  oWord: "장갑",
                  LastPage: 4,
                  taleName: "호랑이의 생일 잔치",
                });
              }}
            >
              <Text style={styles.word}>장갑</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
              <TouchableOpacity
                onPress={() => {
                  music4.stop(() => console.log("music stop"));
                  setPageNum(3);
                }}
              >
                <Text style={styles.navBoxText}> 이전</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  music4.stop(() => console.log("music stop"));
                  setPageNum(5);
                }}
              >
                <Text style={styles.navBoxText}>다음 </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ) : pageNum == 5 ? (
        <StoryMain />
      ) : (
        <View>
          <Text>오류</Text>
        </View>
      )}
    </View>
  );
};

export default StoryOne;

const styles = StyleSheet.create({
  pageIndex: {
    position: "absolute",
    width: 45,
    top: "3%",
    left: "1.%",
    backgroundColor: "white",
    textAlign: "center",
    padding: 7,
    paddingTop: 9,
    borderRadius: 10,
    fontFamily: "Cafe24Ssurround",
  },
  word: {
    fontSize: 15,
    color: "black",
    backgroundColor: "white",
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: "#B16CF6",
    textAlign: "center",
    fontFamily: "Cafe24Ssurround",
  },
  navBox: {
    position: "absolute",
    width: 88,
    top: "90%",
    left: "85%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 7,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBoxText: {
    fontFamily: "Cafe24Ssurround",
  },
});
