import { Box, Text } from "@chakra-ui/react";
import React from "react";

function Home() {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="40vh"
        width="100%"
        flexDirection="column"
        bg='ivory'
        textAlign='center'
        >
        <Text fontSize='lg' fontWeight='bold' color="">Empower Your Mind & Body – Track, Share, Elevate!</Text>
        <Text color='gray.600' fontSize='sm' m={2}>
          Join a community that moves together! Track your asanas, rate their
          difficulty, and challenge yourself to new heights.
        </Text>
      </Box>
    </Box>
  );
}

export default Home;
