import React from "react";
import { useReducer, useEffect } from "react";
import axios from "axios";
// import {CircleIcon} from 'react-icons'
import { Table, TableContainer, Thead,Tbody, Tr,Td, Th } from "@chakra-ui/react";
import {  Spinner, Text } from "@chakra-ui/react";

const initialState = { users: [], loading: true, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: "Failed to load leaderboard", loading: false };
    default:
      return state;
  }
};



function Leaderboard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://leaderboard-8ab14-default-rtdb.firebaseio.com/leaderboard.json"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchLeaderboard();
  }, []);
  return (
    <div className="p-4">
      <Text
        textAlign="center"
        bg="ivory"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "2xl", xl: "3xl" }}
        paddingY={{ base: "1rem", md: "1rem", xl: "2rem" }}>
        🏆 Yoga Leaderboard
      </Text>

      {state.loading ? (
        <p>
          <Spinner size="xl" />
        </p>
      ) : state.error ? (
        <p>{state.error}</p>
      ) : (
        
        <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Asanas done</Th>
              <Th>Total Points</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
          {state.users.map((user, index) => (
            <Tr >
                <Td>{index+1}</Td>
                <Td>{user.name}</Td>
                <Td>🧘{user.asanasCompleted} asanas</Td>
                <Td>null</Td>
                <Td>ooo</Td>
            </Tr>
          ))}
          </Tbody>
          
        </Table>
      </TableContainer>
      )}
    </div>
  );
}

export default Leaderboard;
