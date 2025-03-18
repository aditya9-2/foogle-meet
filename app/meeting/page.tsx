'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Video, Users } from 'lucide-react';
import { generateMeetingId } from '@/utils/generateMeetingId';

export default function MeetingPage() {
    const router = useRouter();
    const [meetingId, setMeetingId] = useState('');

    const createMeeting = () => {

        router.push(`/meeting/${generateMeetingId()}`);
    };

    const joinMeeting = (e: React.FormEvent) => {
        e.preventDefault();
        if (meetingId.trim()) {
            router.push(`/meeting/${meetingId}`);
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Video Meeting</h1>
                    <p className="text-muted-foreground">Connect with anyone, anywhere</p>
                </div>

                <div className="grid gap-6">
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Video className="h-5 w-5" />
                                <h2 className="text-lg font-semibold">Join a Meeting</h2>
                            </div>
                            <form onSubmit={joinMeeting} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meetingId">Meeting ID</Label>
                                    <Input
                                        id="meetingId"
                                        placeholder="Enter meeting ID"
                                        value={meetingId}
                                        onChange={(e) => setMeetingId(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={!meetingId.trim()}>
                                    Join Meeting
                                </Button>
                            </form>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <h2 className="text-lg font-semibold">Create a Meeting</h2>
                            </div>
                            <Button onClick={createMeeting} variant="outline" className="w-full">
                                Create New Meeting
                            </Button>
                        </div>
                    </Card>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    By joining a meeting, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}