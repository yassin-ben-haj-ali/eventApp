
import React, { useState } from 'react'
import { Button } from './button';
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from '@/lib/utils';

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  passwordInput?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement,CustomInputProps>(({className,label,type,passwordInput,...props},ref) => {
  const [showPassword,setShowPassword] = useState(false);
  let inputType;
    if (passwordInput) {
        inputType = showPassword ? 'text' : 'password';
    } else {
        inputType = type;
    }

  return (
    <div className='flex flex-col w-full gap-2'>
        {label && (
          <label className='text-sm font-medium flex gap-1'>
            {label}
            {props.required && <span className='text-red-500'>*</span>}
          </label>
        )}
        <div className='relative'>
            <input
                ref={ref}
                type={inputType}
                className={cn('w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm placeholder:text-gray-500',
                    passwordInput && 'pr-10',
                    props.error && 'border-red-600 outline-none focus-visible:ring-transparent',
                    props.disabled && 'cursor-not-allowed',
                    className
                )            
            }
                {...props}
            />
            {passwordInput && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-0 top-0 mr-2 h-full px-3 py-2 hover:bg-transparent"
							onClick={() => setShowPassword((prev) => !prev)}
							disabled={props.disabled}
						>
							{showPassword ? (
								<EyeIcon className="h-4 w-4" aria-hidden="true" />
							) : (
								<EyeOffIcon className="h-4 w-4" aria-hidden="true" />
							)}
							<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
						</Button>
			)}
            {props.error && (
				<div>
					<p className="absolute left-1 block overflow-hidden text-ellipsis whitespace-normal px-1 text-xs font-normal text-red-600">
						{props.error}
					</p>
			  </div>
			)}
  </div>
  </div>
  )

})

export default CustomInput