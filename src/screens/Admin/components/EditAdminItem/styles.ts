import styled from "styled-components";

export const Input = styled.input<{ $error?: boolean }>`
 ${({ $error }) => ($error ? "border: 1px solid red;" : "")}
 padding: 10px 5px;
 width: 100%;
`;
