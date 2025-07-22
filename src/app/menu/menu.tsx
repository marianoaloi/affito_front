import { Menu, Box, TextField, Select, MenuItem as SelectItem, InputLabel, FormControl } from "@mui/material";
import { useSelector, useDispatch } from "@/redux";
import { setFilterAffito } from "@/redux/services/filter/filterTrunk";
import { getFilter } from "@/redux/services/filter/filterSlice";
import { FilterAffito } from "@/redux/services/filter/filterTypes";


// authService.ts (or directly in your component)
import { authFirebase, GoogleAuthProvider, signInWithPopup, signOut } from '../firebaseConfig';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result = await signInWithPopup(authFirebase, provider);
    // The signed-in user info.
    const user = result.user;
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log("Signed in user:", user);
    console.log("ID Token:", await user.getIdToken()); // Get the ID token
    return user;
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error("Error signing in with Google:", errorMessage);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(authFirebase);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

interface MenuAffitoProps {
  filterAnchorEl: HTMLElement | null;
  handleFilterClose: () => void;
}

export default function MenuAffito({ filterAnchorEl, handleFilterClose }: MenuAffitoProps) {
  const filter = useSelector(getFilter) as FilterAffito;
  const dispatch = useDispatch();

  const handleChange = (field: keyof FilterAffito, value: any) => {
    dispatch(setFilterAffito({ ...filter, [field]: value }));
  };

  return (
    <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
      <Box sx={{ p: 2, width: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>

        <TextField
          label="Price Min"
          type="number"
          value={filter.priceMin || ''}
          onChange={e => handleChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
          size="small"
        />
        <TextField
          label="Price Max"
          type="number"
          value={filter.priceMax || ''}
          onChange={e => handleChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
          size="small"
        />
        <TextField
          label="Floor"
          type="number"
          value={filter.floor || ''}
          onChange={e => handleChange('floor', e.target.value ? Number(e.target.value) : undefined)}
          size="small"
        />
        <FormControl size="small">
          <InputLabel id="elevator-label">Elevator</InputLabel>
          <Select
            labelId="elevator-label"
            value={filter.elevator === undefined ? '' : filter.elevator === 'empty' ? 'empty' : filter.elevator === 'Sì' ? 'yes' : filter.elevator === 'No' ? 'no' : ''}
            label="Elevator"
            onChange={e => {
              const val = e.target.value;
              handleChange(
                'elevator',
                val === 'empty' ? 'empty' : val === 'yes' ? 'Sì' : val === 'no' ? 'No' : undefined
              );
            }}
          >
            <SelectItem value="">Any</SelectItem>
            <SelectItem value="empty">Empty</SelectItem>
            <SelectItem value="yes">Sí</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="stateMaloi-label">State</InputLabel>
          <Select
            labelId="stateMaloi-label"
            value={filter.stateMaloi !== undefined ? String(filter.stateMaloi) : ''}
            label="State"
            onChange={e => handleChange('stateMaloi', e.target.value === '' ? undefined : parseInt(e.target.value))}
          >
            <SelectItem value="">Any</SelectItem>
            <SelectItem value="-1">Empty</SelectItem>
            <SelectItem value="1">Approved</SelectItem>
            <SelectItem value="2">Waiting</SelectItem>
            <SelectItem value="0">Denied</SelectItem>
          </Select>
        </FormControl>
      </Box>
    </Menu>
  );
}