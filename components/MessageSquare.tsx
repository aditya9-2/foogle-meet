import { MessageSquare } from 'lucide-react'
import React from 'react'

const MessageSquareElement = () => {
    return (
        <div className="p-4 border-b border-border flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <h2 className="font-semibold">Chat</h2>
        </div>
    )
}

export default MessageSquareElement