import { updateAffitoState, useDispatch } from "@/redux";
import { CheckCircleSharp, HourglassEmptySharp, CancelSharp } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useAuth } from "../menu/AuthContext";


type AffitoState = 1 | 2 | 0 | undefined;

const ChoiceState: ({ stateMaloi, id , closePopup }: { stateMaloi: number, id: number , closePopup?: () => void}) => JSX.Element = ({stateMaloi, id,closePopup}) => {
    
      const dispatch = useDispatch();
    const { getAuthToken,user } = useAuth();

    const handleStateChange = async (newState: AffitoState, realEstateId: number) => {
        try {
            getAuthToken().then(token => {
                if (!token) {
                    throw new Error("Token empty")
                    return
                }
                if (newState !== undefined) {
                    dispatch(updateAffitoState({ realEstateId, newState, token }));
                    if(closePopup){
                        // closePopup()
                    }
                } else {
                    throw new Error("No state specified")
                }
            })
        } catch (err) {
            // Optionally handle error
            throw new Error('Failed to update state:' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    if (!user) {
        return <div>Log in</div>;
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Approve">
                <IconButton
                    color={stateMaloi === 1 ? 'success' : 'default'}
                    onClick={() => handleStateChange(1, id)}
                    aria-label="Approve"
                >
                    <CheckCircleSharp />
                </IconButton>
            </Tooltip>
            <Tooltip title="Wait">
                <IconButton
                    color={stateMaloi === 2 ? 'warning' : 'default'}
                    onClick={() => handleStateChange(2, id)}
                    aria-label="Wait"
                >
                    <HourglassEmptySharp />
                </IconButton>
            </Tooltip>
            <Tooltip title="Deny">
                <IconButton
                    color={stateMaloi === 0 ? 'error' : 'default'}
                    onClick={() => handleStateChange(0, id)}
                    aria-label="Deny"
                >
                    <CancelSharp />
                </IconButton>
            </Tooltip>
        </Stack>
    );
};

export default ChoiceState;

// Usage example:
// <ChoiceState stateMaloi={affito.stateMaloi} id={affito._id} />