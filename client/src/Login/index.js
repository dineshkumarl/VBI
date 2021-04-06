import {Input, Button, FormControl, FormLabel, Box, Center, HStack, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "./hooks/auth";

export const LoginPage = ()=>{
    const { logOut } = useAuth();
    
    const formSubmit = (e) => {
      e.preventDefault();
    }

    useEffect(()=>{
        logOut();
    },[logOut])

    return (
      <Center height="100vh">
        <Box border="1px" padding="5" borderColor="gray.200" borderRadius="10">
              <form onSubmit={formSubmit}>
                  <VStack>
                      <FormControl isRequired>
                              <FormLabel htmlFor="email">Username</FormLabel>
                              <Input id="email" type="email" placeholder="example@example.com" />
                          </FormControl>
                          <FormControl isRequired>
                                  <FormLabel htmlFor="password">Password</FormLabel>
                                      <Input id="password" name="password" type="password" />
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