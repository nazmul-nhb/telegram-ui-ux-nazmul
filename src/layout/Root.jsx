import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Root = () => {
    return (
        <main className='max-w-[1920px] w-full md:flex mx-auto'>
            <Sidebar />
            <Outlet />
        </main>
    );
};

export default Root;