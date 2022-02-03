import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Moment from "react-moment";

function chatbubble({ message, isMe }) {
  return (
    <>
      <Box
        bg={isMe ? "#0089fd" : "#374961"}
        color={isMe ? "white" : "white"}
        maxW="400px"
        borderRadius={isMe ? "20px 20px 0px 20px" : "0px 20px 20px 20px"}
        height="fit-content"
        alignSelf={isMe ? "end" : "start"}
        padding="10px 40px 10px 20px"
        margin="10px 0px 10px 0px"
      >
        <Text>{message.text}</Text>
        <Text
          fontSize="10px"
          color={isMe ? "lightgrey" : "lightgrey"}
          textAlign="right"
          alignSelf={isMe ? "end" : "start"}
          margin="5px -20px 0px 0px"
        >
          <Moment fromNow>{message.createdAt.toDate()}</Moment>
        </Text>
      </Box>
    </>
  );
}

export default chatbubble;
