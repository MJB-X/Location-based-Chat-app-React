import { Flex, Box } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
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

function ABannere() {
  return (
    <Flex
      w="100%"
      direction="column"
      bg="white"
      h="90vh"
      alignItems="center"
      justifyContent={"center"}
      bg="linear-gradient(124deg, rgba(9,35,68,0.8242647400757178) 0%, rgba(2,0,36,0.7318277652858018) 100%)"
    >
      <Box
        w={"60%"}
        h={"60%"}
        justifyContent={"center"}
        textAlign={"center"}
        bg={"white"}
        borderRadius={"20px"}
        pt={"20px"}
        pb={"30px"}
      >
        <Box
          margin={"auto"}
          w="80%"
          height="80%"
          backgroundImage="url(https://cdn3.iconfinder.com/data/icons/social-media-set-2-2/256/Social_Media-07-512.png)"
          backgroundRepeat="no-repeat"
          backgroundSize={"contain"}
          backgroundPosition="center"
        ></Box>
        <Text fontSize={"4xl"} color={"GrayText"} fontWeight={"extrabold"}>
          🔍Find Friends
        </Text>
        <Text>Click on ➕ button to add Friends</Text>
      </Box>
    </Flex>
  );
}

export default ABannere;
