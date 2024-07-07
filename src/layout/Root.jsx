import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Root = () => {
    return (
        <main className='max-w-[1920px] flex gap-1'>
            <Sidebar />
            <Outlet />
        </main>
    );
};

export default Root;