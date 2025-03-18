import ChatPanel from '@/components/ChatPannel';
import MessageSquareElement from '@/components/MessageSquare';
import { VideoContainer } from '@/components/VideoContainer';
import React from 'react'

const MeetingRoom = async ({ params }: {
    params: {
        roomId: string
    }
}) => {
    const roomId = (await params).roomId;

    return (
        <div className="flex h-auto py-20 overflow-hidden">
            {/* Main content area with videos */}
            <div className="flex-1 p-4 ">
                <VideoContainer />
            </div>

            {/* Chat sidebar */}
            <div className="w-[350px] border-l border-border h-full flex flex-col bg-background">
                <MessageSquareElement />
                <div className="flex-1 ">
                    <ChatPanel roomId={roomId} />
                </div>
            </div>
        </div>
    )
}

export default MeetingRoom