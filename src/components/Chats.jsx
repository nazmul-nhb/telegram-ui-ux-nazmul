import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import SampleChat from "./SampleChat";
import { NavLink } from "react-router-dom";
import { serverApi } from "../utils/constants";
import { getColorForFirstCharacter } from "color-generator-fl";

const Chats = () => {
    const { data: chatData = {}, isLoading } = useQuery({
        queryKey: ['chatData'],
        queryFn: async () => {
            const { data } = await axios.get(serverApi);
            return data.chats;
        }
    });

    if (isLoading) return 'Loading...';
    
    const chats = chatData?.sort((a, b) => new Date(b?.creator?.updated_at) - new Date(a?.creator?.updated_at));

    return (
        <section className="flex flex-col bg-sideBG gap-2 p-2 h-[calc(100vh-56px)] pb-16 overflow-y-auto scrollbar-custom">
            {chats?.map(chat => {
                const color = getColorForFirstCharacter(chat?.creator?.name || 'A');
                const title = chat?.creator?.name || 'Anonymous';
                return (
                    <NavLink key={chat?._id}
                        className={({ isActive }) => isActive ? 'bg-chatMenuBG p-2 rounded-lg text-white' : 'p-2 rounded-lg hover:bg-[#e5e5e671] transition-all duration-500'}
                        to={`/chat/${chat?._id}?color=${encodeURIComponent(color)}&title=${encodeURIComponent(title)}`}
                    >
                        <div className="flex gap-2 items-center select-none">
                            {/* username initials */}
                            <div
                                className={`rounded-full aspect-square w-16 flex items-center justify-center font-bold text-white text-2xl`}
                                style={{ backgroundColor: color, boxShadow: `0 4px 4px -4px ${color}` }}
                            >
                                {title?.split(' ').map(part => part[0]).join('')}
                            </div>
                            <div className="w-full">
                                {/* username & time */}
                                <div className="flex gap-2 justify-between">
                                    <h3 className="text-lg font-semibold">{title}</h3>
                                    <span>
                                        {moment(chat?.creator?.updated_at).isSame(moment(), 'day')
                                            ? moment(chat?.creator?.updated_at).format('hh:mm A')
                                            : moment(chat?.creator?.updated_at).isSame(moment().subtract(1, 'day'), 'day')
                                                ? 'Yesterday'
                                                : moment(chat?.creator?.updated_at).format('MMM D, YYYY')}
                                    </span>
                                </div>
                                <SampleChat chatID={chat?._id} />
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </section>
    );
};

export default Chats;
