import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";

export default function UserTable() {
    const rows = useSelector(state => state.toolkit.dots);

    return (
        <TableContainer component={Paper}>
          <Table style={{ maxWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>x</TableCell>
                <TableCell align="right">y</TableCell>
                <TableCell align="right">r</TableCell>
                <TableCell align="right">result</TableCell>
                <TableCell align="right">time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.x}
                  </TableCell>
                  <TableCell align="right">{row.y}</TableCell>
                  <TableCell align="right">{row.r}</TableCell>
                  <TableCell align="right">{row.result}</TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}