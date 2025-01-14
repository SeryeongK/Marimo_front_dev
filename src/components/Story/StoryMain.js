import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { navTabIcons } from "../../constants";
import { fontPercentage, heightPercentage } from "../../constants/responsive";
import { useNavigation } from "@react-navigation/native";
import Orientation from "react-native-orientation";
import { UserHeader } from "../UserHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components";

const ContnetSubCntr = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background: #f5e7f8;
  border-radius: 23;
  justify-content: space-between;
  align-items: center;
  display: flex;
  elevation: 10;
  flex-direction: row;
  padding-vertical: 1.5%;
  padding-horizontal: 2.5%;
`;
const ChImage = styled(Image)`
  width: 20%;
`;
const ContentTexts = styled.View`
  width: 65%;
`;
const ContentTitle = styled.Text`
  font-family: NanumSquareRoundB;
  margin-bottom: 15;
  color: #000000;
`;

const ContentText = styled.Text`
  font-family: NotoSansCJKkr-Regular;
  font-weight: ${(props) => (props.isTitle ? "700" : "400")};
  margin-bottom: ${(props) => (props.isTitle ? 15 : 0)};
  font-size: 14px;
  line-height: 23px;
  color: #434141;
`;

const StoryMain = () => {
  const [userNickname, setUserNickName] = useState("");
  const [userID, setUserID] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
      Orientation.lockToPortrait();
    }
  };

  useEffect(async () => {
    const Nickname = await AsyncStorage.getItem("userNickname");
    const id = await AsyncStorage.getItem("userId");
    console.log(Nickname);
    setUserNickName(Nickname);
  }, []);

  // ID 받아오기
  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    return userId;
  };

  const getId = async () => {
    const userId = await getUserId();
    const userIdCheck = userId === null ? 1 : userId;
    await setUserID(userIdCheck);
  };
  useEffect(async () => {
    await getId();
  }, []);

  const SECTIONS3 = [
    {
      key: "1",
      text: "호랑이의 생일 잔치",
      age: "6~7",
      src: require("../../assets/images/story/Story1Page1.png"),
      number: 50,
      router: "StoryLoading",
      userID: userID,
    },
    {
      key: "2",
      text: "말랑이와 요정의 성",
      age: "7~8",
      src: require("../../assets/images/story/story1.png"),
      number: 20,
      router: "null",
    },
    {
      key: "3",
      text: "호두까기 인형",
      src: navTabIcons.ic_story3,
      age: "7~8",
      number: 20,
      router: "null",
    },
  ];

  //이야기 렌더링
  const renderItem = ({ item }) => {
    const navigation = useNavigation();
    return (
      <View
        style={{
          width: "100%",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 16,
          height: "30%",
        }}
      >
        <ContnetSubCntr
          onPress={() =>
            item.router === "null"
              ? setModalVisible(true)
              : navigation.navigate(`${item.router}`, {
                  userID: item.userID,
                  taleName: "호랑이의 생일 잔치",
                })
          }
        >
          <Image
            style={{ position: "absolute", top: "2%", left: "1%" }}
            source={require("../../assets/icons/ic_ellipse.png")}
          />
          <ChImage
            style={{
              borderRadius: 20,
              width: "26%",
              height: "94%",
            }}
            source={item.src}
          />
          <ContentTexts>
            <ContentTitle
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: fontPercentage(18),
                marginBottom: heightPercentage(10),
              }}
            >
              {item.text}
            </ContentTitle>
            <ContentText style={{ fontSize: fontPercentage(14) }}>
              추천 연령 : {item.age}세
            </ContentText>
          </ContentTexts>
        </ContnetSubCntr>
      </View>
    );
  };

  // 모달
  const AlarmModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Image
                source={navTabIcons.ic_Mstory}
                style={{ height: 110, width: 110 }}
                resizeMode="center"
              />
            </View>
            <Text style={styles.modalText}>
              12월 정식출시 이후로 사용할 수 있어요!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>확인했습니다!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFFBF8" }}>
      <View style={styles.container}>
        {AlarmModal()}
        <View
          style={{
            display: "flex",
            flex: 1,
            width: "92%",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <UserHeader
            style={{ height: "40%" }}
            type={"story"}
            userNickname={userNickname}
          />
          <View
            style={{
              width: "92%",
              height: "55%",
              marginBottom: "5%",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flex: 1,
                marginBottom: 5,
                height: "100%",
                marginTop: "10%",
              }}
            >
              <View
                style={{
                  display: "flex",
                }}
              >
                <StudyTxt
                  style={{
                    color: "#464D46",
                    fontSize: fontPercentage(22),
                    fontFamily: "Cafe24Ssurround",
                    marginTop: "3%",
                  }}
                >
                  추천 학습
                </StudyTxt>
              </View>
              <View
                stlye={{
                  flex: 1,
                  marginTop: StatusBar.currentHeight || 0,
                  marginBottom: 5,
                }}
              >
                {SECTIONS3.map((item) => renderItem({ item }))}
              </View>
            </View>
            <View style={{ height: 50 }}></View>
          </View>
        </View>
      </View>
      <Wrapper />
    </ScrollView>
  );
};

export default StoryMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 10,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#BE81FC",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Cafe24Ssurround",
    fontSize: 18,
    color: "#464D46",
  },
});

const StudyTxt = styled.Text`
  color: #191919;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100;
`;
