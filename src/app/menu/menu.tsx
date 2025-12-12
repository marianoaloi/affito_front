import { Menu, Box, TextField, Select, MenuItem as SelectItem, InputLabel, FormControl } from "@mui/material";
import { useSelector, useDispatch } from "@/redux";
import { setFilterAffito } from "@/redux/services/filter/filterTrunk";
import { getFilter } from "@/redux/services/filter/filterSlice";
import { FilterAffito } from "@/redux/services/filter/filterTypes";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface MenuAffitoProps {
  filterAnchorEl: HTMLElement | null;
  handleFilterClose: () => void;
}

export default function MenuAffito({ filterAnchorEl, handleFilterClose }: MenuAffitoProps) {
  const filter = useSelector(getFilter) as FilterAffito;
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Sync URL -> Redux (Initial Load & Back/Forward)
  useEffect(() => {
    const newFilter: FilterAffito = { ...filter };
    let hasChanges = false;

    const priceMin = searchParams.get("priceMin");
    if (priceMin && Number(priceMin) !== filter.priceMin) {
      newFilter.priceMin = Number(priceMin);
      hasChanges = true;
    }

    const priceMax = searchParams.get("priceMax");
    if (priceMax && Number(priceMax) !== filter.priceMax) {
      newFilter.priceMax = Number(priceMax);
      hasChanges = true;
    }

    const floor = searchParams.get("floor");
    if (floor && Number(floor) !== filter.floor) {
      newFilter.floor = Number(floor);
      hasChanges = true;
    }

    const agentName = searchParams.get("agentName");
    if (agentName && agentName !== filter.agentName) {
      newFilter.agentName = agentName;
      hasChanges = true;
    }

    const elevator = searchParams.get("elevator");
    if (elevator && elevator !== filter.elevator) {
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
      if ([-1, 0, 1, 2].includes(stateVal) && stateVal !== filter.stateMaloi) {
        newFilter.stateMaloi = stateVal as any;
        hasChanges = true;
      }
    }

    const province = searchParams.get("province");
    if (province && province !== filter.province) {
      // "Udine" |  "Trieste" |  undefined;
      if (province === "Udine" || province === "Trieste") {
        newFilter.province = province;
        hasChanges = true;
      }
    }

    const accessoDisabili = searchParams.get("accessoDisabili");
    if (accessoDisabili && Number(accessoDisabili) !== filter.accessoDisabili) {
      newFilter.accessoDisabili = Number(accessoDisabili) as 0 | 1 | -1;
      hasChanges = true;
    }

    if (hasChanges) {
      dispatch(setFilterAffito(newFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, dispatch]);

  // Sync Redux -> URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filter.priceMin) params.set("priceMin", filter.priceMin.toString());
    if (filter.priceMax) params.set("priceMax", filter.priceMax.toString());
    if (filter.floor) params.set("floor", filter.floor.toString());
    if (filter.agentName) params.set("agentName", filter.agentName);
    if (filter.elevator) params.set("elevator", filter.elevator);
    if (filter.stateMaloi !== undefined) params.set("stateMaloi", filter.stateMaloi.toString());
    if (filter.province) params.set("province", filter.province);
    if (filter.accessoDisabili !== undefined) params.set("accessoDisabili", filter.accessoDisabili.toString());

    const newSearch = params.toString();
    const currentSearch = searchParams.toString();

    if (newSearch !== currentSearch) {
      router.replace(`${pathname}?${newSearch}`);
    }
  }, [filter, pathname, router, searchParams]);

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
            <SelectItem value={-1}>Empty</SelectItem>
            <SelectItem value={1}>Yes</SelectItem>
            <SelectItem value={0}>No</SelectItem>
          </Select>
        </FormControl>
      </Box>
    </Menu>
  );
}