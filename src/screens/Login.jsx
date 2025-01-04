import { useState, useEffect } from 'react'
import AuthLayout from '../components/AuthLayout'
import { useUserLoginAPIMutation } from '../reducers/users/api'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../reducers/users/userSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector(state => state.user)
    const [ searchParams ] = useSearchParams()
    const [userLoginAPI, {isLoading, error, isError}] = useUserLoginAPIMutation()
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : "/"

    
    const errorMessage = isError ? error.data.detail : null
    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await userLoginAPI({username:userName, password}).unwrap()
        dispatch(loginSuccess(result))
    }
    useEffect(() => {      
        if(userInfo.isLoggedIn){
            navigate(redirect)
        }
    }, [redirect, userInfo])

    return (
        <>
        {isLoading ? (<LoadingSpinner />) :
            <AuthLayout title="Welcome to Our App" subtitle="Please login to continue" alternativeAction={{
                text: "Don't have an account?",
                linkText: "Sign up",
                href: "/register"
            }}>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="username"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] rounded-t-md placeholder-[#777676] text-[#000000] focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] rounded-b-md placeholder-[#777676] text-[#000000] focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#000000] hover:bg-[#ffffff] hover:text-[#000000] hover:border-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000]"
                >
                    Sign in
                </button>
            </div>
        </form>
        {isError && <div>Error: {errorMessage}</div>}
    </AuthLayout >}
    </>
    );
};

export default Login;