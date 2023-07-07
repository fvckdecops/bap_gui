import { Grid } from "@mui/material";
import Isotope from "isotope-layout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function GalleryIsotope({ data }) {
    const isotope = useRef();
    const [filter, setFilter] = useState("*");

    let menus = [{"type": "*", "isChecked": true}];
    data.map((val) => menus.push({"type": val.type, "isChecked": false}));
    menus = Array.from(new Set(menus.map(a => a.type)))
        .map(type => {
            return menus.find(a => a.type === type);
        });

    useEffect(() => {
        if(data.length) {
            isotope.current = new Isotope('.gallery', {
                itemSelector: '.item-img',
                layoutMode: 'fitRows',
                fitRows: {
                    gutter: 10
                }
            });
    
            return () => isotope.current.destroy();
        }
    }, [data]);

    useEffect(() => {
        if(data.length) {
            filter === '*'
                ? isotope.current.arrange({filter: `*`})
                : isotope.current.arrange({filter: `.${filter}`});
        }
    }, [data, filter]);

    const handleFilterKeyChange = (e, key) => {
        let btn = document.querySelectorAll(".filtering button");
        btn.forEach(el => el.classList.remove('active'));

        e.target.classList.add('active');

        setFilter(key);
    };

    return (
        <>
            {
                data.length ?
                    <>
                        <div className="filtering" style={{textAlign: 'center'}} id="filterList">
                            {
                                menus.map((val, ind) => (
                                    <button type="button" onClick={(e) => handleFilterKeyChange(e, val.type)} className={val.isChecked ? "active" : ""} key={ind}>{val.type === "*" ? "All" : val.type}</button>
                                ))
                            }
                        </div>
                        <Grid container className="gallery" spacing={3} sx={{mt: 3}}>
                            {
                                data.map((val, ind) => {
                                    let url = 'http://'+ process.env.NEXT_PUBLIC_CDN_HOST +"/public/images/portfolio/"+ val.source;
                                    
                                    return (
                                        <Grid item xs={12} md={3} sm={12} className={"item-img "+ val.type} key={ind}>
                                            <Link href={val.url} target="_blank"></Link>
                                            <div className="part-img">
                                                <Image src={ url } alt={val.name} className="img-fluid" width={255} height={255} style={{width: '255px', 'height': '255px'}} />
                                                <div className="overlay-img">
                                                    <h4 className="capitalize">{val.type}</h4>
                                                    <h6>{val.name}</h6>
                                                </div>
                                            </div>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </>
                    :
                    <>
                        <div className="filtering" style={{textAlign: 'center'}} id="filterList">
                            <Skeleton count={1} width={400} height={30} style={{marginLeft: '8px'}} />
                        </div>
                        <Grid container className="gallery" spacing={3} sx={{mt: 3}}>
                            <Grid item xs={12} md={3} sm={12}>
                                <Skeleton count={1} width={400} height={300} style={{marginLeft: '8px'}} />
                            </Grid>
                            <Grid item xs={12} md={3} sm={12}>
                                <Skeleton count={1} width={400} height={300} style={{marginLeft: '8px'}} />
                            </Grid>
                            <Grid item xs={12} md={3} sm={12}>
                                <Skeleton count={1} width={400} height={300} style={{marginLeft: '8px'}} />
                            </Grid>
                            <Grid item xs={12} md={3} sm={12}>
                                <Skeleton count={1} width={400} height={300} style={{marginLeft: '8px'}} />
                            </Grid>
                        </Grid>
                    </>
            }
        </>
    );
}