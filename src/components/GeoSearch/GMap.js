import { Flex, Box } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdPersonPinCircle } from "react-icons/md";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

import { IoMdSend, IoSend } from "react-icons/io";
import { db } from "../../firebase/Config";
import {
  Avatar,
  background,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Chatbubble from "../chatbubble";
import userEvent from "@testing-library/user-event";
import GoogleMapReact from "google-map-react";
import { useLoadScript } from "google-map-react";
import MyMarker from "../Mymarker";

const API_KEY = "AIzaSyDiKc4HxX5G7EfneIZBN_Hlk2_luoT_yvo";

function GMap({ cuposition, nearbyFriends }) {
  console.log("NearbyFriends", nearbyFriends);

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };
  return (
    <Flex
      w="100%"
      direction="column"
      bg="white"
      h="90vh"
      alignItems="center"
      justifyContent={"center"}
      bg="linear-gradient(124deg, rgba(9,35,68,0.8242647400757178) 0%, rgba(2,0,36,0.7318277652858018) 100%)"
      p={"20px"}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBYptuOoDrxb1P79aLySTrp_p2oB0IIS4g",
          language: "en",
          region: "US",
        }}
        defaultCenter={{ lat: cuposition.Latitude, lng: cuposition.Longitude }}
        defaultZoom={15}
        distanceToMouse={distanceToMouse}
      >
        <div lat={cuposition.Latitude} lng={cuposition.Longitude}>
          <MdPersonPinCircle
            fontSize={"50px"}
            color="white"
          ></MdPersonPinCircle>
        </div>

        {nearbyFriends.map((u, i) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "fit-content",
                textAlign: "center  ",
              }}
              lat={u.Latitude}
              lng={u.Longitude}
            >
              <MdPersonPinCircle fontSize={"50px"} color="yellow" />
              <Text
                bg={"white"}
                borderRadius={"5px"}
                p={"0px 10px"}
                fontWeight={"bold"}
              >
                {u.Name}
              </Text>
            </div>
          );
        })}
      </GoogleMapReact>
    </Flex>
  );
}

export default GMap;
