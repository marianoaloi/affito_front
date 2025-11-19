import { Menu, Box, TextField, Select, MenuItem as SelectItem, InputLabel, FormControl } from "@mui/material";
import { useSelector, useDispatch } from "@/redux";
import { setFilterAffito } from "@/redux/services/filter/filterTrunk";
import { getFilter } from "@/redux/services/filter/filterSlice";
import { FilterAffito } from "@/redux/services/filter/filterTypes";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface MenuAffitoProps {
  filterAnchorEl: HTMLElement | null;
  handleFilterClose: () => void;
}

export default function MenuAffito({ filterAnchorEl, handleFilterClose }: MenuAffitoProps) {
  const filter = useSelector(getFilter) as FilterAffito;
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newFilter: FilterAffito = { priceMin: undefined, priceMax: undefined, floor: undefined, agentName: undefined, elevator: undefined, stateMaloi: undefined, province: undefined, accessoDisabili: undefined };
    let hasChanges = false;

    const priceMin = searchParams.get("priceMin");
    if (priceMin) {
      newFilter.priceMin = Number(priceMin);
      hasChanges = true;
    }

    const priceMax = searchParams.get("priceMax");
    if (priceMax) {
      newFilter.priceMax = Number(priceMax);
      hasChanges = true;
    }

    const floor = searchParams.get("floor");
    if (floor) {
      newFilter.floor = Number(floor);
      hasChanges = true;
    }

    const agentName = searchParams.get("agentName");
    if (agentName) {
      newFilter.agentName = agentName;
      hasChanges = true;
    }

    const elevator = searchParams.get("elevator");
    if (elevator) {
      // "Sì" | "No" | "empty" | undefined;
      if (elevator === "Sì" || elevator === "No" || elevator === "empty") {
        newFilter.elevator = elevator;
        hasChanges = true;
      }
    }

    const stateMaloi = searchParams.get("stateMaloi");
    if (stateMaloi) {
      // -1 | 0 | 1|2|undefined;
      const stateVal = Number(stateMaloi);
      if ([-1, 0, 1, 2].includes(stateVal)) {
        newFilter.stateMaloi = stateVal as any;
        hasChanges = true;
      }
    }

    const province = searchParams.get("province");
    if (province) {
      // "Udine" |  "Trieste" |  undefined;
      if (province === "Udine" || province === "Trieste") {
        newFilter.province = province;
        hasChanges = true;
      }
    }

    const accessoDisabili = searchParams.get("accessoDisabili");
    if (accessoDisabili) {
      newFilter.accessoDisabili = Number(accessoDisabili);
      hasChanges = true;
    }

    if (hasChanges) {
      dispatch(setFilterAffito(newFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, dispatch]);

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
        <TextField
          label="Agent name"
          type="text"
          value={filter.agentName || ''}
          onChange={e => handleChange('agentName', e.target.value || undefined)}
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
        <FormControl size="small">
          <InputLabel id="province-label">Province</InputLabel>
          <Select
            labelId="province-label"
            value={filter.province || ''}
            label="Province"
            onChange={e => handleChange('province', e.target.value || undefined)}
          >
            <SelectItem value="">Any</SelectItem>
            <SelectItem value="Udine">Udine</SelectItem>
            <SelectItem value="Trieste">Trieste</SelectItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="accessoDisabili-label">Accesso Disabili</InputLabel>
          <Select
            labelId="accessoDisabili-label"
            value={filter.accessoDisabili === undefined ? '' : filter.accessoDisabili}
            label="Accesso Disabili"
            onChange={e => {
              const val = e.target.value;
              handleChange('accessoDisabili', val);
            }}
          >
            <SelectItem value={undefined}>Any</SelectItem>
            <SelectItem value={1}>Yes</SelectItem>
            <SelectItem value={0}>No</SelectItem>
          </Select>
        </FormControl>
      </Box>
    </Menu>
  );
}