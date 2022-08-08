import React from "react";
import Row from "./Row";
import {useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux';

import { changeScroll,rewrite } from './puzzleGameSlice.js';

export default function Glass(props){
  const topRow = props.topRow;
  const rows = props.rows;
  const ref = useRef()
  const dispatch = useDispatch()
  
  function handleButtonClick(){
      dispatch(rewrite())
    }
   useEffect(() => {
        const onScroll = () => { 
            const payload = {scrollTop:ref.current.scrollTop,scrolltHeight:ref.current.scrollHeight};
            dispatch(changeScroll(payload))
          }
        ref.current.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, );


  const rowsComps = rows.map((row, index) => (
    <Row key = {row.id} id = {row.id} cells = {row.cells} />
  ));
  
  return <div ref={ref} className="overflow-y-scroll overflow-x-hidden flex flex-col w-fit h-screen max-h-screen">
              <div className="sticky top-0 bg-white z-50">
                  <button   onClick={handleButtonClick}  className = 
                        {'hover:underline text-blue-900 box-border font-bold py-2 px-4 rounded'} type="button">rewrite
                  </button>
                  <div className='border-t-2 border-b-2 rounded w-fit'> 
                    <Row id = {topRow.id} cells = {topRow.cells} />
                  </div>
              </div>
            <div className="flex-col border-black">
               {rowsComps} 
          </div>
          </div>
    
}
