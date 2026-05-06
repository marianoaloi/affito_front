"use client"
import React, { useState } from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import AffitoErrorSnackbar from '../component/AffitoErrorSnackbar';


import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FilterAffito, getFilter, setFilterAffito, useDispatch, useSelector } from '@/redux';
import { AffitiPageProps } from '../entity/AffitiPageProps';
import ChoiceState from '../component/ChoiceState';
import DescriptionEditor from '../component/DescriptionEditor';
import { AffitoEntity, MainFeature } from '../entity/AffitoEntity';
import { timeAgo } from '../util/timeAgo';

const FeaturesTablePage: React.FC<AffitiPageProps> = ({ affiti }) => {
  const coluns = new Set<string>();
  const dispatch = useDispatch();
  const [errorTable, setError] = useState<string | undefined>(undefined);
  const filter = useSelector(getFilter) as FilterAffito;

  const changePaginationSize = (newPageSize: number) => {
    dispatch(setFilterAffito({ ...filter, paginationSize: newPageSize }));
  };


  affiti
    .map((affito: AffitoEntity) => affito.realEstate.properties?.mainFeatures?.map((feature: MainFeature) => feature.type))
    .forEach((features: string[] | undefined) => features?.map((feature: string) => coluns.add(feature))
      )

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
    {
      field: 'description', headerName: 'Description', width: 60, filterable: false,
      renderCell: (params) => <DescriptionEditor id={params.row.id} description={params.row.description} />
    },
    { field: 'create', headerName: 'Create', width: 80 },
    { field: 'imobiliare', headerName: 'Imobiliare', width: 90 },
    { field: 'last', headerName: 'Last', width: 70 },
  ]

  coluns.forEach((colun: string) => {
    columns.push({ field: colun, headerName: colun, width: 100 })
  })


  const rows = affiti.map((affito: AffitoEntity) => {
    const objAffito: any = {
      id: affito._id,
      title: affito.realEstate.title,
      price: affito.realEstate.price.value,
      stateMaloi: affito.stateMaloi,
      description: affito.description,
      create: timeAgo(affito.create),
      imobiliare: timeAgo(affito.imobiliare),
      last: timeAgo(affito.last),
    }
    coluns.forEach((colun: string) => {
      if(affito.realEstate.properties == undefined){
        objAffito[colun] = '@&@'
        return
      }
      const feature = affito.realEstate.properties.mainFeatures
        ?.find((feature: MainFeature) => feature.type === colun);

      objAffito[colun] = feature?.compactLabel || feature?.label || ''
    })
    return objAffito
  })

  affiti
    .forEach((affito: AffitoEntity) => {
      affito.realEstate.properties?.mainFeatures
        ?.forEach((feature: MainFeature) => {
          coluns.add(feature.type)
        })
    }
    )

  return (
    <>
      <AffitoErrorSnackbar />
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