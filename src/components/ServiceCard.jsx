import { Grid } from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { StyleSheet, css } from 'aphrodite';
import { 
    bounceInLeft,
} from 'react-animations';

const styles = StyleSheet.create({
    bounceInLeft: {
        animationName: bounceInLeft,
        animationDuration: '1s'
    },
});

export default function ServiceCard({ data }) {
    return (
        <>
            {
                data.length ?
                    data.map((val, ind) => {
                        const Icon = MuiIcon[val.iconName];

                        return (
                            <Grid item xs={12} md={3} sm={12} className={css(styles.bounceInLeft)} key={ind}>
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

    /* if(data) {
        return (
            <>
                {
                    data.map((val, ind) => (
                        <Grid item xs={12} md={3} sm={12} className={css(styles.bounceInLeft)} key={ind}>
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
                    ))
                }
            </>
        );
    } else {
        return (
            <>
                <Skeleton count={4} width={400} height={300} style={{marginRight: '10px'}} />
                <Skeleton count={1} width={400} height={300} style={{marginRight: '10px'}} />
                <Skeleton count={1} width={400} height={300} style={{marginRight: '10px'}} />
                <Skeleton count={1} width={400} height={300} />
            </>
        );
    } */
}