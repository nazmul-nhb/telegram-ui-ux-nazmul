import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import SampleChat from "./SampleChat";
import { NavLink } from "react-router-dom";

// Function to generate colors based on initials
const getColorForInitial = (initial) => {
    // Assign colors based on the ASCII value of the letter
    const colorPalette = [
        '#FF4500', // A
        '#1E90FF', // B
        '#32CD32', // C
        '#FFD700', // D
        '#FF69B4', // E
        '#9370DB', // F
        '#00CED1', // G
        '#FFA500', // H
        '#FF6347', // I
        '#00FFFF', // J
        '#ADFF2F', // K
        '#FFC0CB', // L
        '#FFD700', // M
        '#FF8C00', // N
        '#FF69B4', // O
        '#8A2BE2', // P
        '#32CD32', // Q
        '#40E0D0', // R
        '#FF1493', // S
        '#00BFFF', // T
        '#FFA500', // U
        '#7FFF00', // V
        '#FF00FF', // W
        '#00FF7F', // X
        '#FFD700', // Y
        '#FF0000', // Z
    ];

    // Convert initial to uppercase
    const upperInitial = initial.toUpperCase();

    // Get ASCII code of the initial
    const asciiCode = upperInitial.charCodeAt(0);

    // Index based on ASCII code, modulo to wrap around if more than colors
    const index = asciiCode % colorPalette.length;

    return colorPalette[index];
};

const Chats = () => {
    const { data: chatData = {}, isLoading } = useQuery({
        queryKey: ['chatData'],
        queryFn: async () => {
            const { data } = await axios.get(`https://devapi.beyondchats.com/api/get_all_chats?page=1`);
            return data.data;
        }
    });

    const chats = chatData?.data?.sort((a, b) => new Date(b?.creator?.updated_at) - new Date(a?.creator?.updated_at));

    if (isLoading) return 'Loading...';

    return (
        <section className="flex flex-col bg-sideBG gap-2 p-2 h-[calc(100vh-60px)] overflow-y-auto scrollbar-custom">
            {chats?.map(chat => (<NavLink
                className={({ isActive }) => isActive ? 'bg-chatMenuBG p-2 rounded-lg text-white' : 'p-2 rounded-lg hover:bg-[#e5e5e671] transition-all duration-500'} to={`/chat/${chat?.id}`} key={chat?.id}>
                <div className="flex gap-1 items-center select-none">
                    {/* username initials */}
                    <div
                        className={`rounded-full aspect-square w-16 flex items-center justify-center font-bold text-white text-2xl`}
                        style={{ backgroundColor: getColorForInitial(chat?.creator?.name?.charAt(0) || 'A'), boxShadow: `0 4px 4px -4px ${getColorForInitial(chat?.creator?.name?.charAt(0) || 'A') }` }}
                    >
                        {chat?.creator?.name?.split(' ').map(part => part[0]).join('') || 'A'}
                    </div>
                    <div className="w-full">
                    {/* username & time */}
                        <div className="flex gap-2 justify-between">
                            <h3 className="text-lg font-semibold">{chat?.creator?.name || 'Anonymous'}</h3>
                            <span>
                                {moment(chat?.creator?.updated_at).isSame(moment(), 'day')
                                    ? moment(chat?.creator?.updated_at).format('hh:mm A')
                                    : moment(chat?.creator?.updated_at).isSame(moment().subtract(1, 'day'), 'day')
                                        ? 'Yesterday'
                                        : moment(chat?.creator?.updated_at).format('MMM D, YYYY')}
                            </span>
                        </div>
                        <SampleChat chatID={chat?.id} />
                    </div>
                </div>
            </NavLink >
            ))}
        </section>
    );
};

export default Chats;
