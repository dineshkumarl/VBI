import { Button, Stack } from "@chakra-ui/react";

export const ToggleButton = ({children, isOn, onChange})=>{
    return (
        <Stack>
        {(isOn)&&(<Button onClick={onChange}>{children}</Button>)}
        {(!isOn)&&(<Button onClick={onChange} variant="outline">{children}</Button>)}
    </Stack>
    )
}