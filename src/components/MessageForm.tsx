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
        <div className="flex flex-col gap-5 p-6 max-w-md mx-auto mt-12 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">Send a Message</h2>

            <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px] border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 rounded-lg"
            />

            <Input
                type="number"
                placeholder="Delay in seconds..."
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                disabled={isSending}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 rounded-lg"
            />

            {!isSending ? (
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    onClick={handleSend}
                >
                    Send with Delay
                </Button>
            ) : (
                <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    variant="destructive"
                    onClick={handleCancel}
                >
                    Cancel Sending
                </Button>
            )}

            {sentMessages && (
                <div className="mt-5 p-4 border border-green-400 bg-green-50 rounded-lg text-green-700 shadow-sm">
                    <p className="font-semibold mb-2">Sent Message:</p>
                    <p>{sentMessages}</p>
                </div>
            )}
        </div>
    );
};

export default MessageForm;
