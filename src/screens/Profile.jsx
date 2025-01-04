// import React from 'react'
import { User, Mail, Calendar, LogOut } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/users/userSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Profile() {
    const userInfo = useSelector(state => state.user)
    const navigate = useNavigate()

    console.log(userInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo.isLoggedIn){
            navigate("/")
        }
    }, [])

    const handleLogout = () => {
        dispatch(logOut())
        navigate("/")
    }

    return (
        <>
        {userInfo.isLoggedIn ? (
        <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-4 w-full">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-[#000000] mb-6">User Profile</h1>

                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <User className="text-[#000000]" size={24} />
                        <div>
                            <p className="text-sm text-[#000000]">Name</p>
                            <p className="text-lg font-medium text-[#000000]">{userInfo.userInfo.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Mail className="text-[#000000]" size={24} />
                        <div>
                            <p className="text-sm text-[#B1C29E]">Email</p>
                            <p className="text-lg font-medium text-[#000000]">{userInfo.userInfo.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Calendar className="text-[#000000]" size={24} />
                        <div>
                            <p className="text-sm text-[#000000]">Join Date</p>
                            <p className="text-lg font-medium text-[#000000]">{userInfo.userInfo.date_joined}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-[#000000] text-white py-2 px-4 rounded-md hover:bg-[#000000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       <span>Logout</span><LogOut size={20} />
                    </button>
                </div>
            </div>
        </div>
    ):(
        <div>Please login to view this page</div>
    )}
        </>
    )
}

export default Profile
