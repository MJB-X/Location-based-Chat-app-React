import { Container, Flex } from "@chakra-ui/layout";
import Header from "./components/Header";
import "./App.css";
import Nav from "./components/Nav";
import { Box, Text } from "@chakra-ui/react";
import Flist from "./components/message/Flist";
import Indbox from "./components/message/Indbox";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase/Config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/Config";
import AllUlist from "./components/AddFriend/AllUlist";
import ABannere from "./components/AddFriend/ABanner";
import NearUsers from "./components/GeoSearch/NearUsers";
import GMap from "./components/GeoSearch/GMap";

function App() {
  const [isLogin, setisLogin] = useState(false);
  const [User, setUser] = useState({});
  const [navState, setnavState] = useState("");
  const [clickedUser, setclickedUser] = useState("");
  const [position, setposition] = useState({ Latitude: 0.0, Longitude: 0.0 });
  const [nearByUsers, setnearByUsers] = useState([]);
  const [scanning, setscanning] = useState(true);

  const authCheck = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setisLogin(true);
        const UserData = {
          Latitude: position.Latitude,
          Longitude: position.Longitude,
          Uid: user.uid,
          Name: user.displayName,
          FriendList: [],
          DP: user.photoURL,
          IsActive: true,
          Status: "Still Alone",
        };
        const docref = doc(db, "users", user.uid);
        getDoc(docref).then((snap) => {
          if (snap.exists) {
            updateLocation(user.uid);
            updateDoc(docref, {
              IsActive: true,
            });
          } else {
            setDoc(doc(db, "users", user.uid), UserData);
          }
        });

        console.log(user.uid);
      } else {
        setisLogin(false);
        setUser("");
      }
    });
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((p) => {
      setposition({
        Latitude: p.coords.latitude,
        Longitude: p.coords.longitude,
      });
      console.log("position", position);
    });
  };

  const updateLocation = async (uid) => {
    const docref = doc(db, "users", uid);
    await updateDoc(docref, {
      Latitude: position.Latitude,
      Longitude: position.Longitude,
    }).then(console.log("Location Updated"));
  };

  const getNearbyUsers = async () => {
    let allu = [];
    const min_Longitude = position.Longitude - 0.0003;
    const max_Longitude = position.Longitude + 0.0003;
    const min_Latitude = position.Latitude - 0.0003;
    const max_Latitude = position.Latitude + 0.0003;

    const collectionRef = collection(db, "users");
    await getDocs(collectionRef)
      .then((u) => {
        u.docs.map((doc) => {
          allu.push(doc.data());
        });
        console.log("All users: ", allu);
        const flist = allu.filter((usr) => {
          if (min_Latitude < usr.Latitude && usr.Latitude < max_Latitude) {
            if (
              min_Longitude < usr.Longitude &&
              usr.Longitude < max_Longitude
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
        setnearByUsers(flist);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // _____________________________________________________
  };

  useEffect(() => {
    getLocation();

    try {
      authCheck();
    } catch (error) {
      console.log(error.message);
    }
    getNearbyUsers();
  }, [isLogin]);

  //nva bar functions
  function navHandler(state) {
    setnavState(state);
  }
  //friend click eventHnadler
  function cuHandler(cuser) {
    setclickedUser(cuser);
  }
  console.log(clickedUser.Name);

  return (
    <>
      {!isLogin ? (
        <Login></Login>
      ) : (
        <>
          {" "}
          <div className="App">
            <Container
              maxW="1800px"
              w="100%"
              minH="400px"
              bg="black"
              p="0"
              overflowY="hidden"
            >
              <Header User={User}></Header>
              <Flex direction="row">
                {(() => {
                  switch (navState) {
                    case "message":
                      setTimeout(() => {
                        setscanning(true);
                      }, 1000);
                      return (
                        <>
                          <Nav navstate={navHandler} myID={User.uid}></Nav>
                          <Flist cuUser={cuHandler} myID={User.uid}></Flist>
                          <Indbox cusers={clickedUser} me={User}></Indbox>
                        </>
                      );

                    case "group":
                      setTimeout(() => {
                        setscanning(true);
                      }, 1000);
                      return (
                        <>
                          <Nav navstate={navHandler} myID={User.uid}></Nav>
                        </>
                      );
                    case "add":
                      setTimeout(() => {
                        setscanning(true);
                      }, 1000);
                      return (
                        <>
                          <Nav navstate={navHandler} myID={User.uid}></Nav>
                          <AllUlist
                            cuUser={cuHandler}
                            myID={User.uid}
                          ></AllUlist>
                          <ABannere></ABannere>
                        </>
                      );
                    case "NearSearch":
                      setTimeout(() => {
                        setscanning(false);
                      }, 2000);

                      return (
                        <>
                          <Nav navstate={navHandler} myID={User.uid}></Nav>
                          <Flex
                            width={"100%"}
                            h={"90vh"}
                            p={"100px"}
                            display={scanning ? "flex" : "none"}
                            bg={
                              "radial-gradient(circle, rgba(0,132,245,1) 15%, rgba(2,0,37,1) 100%)"
                            }
                            justifyContent={"center"}
                            textAlign={"center"}
                          >
                            <Box>
                              <div className="scanning">
                                <svg
                                  width="300"
                                  height="300"
                                  viewBox="0 0 238 238"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g filter="url(#filter0_f_27:3)">
                                    <circle
                                      cx="119"
                                      cy="119"
                                      r="95"
                                      stroke="white"
                                      stroke-width="4"
                                    />
                                  </g>
                                  <circle
                                    cx="119"
                                    cy="119"
                                    r="95"
                                    stroke="white"
                                    stroke-width="4"
                                  />
                                  <g filter="url(#filter1_b_27:3)">
                                    <circle
                                      cx="119.5"
                                      cy="119.5"
                                      r="35.5"
                                      fill="#F0F0F0"
                                      fill-opacity="0.29"
                                    />
                                    <circle
                                      cx="119.5"
                                      cy="119.5"
                                      r="34.5"
                                      stroke="white"
                                      stroke-opacity="0.29"
                                      stroke-width="2"
                                    />
                                  </g>
                                  <g filter="url(#filter2_b_27:3)">
                                    <mask
                                      id="path-5-inside-1_27:3"
                                      fill="white"
                                    >
                                      <path d="M187 119C187 132.449 183.012 145.596 175.54 156.779C168.068 167.961 157.448 176.677 145.022 181.824C132.597 186.971 118.925 188.317 105.734 185.693C92.5431 183.07 80.4267 176.593 70.9167 167.083C61.4068 157.573 54.9304 145.457 52.3066 132.266C49.6828 119.075 51.0294 105.403 56.1762 92.9775C61.323 80.5522 70.0387 69.932 81.2212 62.4601C92.4038 54.9881 105.551 51 119 51V119H187Z" />
                                    </mask>
                                    <path
                                      d="M187 119C187 132.449 183.012 145.596 175.54 156.779C168.068 167.961 157.448 176.677 145.022 181.824C132.597 186.971 118.925 188.317 105.734 185.693C92.5431 183.07 80.4267 176.593 70.9167 167.083C61.4068 157.573 54.9304 145.457 52.3066 132.266C49.6828 119.075 51.0294 105.403 56.1762 92.9775C61.323 80.5522 70.0387 69.932 81.2212 62.4601C92.4038 54.9881 105.551 51 119 51V119H187Z"
                                      stroke="white"
                                      stroke-width="8"
                                      mask="url(#path-5-inside-1_27:3)"
                                    />
                                  </g>
                                  <g filter="url(#filter3_f_27:3)">
                                    <circle
                                      cx="78.5"
                                      cy="89.5"
                                      r="5.5"
                                      fill="#00FFB2"
                                    />
                                  </g>
                                  <g filter="url(#filter4_f_27:3)">
                                    <circle
                                      cx="155"
                                      cy="173"
                                      r="10"
                                      fill="#EBFF00"
                                    />
                                  </g>
                                  <g filter="url(#filter5_f_27:3)">
                                    <circle
                                      cx="150"
                                      cy="79"
                                      r="5"
                                      fill="#FF00F5"
                                    />
                                  </g>
                                  <defs>
                                    <filter
                                      id="filter0_f_27:3"
                                      x="0"
                                      y="0"
                                      width="238"
                                      height="238"
                                      filterUnits="userSpaceOnUse"
                                      color-interpolation-filters="sRGB"
                                    >
                                      <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                      />
                                      <feGaussianBlur
                                        stdDeviation="11"
                                        result="effect1_foregroundBlur_27:3"
                                      />
                                    </filter>
                                    <filter
                                      id="filter1_b_27:3"
                                      x="62"
                                      y="62"
                                      width="115"
                                      height="115"
                                      filterUnits="userSpaceOnUse"
                                      color-interpolation-filters="sRGB"
                                    >
                                      <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feGaussianBlur
                                        in="BackgroundImage"
                                        stdDeviation="11"
                                      />
                                      <feComposite
                                        in2="SourceAlpha"
                                        operator="in"
                                        result="effect1_backgroundBlur_27:3"
                                      />
                                      <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_backgroundBlur_27:3"
                                        result="shape"
                                      />
                                    </filter>
                                    <filter
                                      id="filter2_b_27:3"
                                      x="29"
                                      y="29"
                                      width="180"
                                      height="180"
                                      filterUnits="userSpaceOnUse"
                                      color-interpolation-filters="sRGB"
                                    >
                                      <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feGaussianBlur
                                        in="BackgroundImage"
                                        stdDeviation="11"
                                      />
                                      <feComposite
                                        in2="SourceAlpha"
                                        operator="in"
                                        result="effect1_backgroundBlur_27:3"
                                      />
                                      <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_backgroundBlur_27:3"
                                        result="shape"
                                      />
                                    </filter>
                                    <filter
                                      id="filter3_f_27:3"
                                      x="69"
                                      y="80"
                                      width="19"
                                      height="19"
                                      filterUnits="userSpaceOnUse"
                                      color-interpolation-filters="sRGB"
                                    >
                                      <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                      />
                                      <feGaussianBlur
                                        stdDeviation="2"
                                        result="effect1_foregroundBlur_27:3"
                                      />
                                    </filter>
                                    <filter
                                      id="filter4_f_27:3"
                                      x="141"
                                      y="159"
                                      width="28"
                                      height="28"
                                      filterUnits="userSpaceOnUse"
                                      color-interpolation-filters="sRGB"
                                    >
                                      <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                      />
                                      <feGaussianBlur
                                        stdDeviation="2"
                                        result="effect1_foregroundBlur_27:3"
                                      />
                                    </filter>
                                    <filter
                                      id="filter5_f_27:3"
                                      x="144"
                                      y="73"
                                      width="12"
                                      height="12"
                                      filterUnits="userSpaceOnUse"
                                      color-interpolation-filters="sRGB"
                                    >
                                      <feFlood
                                        flood-opacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="BackgroundImageFix"
                                        result="shape"
                                      />
                                      <feGaussianBlur
                                        stdDeviation="0.5"
                                        result="effect1_foregroundBlur_27:3"
                                      />
                                    </filter>
                                  </defs>
                                </svg>
                              </div>
                              <Text color={"white"} fontWeight={"bold"}>
                                We are Scanning Your Location
                              </Text>
                            </Box>
                          </Flex>

                          <Flex w={"100%"} display={scanning ? "none" : "flex"}>
                            <NearUsers
                              nearbyFriends={nearByUsers}
                              myID={User.uid}
                            ></NearUsers>
                            <GMap
                              cuposition={position}
                              nearbyFriends={nearByUsers}
                            ></GMap>
                          </Flex>
                        </>
                      );

                    default:
                      return (
                        <>
                          <Nav navstate={navHandler} myID={User.uid}></Nav>
                          <Flist cuUser={cuHandler} myID={User.uid}></Flist>
                          <Indbox cusers={clickedUser} me={User}></Indbox>
                        </>
                      );
                  }
                })()}
              </Flex>
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default App;
