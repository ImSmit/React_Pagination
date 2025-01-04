// import React from 'react'
import { Link } from 'react-router-dom'


function AuthLayout({ children, title, subtitle, alternativeAction }) {
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4 w-full">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-[#000000]">{title}</h2>
          <p className="mt-2 text-sm text-[#000000]">{subtitle}</p>
        </div>
        {children}
        <div className="text-center">
          <p className="text-sm text-[#000000]">
            {alternativeAction.text}{' '}
            <Link to={alternativeAction.href} className="font-medium text-[#000000] hover:text-[#000000]">
              {alternativeAction.linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
