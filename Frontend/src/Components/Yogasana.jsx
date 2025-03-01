import React, { useEffect, useReducer } from "react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Card,
  Box,
  CardBody,
  Image,
  Stack,
  Spinner,
  Heading,
  Text,
  CardFooter,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";

const initialState = { yogas: [], loading: true, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, yogas: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: "Failed to load leaderboard", loading: false };
    default:
      return state;
  }
};

function Yogasana() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.yogas);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://leaderboard-8ab14-default-rtdb.firebaseio.com/yogasanas.json"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchLeaderboard();
  }, []);
  return (
    <Box className="p-4">
      <Text textAlign='center' bg='ivory' fontWeight='bold' fontSize={{base:'2xl', md:'2xl', xl:'3xl'}} paddingY={{base:'1rem',md:'1rem',xl:'2rem'}}>Yog Asanas</Text>
      {state.loading ? (
        <Text><Spinner size="xl" /></Text>
      ) : state.error ? (
        <Text>{state.error}</Text>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SimpleGrid  columns={{base:'1', md:'2', xl:'3'}} gap={4} spacingX="40px" spacingY="20px">
            {state.yogas.map((yoga, index) => (
              <Card rounded='lg' shadow='lg' maxW="lg" key={yoga.id} width="100%" h={{base:"100%", md:"100%", xl:"100%"}}>
                <CardBody>
                  <Image
                    src="https://img.freepik.com/premium-vector/illustration-flat-art-yoga-pose_718801-74.jpg?w=900"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Badge
                      colorScheme={
                        yoga.difficulty_level == "Moderate"
                          ? "purple"
                          : yoga.difficulty_level == "Advanced"
                          ? "pink"
                          : "green"
                      }>
                      {yoga.difficulty_level}
                    </Badge>
                    <Heading size="md">{yoga.name}</Heading>
                    <Text>{yoga.description}</Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing="4" >
                    <Button
                      textAlign="center"
                      paddingX={[32]}
                      variant="solid"
                      bg="lightgreen">
                      Practice
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
}

export default Yogasana;
