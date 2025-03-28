import { MDXProvider } from '@mdx-js/react';
import {
  Box,
  ColorModeProvider,
  CSSBaseline,
  ThemeProvider,
  useColorMode,
} from '@trendmicro/react-styled-core';
import App from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import MDXComponents from '../components/MDXComponents';
import SideNav from '../components/SideNav';

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];

  return (
    <Box color={fontColor}>
      <Header />
      <SideNav
        display={['none', null, 'block']}
        maxWidth="20rem"
        px="4x"
        py="3x"
      />
      <Box
        height="100vh"
        pt="16x"
      >
        <Main
          fontSize="md"
          lineHeight="md"
          ml={[0, null, '20rem']}
        >
          {children}
        </Main>
      </Box>
    </Box>
  );
};

const CustomApp = (props) => {
  const router = useRouter();
  useEffect(() => {
    router.pathname === '/' && router.push(`${process.env.PUBLIC_URL}/getting-started`);
  }, [router]);
  return (
    <ThemeProvider>
      <ColorModeProvider value="dark">
        <CSSBaseline />
        <MDXProvider components={MDXComponents}>
          <Layout>
            <App {...props} />
          </Layout>
        </MDXProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default CustomApp;
