import { useState } from "react";
import { Textarea } from "./ui/Textarea";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

const MessageForm = () => {
    const [message, setMessage] = useState<string>("");
    const [delay, setDelay] = useState<number>(0);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [sentMessages, setSentMessages] = useState<string>("");

    const handleSend = () => {
        setIsSending(true);

        const id = setTimeout(() => {
            setSentMessages(message);
            setMessage("");
            setIsSending(false);
        }, delay * 1000);
        setTimerId(id);
    };

    const handleCancel = () => {
        if (timerId) {
            clearTimeout(timerId);
            setIsSending(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 text-center"> Send a Message</h2>

            <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px] border border-gray-300 p-2 rounded-md"
            />

            <Input
                type="number"
                placeholder="Delay in seconds..."
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                disabled={isSending}
                className="border border-gray-300 p-2 rounded-md"
            />

            {!isSending ? (
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                    onClick={handleSend}
                >
                     Send with Delay
                </Button>
            ) : (
                <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md"
                    variant="destructive"
                    onClick={handleCancel}
                >
                     Cancel Sending
                </Button>
            )}

            {sentMessages && (
                <div className="mt-4 p-3 border border-green-400 bg-green-50 rounded-md text-green-700">
                    <p className="font-semibold mb-1">Sent Message:</p>
                    <p>{sentMessages}</p>
                </div>
            )}
        </div>
    );
};

export default MessageForm;
