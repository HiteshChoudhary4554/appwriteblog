import React from 'react'
 
function Container({children}) {
  return (
    <div className='h-full border-0 border-green-400 w-[92%] m-auto'>{children}</div>
  )
}

export default Container