"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Typed from "typed.js";

import 'swiper/css';
import { useCallback, useEffect, useRef } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { fadeInDown, fadeInUp } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const swiperStyle = {
    backgroundImage: 'url("/images/header.jpg")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const overlayText = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
    color: '#fff'
};

const typedConfig = {
    strings: ["I'm a Frontend Developer", "I'm a Backend Developer"],
    loop: true,
    fadeOut: true,
    showCursor: false,
    startDelay: 1000,
    backDelay: 2000
};

const styles = StyleSheet.create({
    fadeInDown: {
        animationName: fadeInDown,
        animationDuration: '1s'
    },
    fadeInUp: {
        animationName: fadeInUp,
        animationDuration: '1s'
    }
});

export default function CarouselElement() {
    const el = useRef();

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        //
    }, []);


    useEffect(() => {
        new Typed(el.current, typedConfig);
    }, []);

    return (
        <>
            <div className={css(styles.fadeInDown)}>
                <Swiper
                    spaceBetween={0}
                    className='mySwiper'
                    id="home"
                >
                    <SwiperSlide style={swiperStyle}>
                        <div style={overlayText}>
                            <h4 sx={{my: 2}}>Hello, my name is <b>Bagas Adji Pratama</b></h4>
                            <h2 className="header-slider" ref={el}></h2>
                        </div>
                        <Particles
                            id="tsparticles"
                            init={particlesInit}
                            loaded={particlesLoaded}
                            options={{
                                background: 'transparent',
                                fpsLimit: 120,
                                interactivity: {
                                    events: {
                                        onClick: {
                                            enable: true,
                                            mode: "push",
                                        },
                                        onHover: {
                                            enable: true,
                                            mode: "repulse",
                                        },
                                        resize: true,
                                    },
                                    modes: {
                                        push: {
                                            quantity: 4,
                                        },
                                        repulse: {
                                            distance: 200,
                                            duration: 0.4,
                                        },
                                    },
                                },
                                particles: {
                                    number: {
                                        value: 100,
                                        density: {
                                            enable: true,
                                            value_area: 800
                                        }
                                    },
                                    color: {
                                        value: '#fff'
                                    },
                                    shape: {
                                        type: 'circle',
                                        stroke: {
                                            width: 0,
                                            color: '#ff0000'
                                        },
                                        polygon: {
                                            nb_sides: 10
                                        },
                                        image: {
                                            src: '',
                                            width: 100,
                                            height: 100
                                        }
                                    },
                                    opacity: {
                                        value: 1,
                                        random: false,
                                        anim: {
                                            enable: false,
                                            speed: 2,
                                            opacity_min: 0,
                                            sync: false
                                        }
                                    },
                                    size: {
                                        value: 3,
                                        random: false,
                                        anim: {
                                            enable: false,
                                            speed: 20,
                                            size_min: 0,
                                            sync: false
                                        }
                                    },
                                    line_linked: {
                                        enable: true,
                                        distance: 100,
                                        color: '#fff',
                                        opacity: 1,
                                        width: 3
                                    },
                                    move: {
                                        enable: true,
                                        speed: 2,
                                        direction: 'none',
                                        random: false,
                                        straight: false,
                                        out_mode: 'out',
                                        bounce: false,
                                        attract: {
                                            enable: false,
                                            rotateX: 3000,
                                            rotateY: 3000
                                        }
                                    },
                                    array: []
                                },
                                detectRetina: true,
                            }}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={'header-separator '+ css(styles.fadeInUp)}></div>
        </>
    );
}