"use client"
import React, { useState } from 'react';
import { IconButton, TextField, Tooltip, Stack } from '@mui/material';
import { EditNote, Save } from '@mui/icons-material';
import { updateAffitoDescription } from '@/redux/services/affito/affitoTrunk';
import { useDispatch } from '@/redux/store';
import { useAuth } from '../menu/AuthContext';
import styled from '@emotion/styled'

interface DescriptionEditorProps {
  id: number;
  description?: string;
}

const PreDescription = styled.div`
overflow-wrap: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100px;
    `

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    background: #fff2aa;
    padding: 5px;
    position: relative;
    top: 10px;
    left: 10px;
    border-radius: 5px;
`   

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({ id, description }) => {
  const [openDescription, setOpenDescription] = useState(false);
  const [value, setValue] = useState(description || '');
  const dispatch = useDispatch();
  const { getAuthToken } = useAuth();

  const handleSave = async () => {
    const token = await getAuthToken();
    if (!token) return;
    dispatch(updateAffitoDescription({ realEstateId: id, description: value, token }));
    setOpenDescription(false);
  };



  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title={openDescription ? 'Hide description' : 'Edit description'}>
        <IconButton size="small" onClick={() => setOpenDescription(prev => !prev)} color={openDescription ? 'primary' : 'default'}>
          <EditNote />
        </IconButton>
      </Tooltip>
      {(!openDescription && value && (value.length > 0)) ? <PreDescription >{value}</PreDescription> : ""}
      {openDescription && (
        <DescriptionBox>
          <TextField
            size="small"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Description..."
            multiline
            maxRows={3}
            sx={{ minWidth: 220 }}
          />
          <Tooltip title="Save description">
            <IconButton size="small" color="primary" onClick={handleSave}>
              <Save />
            </IconButton>
          </Tooltip>
        </DescriptionBox>
      )}
    </Stack>
  );
};

export default DescriptionEditor;
