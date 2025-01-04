// import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ 
  children, 
  variant = 'default', 
  ...props 
}) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none  focus:ring-2 focus:ring-offset-2 ${
      variant === 'outline'
        ? 'border border-[#000000] text-[#ffffff] bg-[#000000] hover:bg-[#ffffff] hover:text-[#000000]'
        : 'text-white bg-indigo-600 hover:bg-indigo-700'
    }`}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outline'])
} 