import type { GeocodingResponse, WeatherData } from "@/api/types";
import { memo } from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
    const {
        weather: [currentWeather],
        main: { temp, feels_like, temp_min, temp_max, humidity },
        wind: { speed },

    } = data;

    const formateTemp = (temp: number) => `${Math.round(temp)}°`

    console.log('location:', locationName)

    return (
        <Card className="flex-1">
            <CardContent className="p-6 anek ">
                <div className="grid gap-6 md:grid-cols-3 ">

                    <div className="space-y-8 md:col-span-2">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <h2 className="text-2xl  font-medium ">
                                    {locationName
                                        ? locationName.local_names?.bn
                                        : data?.name}
                                </h2>
                                {locationName?.state && (
                                    <span className="flex gap-2 pl-4 text-muted-foreground">
                                        {locationName?.state}
                                    </span>
                                )}
                            </div>
                            <p className="text-muted-foreground ">{locationName?.country}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-7xl font-semibold tracking-tighter ">{formateTemp(temp)}</p>
                            <div className="flex flex-col items-center">
                                <div className="space-y-1">
                                    <p className="text-md font-medium text-muted-foreground anek">অনুভূত হচ্ছে {formateTemp(feels_like)}</p>
                                </div>
                                <div className="flex gap-2 text-sm font-medium">
                                    <span className="flex items-center gap-1 text-blue-500">
                                        <ArrowDown className="w-4 h-4" />
                                        {formateTemp(temp_min)}
                                    </span>
                                    <span className="flex items-center gap-1 text-red-500">
                                        <ArrowUp className="w-4 h-4" />
                                        {formateTemp(temp_max)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Droplets className="h-4 w-4 text-blue-400" />
                                <div className="space-x-0.5">
                                    <p className="text-sm font-medium">আদ্রতা</p>
                                    <p className="text-muted-foreground text-sm">{humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wind className="h-4 w-4 text-blue-400" />
                                <div className="space-x-0.5">
                                    <p className="text-sm font-medium">বাতাসের গতি</p>
                                    <p className="text-muted-foreground text-sm">{speed} m/s</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" flex justify-center items-center   ">
                        <div className="max-w-[200px] relative flex flex-col items-center justify-center
                        ">
                            <img src={`http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`} className="h-full w-full object-contain" />
                            <div className="absolute bottom-0 text-center">
                                <span className="text-muted-foreground text-sm capitalize">{currentWeather.description}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};

export default memo(CurrentWeather);
