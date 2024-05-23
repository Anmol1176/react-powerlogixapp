import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useEffect, useState } from 'react';
import {  loadGatewayByOrganisationAndLocation } from 'utils/user-service';
import './OrdersTable.css' 
import { useParams } from '../../../node_modules/react-router-dom/dist/index';


// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

// Head cell properties
const headCells = [
  {
    id: 'gatewayId',
    align: 'left',
    disablePadding: false,
    label: '#'
  },
  {
    id: 'gatewayPointName',
    align: 'center',
    disablePadding: false,
    label: 'Gateway Point Name'
  },
  {
    id: 'serialnumber',
    align: 'center',
    disablePadding: true,
    label: 'Serial Number'
  },
  {
    id: 'controller',
    align: 'center',
    disablePadding: false,
    label: 'Controller'
  },
  {
    id: 'controllerSerialNumber',
    align: 'center',
    disablePadding: false,
    label: 'Controller Serial Number'
  },
  {
    id: 'firmWareVersion',
    align: 'center',
    disablePadding: false,
    label: 'FirmWare Version'
  },
  {
    id: 'siteSurveyNumber',
    align: 'center',
    disablePadding: false,
    label: 'Site Survey Number'
  },
  {
    id: 'siteSurveyDate',
    align: 'center',
    disablePadding: false,
    label: 'Site Survey Date'
  },
  {
    id: 'warrantyStartDate',
    align: 'center',
    disablePadding: false,
    label: 'Warranty Start Date'
  },
  {
    id: 'warrantyPeriod',
    align: 'center',
    disablePadding: false,
    label: 'Warranty Period'
  },
  {
    id: 'activationDate',
    align: 'center',
    disablePadding: false,
    label: 'Activation Date'
  },
  {
    id: 'registrationStatus',
    align: 'center',
    disablePadding: false,
    label: 'Registration Status'
  },
  {
    id: 'vendorName',
    align: 'center',
    disablePadding: false,
    label: 'Vendor Name'
  },
  {
    id: 'simCardtype',
    align: 'center',
    disablePadding: false,
    label: 'Sim Card type'
  },
  {
    id: 'simCardNumber',
    align: 'center',
    disablePadding: false,
    label: 'Sim Card Number'
  },
  {
    id: 'simCardMobileNumber',
    align: 'center',
    disablePadding: false,
    label: 'Sim Card Mobile Number'
  },
  {
    id: 'simCardProvider',
    align: 'center',
    disablePadding: false,
    label: 'Sim Card Provider'
  },
  {
    id: 'simCardConnectionPayee',
    align: 'center',
    disablePadding: false,
    label: 'Sim Card Connection Payee'
  },
  {
    id: 'simCardOwner',
    align: 'center',
    disablePadding: false,
    label: 'Sim Card Owner'
  },
 
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



function GatewayByLocation() {

  const [gateways, setGateways] = useState([]);

  const { orgId,locationId } = useParams();

  useEffect(() => {

      loadGatewayByOrganisationAndLocation(orgId,locationId)
      .then((data) => {
        setGateways(data);
      })
      .catch((error) => {
        console.error(error);
      });
    

  }, [orgId,locationId]);


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
          {gateways.map((row) => (
            <TableRow
              hover
              role="checkbox"
              key={row.gatewayId} // Assuming each row has a unique identifier
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.gatewayId}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <Link color="black" to={`/user/gateways/org/${orgId}/location/${locationId}/gateway/${row.gatewayId}`} component={RouterLink} style={{ textDecoration: 'none' }}>
                  {row.gatewayPointName}
                </Link>
              </TableCell>
              {/* <TableCell align="center">{row.slaveId}</TableCell> */}
              <TableCell align="center">{row.serialNumber}</TableCell>
              <TableCell align="center">{row.controller}</TableCell>
              <TableCell align="center">{row.controllerSerialNumber}</TableCell>
              <TableCell align="center">{row.firmWareVersion}</TableCell>
              <TableCell align="center">{row.siteSurveyNumber}</TableCell>
              <TableCell align="center">{row.siteSurveyDate}</TableCell>
              <TableCell align="center">{row.warrantyStartDate}</TableCell>
              <TableCell align="center">{row.warrantyPeriod}</TableCell>
              <TableCell align="center">{row.activationDate}</TableCell>
              <TableCell align="center">{row.registrationStatus}</TableCell>
              <TableCell align="center">{row.vendorName}</TableCell>
              <TableCell align="center">{row.simCardType}</TableCell>
              <TableCell align="center">{row.simCardNumber}</TableCell>
              <TableCell align="center">{row.simCardMobileNumber}</TableCell>
              <TableCell align="center">{row.simCardProvider}</TableCell>
              <TableCell align="center">{row.simCardConnectionPayee}</TableCell>
              <TableCell align="center">{row.simCardOwner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  )
}

export default GatewayByLocation;