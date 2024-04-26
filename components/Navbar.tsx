import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { ModeToggle } from "./ModeToggle";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = async() =>{

    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="h-[10vh] border-b items-center flex justify-between px-5 py-2">
            <Link href="/">
                <h1 className='md:text-2xl text-xl font-bold'>Home</h1>
            </Link>
            <div className="flex gap-5 items-center">
                { (await isAuthenticated()) ?(
                    <LogoutLink >
                        <Button className='bg-gray-400 text-center text-black rounded-md w-[60px]'>Logout</Button>
                    </LogoutLink>
                ):
                    <div className="flex gap-5 items-center">
                        <RegisterLink postLoginRedirectURL='/dashboard'>
                            <Button className='bg-gray-400 text-center text-black rounded-md w-[60px]'>Sign up</Button>
                        </RegisterLink>
                        <LoginLink postLoginRedirectURL='/dashboard'>
                            <Button className='bg-gray-400 text-center text-black rounded-md w-[60px]'>Sign in</Button>
                        </LoginLink>  
                </div>}
                <ModeToggle/>
            </div>
        </nav>
    );
}

export default Navbar;
