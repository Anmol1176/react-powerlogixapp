import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { loadLocationsByOrganisation } from 'utils/user-service';
import { useState, useEffect } from 'react';
import { useParams } from '../../../node_modules/react-router-dom/dist/index';
// import { toast } from 'react-toastify';
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
    label: 'City'
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
            className='style'
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function LocationTable() {
  const { orgId } = useParams();
  const [locations, setLocations] = useState([]);
  

  useEffect(() => {
    
    loadLocationsByOrganisation(orgId).then(data => {
        setLocations(data);
      })
      .catch((error) => {
        // toast.error("error in loading locations")
        console.error(error);
      });
  }, [orgId]);
  

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
            {locations.map((row) => (
              <TableRow
                hover
                role="checkbox"
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">
                  <Link color="black" component={RouterLink} to={`/user/organisations/${orgId}/locations/${row.id}`} style={{ textDecoration: 'none' }}>
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
  );
}

export default LocationTable;
