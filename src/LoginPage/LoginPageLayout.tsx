type LoginPageLayoutProps = {
children: React.ReactNode;
}
const LoginPageLayout : React.FC<LoginPageLayoutProps> = ({children}) => {
  return (
    <div className='flex flex-row h-screen w-screen'>
       <div className="basis-3/5 flex flex-col items-center justify-center h-full">
        {children}
       </div>
       <div className='basis-2/5 bg-primary text-white flex items-center justify-center text-3xl font-bold'>
            Des expériences mémorables
       </div>
    </div>
  )
}

export default LoginPageLayout