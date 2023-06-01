import styled from '@emotion/styled';
/** @jsxRuntime classic */
/** @jsx jsx */
// import { jsx } from '@emotion/react'
import type * as CSS from 'csstype';
// import { css } from '@emotion/react';

// interface Style extends CSS.Properties {}

const style : CSS.Properties={
  backgroundColor: '#ccffff',
  padding: '50px'
};
// interface IStyles {...CSS.Properties};

// export const Container = styled('div')<CSS.Properties>({
//   backgroundColor: '#ccffff',
//   padding: '50px'});

export const Container = styled('div')(`${style}`);
  
// console.log(style);
