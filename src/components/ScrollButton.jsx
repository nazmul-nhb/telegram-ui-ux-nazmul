import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdArrowDownward } from 'react-icons/md';

const ScrollButton = ({ containerRef }) => {
    const [showBottomButton, setShowBottomButton] = useState(true);


    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                setShowBottomButton(scrollTop + clientHeight < scrollHeight - 360);
            }
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [containerRef]);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`fixed right-8 bottom-8 text-3xl z-10`}>
            {showBottomButton && (
                <button onClick={scrollToBottom} className={`bg-sideBG shadow-sm p-3 rounded-full cursor-pointer hover:bg-[#f4f4f481] transition-all duration-500`}>
                    <MdArrowDownward />
                </button>
            )}
        </div>
    );
};

ScrollButton.propTypes={
    containerRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element) 
    }),
}

export default ScrollButton;
