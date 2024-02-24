import { forwardRef } from "react";

const InputElement = forwardRef((props,ref) => {

    const { type, id, placeholder, required, minLength, maxLength} = props

    return(
        <div className="pt-2">
            <input 
                className="border border-[#C4C4C4] rounded-full py-2 px-4 placeholder:text-[#C4C4C4]" 
                type={type} 
                id={id}
                ref={ref}
                {...(placeholder && { placeholder })} 
                {...(required && { required })}
                {...(minLength && { minLength })}
                {...(maxLength && { maxLength })}
            />
        </div>
    )
})

export default InputElement;