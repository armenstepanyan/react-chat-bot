import React, { FunctionComponent } from "react";
import { AnswerItem } from "../interfaces";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

interface Props {
  list: Array<AnswerItem>;
}

const ChoosenAnswers: FunctionComponent<Props> = ({ list }) => {
  return list.length === 0 ? (<div></div>) : 
  (
    <>
      <Typography variant="body2"  sx={{ mt: 3 }}>Logs</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow
                key={row.name}                
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{String(row.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ChoosenAnswers;
