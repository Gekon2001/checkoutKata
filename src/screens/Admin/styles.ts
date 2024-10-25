import styled from "styled-components";

export const AdminContainer = styled.div``;

export const Table = styled.table`
 width: 100%;
 border-collapse: collapse;
`;

export const TableRow = styled.tr`
 &:nth-child(even) {
  background-color: #7f792d;
 }
`;

export const TableHeader = styled.th`
 background-color: #4caf50;
 color: white;
 padding: 12px;
 text-align: left;
`;

export const TableCell = styled.td<{
 $button?: boolean;
 fullWidth?: boolean;
 $small?: boolean;
}>`
 border: 1px solid #ddd;
 ${({ $button }) => $button && "padding: 0;"};
 text-align: left;
 height: 40px;
 border: none;
 ${({ $small }) => $small && "height: 10px;"}
 &:first-child {
  width: 30vw;
 }
 &:nth-child(2) {
  width: 20vw;
 }
 &:last-child {
  width: 15vw;
 }
`;

export const Button = styled.button<{
 $fullSize?: boolean;
 disabled?: boolean;
}>`
 color: white;
 background: #6ca855;
 display: block;
 margin: 2px 0;
 ${({ disabled }) => (disabled ? "pointer-events: none; opacity: 0.7;" : "")}
 ${({ $fullSize }) =>
  $fullSize ? "width: 100%; height: 100%;" : "width: 80%; border-radius: 5px;"}
 &:hover {
  background: #4b6d3e;
  transition: 0.5s;
 }
`;

export const Text = styled.p`
 padding: 10px 5px;
`;
