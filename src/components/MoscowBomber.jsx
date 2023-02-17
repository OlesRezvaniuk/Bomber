import { useEffect, useState } from 'react';



export const MoscowBomber = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const [launch, setLaunch] = useState(false)
    const [boom, setBoom] = useState(false)
    const [crash, setCrash] = useState({ one: false, two: false, three: false, four: false, five: false, six: false })
    const [win, setWin] = useState(false)

    const getCoords = (e) => {
        let target = e.currentTarget.getBoundingClientRect()
        if (!launch && e.clientX < 346 && e.clientY < 320) {
            setCoords({ x: 0, y: e.clientX - target.left })
        }
    }

    const getLaunch = () => {
        if (win) {
            return;
        }
        setLaunch(true)
        setTimeout(() => {
            setBoom(true)
        }, 750);
        setTimeout(() => {
            if (coords.y <= 50) {
                setCrash({ ...crash, one: true })
            }
            if (coords.y <= 100 && coords.y >= 50) {
                setCrash({ ...crash, two: true })
            }
            if (coords.y <= 158 && coords.y >= 108) {
                setCrash({ ...crash, three: true })
            }
            if (coords.y <= 207 && coords.y >= 158) {
                setCrash({ ...crash, four: true })
            }
            if (coords.y <= 260 && coords.y >= 207) {
                setCrash({ ...crash, five: true })
            }
            if (coords.y <= 300 && coords.y >= 260) {
                setCrash({ ...crash, six: true })
            }
        }, 2500);
        setTimeout(() => {
            setLaunch(false)
            setBoom(false)
        }, 3000);

        // console.log('<50')
        // console.log(crash)
    }

    useEffect(() => {
        if (crash.one && crash.two && crash.three && crash.four && crash.five && crash.six) {
            setWin(true)
            console.log('Слава Україні')
        }
    }, [crash])

    useEffect(() => {
        setCrash({ one: false, two: false, three: false, four: false, five: false, six: false });
    }, [win])

    return (
        <>
            <div onMouseMove={getCoords} onClick={getLaunch}
                style={{
                    height: 300,
                    width: 300,
                    backgroundColor: '#fff',
                    margin: "60px",
                    transition: '250ms',
                    cursor: `${win ? 'pointer' : 'none'}`,
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                {!win && <img src="https://openclipart.org/image/800px/290920" alt="rocket"
                    style={{
                        height: 40,
                        transform: `translate(${coords.y}px, 0px) rotate(180deg)`,
                        opacity: `${launch ? 0 : 1}`,
                        zIndex: 100,
                    }} />}
                {!win && <img src="https://openclipart.org/image/800px/290920" alt="rocket"
                    style={{
                        height: 40,
                        transition: `${launch ? '1000ms' : '0ms'}`,
                        transform: `translate(${coords.y}px, ${launch ? '240px' : '0px'}) rotate(180deg) translateX(100%)`,
                        position: 'absolute',
                        opacity: `${boom ? 0 : 1}`,
                        zIndex: 100,
                    }} />}
                <img src='https://img2.reactor.cc/pics/post/Starcraft-Blizzard-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-Starcraft-remastered-3832493.gif' alt="boom"
                    style={{
                        height: 250,
                        position: 'absolute',
                        bottom: -75,
                        left: coords.y,
                        transform: 'translateX(-45%) ',
                        display: `${boom ? 'flex' : 'none'}`,
                        zIndex: 101,
                    }}
                ></img>
                <img src="https://st2.depositphotos.com/4327059/7728/v/450/depositphotos_77281060-stock-illustration-moscow-and-saint-petersburg-skyline.jpg"
                    alt='swamp'
                    style={{ width: 312, position: 'absolute', bottom: -155, left: -6 }}>
                </img>
                <div style={{ display: 'flex', position: 'absolute', bottom: 0 }}>
                    <div style={{ backgroundColor: 'white', height: 65, width: 45, opacity: `${crash.one ? '1' : '0'}` }}></div>
                    <div style={{ backgroundColor: 'white', height: 65, width: 63, opacity: `${crash.two ? '1' : '0'}` }}></div>
                    <div style={{ backgroundColor: 'white', height: 65, width: 50, opacity: `${crash.three ? '1' : '0'}` }}></div>
                    <div style={{ backgroundColor: 'white', height: 65, width: 49, opacity: `${crash.four ? '1' : '0'}` }}></div>
                    <div style={{ backgroundColor: 'white', height: 65, width: 53, opacity: `${crash.five ? '1' : '0'}` }}></div>
                    <div style={{ backgroundColor: 'white', height: 65, width: 47, opacity: `${crash.six ? '1' : '0'}` }}></div>
                </div>
                {win &&
                    <>
                        <img onClick={() => {
                            setWin(false);
                            setCrash({ one: false, two: false, three: false, four: false, five: false, six: false });
                        }}
                            style={{
                                height: 30,
                                position: 'absolute',
                                left: '50%',
                                top: 50,
                                zIndex: 110,
                                transform: 'translateX(-50%)',
                                border: '1px solid tomato',
                                borderRadius: '50%',
                            }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ic_refresh_36px.svg/1200px-Ic_refresh_36px.svg.png" alt='reload' />
                        <img style={{
                            position: 'absolute',
                            width: 300,
                            left: 0,
                            height: 300,
                            padding: 30,
                            backgroundColor: 'white',
                        }} src='https://naklei-ka.com.ua/wa-data/public/shop/products/39/16/1639/images/5273/5273.970.jpg' alt='Slava Ukraine' /> </>}
            </div>
            <div style={{ display: 'flex' }}>
                <p >x:{coords.x}</p>
                <p >y:{coords.y}</p>
            </div>
        </>
    );
};

