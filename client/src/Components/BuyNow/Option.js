import React from 'react'

const Option = () => {
  return (
    <div className='add-remove-select'>
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <p style={{cursor:"pointer"}}>Delete</p><span>|</span>
        <p className='for-remove-media'>Save or Later</p><span>|</span>
        <p className='for-remove-media'>See more like this </p>
    </div>
  )
}

export default Option