import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import moment from "moment";
import { FaCheckDouble, FaArrowLeft } from "react-icons/fa";
import ScrollButton from "../components/ScrollButton";
import { useRef } from "react";
import { PiDotsThreeVertical } from "react-icons/pi";

const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
};

const Chat = () => {
    const { id } = useParams();
    const currentUserId = 1; // update this id with actual user id later, because for every chat current user is different
    const containerRef = useRef(null);
    const queryParams = useQueryParams();
    const color = queryParams.get("color");
    const title = queryParams.get("title");

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
        <div className="relative w-[calc(100%-360px)]">
            <div className="flex items-center justify-between h-14 px-4 py-1 ml-[1px] shadow-md bg-sideBG sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <FaArrowLeft className="text-xl cursor-pointer md:hidden" />
                    <div className="flex items-center gap-3 cursor-pointer tracking-wide">
                        <div
                            className={`rounded-full aspect-square w-11 flex items-center justify-center font-bold text-white text-xl`}
                            style={{ backgroundColor: color, boxShadow: `0 4px 4px -4px ${color}` }}
                        >
                            {title?.split(' ').map(part => part[0]).join('')}
                        </div>
                        <div className="flex flex-col gap-0">
                            <h1 className="text-xl font-semibold">{title}</h1>
                            <h2 className="text-sm font-light">last seen recently</h2>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <PiDotsThreeVertical className="w-11 h-11 text-xl cursor-pointer p-2 hover:bg-[#2b2b2b75] rounded-full transition-all duration-500" />
                </div>
            </div>
            <div ref={containerRef} className="h-[calc(100vh-56px)] overflow-y-auto bg-telegramPattern bg-opacity-70 scrollbar-custom px-2 lg:px-24">
                {Object.keys(groupedMessages).map(date => (
                    <div key={date}>
                        <div className="flex justify-center items-center sticky top-0 py-1 mx-auto z-10 font-semibold text-center select-none">
                            <span className="text-white bg-timeBG rounded-3xl px-3 py-1 cursor-pointer">
                                {moment(date).isSame(moment(), 'day')
                                    ? 'Today'
                                    : moment(date).isSame(moment().subtract(1, 'day'), 'day')
                                        ? 'Yesterday'
                                        : moment(date).format('MMMM DD')}
                            </span>
                        </div>
                        {groupedMessages[date].map(msg => {
                            const isCurrentUser = msg.sender_id === currentUserId;
                            return (
                                <div
                                    key={msg?.id}
                                    className={`message ${isCurrentUser ? 'message-right' : 'message-left'}`}
                                >
                                    <div className={`space-y-1 message-content ${isCurrentUser ? 'message-content-right' : ''}`}>
                                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                            {msg?.message}
                                        </Markdown>
                                        <span className="flex justify-end gap-1 text-xs select-none cursor-pointer" title={moment(msg?.created_at).format('DD MMMM YYYY, hh:mm:ss A')}>
                                            {moment(msg?.created_at).format('hh:mm A')}
                                            <FaCheckDouble />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <ScrollButton containerRef={containerRef} />
        </div>
    );
};

export default Chat;
