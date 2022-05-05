import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  {
    itemCode: "ALLSIMICCH10YP21",
    desc: "Simplified ICSE Chemistry for Std. X",
    unitPrice: 420.0,
    discount: 20.0,
    quantity: 71,
    rowTotal: 23848.0,
  },
  {
    itemCode: "ALLSIMICCH11YP21",
    desc: "Simplified ICSE Chemistry for Std. X",
    unitPrice: 420.0,
    discount: 20.0,
    quantity: 71,
    rowTotal: 23848.0,
  },
  {
    itemCode: "ALLSIMICCH12YP21",
    desc: "Simplified ICSE Chemistry for Std. X",
    unitPrice: 420.0,
    discount: 20.0,
    quantity: 71,
    rowTotal: 23848.0,
  },
  {
    itemCode: "ALLSIMICCH13YP21",
    desc: "Simplified ICSE Chemistry for Std. X",
    unitPrice: 420.0,
    discount: 20.0,
    quantity: 71,
    rowTotal: 23848.0,
  },
];

export default function InputTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className=" bg-[#67758e]">
          <TableRow>
            <TableCell className="!text-white !font-semibold">
              Item Code
            </TableCell>
            <TableCell className="!text-white !font-semibold">
              Description
            </TableCell>
            <TableCell className="!text-white !font-semibold">
              Unit Price
            </TableCell>
            <TableCell className="!text-white !font-semibold">
              Discount (in %)
            </TableCell>
            <TableCell className="!text-white !font-semibold">
              Quantity
            </TableCell>
            <TableCell className="!text-white !font-semibold">
              Row Total
            </TableCell>
            <TableCell className="!text-white !font-semibold">
              No. of Schools
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.itemCode}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.itemCode}
              </TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.discount}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.rowTotal}</TableCell>

              <TableCell>
                <input
                  className=" border-2 border-[#67758e] rounded-md"
                  type="number"
                  defaultValue={1}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
