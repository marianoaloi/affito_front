"use client"
import React, { useState } from 'react';
import { AffitoEntity, Feature } from '../entity/AffitoEntity';
import { Alert, AlertTitle, Box } from '@mui/material';


import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { clearAffitoError } from '@/redux/services/affito/affitoTrunk';
import { FilterAffito, getErrorAffito, getFilter, setFilterAffito, useDispatch, useSelector } from '@/redux';
import { AffitiPageProps } from '../entity/AffitiPageProps';
import ChoiceState from '../component/ChoiceState';



const FeaturesTablePage: React.FC<AffitiPageProps> = ({ affiti }) => {
  const coluns = new Set<string>();
  const dispatch = useDispatch();
  const errorMSG = useSelector(getErrorAffito)
  const [errorTable, setError] = useState<string | undefined>(undefined);
  const filter = useSelector(getFilter) as FilterAffito;

  const changePaginationSize = (newPageSize: number) => {
    dispatch(setFilterAffito({ ...filter, paginationSize: newPageSize }));
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
      renderCell: (params) => <ChoiceState stateMaloi={params.row.stateMaloi} id={params.row.id} />
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
        <Alert severity='error' onClose={() => { dispatch(clearAffitoError()) }} >
          <AlertTitle>Error</AlertTitle>
          {errorMSG}
        </Alert>
        : ''}
      {errorTable ?
        <Alert severity='error' onClose={() => { setError(undefined) }} >
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
                pageSize: filter.paginationSize || 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          onPaginationModelChange={model => changePaginationSize(model.pageSize)}
        />
      </Box>
    </>
  );
};

export default FeaturesTablePage; 