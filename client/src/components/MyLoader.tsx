import * as React from 'react';
import {Flex, Loader} from "@mantine/core";


export const MyLoader = () => {
    return (
        <Flex justify="center" align="center" sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#fff',
            zIndex: 9999
        }}>
            <Loader />
        </Flex>
    );
};