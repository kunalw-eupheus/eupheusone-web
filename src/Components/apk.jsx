import React, { memo } from 'react'
import BasicButton from '../Components/Material/Button'
import apk from "./app-release (1).apk"

const Apk = memo(() => {
  return (
   <>
   <div className='flix'>
   <a href={apk} download='latest_apk_download' target='_download'>
                    <BasicButton text={'download latest apk'} />
                  </a>
                  </div>
   </>
  )
})

export default Apk