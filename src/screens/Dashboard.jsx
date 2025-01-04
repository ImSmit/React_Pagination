import { Link } from 'react-router'
import { useSelector } from 'react-redux'
const Dashboard = () => {
    const userInfo = useSelector(state => state.user)
    return(
    <>

        <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-4 w-full">
            <h1 className="text-4xl font-bold text-[#000000] mb-8">Welcome To Document Management System</h1>
            {!userInfo.isLoggedIn ? (
                <div className="space-x-4">
                    <Link
                        to="/login"
                    className="inline-block bg-[#000000] text-white px-6 py-2 rounded-md hover:bg-[#000000] transition-colors"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="inline-block bg-[#000000] text-white px-6 py-2 rounded-md hover:bg-[#000000] transition-colors"
                >
                    Register
                </Link>
            </div>
):(<h1 className="text-4xl font-bold text-[#000000] mb-8">Hello {userInfo.userInfo.name} !!!    </h1>)}
        </div>
    </>
    )};

export default Dashboard;
