import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useEffect, useState } from 'react';
import { loadEMSTableByGateway } from 'utils/user-service';
import { useParams } from '../../../node_modules/react-router/dist/index';
// import './OrdersTable.css';

// Head cell properties
const headCells = [
  {
    id: 'emsId',
    align: 'left',
    disablePadding: false,
    label: 'Ems Id'
  },
  {
    id: 'logType',
    align: 'center',
    disablePadding: false,
    label: 'Log Type'
  },
  {
    id: 'actionType',
    align: 'center',
    disablePadding: true,
    label: 'Acton Type'
  },
  {
    id: 'messageId',
    align: 'left',
    disablePadding: false,
    label: 'Message ID'
  },
  {
    id: 'request',
    align: 'center',
    disablePadding: false,
    label: 'Request'
  },
  {
    id: 'response',
    align: 'center',
    disablePadding: false,
    label: 'Response'
  },
  {
    id: 'timeStamp',
    align: 'center',
    disablePadding: false,
    label: 'Time Stamp'
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

// Order table component
export default function EMSTableByGateway() {
  const { gatewayId } = useParams();
  const [ems, setEms] = useState([]);

  useEffect(() => {
    loadEMSTableByGateway(gatewayId)
      .then((data) => {
        setEms(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [gatewayId]);

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
            {ems.map((row) => (
              <TableRow
                hover
                role="checkbox"
                key={row.id} // Assuming each row has a unique identifier
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {row.emsId}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Link
                    color="green"
                    component={RouterLink}
                    style={{ textDecoration: 'none', backgroundColor: '#e0ffe0', padding: '8px 16px', borderRadius: '4px' }}
                  >
                    {row.logType}
                  </Link>
                </TableCell>
                <TableCell align="left">{row.actionType}</TableCell>
                <TableCell align="left">{row.messageId}</TableCell>
                <TableCell align="center">{row.request}</TableCell>
                <TableCell align="center">{row.response}</TableCell>
                <TableCell align="center">{row.timeStamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
