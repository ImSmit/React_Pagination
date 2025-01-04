import { Fragment } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'


export function ViewDialog({ isOpen, onClose, title, url }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <HeadlessDialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HeadlessDialog.Panel className="w-full max-w-7xl h-full transform overflow-hidden rounded-2xl bg-[#ffffff] p-6 text-left align-middle shadow-xl transition-all">
              <HeadlessDialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-[#000000]"
              >
                {title}
              </HeadlessDialog.Title>
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-1 rounded-full text-[#000000] hover:bg-[#000000] hover:text-[#ffffff] transition-colors"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
              <div className="mt-2 w-full h-full">
                <iframe src={url} className="w-full h-full" />
              </div>
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}

