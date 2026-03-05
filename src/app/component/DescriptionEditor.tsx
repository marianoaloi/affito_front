"use client"
import React, { useState } from 'react';
import { IconButton, TextField, Tooltip, Stack } from '@mui/material';
import { EditNote, Save } from '@mui/icons-material';
import { updateAffitoDescription } from '@/redux/services/affito/affitoTrunk';
import { useDispatch } from '@/redux/store';
import { useAuth } from '../menu/AuthContext';

interface DescriptionEditorProps {
  id: number;
  description?: string;
}

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({ id, description }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(description || '');
  const dispatch = useDispatch();
  const { getAuthToken } = useAuth();

  const handleSave = async () => {
    const token = await getAuthToken();
    if (!token) return;
    dispatch(updateAffitoDescription({ realEstateId: id, description: value, token }));
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title={open ? 'Hide description' : 'Edit description'}>
        <IconButton size="small" onClick={() => setOpen(prev => !prev)} color={open ? 'primary' : 'default'}>
          <EditNote />
        </IconButton>
      </Tooltip>
      {open && (
        <>
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
        </>
      )}
    </Stack>
  );
};

export default DescriptionEditor;
