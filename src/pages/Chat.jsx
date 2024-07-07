import { useParams } from "react-router-dom";

const Chat = () => {
    const {id} = useParams();

    console.log(id);
    return (
        <div className="text-telegram h-screen overflow-y-auto">
            {id}
        </div>
    );
};

export default Chat;