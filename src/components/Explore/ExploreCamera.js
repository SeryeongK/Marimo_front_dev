import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
} from "react-native";
import { RNCamera } from "react-native-camera";
import CameraRoll from "@react-native-community/cameraroll";
import LinearGradient from "react-native-linear-gradient";
import preURL from "../preURL/preURL";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import axios from "axios";
import Loader from "../components/Loader";

const ExploreCamera = ({ navigation }) => {
  // for data to  send api
  const [image, setImage] = useState("");
  // for picture address
  const [url, setUrl] = useState("");
  // for image description
  const [description, setdescription] = useState("");
  const [processingImage, setprocessingImage] = useState(false);
  const cameraRef = React.useRef(null);

  const onOpenCamera = () => {
    // start camera
    if (Platform.OS === "android") {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "App needs permission for camera access",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // if Camera permission is granted
            setshowCameraView(true);
          } else {
            alert("Camera permission denied");
          }
        } catch (err) {
          alert("Camera Permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      setshowCameraView(true);
    }
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      console.log("data", data.uri);

      if (data) {
        setUrl(await CameraRoll.save(data.uri));
        setprocessingImage(true);
        console.log("result", url);
      }
    }
  };

  const postImage = async () => {
    const fd = new FormData();
    fd.append("image", {
      name: "picture.jpg",
      type: "image/jpeg",
      uri: url,
    });
    await axios
      .post(preURL.preURL + "/image/name", fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        setdescription(response);
      })
      .catch((err) => {
        console.log("에러  발생 ");
        console.log(err);
      });
  };

  const getPhotos = async () => {
    console.log("...");
    try {
      const { edges } = await CameraRoll.getPhotos({
        first: 1,
        assetType: "Photos",
      });
      await setImage(edges[0].node.image.uri);
    } catch (error) {
      console.log("getPhoto", error);
    }
    navigation.navigate("Detail", { image: url });
  };

  /* 카메라 페이지 */

  return (
    <>
      <SafeAreaView style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
        />
        <View style={{ position: "absolute", bottom: 15 }}>
          <TouchableOpacity
            onPress={async () => {
              await takePhoto();
              if (url) postImage();
              // post api
              if (response) {
                setprocessingImage(false);
                navigation.navigate("Detail", {
                  image: url,
                  description: description,
                });
              } else {
                alert("이미지를 받아오지 못했습니다!");
              }
              console.log("hello");
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={[
                "rgba(255, 113, 113, 0.45)",
                "rgba(177, 108, 246, 0.45)",
              ]}
              style={{
                width: 55,
                height: 55,
                borderRadius: 55,
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ExploreCamera;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  snapButton: {
    flex: 0,
    width: 65,
    height: 65,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  innerSnapButton: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
});
