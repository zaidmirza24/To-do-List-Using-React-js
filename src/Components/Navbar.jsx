import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-purple-900 p-3'>
        <div className="logo">
            <span className='font-bold'>
                iTask
            </span>
        </div>
        <ul className="flex gap-4">
            <li className='cursor-pointer hover:font-bold transition-all transition-'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
