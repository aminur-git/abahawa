import type { WeatherData } from '@/api/types';
import { format } from 'date-fns';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';
import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
interface DetailsWeatherProps {
    data: WeatherData
}

const DetailsWeather = ({ data }: DetailsWeatherProps) => {
    console.log('details:', data)
    const { wind, sys, main } = data;

    const formateTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:m a")
    }

    const getWindDirection = (degree: number) => {
        const directions = ['উত্তর', 'NE', 'E', 'SE', 'দক্ষিণ', 'SW', 'W', 'NW']

        const index = Math.round(((degree % 360) < 0 ? degree + 360 : degree) / 45) % 8;
        return directions[index]
    }

    const details = [
        {
            title: "সূর্যদয়",
            value: formateTime(sys.sunrise),
            icon: Sunrise,
            color: 'text-yellow-500'
        },
        {
            title: "সুর্যাস্ত",
            value: formateTime(sys.sunset),
            icon: Sunset,
            color: 'text-orange-500'
        },

        {
            title: "বাতাসের দিক",
            value: `${getWindDirection(wind.deg)} ${wind.deg}°`,
            icon: Compass,
            color: 'text-green-500'
        },
        {
            title: "চাপ",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: 'text-purple-500'
        },
    ]

    console.log(details)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    বিস্তারিত তথ্য
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid gap-6 sm:grid-cols-2'>
                    {details.map((data) => {
                        return <div key={data.title} className='flex items-center gap-3 rounded-lg border p-4'>
                            <data.icon className={`h-5 w-5 ${data.color}`} />
                            <div>
                                <p className='text-sm font-semibold  anek'>{data.title}</p>
                                <p className='text-sm text-muted-foreground anek'>{data.value}</p>
                            </div>
                        </div>
                    })}
                </div>

            </CardContent>
        </Card>
    );
};

export default memo(DetailsWeather);