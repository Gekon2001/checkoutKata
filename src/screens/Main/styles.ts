import styled from "styled-components";

export const MainContainer = styled.div`
 display: flex;
 justify-content: space-evenly;
 align-items: center;
 width: 100vw;
 min-height: 100vh;
`;

export const Button = styled.a`
 width: 45vw;
 height: 45vw;
 max-width: 45vh;
 max-height: 45vh;
 background: #658768;
 color: white;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
 font-size: 26px;
 border-radius: 5%;
 &:hover {
  background: #1d4221;
  transition: 0.5s;
 }
`;
