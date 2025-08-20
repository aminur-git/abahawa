
import { Cloudy } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { useTheme } from '@/assets/context/theme-provider';


const Header = () => {
    const { theme } = useTheme()


    return (
        <header className=" px-2 py-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className='flex justify-between container mx-auto'>
                <Link to={"/"} className='flex justify-between items-center text-4xl gap-2 '>
                    <Cloudy className={theme === 'dark' ? 'text-cyan-300' : 'text-cyan-800'} /> <span className={theme === "dark" ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text ' : 'bg-gradient-to-r from-cyan-800   to-blue-800 text-transparent bg-clip-text'}>আবহাওয়া</span>
                </Link>
                <div></div>
                <div className='flex gap-4 items-center'>
                    <h1>Search</h1>
                    <ModeToggle></ModeToggle>
                </div>
            </div>
        </header>
    );
};

export default memo(Header);