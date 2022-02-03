import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/react";
import {
  VStack,
  HStack,
  Text,
  Image,
  Avatar,
  Box,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

import { FaPlus } from "react-icons/fa";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase/Config";

function NearUsers({ nearbyFriends, myID }) {
  const [foundUsers, setFoundUsers] = useState([]);
  const [FriendList, setFriendList] = useState(foundUsers);
  const [search, setsearch] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const collectionRef = collection(db, "users");

  const searchHandler = (e) => {
    const keyword = e.target.value;
    if (search !== "") {
      const results = foundUsers.filter((user) => {
        return user.Name.toLowerCase().startsWith(keyword.toLowerCase());

        // Use the toLowerCase() method to make it case-insensitive
      });
      setFriendList(results);
    } else {
      setFriendList(foundUsers);
      // If the text field is empty, show all users
    }
    setsearch(keyword);
  };
  const addClickHandler = async (f) => {
    const myref = doc(db, "users", myID);

    // Atomically add a new region to the "regions" array field.
    await updateDoc(myref, {
      FriendList: arrayUnion(f),
    })
      .then(console.log("You are Friend with ", f))
      .catch(console.log("you can't be friend with ", f));

    // Atomically remove a region from the "regions" array field.
    // await updateDoc(washingtonRef, {
    //   regions: arrayRemove("east_coast"),
    // });
  };

  useEffect(() => {}, [myID]);

  return (
    <>
      <VStack w="500px" h="90vh" bg="#061731" p="20px">
        <Text
          fontSize={"20px"}
          color={"white"}
          fontWeight={"bold"}
          ml={"-12rem"}
          mb={"20px"}
        >
          Nearby Users
        </Text>
        <InputGroup>
          <InputRightElement
            pointerEvents="none"
            children={<RiSearch2Line color="white" />}
          />
          <Input
            type="tel"
            placeholder="Search Friends"
            color="white"
            value={search}
            onChange={(e) => {
              searchHandler(e);
            }}
          />
        </InputGroup>

        <VStack w="100%" paddingTop="10px" className="Flist">
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            ></Spinner>
          ) : nearbyFriends ? (
            nearbyFriends.map((doc, i) => {
              return (
                <>
                  <HStack
                    key={i}
                    w="100%"
                    borderRadius="5px"
                    justifyContent="space-between"
                    pr="10px"
                    bg="#081e3f"
                    className="Fprofile"
                  >
                    <Box margin="10px">
                      <HStack>
                        {" "}
                        <Avatar size="md" name={doc.Name} src={doc.DP} />
                        <Text color="white">{doc.Name}</Text>
                      </HStack>
                    </Box>
                    <IconButton
                      icon={<FaPlus color="grey" />}
                      variant="outline"
                      onClick={() => {
                        addClickHandler(doc.Uid);
                      }}
                    ></IconButton>
                  </HStack>
                </>
              );
            })
          ) : (
            <h2>No Friend Available</h2>
          )}
        </VStack>
      </VStack>
    </>
  );
}

export default NearUsers;
