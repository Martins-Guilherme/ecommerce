// src/setupTests.ts
import '@testing-library/jest-dom';
import 'jest-styled-components';

// Polyfill TextEncoder / TextDecoder para React Router 7 + Jest
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  // @ts-ignore
  global.TextDecoder = TextDecoder as any;
}
