/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    sender: "me" | "other"
    content: string
}

interface ChatPanelProps {
    roomId: string
}

const ChatPanel = ({ roomId }: ChatPanelProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")

    const handleSend = () => {
        if (input.trim()) {
            setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "me", content: input }])
            setInput("")
        }
    }

    return (
        <div className="flex flex-col min-h-[37rem]">
            <ScrollArea className="flex-1 p-3">
                <div className="flex flex-col space-y-4">
                    {messages.length === 0 && (
                        <p className="text-muted-foreground text-center py-6 text-sm">No messages yet. Start the conversation!</p>
                    )}
                    {messages.map((msg) => (
                        <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                            <div
                                className={cn(
                                    "max-w-[85%] px-3 py-2 rounded-lg text-sm",
                                    msg.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-3 border-t border-border">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                    className="flex gap-2"
                >
                    <Input
                        className="flex-1"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChatPanel


