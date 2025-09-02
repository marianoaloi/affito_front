"use client"
import React, { useState } from 'react';
import { AffitoEntity, Feature } from '../entity/AffitoEntity';
import { Alert, AlertTitle, Box, IconButton, Stack, Tooltip } from '@mui/material';

import { CheckCircleSharp, HourglassEmptySharp, CancelSharp } from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { clearAffitoError, updateAffitoState } from '@/redux/services/affito/affitoTrunk';
import { getErrorAffito, useDispatch, useSelector } from '@/redux';
import { getToken } from '@/redux/services/auth/authSlice';
import { AffitiPageProps } from '../entity/AffitiPageProps';


type AffitoState = 1 | 2 | 0 | undefined;

const FeaturesTablePage: React.FC<AffitiPageProps> = ({ affiti }) => {
  const coluns = new Set<string>();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const errorMSG = useSelector(getErrorAffito)
  const [errorTable,setError] = useState<string | undefined>(undefined);

  const handleStateChange = async (newState: AffitoState, realEstateId: number) => {
    try {

      if (newState !== undefined && token !== undefined) {
        dispatch(updateAffitoState({ realEstateId, newState, token }));
      } else {
        setError("Token empty")
      }
    } catch (err) {
      // Optionally handle error
      setError('Failed to update state:'+(err instanceof Error ? err.message : 'Unknown error'));
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
                <CheckCircleSharp />
              </IconButton>
            </Tooltip>
            <Tooltip title="Wait">
              <IconButton
                color={params.row.stateMaloi === 2 ? 'warning' : 'default'}
                onClick={() => handleStateChange(2, params.row.id)}
                aria-label="Wait"
              >
                <HourglassEmptySharp />
              </IconButton>
            </Tooltip>
            <Tooltip title="Deny">
              <IconButton
                color={params.row.stateMaloi === 0 ? 'error' : 'default'}
                onClick={() => handleStateChange(0, params.row.id)}
                aria-label="Deny"
              >
                <CancelSharp />
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
    <>
      {errorMSG ?
        <Alert severity='error' onClose={() => {dispatch(clearAffitoError()) }} >
          <AlertTitle>Error</AlertTitle>
          {errorMSG}
        </Alert>
        : ''}
      {errorTable ?
        <Alert severity='error' onClose={() => {setError(undefined) }} >
          <AlertTitle>Error</AlertTitle>
          {errorTable}
        </Alert>
        : ''}
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
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default FeaturesTablePage; 