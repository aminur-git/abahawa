import type { GeocodingResponse, WeatherData } from "@/api/types";
import { memo } from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeather {
    data: WeatherData;
    locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeather) => {
    const {
        weather: [currentWeather],
        main: { temp, feels_like, temp_min, temp_max, humidity },
        wind: { speed },
    } = data;

    const formateTemp = (temp: number) => `${Math.round(temp)}°`

    return (
        <Card>
            <CardContent className="p-6 anek ">
                <div className="grid gap-6 md:grid-cols-2">

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <h2 className="text-2xl font-medium ">
                                    {locationName
                                        ? locationName.local_names?.bn
                                        : locationName?.name}
                                </h2>
                                {locationName?.state && (
                                    <span className="text-muted-foreground">
                                        , {locationName?.state}
                                    </span>
                                )}
                            </div>
                            <p className="text-muted-foreground ">{locationName?.country}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-7xl font-semibold tracking-tighter ">{formateTemp(temp)}</p>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">অনুভূত {formateTemp(feels_like)}</p>
                            </div>
                            <div className="flex gap-2 text-sm font-medium">
                                <span className="flex items-center gap-1 text-blue-500">
                                    <ArrowDown />
                                    {formateTemp(temp_min)}
                                </span>
                                <span className="flex items-center gap-1 text-red-500">
                                    <ArrowUp />
                                    {formateTemp(temp_max)}
                                </span>
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
                        <div>

                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};

export default memo(CurrentWeather);
