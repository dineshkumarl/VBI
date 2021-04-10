import {Input, Button, FormControl, FormLabel, Box, Center, HStack, VStack, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useAuth } from "./hooks/auth";

export const LoginPage = ()=>{
    const { logIn, logOut } = useAuth();
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState(false);
    
    useEffect(()=>{
        logOut();
    },[]);

    const formSubmit = async (e) => {
      e.preventDefault();
      const [error] = await logIn({userName, password});
      if(error){
        setFormError(true);
      }else{
        setFormError(false);
        history.push('/');
      }
    }

    return (
      <Center height="100vh">
        <Box border="1px" padding="5" borderColor="gray.200" borderRadius="10">
              <form onSubmit={formSubmit}>
                  <VStack>
                      {(formError)&&(<FormErrorMessage>Invalid username or password</FormErrorMessage>)}
                      <FormControl isRequired>
                              <FormLabel htmlFor="email">Username</FormLabel>
                              <Input id="email" name="email" type="email" onChange={(e)=>{setUserName(e.target.value)}} placeholder="example@example.com" />
                          </FormControl>
                          <FormControl isRequired>
                                  <FormLabel htmlFor="password">Password</FormLabel>
                                      <Input id="password" onChange={(e)=>{setPassword(e.target.value)}} name="password" type="password" />
                                      {/* {(form.errors)&&(<FormErrorMessage>{form.errors.password}</FormErrorMessage>)} */}
                              </FormControl>
                  </VStack>
                  <HStack mt={4} spacing={4} justifyContent="flex-end">
                      <Button>Clear</Button>
                      <Button type="submit" colorScheme="teal">Submit</Button>
                  </HStack>
                </form>
          </Box>
      </Center>
    )
    

    // return (
    //     <Center height="100vh">
    //         <Box border="1px" padding="5" borderColor="gray.200" borderRadius="10">
    //             <Formik onSubmit={formSubmit}>
    //                 <VStack spacing={4}>
    //                     <Form>
    //                     <Field name="email" validate={validateName}>
    //                         {({field, form})=>(
    //                             <FormControl isRequired>
    //                                 <FormLabel htmlFor="email">Username</FormLabel>
    //                                 <Input {...field} id="email" placeholder="example@example.com" />
    //                                 {(form.errors)&&(<FormErrorMessage>{form.errors.email}</FormErrorMessage>)}
    //                             </FormControl>
    //                         )}
    //                     </Field>
    //                     <Field name="password" validate={validateName}>
    //                         {({field, form})=>(
    //                             <FormControl isRequired>
    //                                 <FormLabel htmlFor="password">Password</FormLabel>
    //                                     <Input {...field} id="password" name="password" type="password" />
    //                                     {(form.errors)&&(<FormErrorMessage>{form.errors.password}</FormErrorMessage>)}
    //                             </FormControl>
    //                         )}
    //                     </Field>
    //                     <HStack mt={4} spacing={4} justifyContent="flex-end">
    //                         <Button>Clear</Button>
    //                         <Button type="submit" colorScheme="teal">Submit</Button>
    //                     </HStack>
    //                     </Form>
    //                 </VStack>
    //             </Formik>
    //         </Box>
    //     </Center>)
}
export default LoginPage