import React from 'react';

import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { loadAllNotification } from 'utils/user-service';
import './OrdersTable.css';

// Head cell properties
const headCells = [
  {
    id: 'nodeId',
    align: 'center',
    disablePadding: false,
    label: 'Node ID'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'timestamp',
    align: 'center',
    disablePadding: true,
    label: 'timeStamp'
  },
  {
    id: 'error',
    align: 'center',
    disablePadding: false,
    label: 'error'
  }
];

// Order table header component
function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'} className="style">
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function StatusNotification() {
  const [StatusNotification, setStatusNotification] = useState([]);

  useEffect(() => {
    loadAllNotification()
      .then((data) => {
        setStatusNotification(data);
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
            {StatusNotification.map((row) => (
              <TableRow hover role="checkbox" key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">
                  <Link color="black" to={`/user/node/${row.nodeId}`}  component={RouterLink} style={{ textDecoration: 'none' }}>
                    {row.nodeId}
                  </Link>
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: row.status === 'Available' ? 'green' : row.status === 'UnAvailable' ? 'red' : 'inherit' 
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell align="center">{row.timestamp}</TableCell>
                <TableCell align="center">{row.error}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StatusNotification;
