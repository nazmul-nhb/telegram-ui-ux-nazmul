import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import moment from "moment";

const Chat = () => {
    const { id } = useParams();
    const currentUserId = 1;

    const { data: rawMessages = [], isLoading } = useQuery({
        queryKey: ['rawMessages', id],
        queryFn: async () => {
            const { data } = await axios(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`);
            return data.data;
        }
    });

    const messages = rawMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    // Group messages by date
    const groupedMessages = messages.reduce((acc, msg) => {
        const date = moment(msg.created_at).format('YYYY-MM-DD');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(msg);
        return acc;
    }, {});

    if (isLoading) return 'Loading...';

    return (
        <div className="h-screen w-[calc(100%-360px)] overflow-y-auto">
            {Object.keys(groupedMessages).map(date => (
                <div key={date}>
                    <div className="flex justify-center items-center sticky top-8 py-1.5 mx-auto z-10 font-semibold text-center">
                        <span className="text-telegram bg-[#338fec4d] rounded-3xl px-3 py-1">{moment(date).format('MMMM DD')}</span> 
                    </div>
                    {groupedMessages[date].map(msg => {
                        const isCurrentUser = msg.sender_id === currentUserId;
                        return (
                            <div
                                key={msg?.id}
                                className={`message ${isCurrentUser ? 'message-right' : 'message-left'}`}
                            >
                                <div className={`message-content ${isCurrentUser ? 'message-content-right' : ''}`}>
                                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                        {msg?.message}
                                    </Markdown>
                                    <span className="flex justify-end text-xs">
                                        {moment(msg?.created_at).format('hh:mm A')}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Chat;
