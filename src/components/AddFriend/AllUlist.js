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
import { useToast } from "@chakra-ui/react";
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

function AllUlist({ cuUser, myID }) {
  const [foundUsers, setFoundUsers] = useState([]);
  const [FriendList, setFriendList] = useState(foundUsers);
  const [search, setsearch] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [reloade, setreloade] = useState(false);

  const collectionRef = collection(db, "users");
  const toast = useToast();

  const getFlist = async () => {
    // To fetch Friend list From Login User
    let myFriends = [];
    const docref = doc(db, "users", myID);
    await getDoc(docref).then((snap) => {
      if (snap.exists()) {
        myFriends = snap.data().FriendList;
      } else {
        console.log("No Friends Found");
      }
    });
    // _____________________________________________________

    // To filter the Friend list user From all user in DB

    let allu = [];
    await getDocs(collectionRef)
      .then((u) => {
        u.docs.map((doc) => {
          allu.push(doc.data());
        });
        console.log("All users: ", allu);
        const flist = allu.filter(
          (usr) => !myFriends.includes(usr.Uid) && usr.Uid != myID
        );
        setFoundUsers(flist);
        setFriendList(flist);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // _____________________________________________________
  };
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
  const addClickHandler = async (f, fname) => {
    toast({
      title: "Processing Request...",
      description: `Processing your Request`,
      position: "top",
      status: "info",
      duration: 1500,
      isClosable: true,
    });
    const myref = doc(db, "users", myID);
    const hisref = doc(db, "users", f);

    // Atomically add a new region to the "regions" array field.
    await updateDoc(myref, {
      FriendList: arrayUnion(f),
    })
      .then(() => {
        toast({
          title: "Added to Friendlist",
          description: `You are now Friend with ${fname}`,
          position: "top",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        updateDoc(hisref, {
          FriendList: arrayUnion(myID),
        });

        setreloade(!reloade);
      })
      .catch(() => {
        toast({
          title: "Someting went Wrong",
          description: `You cant't be friend with  ${fname}`,

          //these are the light makers

          position: "top",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });

    // Atomically remove a region from the "regions" array field.
    // await updateDoc(washingtonRef, {
    //   regions: arrayRemove("east_coast"),
    // });
  };

  useEffect(() => {
    getFlist();
  }, [myID, reloade]);

  return (
    <>
      <VStack w="500px" h="90vh" bg="#061731" p="20px">
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

        <VStack w="100%" paddingTop="30px" className="Flist">
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            ></Spinner>
          ) : FriendList ? (
            FriendList.map((doc, i) => {
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
                        addClickHandler(doc.Uid, doc.Name);
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

export default AllUlist;
