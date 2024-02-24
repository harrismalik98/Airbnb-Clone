import { forwardRef, useImperativeHandle, useState } from "react";

const SignupPasswordElement = forwardRef((props,ref) => {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");

    const {id, passwordValidIcon, passwordValidHandler} = props;

    
    const togglePassword = () => {
        setShow(prevState=> !prevState);
    }


    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
        passwordValidHandler(event.target.value);
    }


    const passwordReset = () => {
        setPassword("");
    }


    useImperativeHandle(ref,()=> ({
        reset: passwordReset
    }));


    return(
        <div className="flex flex-col gap-2 py-3">
            <div className="relative">
                <input 
                    className="border border-[#C4C4C4] rounded-full py-2 px-4 w-full placeholder:text-[#C4C4C4]" 
                    type={show ? "text" : "password"}
                    id={id}
                    value={password}
                    onChange={passwordChangeHandler}
                    placeholder="Password"
                    required
                    minLength="8"
                />
                <div onClick={togglePassword} className="cursor-pointer absolute top-4 right-5">
                    {show ? (
                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14 8.79565 13.6839 9.55871 13.1213 10.1213C12.5587 10.6839 11.7956 11 11 11C10.2044 11 9.44129 10.6839 8.87868 10.1213C8.31607 9.55871 8 8.79565 8 8C8 7.20435 8.31607 6.44129 8.87868 5.87868C9.44129 5.31607 10.2044 5 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C20.27 12.39 16 15.5 11 15.5C6 15.5 1.73 12.39 0 8C1.73 3.61 6 0.5 11 0.5ZM2.18 8C2.98825 9.65031 4.24331 11.0407 5.80248 12.0133C7.36165 12.9858 9.1624 13.5013 11 13.5013C12.8376 13.5013 14.6383 12.9858 16.1975 12.0133C17.7567 11.0407 19.0117 9.65031 19.82 8C19.0117 6.34969 17.7567 4.95925 16.1975 3.98675C14.6383 3.01424 12.8376 2.49868 11 2.49868C9.1624 2.49868 7.36165 3.01424 5.80248 3.98675C4.24331 4.95925 2.98825 6.34969 2.18 8Z" fill="#565656"/>
                        </svg>
                    ) : (
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.27L2.28 0L19 16.72L17.73 18L14.65 14.92C13.5 15.3 12.28 15.5 11 15.5C6 15.5 1.73 12.39 0 8C0.69 6.24 1.79 4.69 3.19 3.46L1 1.27ZM11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14.0005 8.34057 13.943 8.67873 13.83 9L10 5.17C10.3213 5.05698 10.6594 4.99949 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C21.1839 10.0732 19.7969 11.8727 18 13.19L16.58 11.76C17.9629 10.8034 19.0782 9.50906 19.82 8C19.0116 6.34994 17.7564 4.95977 16.1973 3.9875C14.6381 3.01524 12.8375 2.49988 11 2.5C9.91 2.5 8.84 2.68 7.84 3L6.3 1.47C7.74 0.85 9.33 0.5 11 0.5ZM2.18 8C2.98844 9.65006 4.24357 11.0402 5.80273 12.0125C7.36189 12.9848 9.16254 13.5001 11 13.5C11.69 13.5 12.37 13.43 13 13.29L10.72 11C10.0242 10.9254 9.37482 10.6149 8.87997 10.12C8.38512 9.62518 8.07458 8.97584 8 8.28L4.6 4.87C3.61 5.72 2.78 6.78 2.18 8Z" fill="#565656"/>
                        </svg>
                    )}
                </div>
                <div className="absolute top-4 right-16">
                    {password.length>0 &&  (
                            passwordValidIcon ? (
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 1.68233L6.28571 16L0 9.43773L1.61143 7.75541L6.28571 12.6234L18.3886 0L20 1.68233Z" fill="#1ACCA8"/>
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.5492 16L8.00515 9.44987L1.46109 16L0 14.5398L6.55434 8L0 1.46015L1.46109 0L8.00515 6.55013L14.5492 0.010283L16 1.46015L9.45595 8L16 14.5398L14.5492 16Z" fill="#FB575C"/>
                                </svg>
                            )
                    )}
                </div>
                <p className="text-sm text-center pb-2">Password must be at least 8 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.</p>
            </div>
        </div>
    )
})

export default SignupPasswordElement;