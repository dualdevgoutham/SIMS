import React from 'react'

function spinner() {
    return (
      <div className="spinner-parent">        
      <div className="spinner">
          <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_utglcazj.json"
              background="transparent"
              speed="1"
              loop
              autoplay
          ></lottie-player>
      </div>
      </div>
  )
}

export default spinner;