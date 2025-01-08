// import React from 'react'
import BankCard from '../components/BankCard'
function Banks() {
  return (
    <div className="flex flex-col p-4 w-full">
      <BankCard bank_name="Cash" background_mode={false} money="1000000" />
    </div>
  )
}

export default Banks
