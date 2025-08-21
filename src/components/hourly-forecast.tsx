import type { ForecastData } from '@/api/types';
import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDate } from 'date-fns';

interface HourlyForecastProps {
    data: ForecastData
}

const HourlyForecast = ({ data }: HourlyForecastProps) => {

    const chartData = data.list.slice(0, 8).map((item) => ({
        time: formatDate(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels: Math.round(item.main.feels_like),
    }));


    console.log('chart:', chartData)

    return (
        <Card className='flex-1'>
            <CardHeader>
                <CardTitle>আজকের তাপমাত্রা </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='h-[200px] w-full'>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 16, right: 24, bottom: 8, left: 12 }}
                            style={{ overflow: 'visible' }}       // prevents edge clipping
                        >
                            <XAxis
                                dataKey="time"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v) => `${v}°`}
                                tickMargin={8}
                                domain={['dataMin-2', 'dataMax+2']} // vertical padding
                            />
                            <Tooltip content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (

                                        <div className='rounded-lg border bg-background p-4 shadow-sm '>
                                            <div className='grid grid-cols-2 gap-2 '>
                                                <div className='flex flex-col'>
                                                    <span className='text-sm text-muted-foreground'>তাপমাত্রা</span>
                                                    <span className='font-bold text-xl'>{payload[0].value}°</span>
                                                </div>

                                                <div className='flex flex-col '>
                                                    <span className='text-sm text-muted-foreground' >অনুভূত তাপমাত্রা</span>
                                                    <span className='font-bold text-xl'>{payload[1].value}°</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            }} />

                            <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={2} dot={false} />
                            <Line type="linear" dataKey="feels" stroke="#64748b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>

                </div>

            </CardContent>
        </Card>
    );
};

export default memo(HourlyForecast);