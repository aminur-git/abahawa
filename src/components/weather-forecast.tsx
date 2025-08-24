import type { ForecastData } from '@/api/types';
import { format } from 'date-fns';
import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';


interface WeatherForecastProps {
    data: ForecastData
}

interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
}


const WeatherForecast = ({ data }: WeatherForecastProps) => {

    console.log('weather forecast', data)

    const dailyForecast = data.list.reduce((accu, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd")

        if (!accu[date]) {
            accu[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            }
        } else {
            accu[date].temp_min = Math.min(accu[date].temp_min, forecast.main.temp_min);
            accu[date].temp_min = Math.max(accu[date].temp_max, forecast.main.temp_max);

        }

        return accu;

    }, {} as Record<string, DailyForecast>)


    const nextDays = Object.values(dailyForecast).slice(0, 6);
    const formateTemp = (temp: number) => `${Math.round(temp)}°`;

    console.log("After The Update", nextDays)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    ৫ দিনের পূর্বাভাস
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid gap-4 '>
                    {nextDays.map((day) => {
                        return <div className='anek grid md:grid-cols-3 items-center gap-4 rounded-lg border p-4' key={day.date}>
                            <div>
                                <p className=" font-medium text-md ">{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
                                <p className="text-muted-foreground text-sm capitalize">{day.weather.description}</p>
                            </div>
                            <div className='flex gap-2 text-sm font-medium'>
                                <span className="flex items-center gap-1 text-red-500">
                                    <ArrowUp className="w-4 h-4" />
                                    {formateTemp(day.temp_min)}
                                </span>
                                <span className="flex items-center gap-1 text-blue-500">
                                    <ArrowDown className="w-4 h-4" />
                                    {formateTemp(day.temp_max)}
                                </span>

                            </div>
                            <div className='flex gap-2 items-center justify-between'>
                                <span className='flex gap-2 items-center'>
                                    <Droplets className='h-4 w-4 text-blue-500' />
                                    <p className="text-muted-foreground text-sm">{day.humidity}%</p>
                                </span>
                                <span className='flex gap-2 items-center'>
                                    <Wind className='h-4 w-4 text-blue-500' />
                                    <p className="text-muted-foreground text-sm">{day.wind}m/s</p>
                                </span>
                            </div>


                        </div>
                    })}
                </div>
            </CardContent>

        </Card>
    );
};

export default memo(WeatherForecast);