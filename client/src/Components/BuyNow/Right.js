import React from 'react'

const Right = () => {
  return (
    <div className='right-buy'>
        <div className='cost_right'>
            <p>Your order is eligible for FREE Delivery</p>
            <span style={{color: "#565959"}}>select this option at checkout. Details</span>

            <h3>Subtotal (1 item): <span style={{fontWeight: 700}}>₹4049.00</span></h3>
            <button className='right-buy-btn'>Process to buy</button>
        </div>
    </div>
  )
}

export default Right