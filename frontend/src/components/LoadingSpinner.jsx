import { Spinner, Center, Text, VStack } from '@chakra-ui/react';

const LoadingSpinner = () => (
  <Center h="50vh">
    <VStack>
      <Spinner size="xl" color="blue.500" thickness="4px" />
      <Text mt={4} color="gray.500">Loading...</Text>
    </VStack>
  </Center>
);

export default LoadingSpinner;