import React from 'react'

import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


import { useState, useEffect } from 'react';
import {  loadAllOperators, loadUsersByOrganisation } from 'utils/user-service';
import './OrdersTable.css'
import { useParams } from '../../../node_modules/react-router-dom/dist/index';


// Head cell properties
const headCells = [
    {
      id: 'id',
      align: 'center',
      disablePadding: false,
      label: '#'
    },
    {
      id: 'firstName',
      align: 'center',
      disablePadding: false,
      label: 'Full Name'
    },
    {
      id: 'email',
      align: 'center',
      disablePadding: false,
      label: 'Email'
    },
    {
      id: 'organisationName',
      align: 'center',
      disablePadding: true,
      label: 'Organisation'
    },
    {
      id: 'type',
      align: 'center',
      disablePadding: false,
      label: 'Type'
    },
    {
      id: 'phone',
      align: 'center',
      disablePadding: false,
      label: 'Mobile Number'
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


function AllOperators() {

    const [operator, setOperator] = useState([]);

    const { orgId } = useParams();

    useEffect(() => {
    
      loadUsersByOrganisation(orgId).then(data => {
          setAllLocation(data);
          // console.log("locations :" +data)
        })
        .catch((error) => {
          console.error(error);
        });
    }, [orgId]);

    useEffect(() => {
    
      loadAllOperators().then(data => {
        setOperator(data);
          // console.log("locations :" +data)
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
            {operator.map((row) => (
              <TableRow
                hover
                role="checkbox"
                key={row.userId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.userId}</TableCell>
                <TableCell align="center">
                  <Link color="black" component={RouterLink} style={{ textDecoration: 'none' }} to={`/user/organisations/${row.organisation.orgId}/user/${row.userId}`}>
                  {`${row.firstName} ${row.lastName}`}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.organisation ? row.organisation.organisationName : ''}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AllOperators