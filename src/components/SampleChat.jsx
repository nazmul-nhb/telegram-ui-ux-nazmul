import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PropTypes from 'prop-types';

const SampleChat = ({ chatID }) => {
    const { data: chatMessages = [], isLoading } = useQuery({
        queryKey: ['chatMessages', chatID],
        queryFn: async () => {
            const { data } = await axios(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatID}`);
            return data.data;
        }
    });

    // console.log(chatMessages);

    // Function to get the latest message
    const getLatestMessage = (messages) => {
        if (!messages || messages.length === 0) return null;

        // Sort messages by created_at in descending order
        const sortedMessages = messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Return the first message (latest)
        return sortedMessages[0];
    };

    const latestMessage = getLatestMessage(chatMessages);

    // console.log(latestMessage);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='text-gray-400'>
            {latestMessage?.message.slice(0, 32)}...
        </div>
    );
};

SampleChat.propTypes = {
    chatID: PropTypes.number,
}

export default SampleChat;