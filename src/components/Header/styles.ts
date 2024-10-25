import styled from "styled-components";

export const HeaderContainer = styled.div`
 display: flex;
 justify-content: space-evenly;
 width: 100vw;
 margin: 20px 0;
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
