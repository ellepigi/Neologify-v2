import React, { useState } from 'react'


export const Modal = ({ open, title, text}) => {

const [isOpen, setIsOpen] = useState(open);


 return (
   <>
      {isOpen && (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
         <div className="bg-white p-4 rounded-lg shadow-lg">
           <h2 className="text-2xl font-bold mb-4">{title}</h2>
           <p className="text-lg">{text}</p>
           <button onClick={() => setIsOpen(!isOpen)} className="text-blue-500 mt-4 cursor-pointer">Chiudi</button>
         </div>
/      </div>
     )}
    </>
 );
  
 }
