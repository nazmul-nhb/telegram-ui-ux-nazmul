import ring from  '../assets/ring.svg'

export const spinner = (
    <div className='w-full md:w-[calc(100%-360px)] flex items-center justify-center'>
        <img src={ring} alt="Loading..." />
    </div>
)