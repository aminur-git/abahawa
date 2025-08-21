
import CurrentWeather from '@/components/curent-weather';
import DetailsWeather from '@/components/details-weather';
import HourlyForecast from '@/components/hourly-forecast';
import WeatherSkeleton from '@/components/loading-sceleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { useGeoLocation } from '@/hooks/use-geoLocation';
import { useForecastQuery, useReversGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import { memo } from 'react';

const WeatherDashboard = () => {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeoLocation()

    const locationQuery = useReversGeocodeQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)
    const weatherQuery = useWeatherQuery(coordinates)

    console.log('forecast', forecastQuery?.data)

    const handleRefresh = () => {
        getLocation()
        if (coordinates) {
            locationQuery.refetch()
            forecastQuery.refetch()
            weatherQuery.refetch()
        }
    }




    if (locationLoading || locationQuery.isLoading || weatherQuery.isLoading || forecastQuery.isLoading) {
        return <WeatherSkeleton />
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className='space-y-4'>
                    <p>{locationError}</p>
                    <Button variant={'outline'} onClick={getLocation} className='w-fit' >
                        <MapPin className='mr-2 h-4 w-4' />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }
    if (!coordinates) {
        return (
            <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className='space-y-4'>
                    <p>Please enable location access to see your local weather.</p>
                    <Button variant={'outline'} onClick={getLocation} className='w-fit' >
                        <MapPin className='mr-2 h-4 w-4' />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }


    const locationName = locationQuery.data?.[0]
    console.log(locationName)
    console.log("weather:", weatherQuery.data)
    console.log("forecast:", forecastQuery.data)


    if (weatherQuery.error || !forecastQuery.error) {
        <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className='space-y-4'>
                <p>failed to fetch weather data. please try again letter</p>
                <Button variant={'outline'} onClick={handleRefresh} className='w-fit' >
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Retry
                </Button>
            </AlertDescription>
        </Alert>
    }

    return (
        <div className="space-y-4">
            {/* TODO: Favorite Cities */}

            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold
                 tracking-tight'>আমার লোকেশন </h1>

                <Button
                    variant={'outline'}
                    size={"icon"}
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}

                >
                    <RefreshCw className={weatherQuery.isFetching || forecastQuery.isFetching ? "animate-spin" : ""} />
                </Button>
            </div>
            {/* Current and hourly weather */}
            <div className='grid gap-6'>
                <div className='flex flex-col md:flex-row gap-4'>
                    {/* current weather */}
                    <CurrentWeather data={weatherQuery?.data} locationName={locationName} />

                    <HourlyForecast data={forecastQuery?.data} />
                </div>
                <div>
                    {/* details */}
                    <DetailsWeather data={weatherQuery?.data} />
                    {/* forecast */}
                </div>
            </div>
        </div>
    );
};

export default memo(WeatherDashboard);