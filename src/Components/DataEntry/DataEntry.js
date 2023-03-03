import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Canvas from '../Canvas/Canvas';
import { useNavigate } from 'react-router-dom';
import './DataEntry.css';

const auth = getAuth(app);

const characters = [
    "A",
    "B",
    "C",
    "a",
    "b",
    "c",
    0,
    1,
    9
]

const DataEntry = () => {
    const [user, loading, error] = useAuthState(auth);
    const canvasRef = useRef(null);
    const ctx = useRef(null);

    const [charIdx, setCharIdx] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const [lastPosition, setLastPosition] = useState({
        x: 0,
        y: 0
    });
    const [fdcUsers, setFdcUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (canvasRef.current) {
            ctx.current = canvasRef?.current?.getContext('2d');
        }
    }, []);

    // useEffect(() => {
    //     fetch('http://localhost:5000/user/4')
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }, []);

    // const handleNextButton = () => {
    //     const imageURL = canvasRef.current.toDataURL('image/jpg');
    //     clear();
    //     //post data to server 
    //     fetch('https://dead-pear-chick-tutu.cyclic.app/user', {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             user: user.email,
    //             character: characters[charIdx],
    //             image: imageURL,
    //         }),
    //     })
    //         .then(res => res.json())
    //         .then(json => console.log("Izyaan :", json));

    //     setCharIdx(charIdx + 1);
    // }

    const handleNextButton = async () => {
        clear();
        //post data to server 
        fetch('https://dead-pear-chick-tutu.cyclic.app/test', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                user: user.email,
                character: characters[charIdx]
            }),
        })
            .then(res => res.json())
            .then(data => console.log("Izyaan :", data))
            .catch((error) => {
                console.log('Error: ', error);
            });

        setCharIdx(charIdx + 1);
    }

    // const handleSetCharacter = e => {
    //     setSelectedChar(e.target.value);
    // }

    const draw = useCallback((x, y) => {
        if (mouseDown) {
            ctx.current.beginPath();
            ctx.current.strokeStyle = 'black';
            ctx.current.lineWidth = 7;
            ctx.current.lineJoin = 'round';
            ctx.current.moveTo(lastPosition.x, lastPosition.y);
            ctx.current.lineTo(x, y);
            ctx.current.closePath();
            ctx.current.stroke();
            setLastPosition({
                x,
                y
            })
        }
    }, [lastPosition, mouseDown, setLastPosition])

    const onMouseDown = (e) => {
        // getBoundingClientRect() yields offset of the canvas from the viewport
        const canvasOffset = canvasRef.current.getBoundingClientRect();
        setLastPosition({
            x: e.pageX - canvasOffset.left,
            y: e.pageY - canvasOffset.top
        })
        setMouseDown(true)
    }
    const onMouseUpAndLeave = (e) => {
        setMouseDown(false)
    }

    const onMouseMove = (e) => {
        // getBoundingClientRect() yields offset of the canvas from the viewport
        const canvasOffset = canvasRef.current.getBoundingClientRect();
        draw(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
    }

    const clear = () => {
        ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height);
    }

    const download = async () => {
        const image = canvasRef.current.toDataURL('image/jpg');
        const blob = await (await fetch(image)).blob();
        const blobURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = 'image.png';
        link.click();
        // console.log(blob);
    }

    return (
        <div>
            {user ? <p>Hi <span style={{ color: "red", fontSize: 25 }}>{user?.email}</span>, you are  now logged in ! </p> : navigate('/signin')}
            <div>
                {user &&
                    <div>
                        <p>Write <span style={{ 'color': 'blue', 'fontSize': '40pt' }}>{characters[charIdx]}</span></p>
                        <canvas style={{ 'border': '1px solid #000' }} ref={canvasRef}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUpAndLeave}
                            onMouseDown={onMouseDown}
                            onMouseLeave={onMouseUpAndLeave}
                            width={512}
                            height={512}
                        >
                        </canvas>
                        <div >
                            <button onClick={clear}>Clear</button>
                            <button onClick={handleNextButton} >Next</button>
                            <button onClick={download}>Download</button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default DataEntry;