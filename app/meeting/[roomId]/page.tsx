import React from 'react'

const MeetingRoom = async ({ params }: {
    params: {
        roomId: string
    }
}) => {
    const roomId = (await params).roomId;

    return (
        <div className='w-full min-h-screen py-20 text-black dark:text-white'>{roomId}</div>
    )
}

export default MeetingRoom