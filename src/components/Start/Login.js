import React, { useState, useEffect } from "react";
import Styled from "styled-components/native";
import Voice from "@react-native-community/voice";
import {
  Text,
  Button,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import preURL from "../../preURL/preURL";
import Icon from "react-native-vector-icons/Entypo";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Svg, Path } from "react-native-svg";
const ButtonRecord = Styled.Button``;
import Logo from "../../assets/icons/Logo.png";
import Icon2 from "react-native-vector-icons/Ionicons";
import { login, logo } from "../../assets/icons/Character/Logo";

const Login = ({ navigation }) => {
  let cntrMargin = 0;
  Platform.OS === "ios" ? (cntrMargin = 70) : (cntrMargin = 20);
  // for recording
  const [isRecord, setIsRecord] = useState(false);
  // for userName
  const [text, setText] = useState("");
  // 삭제해야함
  const [isConfirm, setIsConfirm] = useState(false);
  // for input method
  const [pageNum, setPageNum] = useState(1);

  // for ui design
  const { width, height } = Dimensions.get("window");
  const buttonLabel = isRecord ? "Stop" : "Start";
  const voiceLabel = isRecord
    ? text.length === 0
      ? "이름을 인식하고 있습니다\n 잠시만 기다려주세요.."
      : text
    : "마이크 버튼을 누르고 말해주세요!";

  useEffect(async () => {
    console.log("변했니");
    console.log(await AsyncStorage.getItem("isLogin"));
    console.log(await AsyncStorage.getItem("userId"));
    const id = await AsyncStorage.getItem("userId");
  }, []);

  // 음성인식 과정
  const _onSpeechStart = () => {
    console.log("onSpeechStart");
    setText("");
  };
  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };
  const _onSpeechResults = (event) => {
    console.log("onSpeechResults");
    setText(event.value[0]);
    Voice.stop();
  };
  const _onSpeechError = (event) => {
    console.log("_onSpeechError");
    console.log(event.error);
  };

  const _onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start("ko-KR");
    }
  };
  const postSpeechUserName = async (body) => {
    console.log(body);
    await axios
      .post(preURL.preURL + "/marimo/nickname", body)
      .then(async (res) => {
        const response = res.data;
        console.log(response);
        console.log("설명", response);
      })
      .catch((err) => {
        console.log("에러  발생 ");
        console.log(err);
      });
  };

  useEffect(async () => {
    if (pageNum === 0 && text.length !== 0) {
      console.log(text);
      Voice.stop();
      setIsConfirm(true);
      setPageNum(1);
    }
  }, [text]);

  useEffect(() => {
    if (pageNum === 0 || pageNum === 2) {
      setText("");
    }
  }, [pageNum]);

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <>
      {pageNum === 0 ? (
        <Container style={{ marginTop: cntrMargin }}>
          <BackCntr onPress={() => navigation.navigate("StartMain")}>
            <Icon2
              name="chevron-back"
              style={{ marginRight: 10 }}
              size={23}
              color={"#555555"}
            ></Icon2>
            <BackIcon>뒤로 가기</BackIcon>
            <TouchableOpacity
              onPress={() => navigation.navigate("Character", { name: "우진" })}
            >
              <Text>이동</Text>
            </TouchableOpacity>
          </BackCntr>
          <IntroText>
            안녕, <AppName>마리모</AppName>에 온 걸 환영해!{"\n"}네 이름은 뭐니?
          </IntroText>
          <Cntr>
            <TouchableOpacity
              style={{
                borderRadius: 125,
                width: 290,
                height: 290,
                marginTop: -1 * cntrMargin,
              }}
              onPress={_onRecordVoice}
            >
              <Image
                style={{ width: 290, height: 290 }}
                source={require("../../assets/MikeIcon.png")}
              />
            </TouchableOpacity>
            <View style={[styles.item, styles.itemIn]}>
              <Image
                style={{
                  position: "relative",
                  bottom: -20,
                  marginRight: 5,
                  width: 60,
                  height: 45,
                }}
                source={Logo}
              />
              <View style={[styles.balloon, { backgroundColor: "#ACDBFD" }]}>
                <Text style={{ paddingTop: 5, color: "black", fontSize: 18 }}>
                  {voiceLabel}
                </Text>
                <View
                  style={[styles.arrowContainer, styles.arrowLeftContainer]}
                >
                  <Svg
                    style={styles.arrowLeft}
                    width={moderateScale(15.5, 0.6)}
                    height={moderateScale(17.5, 0.6)}
                    viewBox="32.484 17.5 15.515 17.5"
                    enable-background="new 32.485 17.5 15.515 17.5"
                  >
                    <Path
                      d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                      fill="#ACDBFD"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                verticalAlign: "space-between",
              }}
              onPress={() => setPageNum(2)}
            >
              <View
                style={{
                  width: "15%",
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                <Icon name="keyboard" size={23} color={"#555555"} />
              </View>
              <KeyText>자판으로 입력할게요</KeyText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Character", {
                  name: "우진",
                })
              }
            ></TouchableOpacity>
          </Cntr>
        </Container>
      ) : pageNum === 1 ? (
        <Container style={{ marginTop: cntrMargin }}>
          <BackCntr onPress={() => setPageNum(0)}>
            <Icon2
              name="chevron-back"
              style={{ marginRight: 10 }}
              size={23}
              color={"#555555"}
            ></Icon2>
            <BackIcon>뒤로 가기</BackIcon>
            <TouchableOpacity
              onPress={() => navigation.navigate("Character", { name: "우진" })}
            >
              <Text>이동</Text>
            </TouchableOpacity>
          </BackCntr>
          <Cntr style={{ flex: 1 }}>
            <Box>
              <ConfirmText>친구의 이름은</ConfirmText>
              <ConfirmNameText>{text}</ConfirmNameText>
              <ConfirmText>가 맞나요?</ConfirmText>
            </Box>
            <Svg
              style={styles.arrowLeft2}
              width={moderateScale(15.5, 0.6)}
              height={moderateScale(17.5, 0.6)}
              viewBox="32.484 17.5 15.515 17.5"
              enable-background="new 32.485 17.5 15.515 17.5"
            >
              <Path
                d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                fill="#FFEB81"
                x="0"
                y="0"
              />
            </Svg>
            <ImageCntr>
              <Image
                style={{
                  position: "relative",
                  bottom: -20,
                  marginRight: 5,
                  width: 79,
                  height: 59,
                }}
                source={logo[0]}
              />
              <Image
                style={{
                  position: "relative",
                  bottom: -20,
                  marginRight: 5,
                  width: 79,
                  height: 59,
                }}
                source={logo[1]}
              />
            </ImageCntr>
            <Wrapper />
            <BtnCntr>
              <Btn
                onPress={async () => {
                  const userId = await AsyncStorage.getItem("userId");
                  console.log(userId);
                  const postData = {
                    id: userId === null ? 3 : userId,
                    nickname: text,
                  };
                  console.log(postData);
                  await postSpeechUserName(postData);
                  navigation.navigate("Character", {
                    name: text,
                  });
                }}
              >
                <BtnText>네, 맞아요!</BtnText>
              </Btn>
              <Btn
                style={{ marginTop: height * 0.025 }}
                onPress={() => setPageNum(0)}
              >
                <BtnText>아니요. 다시 말할래요</BtnText>
              </Btn>
            </BtnCntr>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                verticalAlign: "space-between",
              }}
              onPress={() => setPageNum(2)}
            >
              <View
                style={{
                  width: "15%",
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                <Icon name="keyboard" size={23} color={"#555555"} />
              </View>
              <KeyText>자판으로 입력할게요</KeyText>
            </TouchableOpacity>
          </Cntr>
          <Text>{text}</Text>
        </Container>
      ) : pageNum == 2 ? (
        <Container style={{ marginTop: cntrMargin }}>
           <BackCntr onPress={() => navigation.navigate("StartMain")}>
            <Icon2
              name="chevron-back"
              style={{ marginRight: 10 }}
              size={23}
              color={"#555555"}
            ></Icon2>
            <BackIcon>뒤로 가기</BackIcon>
            <TouchableOpacity
              onPress={() => navigation.navigate("Character", { name: "우진" })}
            >
              <Text>이동</Text>
            </TouchableOpacity>
          </BackCntr>
          <IntroText>
            안녕, <AppName>마리모</AppName>에 온 걸 환영해!{"\n"}네 이름은 뭐니?
          </IntroText>
          <Cntr>
            <NameInput
              placeholder="이름을 입력해주세요"
              value={text}
              onChangeText={setText}
            />
            <BtnCntr>
              <Btn
                style={{ marginTop: height * 0.025 }}
                onPress={() =>
                  navigation.navigate("Character", {
                    name: text,
                  })
                }
              >
                <BtnText>입력을 완료했어요</BtnText>
              </Btn>
            </BtnCntr>
          </Cntr>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default Login;

const Cntr = Styled.View`
width:100%;
display:flex;
height:80%;
align-items:center;
justify-content:center;

`;
const BackCntr = Styled.TouchableOpacity`
width: 100%;
text-align: left;
display: flex;
flex-direction: row;
`;

const ImageCntr = Styled.View`
display:flex;
flex-direction:row;
width:82%;
justify-content:space-between;

`;
const Wrapper = Styled.View`
  height: 70px;
`;
const BackIcon = Styled.Text`
width:120px;
font-size:18px;

`;
const Container = Styled.View`
  flex: 1;
  margin-left:10px;
  margin-right:10px;
  margin-top:10px;
  
`;

const IntroText = Styled.Text`
  font-size:22px;
  font-weight: bold;
  margin-top:30px;
  line-height: 40px;
`;
const VoiceText = Styled.Text`
  margin: 32px;
  color:#999999;
  font-size:20px;
  line-height:29.6px;
`;
const KeyText = Styled.Text`
  width:85%;
  text-align:center;
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #191919;

  `;
const AppName = Styled.Text`
  font-size:22px;
  color: #F66C6C;
`;

const Box = Styled.View`
width:290px;
height:205px;
border-radius:10;
margin-top:30px;
border-width:1.5;
box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.25);
border-color:black;
background-color:#FFEB81
z-index:3;
align-items:center;
justify-content:center;

`;

const ConfirmText = Styled.Text`
font-family: "NanumSquareRoundB";

color:#191919;
font-size:22px;
line-height: 30px;
`;

const ConfirmNameText = Styled.Text`
color:#F66C6C;
font-family: "Cafe24Ssurround";
font-size:36px;
line-height: 53.28px;
font-weight:700;
`;

const BtnCntr = Styled.View`
    margin-top:20px;
    margin-bottom:40px;
`;

const Btn = Styled.TouchableOpacity`
  background-color: #B16CF6;
  color: white;
  width: 343px;
  height: 56px;
  border-radius: 14px;
  align-items:center;
  justify-content:center;
`;
const BtnText = Styled.Text`
  color:white;
  font-size: 18px;
  letter-spacing: -0.408px;
`;
const NameInput = Styled.TextInput`
height:55px;
width:80%;
font-size:16px;
border-width:1
padding:10px
margin-top:-200;
`;

// 분리
const styles = StyleSheet.create({
  item: {
    width: "100%",
    marginVertical: moderateScale(7, 2),
    flexDirection: "row",
    justifyContent: "center",
  },
  itemIn: {
    marginTop: 30,
    marginBottom: 30,
  },
  itemOut: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  balloon: {
    maxWidth: moderateScale(253, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrowLeftContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  arrowRightContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5),
  },
  arrowLeft2: {
    right: moderateScale(85, 1),
    bottom: moderateScale(5, 0.5),
  },
  arrowRight: {
    right: moderateScale(-6, 0.5),
  },
});
