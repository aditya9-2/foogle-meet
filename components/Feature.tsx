"use client"

import { Calendar, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";


const Feature = () => {
    return (

        <div className="py-16">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 text-4xl text-center font-semibold"
            >
                Feature
            </motion.h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        className="p-6 rounded-2xl bg-card border"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Users className="h-12 w-12 text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Host Large Meetings
                        </h3>
                        <p className="text-muted-foreground">
                            Up to 100 participants can join a meeting at the same time.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-6 rounded-2xl bg-card border"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Calendar className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Smart Scheduling
                        </h3>
                        <p className="text-muted-foreground">
                            Schedule meetings and get intelligent meeting suggestions.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-6 rounded-2xl bg-card border"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Shield className="h-12 w-12 text-purple-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Enterprise Security
                        </h3>
                        <p className="text-muted-foreground">
                            Advanced security features to protect your meetings.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Feature