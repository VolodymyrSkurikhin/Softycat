import styled from '@emotion/styled';
/** @jsxRuntime classic */
/** @jsx jsx */
import type * as CSS from 'csstype';


const style: CSS.Properties = {
  backgroundColor: '#ccffff',
  padding: '50px'
};

// export const Container = styled('div')<CSS.Properties>({
//   backgroundColor: '#ccffff',
//   padding: '50px'});

export const Container = styled('div')(`${style}`);