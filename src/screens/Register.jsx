import AuthLayout from '../components/AuthLayout'
import { useState, useEffect } from 'react'
import { useUserRegisterAPIMutation } from '../reducers/users/api'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../reducers/users/userSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [ searchParams ] = useSearchParams()
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : "/"

    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userRegisterAPI, { error, isError, isLoading }] = useUserRegisterAPIMutation()

    useEffect(() => {      
        if(userInfo.isLoggedIn){
            navigate(redirect)
        }
    }, [redirect, userInfo])

    const handleSubmit = async (e) => {
        setMessage('')
        e.preventDefault()
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password did not matched")
        } else {
            const result = await userRegisterAPI({ first_name: firstName, last_name: lastName, username: username, email: email, password: password }).unwrap()
            if (!result.error) {
                console.log("------", result)
                dispatch(loginSuccess(result))
            }else{
                console.log("------111", result)
            }
        }
    }

    return (
        <>
            {isLoading ? (<LoadingSpinner />) :
                <AuthLayout
                    title="Create a new account"
                    subtitle="Enter your details to create your account"
                    alternativeAction={{
                        text: "Already have an account?",
                        linkText: "Sign in",
                        href: "/login"
                    }}
                >
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="grid grid-cols-2">
                                <div>
                                    <label htmlFor="first-name" className="sr-only">
                                        First name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#777676] text-[#000000] rounded-tl-md focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {isError && <p className="text-red-500">{error.data.first_name ? error.data.first_name.map((error, index) => <li key={index}>{error}</li>) : ''}</p>}
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="sr-only">
                                        Last name
                                    </label>
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        autoComplete="last-name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#777676] text-[#000000] rounded-tr-md focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {isError && <p className="text-red-500">{error.data.last_name ? error.data.last_name.map((error, index) => <li key={index}>{error}</li>) : ''}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#777676] text-[#000000] focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {isError && <p className="text-red-500">{error.data.username ? error.data.username.map((error, index) => <li key={index}>{error}</li>) : ''}</p>}
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#777676] text-[#000000] focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {isError && <p className="text-red-500">{error.data.email ? error.data.email.map((error, index) => <li key={index}>{error}</li>) : ''}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#777676] text-[#000000] focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {isError && <p className="text-red-500">{error.data.password ? error.data.password.map((error, index) => <li key={index}>{error}</li>) : ''}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#777676] text-[#000000] rounded-b-md focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {message && <p className="text-red-500">{message}</p>}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#000000] hover:bg-[#ffffff] hover:text-[#000000] hover:border-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000]"
                            >
                                Create account
                            </button>
                        </div>
                    </form>
                </AuthLayout>
            }
        </>

    )
};

export default Register;