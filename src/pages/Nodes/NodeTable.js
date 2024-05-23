import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
 
// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
 
import { useEffect, useState } from 'react';
import './OrdersTable.css'
import { loadNode1 } from 'utils/node-service';
 
 
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
 
// Head cell properties
const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: '#'
  },
  {
    id: 'nodeId',
    align: 'center',
    disablePadding: false,
    label: 'Node ID'
  },
  {
    id: 'sequenceNumber',
    align: 'center',
    disablePadding: true,
    label: 'SEQUENCE NUMBER'
  },
  {
    id: 'timestamp',
    align: 'center',
    disablePadding: false,
    label: 'TIME STAMP'
  },
  {
    id: 'v1n',
    align: 'center',
    disablePadding: false,
    label: 'VOLTAGE (V1n)'
  },
  {
    id: 'v2n',
    align: 'center',
    disablePadding: false,
    label: 'VOLTAGE (V2n)'
  },
  {
    id: 'v3n',
    align: 'center',
    disablePadding: false,
    label: 'VOLTAGE (V3n)'
  },
  {
    id: 'vln',
    align: 'center',
    disablePadding: false,
    label: 'AVERAGE VOLTAGE (VlN)'
  },
  {
    id: 'v12',
    align: 'center',
    disablePadding: false,
    label: 'VOLTAGE (V12)'
  },
  {
    id: 'v23',
    align: 'center',
    disablePadding: false,
    label: 'VOLTAGE (V23)'
  },
  {
    id: 'v31',
    align: 'center',
    disablePadding: false,
    label: 'VOLTAGE (V31)'
  },
  {
    id: 'vll',
    align: 'center',
    disablePadding: false,
    label: 'AVERAGE VOLTAGE (Vll)'
  },
  {
    id: 'cur1',
    align: 'center',
    disablePadding: false,
    label: 'CURRENT1'
  },
  {
    id: 'cur2',
    align: 'center',
    disablePadding: false,
    label: 'CURRENT2'
  },
  {
    id: 'cur3',
    align: 'center',
    disablePadding: false,
    label: 'CURRENT3'
  },
  {
    id: 'acur',
    align: 'center',
    disablePadding: false,
    label: 'AVERAGE CURRENT'
  },
  {
    id: 'tkw',
    align: 'center',
    disablePadding: false,
    label: 'TOTAL KW'
  },
  {
    id: 'tkvar',
    align: 'center',
    disablePadding: false,
    label: 'TOTAL KVAr'
  },
  {
    id: 'tkva',
    align: 'center',
    disablePadding: false,
    label: 'TOTAL KVA'
  },
  {
    id: 'apf',
    align: 'center',
    disablePadding: false,
    label: 'AVERAGE POWER FACTOR'
  },
  {
    id: 'dmdap',
    align: 'center',
    disablePadding: false,
    label: 'MAX. DMD ACTIVE POWER'
  },
  {
    id: 'dmdrp',
    align: 'center',
    disablePadding: false,
    label: 'MAX. DMD REACTIVE POWER'
  },
  {
    id: 'dmdapp',
    align: 'center',
    disablePadding: false,
    label: 'MAX. DMD APPARENT POWER'
  },
  {
    id: 'tkwhi',
    align: 'center',
    disablePadding: false,
    label: 'TOTAL KWh IMPORT'
  },
  {
    id: 'rkwhe',
    align: 'center',
    disablePadding: false,
    label: 'TOTAL KWh EXPORT'
  }
];
 
// Order table header component
function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            className="style"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
 
 
function NodesTable() {
 
    const [NodesTable, setNodesTable] = useState([]);
 
    useEffect(() => {
        loadNode1()
        .then((data) => {
            setNodesTable(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
 
  return (
    <Box>
    <TableContainer
      sx={{
        width: '100%',
        overflowX: 'auto',
        position: 'relative',
        display: 'block',
        maxWidth: '100%',
        '& td, & th': { whiteSpace: 'nowrap' }
      }}
    >
      <Table>
        <OrderTableHead />
        <TableBody>
          {NodesTable.map((row) => (
            <TableRow
              hover
              role="checkbox"
              key={row.id} // Assuming each row has a unique identifier
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <Link color="black" component={RouterLink} style={{ textDecoration: 'none' }}>
                  {row.nodeId}
                </Link>
              </TableCell>
              {/* <TableCell align="center">{row.slaveId}</TableCell> */}
              <TableCell align="center">{row.sequenceNumber}</TableCell>
              <TableCell align="center">{row.timestamp}</TableCell>
              <TableCell align="center">{row.v1n}</TableCell>
              <TableCell align="center">{row.v2n}</TableCell>
              <TableCell align="center">{row.v3n}</TableCell>
              <TableCell align="center">{row.vln}</TableCell>
              <TableCell align="center">{row.v12}</TableCell>
              <TableCell align="center">{row.v23}</TableCell>
              <TableCell align="center">{row.v31}</TableCell>
              <TableCell align="center">{row.vll}</TableCell>
              <TableCell align="center">{row.cur1}</TableCell>
              <TableCell align="center">{row.cur2}</TableCell>
              <TableCell align="center">{row.cur3}</TableCell>
              <TableCell align="center">{row.acur}</TableCell>
              <TableCell align="center">{row.tkw}</TableCell>
              <TableCell align="center">{row.tkvar}</TableCell>
              <TableCell align="center">{row.tkva}</TableCell>
              <TableCell align="center">{row.apf}</TableCell>
              <TableCell align="center">{row.dmdap}</TableCell>
              <TableCell align="center">{row.dmdrp}</TableCell>
              <TableCell align="center">{row.dmdapp}</TableCell>
              <TableCell align="center">{row.tkwhi}</TableCell>
              <TableCell align="center">{row.rkwhe}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  )
}
 
export default NodesTable;