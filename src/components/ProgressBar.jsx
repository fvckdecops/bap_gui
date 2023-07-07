import { Box, LinearProgress, Typography } from "@mui/material";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProgressBar({data}) {
    return (
        <>
            {
                (!data) ?
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}><Skeleton count={5} width={250} height={20} /></Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}><Skeleton count={5} width={250} height={20} /></Box>
                    </>
                    :
                    <>
                        {
                            data.map((val, ind) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }} key={ind}>
                                    <Box sx={{ width: '70%', mr: 1 }} className="progress-width">
                                        <LinearProgress variant="determinate" {...val} />
                                    </Box>
                                    <Box sx={{ width: '35%' }} className="progress-width">
                                        <Typography variant="body2" color="text.secondary">{val.name}</Typography>
                                    </Box>
                                </Box>
                            ))
                        }
                    </>
            }
        </>
    );
}