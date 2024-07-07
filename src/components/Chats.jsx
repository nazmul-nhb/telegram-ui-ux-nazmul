import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Chats = () => {
    const { data: chatData = {}, isLoading } = useQuery({
        queryKey: ['chatData'],
        queryFn: async () => {
            const { data } = await axios(`https://devapi.beyondchats.com/api/get_all_chats?page=1`);
            return data.data;
        }
    });

    const chats = chatData?.data;

    console.log(chats);

    if (isLoading) return 'Loading...'

    return (
        <section className="flex flex-col gap-4 bg-white border border-telegram">
            {
                chats?.map(chat => <div key={chat.id}
                    className="">

                    <div>
                        {chat?.creator?.name?.split(' ').map(part => part[0]).join('')}
                    </div>
                    <div>
                        {chat?.creator?.name}
                    </div>
                </div>)
            }
        </section>
    );
};

export default Chats;