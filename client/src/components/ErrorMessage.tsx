import { Flex, Text } from '@mantine/core';
import React, { FC } from "react";

interface ErrorProps {
    children: string | undefined
}

const ErrorMessage: FC<ErrorProps> = ({children}) => {
    return (
        <Flex justify="center" align="center" sx={{height: '60vh'}}>
            <Text
                component="span"
                inherit
                color="red"
            >
                {children}
            </Text>
        </Flex>
    );
}

export default ErrorMessage;