import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
  colors: {
    brand: {
      50: '#e9d8fd',
      100: '#d6bcfa',
      200: '#b794f4',
      300: '#9f7aea',
      400: '#805ad5',
      500: '#6b46c1',
      600: '#553c9a',
      700: '#44337a',
      800: '#322659',
      900: '#21183c',
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
    },
  },
});

export default theme;