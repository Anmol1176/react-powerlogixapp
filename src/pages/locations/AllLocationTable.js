import React from 'react'

import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


import { useState, useEffect } from 'react';
import { loadAllLocation, loadLocationsByOrganisation } from 'utils/user-service';
import { useParams } from '../../../node_modules/react-router-dom/dist/index';
import './OrdersTable.css'


// Head cell properties
const headCells = [
    {
      id: 'id',
      align: 'center',
      disablePadding: false,
      label: '#'
    },
    {
      id: 'locationUniqueShortName',
      align: 'center',
      disablePadding: false,
      label: 'Location Name'
    },
    {
      id: 'status',
      align: 'center',
      disablePadding: false,
      label: 'Status'
    },
    {
      id: 'organisationName',
      align: 'center',
      disablePadding: true,
      label: 'Organisation'
    },
    {
      id: 'city',
      align: 'center',
      disablePadding: false,
      label: 'City/State'
    },
    {
      id: 'personName',
      align: 'center',
      disablePadding: false,
      label: 'Name'
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


function AllLocationTable() {

    const [allLocation, setAllLocation] = useState([]);
    const { orgId } = useParams();

    useEffect(() => {
    
      loadLocationsByOrganisation(orgId).then(data => {
          setAllLocation(data);
          // console.log("locations :" +data)
        })
        .catch((error) => {
          console.error(error);
        });
    }, [orgId]);
 
  useEffect(() => {
    loadAllLocation()
      .then((data) => {
        setAllLocation(data);
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
            {allLocation.map((row) => (
              <TableRow
                hover
                role="checkbox"
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">
                  <Link color="black" component={RouterLink} style={{ textDecoration: 'none' }} to={`/user/organisations/${row.organisation.orgId}/locations/${row.id}`}>
                    {row.locationUniqueShortName}
                  </Link>
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color:
                      row.status === 'Active'
                        ? 'green'
                        : row.status === 'Pending'
                          ? 'yellow'
                          : row.status === 'Retired'
                            ? 'gray'
                            : row.status === 'Blocked'
                              ? 'red'
                              : row.status === 'Draft'
                                ? 'gray'
                                : 'transparent',
                                // borderRadius: '20px'
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell align="center">{row.organisation ? row.organisation.organisationName : ''}</TableCell>
                <TableCell align="center">{`${row.city}, ${row.state}`}</TableCell>
                <TableCell align="center">{row.personName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AllLocationTable