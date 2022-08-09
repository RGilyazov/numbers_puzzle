import React from "react";
import Row from "./Row";
import {useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';

import { changeScroll,rewrite,newGame} from './puzzleGameSlice.js';

export default function Glass(props){
  const topRow = props.topRow;
  const rows = props.rows;
  const glassRef = useRef()
  const captionRef = useRef()
  const dispatch = useDispatch()
  
  useEffect(() => {
        const onScroll = () => { 
            const payload = {scrollTop:    glassRef.current.scrollTop,
                             scrolltHeight:glassRef.current.scrollHeight-captionRef.current.scrollHeight};
            dispatch(changeScroll(payload))
          }
        glassRef.current.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, );
   
  

  const rowsComps = rows.map((row, index) => (
    <Row key = {row.id} id = {row.id} cells = {row.cells} />
  ));

  const textSize = isMobile?'text-4xl':'text-lg'
  const buttonClassName = `hover:underline text-blue-900 font-bold py-2 px-4 rounded ${textSize}`

  return <div ref={glassRef} className="overflow-y-auto overflow-x-hidden flex flex-col w-fit h-screen max-h-screen">
              <div ref={captionRef} className="sticky top-0 bg-white z-50">
                  <ul className="flex flex-row">
                    <li>
                      <button   onClick={()=>dispatch(rewrite())}  className = 
                            {buttonClassName} type="button">rewrite
                      </button>
                    </li>
                    <li>
                      <button   onClick={()=>dispatch(newGame())}  className = 
                             {buttonClassName}  type="button">new game
                      </button>
                    </li>
                    <li>
                      <button    className = 
                             {buttonClassName}  type="button">rules
                      </button>
                      <button    className = 
                             {buttonClassName}  type="button">about
                      </button>
                    </li>
                  </ul>
                  <div className='border-t-2 border-b-2 rounded w-fit mb-2'> 
                    <Row id = {topRow.id} cells = {topRow.cells} />
                  </div>
              </div>
            <div className="flex-col border-black">
               {rowsComps} 
            </div>
          </div>
    
}
