import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const { signup } = useAuth();

    const handleSignup = async () => {
        if (password !== passwordConfirm) {
            alert('Passwords do not match');
            return;
        }

        try {
            await signup({ name, email, password, passwordConfirm });
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Signup failed');
        }
    };

    return (
        <section className="signup-section py-10 bg-[#F3F4F5] flex justify-center">
            <div className="container flex flex-col justify-between items-center gap-y-10 ">
                <div>
                    <h1 className="text-xl sm:text-3xl font-bold">Enjoy your trip !</h1>
                </div>
                <div className="w-[200px] sm:w-[300px]">
                    <form
                        className="login-form flex flex-col gap-y-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSignup();
                        }}
                    >
                        <div className="form-group border-b-2 border-[#32af6f] flex justify-start items-center h-[50px]">
                            <input
                                className="w-full h-full border-none"
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group border-b-2 border-[#32af6f] flex justify-start items-center h-[50px]">
                            <input
                                className="w-full h-full border-none"
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group border-b-2 border-[#32af6f] flex justify-start items-center h-[50px]">
                            <input
                                className="w-full h-full border-none"
                                type="password"
                                placeholder="Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group border-b-2 border-[#32af6f] flex justify-start items-center h-[50px]">
                            <input
                                className="w-full h-full border-none"
                                type="password"
                                placeholder="Confirm Your Password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex justify-center items-center border h-[50px] bg-[#32af6f] text-white text-lg rounded-2xl hover:cursor-pointer w-full"
                            >
                                SIGN UP
                            </button>
                        </div>
                    </form>
                </div>
                <div className="px-2 text-sm text-center">
                    Already have an account?{' '}
                    <span className="text-[#32af6f] hover:underline ">
                        <Link to="/login">login</Link>
                    </span>{' '}
                    here
                </div>
            </div>
        </section>
    );
};

export default Signup;
