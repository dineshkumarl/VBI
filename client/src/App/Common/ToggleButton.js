import { Button, Stack, Box } from "@chakra-ui/react";

export const ToggleButton = ({children, isOn, onChange, ...rest})=>{
    return (
        <Box as="span" {...rest}>
        {(isOn)&&(<Button colorScheme="teal" onClick={onChange}>{children}</Button>)}
        {(!isOn)&&(<Button colorScheme="teal" onClick={onChange} variant="outline">{children}</Button>)}
    </Box>
    )
}