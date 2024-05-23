import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { loadAllUsers } from 'utils/user-service';
import { useState, useEffect } from 'react';
import './OrdersTable.css'

// import { toast } from 'react-toastify';

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
    id: 'phone',
    align: 'center',
    disablePadding: false,
    label: 'Mobile'
  },
  {
    id: 'email',
    align: 'center',
    disablePadding: true,
    label: 'Email'
  },
  // {
  //   id: 'password',
  //   align: 'center',
  //   disablePadding: false,
  //   label: 'Password'
  // },
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

function Userpage() {
  
  const [allUsers, setAllUsers] = useState([]);
  

  useEffect(() => {
    
    loadAllUsers().then(data => {
        setAllUsers(data);
      })
      .catch((error) => {
        // toast.error("error in loading locations")
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
            {allUsers.map((row) => (
              <TableRow
                hover
                role="checkbox"
                key={row.userId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.userId}</TableCell>
                <TableCell align="center">
                  <Link color="black" to={`/user/update/${row.userId}`} component={RouterLink} style={{ textDecoration: 'none' }}>
                  {`${row.firstName} ${row.lastName}`}
                  </Link>
                </TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                {/* <TableCell align="center">{row.password}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Userpage;
