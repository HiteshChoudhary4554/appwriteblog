import React from 'react'

function container({children}) {
  return (
    <div className="w-5/6 m-auto h-full">
        {children}
    </div>
  )
}

export default container