import React from 'react'

import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © 2025 Foogle Meet. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="https://x.com/aadityaa027" className='hover:text-blue-500' target='_blank'>
                            <Twitter className="h-5 w-5" />

                        </Link>
                        <Link href="https://github.com/aditya9-2" className='hover:text-blue-500' target='_blank'>
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/aadityabasak20" className='hover:text-blue-500' target='_blank'>
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
                <div className='text-center text-xl'>made by <span className='bg-clip-text text-transparent  bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500'>Aditya</span></div>
            </div>
        </footer>
    )
}

export default Footer