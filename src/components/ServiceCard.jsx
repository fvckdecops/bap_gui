import { Grid } from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
export default function ServiceCard({ data }) {
    return (
        <>
            {
                data.length ?
                    data.map((val, ind) => {
                        const Icon = MuiIcon[val.iconName];

                        return (
                            <Grid item xs={12} md={3} sm={12} className="animate__animated animate__bounceInLeft" key={ind}>
                                <div className="services-box box">
                                    <div className="icon">
                                        <Icon fontSize='large' />
                                    </div>
                                    <div className="text">
                                        <h4 className="box-title mb-20">{ val.serviceName }</h4>
                                        <p>{ val.description }</p>
                                    </div>
                                </div>
                            </Grid>
                        );
                    })
                    :
                    <>
                        <Skeleton count={1} width={400} height={300} style={{marginLeft: '8px'}} />
                        <Skeleton count={1} width={400} height={300} style={{marginLeft: '8px'}} />
                        <Skeleton count={1} width={400} height={300} style={{marginLeft: '8px'}} />
                        <Skeleton count={1} width={400} height={300} style={{marginLeft: '8px'}} />
                    </>
            }
        </>
    );
}