import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { memo } from 'react';

const WeatherDashboard = () => {
    return (
        <div className="space-y-4">
            {/* TODO: Favorite Cities */}

            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold
                 tracking-tight'>আমার লোকেশন</h1>
                <Button
                    variant={'outline'}
                    size={"icon"}
                // onClick={handleRefresh}
                // disabled={}
                >
                    <RefreshCw className='h-4 w-4' />
                </Button>
            </div>
            {/* Current and hourly weather */}
        </div>
    );
};

export default memo(WeatherDashboard);