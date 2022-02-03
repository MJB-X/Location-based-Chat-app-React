import { Flex, Spacer, Text, WrapItem } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import { HiStatusOffline, HiStatusOnline } from "react-icons/hi";

function Header({ User }) {
  console.log(User);

  return (
    <Flex
      background="linear-gradient(90deg, rgba(2,0,37,1) 41%, rgba(0,138,255,1) 100%)"
      w="100%"
      h="80px"
      p="20px"
    >
      <HStack>
        {" "}
        <Avatar size="md" name={User.displayName} src={User.photoURL} />
        <Box>
          <WrapItem></WrapItem>

          <Text fontSize="1xl" color="white" fontWeight="bold" ml="20px">
            {User.displayName}
          </Text>
          <Text fontSize={"10px"} ml={"20px"} color={"grey"} fontWeight="bold">
            {User.email}
          </Text>
        </Box>
      </HStack>

      <Spacer />
      {/* <HStack>
        
        <Text display={"inline"}>Radaz</Text>
      </HStack> */}
    </Flex>
  );
}

export default Header;
