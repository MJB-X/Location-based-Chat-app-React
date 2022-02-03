import { Flex, Stack, Text, Spacer, Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { MdOutlineGroups } from "react-icons/md";
import { FaSearchLocation } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdAddCircle } from "react-icons/md";
import { GiPowerButton } from "react-icons/gi";
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from "../firebase/Config";
import { doc, updateDoc } from "firebase/firestore";

function Nav({ navstate, myID }) {
  const handelLogout = async () => {
    const docref = doc(db, "users", myID);
    await updateDoc(docref, {
      IsActive: false,
    }).then(console.log("Is Active Updated"));

    signOut(auth)
      .then(() => {
        console.log("Sign-out scucessful");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Flex
      h="90vh"
      w="100px"
      bg="linear-gradient(180deg, rgba(2,0,37,1) 64%, rgba(0,138,255,1) 100%)"
      p="10px"
      direction="column"
    >
      <Stack>
        <IconButton
          variant="outline"
          colorScheme="telegram"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<BsFillChatLeftDotsFill></BsFillChatLeftDotsFill>}
          onClick={() => {
            navstate("message");
          }}
        />

        <IconButton
          variant="outline"
          colorScheme="telegram"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<MdOutlineGroups></MdOutlineGroups>}
          onClick={() => {
            navstate("group");
          }}
        />

        <IconButton
          variant="outline"
          colorScheme="telegram"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<MdAddCircle></MdAddCircle>}
          onClick={() => {
            navstate("add");
          }}
        />

        <IconButton
          variant="outline"
          colorScheme="telegram"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<FaSearchLocation></FaSearchLocation>}
          onClick={() => {
            navstate("NearSearch");
          }}
        />

        <IconButton
          variant="outline"
          colorScheme="telegram"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<CgProfile></CgProfile>}
        />
      </Stack>
      <Spacer />
      <Flex>
        <Button
          variant="outline"
          bg="none"
          pl="6px"
          pr="6px"
          onClick={() => {
            handelLogout();
          }}
        >
          <Text
            fontWeight="bold"
            textAlign="center"
            className="greenText"
            fontSize="25px"
          >
            {" "}
            <GiPowerButton />
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
}

export default Nav;
