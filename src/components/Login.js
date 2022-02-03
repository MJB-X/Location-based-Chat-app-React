import { Button, IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { inGoogle } from "../firebase/Config";
import { FcGoogle } from "react-icons/fc";

function Login() {
  console.log("Login page trigerred");

  const loginHandel = () => {
    console.log("Login click");
    inGoogle();
  };
  return (
    <Box
      w="100vw"
      h="100vh"
      // bg="radial-gradient(121.25% 58.68% at 49.87% 26.05%, #0085FF 0%, rgba(6, 23, 47, 0.99) 100%)"
      background="rgb(0,212,255)"
      background="#020024"
      justifyContent="center"
      textAlign="center"
      pt="6rem"
    >
      <Flex
        m="auto"
        w={{ base: "100%", md: "60%", xl: "40%" }}
        h="70%"
        textAlign="center"
        background="linear-gradient(124deg, rgba(9,35,68,0.8242647400757178) 0%, rgba(2,0,36,0.7318277652858018) 100%)"
        // bg="#092344"
        // border="solid 2px black"
        alignItems={"center"}
        direction="column"
        backdropFilter={"bluer 10px"}
        borderRadius={"20px"}
      >
        <Box m="auto">
          <svg
            width="238"
            height="238"
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
            <circle cx="119" cy="119" r="95" stroke="white" stroke-width="4" />
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
              <mask id="path-5-inside-1_27:3" fill="white">
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
              <circle cx="78.5" cy="89.5" r="5.5" fill="#00FFB2" />
            </g>
            <g filter="url(#filter4_f_27:3)">
              <circle cx="155" cy="173" r="10" fill="#EBFF00" />
            </g>
            <g filter="url(#filter5_f_27:3)">
              <circle cx="150" cy="79" r="5" fill="#FF00F5" />
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
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImage" stdDeviation="11" />
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
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImage" stdDeviation="11" />
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
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
        </Box>
        <Text color="white" fontWeight="extrabold" fontSize="3xl">
          Welcome to RADARz
        </Text>
        <Text color="whiteAlpha.700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, odio.
        </Text>
        <Button
          w="fit-content"
          m="auto"
          rightIcon={<FcGoogle></FcGoogle>}
          onClick={() => loginHandel()}
        >
          Login with{" "}
        </Button>
      </Flex>
    </Box>
  );
}

export default Login;
