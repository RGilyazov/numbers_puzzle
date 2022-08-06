import React from "react";
import Row from "./Row";
import {useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux';

import { changeScroll } from './puzzleGameSlice.js';

export default function Glass(props){
 
  const rows = props.rows;
  const ref = useRef()
  const dispatch = useDispatch()

   useEffect(() => {
       
        
        const onScroll = () => { 
          const payload = {scrollTop:ref.current.scrollTop,scrolltHeight:ref.current.scrollHeight};
          dispatch(changeScroll(payload))
        }
        // clean up code
        window.removeEventListener('scroll', onScroll);
        ref.current.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, );


  const rowsComps = rows.map((row, index) => (
    <Row key = {row.id} id = {row.id} cells = {row.cells} />
  ));
  return <div ref={ref} className="overflow-y-scroll max-h-[90vh] flex w-fit"><div className="flex-col border-2 border-black"> {rowsComps} </div></div>
 
}
