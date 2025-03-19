"use client";
import React from 'react'
import { Highlight } from '@/components/ui/hero-highlight'
import { motion } from "motion/react";

import { Video } from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

const Hero = () => {

    const router = useRouter();

    return (
        <div className="relative flex h-[35rem] w-full items-center justify-center bg-white dark:bg-black">
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            <div className="relative z-20  py-8 text-4xl font-bold text-transparent sm:text-7xl">
                <motion.p
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl text-black px-4 md:text-4xl lg:text-5xl font-bold max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-500 dark:bg-clip-text"
                >
                    Premium Video Meetings.
                    <br />
                    <Highlight className="text-black dark:text-white">
                        Now Free for Everyone.
                    </Highlight>
                </motion.p>

                <motion.p
                    className="text-xl text-center mt-6 font-semibold mb-8 max-w-2xl mx-auto text-muted-foreground "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    We re-engineered the service that we built for secure business
                    meetings, Foogle Meet, to make it free and available for all.
                </motion.p>

                <motion.p className='flex justify-center items-center gap-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <SignedOut>
                        <SignInButton mode="modal">
                            <HoverBorderGradient className="text-lg cursor-pointer flex gap-2 items-center">
                                <Video className="mr-2 h-5 w-5" />
                                New Meeting
                            </HoverBorderGradient>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <HoverBorderGradient
                            className="text-lg cursor-pointer flex gap-2 items-center"
                            onClick={() => router.push(`/meeting`)}
                        >
                            <Video className="mr-2 h-5 w-5" />
                            New Meeting
                        </HoverBorderGradient>
                    </SignedIn>
                </motion.p>

            </div>

        </div>
    )
}

export default Hero