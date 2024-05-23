import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useEffect, useState } from 'react';
import { loadAllOrganisation } from 'utils/user-service';
import './OrdersTable.css';
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

// Head cell properties
const headCells = [
  {
    id: 'orgId',
    align: 'left',
    disablePadding: false,
    label: '#'
  },
  {
    id: 'organisation',
    align: 'center',
    disablePadding: false,
    label: 'FULLNAME'
  },
  {
    id: 'type',
    align: 'center',
    disablePadding: true,
    label: 'TYPE'
  },
  {
    id: 'primaryContact',
    align: 'left',
    disablePadding: false,
    label: 'PRIMARY CONTACT'
  },
  {
    id: 'phoneNumber',
    align: 'center',
    disablePadding: false,
    label: 'PHONE NUMBER'
  },
  {
    id: 'city',
    align: 'center',
    disablePadding: false,
    label: 'CITY/STATE'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: 'STATUS'
  },
  {
    id: 'creationDate',
    align: 'center',
    disablePadding: false,
    label: 'CREATION DATE'
  },
  {
    id: 'updationDate',
    align: 'center',
    disablePadding: false,
    label: 'UPDATION DATE'
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
export default function OrderTable() {
  const [allOrg, setAllOrg] = useState([]);

  useEffect(() => {
    loadAllOrganisation()
      .then((data) => {
        setAllOrg(data);
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
            {allOrg.map((row) => (
              <TableRow
                hover
                role="checkbox"
                key={row.id} // Assuming each row has a unique identifier
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {row.orgId}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <Link color="black" component={RouterLink} to={`/user/organisations/${row.orgId}`} style={{ textDecoration: 'none' }}>
                    {row.organisationName}
                  </Link>
                </TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.personName}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell align="center">{`${row.city}, ${row.state}`}</TableCell>
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
                <TableCell align="center">{row.createdDate}</TableCell>
                <TableCell align="center">{row.updateDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
