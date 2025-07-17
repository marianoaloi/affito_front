"use client"
import React from 'react';
import { AffitoEntity, Feature } from '../entity/AffitoEntity';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';

import { CheckCircleOutline, HourglassEmpty, CancelOutlined } from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { updateAffitoState } from '@/redux/services/affito/affitoTrunk';
import { useDispatch } from '@/redux';

// Accept affiti as a prop
interface FeaturesTablePageProps {
  affiti: AffitoEntity[];
}


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
type AffitoState = 1 | 2 | 0 | undefined;

const FeaturesTablePage: React.FC<FeaturesTablePageProps> = ({ affiti }) => {
  const coluns = new Set<string>();
  const dispatch = useDispatch();

  const handleStateChange = async (newState: AffitoState, realEstateId: number) => {
    try {

      if (newState !== undefined) {
        dispatch(updateAffitoState({ realEstateId, newState }));
      }
    } catch (err) {
      // Optionally handle error
      console.error('Failed to update state:', err);
    }
  };

  affiti
    .map((affito: AffitoEntity) => affito.realEstate.properties[0].featureList
      .forEach((feature: Feature) => {
        coluns.add(feature.type)
      }))

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'title',
      headerName: 'Title',
      width: 350,
      filterable: false,
      renderCell: (params) => {
        // params.row.id should be available in the row data
        return (
          <a
            href={`https://www.immobiliare.it/annunci/${params.row.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'underline' }}
          >
            {params.value}
          </a>
        );
      },
    },
    { field: 'price', headerName: 'Price', width: 70 },
    {
      field: 'command', headerName: 'Command', width: 200, filterable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Approve">
              <IconButton
                color={params.row.stateMaloi === 1 ? 'success' : 'default'}
                onClick={() => handleStateChange(1, params.row.id)}
                aria-label="Approve"
              >
                <CheckCircleOutline />
              </IconButton>
            </Tooltip>
            <Tooltip title="Wait">
              <IconButton
                color={params.row.stateMaloi === 2 ? 'warning' : 'default'}
                onClick={() => handleStateChange(2, params.row.id)}
                aria-label="Wait"
              >
                <HourglassEmpty />
              </IconButton>
            </Tooltip>
            <Tooltip title="Deny">
              <IconButton
                color={params.row.stateMaloi === 0 ? 'error' : 'default'}
                onClick={() => handleStateChange(0, params.row.id)}
                aria-label="Deny"
              >
                <CancelOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
    },
  ]
  coluns.forEach((colun: string) => {
    columns.push({ field: colun, headerName: colun, width: 100 })
  })


  const rows = affiti.map((affito: AffitoEntity) => {
    const objAffito: any = {
      id: affito._id,
      title: affito.realEstate.title,
      price: affito.realEstate.price.value,
      stateMaloi: affito.stateMaloi, // Add this for the link
    }
    coluns.forEach((colun: string) => {
      const feature = affito.realEstate.properties[0].featureList
        .find((feature: Feature) => feature.type === colun);

      objAffito[colun] = feature?.compactLabel || feature?.label || ''
    })
    return objAffito
  })

  affiti
    .forEach((affito: AffitoEntity) => {
      const realestate = affito.realEstate
      realestate.properties[0].featureList
        .forEach((feature: Feature) => {
          coluns.add(feature.type)
        })
    }
    )

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={
          {
            id: false,
            stateMaloi: false,
          }
        }
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection={false}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default FeaturesTablePage; 