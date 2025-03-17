import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'


const Navbar = () => {

    return (
        <nav className="fixed w-full z-50 bg-background/50 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-foreground text-2xl font-bold">Foogle Meet</span>
                    </div>
                    <div className=" md:flex items-center space-x-4">

                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="secondary" className="cursor-pointer">Sign In</Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button className="cursor-pointer">Sign Up</Button>
                            </SignUpButton>
                        </SignedOut>


                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar