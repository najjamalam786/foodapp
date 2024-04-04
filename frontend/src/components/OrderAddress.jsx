import React, { useState } from 'react'

export default function OrderAddress({address, index, setIndex, checkBox, setCheckBox}) {

  
  const handleCheckBox = (e) => {

    if(e.target.id === `${index}`){

      setCheckBox({
        ...checkBox,
        type: e.target.id
      })

      setIndex(index);
    }else{
      setIndex(undefined);
    }
  }
  
 
  return (
    <div className='w-full border rounded-lg px-6 py-6 '>
        <div className="flex flex-col  overflow-hidden">

<p className="text-base text-gray-400">Landmark: <span className='text-slate-600'>{address.landmark}</span></p>
<p className="text-base text-gray-400">Address: <span className='text-slate-600'>{address.address}</span></p>
<p className="text-base  text-gray-400">District: <span className='text-slate-600'>{address.district}</span></p>
<p className="text-base text-gray-400">pincode: <span className='text-slate-600'>{address.pincode}</span></p>
<p className="text-base text-gray-400">Phone number: <span className='text-slate-600'>{address.newMobile}</span></p>


</div>
<div className="flex flex-col items-end gap-2 ">
            <input type='checkbox' id={`${index}`}   checked={checkBox.type === `${index}`} onChange={handleCheckBox} name='defaultAddress' className=" w-4 h-4"/>
              


          </div>
    </div>
  )
}
