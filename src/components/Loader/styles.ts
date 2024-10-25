import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
 display: inline-block;
 width: 80px;
 height: 80px;
`;

export const LoaderRing = styled.div`
 box-sizing: border-box;
 display: block;
 width: 64px;
 height: 64px;
 margin: 8px;
 border: 8px solid #4caf50;
 border-radius: 50%;
 border-top-color: transparent;
 animation: ${spin} 1.2s linear infinite;
`;

export const LoaderOverlay = styled.div`
 position: fixed;
 top: 0;
 width: 100vw;
 height: 100vh;
 display: flex;
 align-items: center;
 justify-content: center;
 background: rgba(128, 128, 128, 0.33);
`;
