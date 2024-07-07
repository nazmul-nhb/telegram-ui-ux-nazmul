import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown'

const Chat = () => {
    const { id } = useParams();

    const { data: messages = [], isLoading } = useQuery({
        queryKey: ['messages', id],
        queryFn: async () => {
            const { data } = await axios(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`);
            return data.data;
        }
    });

    if (isLoading) return 'Loading...';

    return (
        <div className="text-telegram h-[calc(100vh-36px)] w-[calc(100%-360px)] overflow-y-auto">
            {messages?.map(msg => <div key={msg?.id}>
                <Markdown>{msg?.message}</Markdown>
            </div>)}
        </div>
    );
};

export default Chat;