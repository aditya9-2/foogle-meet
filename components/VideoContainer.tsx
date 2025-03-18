"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

interface User {
    id: string;
    stream: MediaStream | null;
    name: string;
}

export const VideoContainer = () => {

    const [users, setUsers] = useState<User[]>([
        { id: "local", stream: null, name: "You" },
        { id: "remote1", stream: null, name: "User 1" },
        // Add more users here for testing, up to 10
    ])
    const [isMicOn, setIsMicOn] = useState(true)
    const [isVideoOn, setIsVideoOn] = useState(true)

    useEffect(() => {
        // Set up local video stream
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setUsers((prevUsers) => prevUsers.map((user) => (user.id === "local" ? { ...user, stream } : user)))
            })
            .catch((error) => console.error("Error accessing local stream:", error))

        // TODO: Set up your remote video streams logic here 
    }, [])

    const toggleMic = () => {
        const localUser = users.find((user) => user.id === "local")
        if (localUser && localUser.stream) {
            localUser.stream.getAudioTracks().forEach((track) => {
                track.enabled = !isMicOn
            })
            setIsMicOn(!isMicOn)
        }
    }

    const toggleVideo = () => {
        const localUser = users.find((user) => user.id === "local")
        if (localUser && localUser.stream) {
            localUser.stream.getVideoTracks().forEach((track) => {
                track.enabled = !isVideoOn
            })
            setIsVideoOn(!isVideoOn)
        }
    }

    return (
        <div className="container mx-auto px-4 py-6 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        className={`overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted/50 to-muted shadow-sm ${user.id === "local" ? "relative" : ""
                            }`}
                    >
                        <div className="relative aspect-video bg-black">
                            {user.stream ? (
                                <video
                                    className="h-full w-full object-cover"
                                    autoPlay
                                    playsInline
                                    muted={user.id === "local"}
                                    ref={(el) => {
                                        if (el) el.srcObject = user.stream;
                                    }}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-muted-foreground">Waiting for {user.name}...</p>
                                </div>
                            )}
                            <div className="absolute bottom-3 left-3 bg-background/80 px-2 py-1 rounded-md text-xs font-medium">
                                {user.name}
                            </div>

                            {user.id === "local" && (
                                <div className="absolute top-[12rem] left-1/2 transform -translate-x-1/2 flex gap-2 z-">
                                    <Button
                                        variant={isMicOn ? "outline" : "destructive"}
                                        size="icon"
                                        onClick={toggleMic}
                                        className="rounded-full h-12 w-12 cursor-pointer"
                                    >
                                        {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                                    </Button>

                                    <Button
                                        variant={isVideoOn ? "outline" : "destructive"}
                                        size="icon"
                                        onClick={toggleVideo}
                                        className="rounded-full h-12 w-12 cursor-pointer"
                                    >
                                        {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                                    </Button>

                                    <Button variant="destructive" size="icon" className="rounded-full h-12 w-12 cursor-pointer">
                                        <PhoneOff className="h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};