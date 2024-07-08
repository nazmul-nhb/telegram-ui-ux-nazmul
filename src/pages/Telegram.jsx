import Chats from "../components/Chats";
import Menubar from "../components/Menubar";

const Telegram = () => {
    return (
        <section className="w-full block md:hidden">
            <Menubar />
            <Chats />
        </section>
    );
};

export default Telegram;