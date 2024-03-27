import React, { useState } from 'react'

export default function OrderAddress({address, index, setIndex}) {

  const [checkBox, setCheckBox] = useState(true);

  
  const handleCheckBox = () => {
    
    if(checkBox == true){

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
<p className="text-base  text-gray-400">district: <span className='text-slate-600'>{address.district}</span></p>
<p className="text-base text-gray-400">pincode: <span className='text-slate-600'>{address.pincode}</span></p>


</div>
<div className="flex flex-col items-end gap-2 ">
            <input type='checkbox'onClick={()=> {
              setCheckBox(!checkBox);
              handleCheckBox();
              }}  name='defaultAddress' className=" w-4 h-4"/>
              


          </div>
    </div>
  )
}
