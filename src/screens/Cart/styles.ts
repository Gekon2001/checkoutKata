import styled from "styled-components";

export const AdminContainer = styled.div``;

export const ButtonContainer = styled.div`
 display: flex;
 justify-content: space-evenly;
 margin: 15px 0;
`;

export const Button = styled.button<{
 $fullSize?: boolean;
 disabled?: boolean;
}>`
 color: white;
 background: #6ca855;
 margin: 2px 0;
 padding: 10px 5px;
 ${({ disabled }) => (disabled ? "pointer-events: none; opacity: 0.7;" : "")}
 ${({ $fullSize }) =>
  $fullSize ? "width: 100%; height: 100%;" : "width: 20%; border-radius: 5px;"}
 &:hover {
  background: #4b6d3e;
  transition: 0.5s;
 }
`;

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
}>`
 border: 1px solid #ddd;
 ${({ $button }) => ($button ? "padding: 0;" : "")};
 text-align: left;
 height: 40px;
 border: none;
`;
