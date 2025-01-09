import {useState} from 'react'
import Actions from '../components/bank_components/Actions'
import BankCard from '../components/bank_components/BankCard'
import PlusCard from '../components/PlusCard'
import InsertDialog from '../components/bank_components/InsertDialog'
function Banks() {
  let background_mode = false;
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  }
  const banks = [
    { bank_name: "Cash", money: "1000000" },
    { bank_name: "Bank 1", money: "2000000" },
    { bank_name: "Bank 2", money: "3000000" },
    { bank_name: "Bank 2", money: "3000000" },
    { bank_name: "Bank 2", money: "3000000" },
    { bank_name: "Bank 2", money: "3000000" },
  ]
  return (
    <div className="flex flex-col p-4 w-full h-full overflow-y-auto">
      <Actions onClick={() => setIsOpen(true)}/>
      <div className="flex flex-row items-center gap-4 pt-4 flex-wrap">
        {banks.map((bank, index) => (
          <BankCard key={index} bank_name={bank.bank_name} background_mode={false} money={bank.money} />
        ))}
        <PlusCard setIsOpen={setIsOpen} background_mode={false} />
      </div>
      <InsertDialog isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default Banks
