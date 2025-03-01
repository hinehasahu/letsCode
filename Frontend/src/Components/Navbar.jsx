import React from 'react'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, 
   
  } from '@chakra-ui/react'
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Home from './Home'
import Yogasana from './Yogasana'
import Community from './Community'
import Leaderboard from './Leaderboard'
import { Route, Routes, NavLink } from 'react-router-dom'
import Signup from './userAuth/Signup'
import Login from './userAuth/Login'
  
  const Links = [
    {
        name:'Home',
        goto:'/',
        navigate:<Home/>
    },
    {
        name:'Yogasanas',
        goto:'/yogasanas',
        navigate:<Yogasana/>
    },
    {
        name:'Community',
        goto:'/community',
        navigate:<Community/>
    },
    {
        name:'Leaderboard',
        goto:'/leaderboard',
        navigate:<Leaderboard/>
    }
  ]

const NLink = (props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon/> : <HamburgerIcon/> }
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight='bold' color='goldenrod' >Yogasana</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink to={link.goto} key={link.name}>{link.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem>
                  <NavLink to='/signup' >Login/Signup</NavLink>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NLink><NavLink to={link.goto}  key={link.name}>{link.name}</NavLink></NLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Routes>
        {
            Links.map((link)=>( 
                <>
                  <Route key={link.name} path={link.goto} element={link.navigate} />
                  <Route path='/signup/*' element={<Signup/>} />
                  <Route path='/login/*' element={<Login/>}/>
                </>
            ))
        }
        
      </Routes>
    </>
  )
}

export default Navbar