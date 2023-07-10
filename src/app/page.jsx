"use client";

import Image from 'next/image';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Notify } from 'notiflix';
import ProgressBar from '@/components/ProgressBar';
import { ContactMail, Phone } from '@mui/icons-material';
import GalleryCard from '@/components/GalleryCard';
import { Parallax } from 'react-parallax';
import { useEffect, useReducer } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ServiceCard from '@/components/ServiceCard';

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: "repeat(2, 1fr)",
    flex: {xs: "100%", sm: "calc(50% - 20px)", md: "calc(33% - 20px)"}
};

const containerStyle2 = {
    display: 'grid',
    mt: 2,
    gridTemplateColumns: "repeat(2, 1fr)"
};

const centered = {
    display: 'flex',
    justifyContent: 'center',
    mb: 4
};

const phoneNumberFormatter = (value) => {
    return '+'+ value.substring(0, 2) + ' '+ value.substring(2, 5) +' '+ value.substring(5, 9) + '-'+ value.substring(9, 13);
};

const imageWrapper = {
    display: 'flex',
    justifyContent: 'center'
};

const imageStyle = {
    objectFit: 'cover',
    objectPosition: 'right'
};

const btnMessageStyle = {
    mt: 2,
    float: 'right',
    color: '#fff',
    borderColor: '#fff',
};

const initialState = {
    bio: {},
    services: [],
    portfolios: [],
    offset: 0,
    limit: 4
};

const reducer = (state, action) => {
    switch(action.type) {
    case "getBioData":
        return {...state, bio: action.payload};
    case "getServiceList":
        return {...state, services: action.payload};
    case "getPortfolioList":
        return {...state, portfolios: action.payload};
    default:
        throw new Error("Type action not found");
    };
};

export default function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getBioData = async () => {
        let response = await fetch('/api/bio?act=detail');
        response = await response.json();
        
        const {code, content} = response;
        if(code === 0) return content;
    };

    const getServiceList = async () => {
        let response = await fetch('/api/service?act=list&offset='+ state.offset +'&limit='+ state.limit);
        response = await response.json();
        
        const {code, content} = response;
        if(code === 0 && content.count) return content.results;
    };

    const getPortfolioList = async () => {
        let response = await fetch('/api/portfolio?act=list&offset='+ state.offset +'&limit='+ (state.limit + 8));
        response = await response.json();
        
        const {code, content} = response;
        if(code === 0 && content.count) return content.results;
    };

    useEffect(() => {
        getBioData().then((data) => dispatch({type: "getBioData", payload: data}));
        getServiceList().then((data) => dispatch({type: "getServiceList", payload: data}));
        getPortfolioList().then((data) => dispatch({type: "getPortfolioList", payload: data}));
    }, []);

    const sendMail = async (e) => {
        e.preventDefault();

        const forms = document.querySelectorAll('input');
        const description = document.querySelector('textarea');
        let params = {};

        forms.forEach((val, ind) => params[val.id] = val.value);
        params = {...params, description: description.value};

        let response = await fetch('/api/mail', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        response = await response.json();
        
        const {code, message} = response;
        return (code === 0) ? Notify.success(message) : Notify.failure(message);
    };

    return (
        <>
            <section name="About">
                <Box sx={centered} className="animate__animated animate__fadeInDown">
                    <h2 className='section-header'>About Me</h2>
                </Box>
                <Grid container spacing={3}>
                    <Grid item sx={imageWrapper} xs={12} md={6} sm={12} className="animate__animated animate__fadeInLeft message-mask">
                        {
                            state.bio.photo ?
                                <>
                                    <Image 
                                        src={'http://'+ process.env.NEXT_PUBLIC_CDN_HOST +"/public/images/profile/"+ state.bio.photo}
                                        fill
                                        alt="Bagas Adji Pratama"  
                                        style={imageStyle} />
                                </>
                                :
                                <Skeleton count={1} width={600} height={600} />
                        }
                    </Grid>
                    <Grid item xs={12} md={6} sm={12} className="animate__animated animate__fadeInLeft">
                        <p>{state.bio.description ? state.bio.description : <Skeleton count={1} width={600} height={100} />}</p>
                        <h5 style={{margin: '20px 0'}}>My Skills:</h5>
                        <Box sx={containerStyle2}>
                            <ProgressBar data={state.bio.skills} />
                        </Box>
                    </Grid>
                </Grid>
            </section>
            <section name="Services" className='gray-bg services' style={{width: '100%'}}>
                <Box sx={centered} className="animate__animated animate__fadeInDown">
                    <h2 className='section-header'>What I Do</h2>
                </Box>
                <Grid container 
                    spacing={2}
                >
                    <ServiceCard data={state.services} />
                </Grid>
            </section>
            <section name="Portfolio" className='portfolio' style={{width: '100%'}}>
                <Box sx={centered} className="animate__animated animate__fadeInDown">
                    <h2 className='section-header'>My Portfolio</h2>
                </Box>
                <div className="animate__animated animate__slideInDown">
                    <GalleryCard data={state.portfolios} />
                </div>
            </section>
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage='/images/contact.jpg'
                bgImageAlt="Contact"
                strength={-200}
                style={{width: '100%'}}
            >
                <section name="Contact" className='contact'>
                    <Box sx={centered} className="animate__animated animate__fadeInDown">
                        <h2 className='section-header-white'>Contact Me</h2>
                    </Box>

                    <Box sx={centered}>
                        <Box className='part-info' sx={containerStyle}>
                            <Box sx={{textAlign: 'center'}}>
                                <Phone fontSize='large' htmlColor='#fff'/>
                                <h4 style={{margin: '5px 0'}}>Phone Number:</h4>
                                <p style={{marginTop: '10px'}}>{ state.bio.phoneNumber ? phoneNumberFormatter(state.bio.phoneNumber) : <Skeleton count={1} width={200} height={10} /> }</p>
                            </Box>
                            <Box sx={{textAlign: 'center'}}>
                                <ContactMail fontSize='large' htmlColor='#fff'/>
                                <h4 style={{margin: '5px 0'}}>Email:</h4>
                                <p style={{marginTop: '10px', wordBreak: 'break-all'}}>{ state.bio.email ? state.bio.email : <Skeleton count={1} width={200} height={10} /> }</p>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={centered}>
                        <Box className='part-info'>
                            <form id="formContact" style={{width: '100%'}} onSubmit={sendMail}>
                                <Box sx={{...containerStyle, gap: 3}}>
                                    <TextField id="name" label="Name" variant="filled" className='outline-input' />
                                    <TextField id="email" label="Email" variant="filled" className='outline-input' />
                                </Box>
                                <TextField fullWidth sx={{my: 2}} id="subject" label="Subject" variant="filled" className='outline-input' />
                                <TextField
                                    id="filled-textarea"
                                    label="Enter your message ..."
                                    placeholder="Enter your message ..."
                                    multiline
                                    fullWidth
                                    className='outline-input'
                                    variant="filled"
                                    rows={4}
                                />
                                <Button type="submit" variant="outlined" sx={btnMessageStyle}>Send Message</Button>
                            </form>
                        </Box>
                    </Box>
                </section>
            </Parallax>
        </>
    );
}
