import { memo, useState } from 'react';
import { Button } from './ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { Computer, Search } from 'lucide-react';
import { useLocationSearch } from '@/hooks/use-weather';

const CitySearch = () => {

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')


    const { data: locations, isLoading } = useLocationSearch(query)

    console.log("query:", query, "Locations", locations)


    return (
        <>
            <Button className='anek text-sm text-muted-foreground relative w-24  justify-start sm:pr-12 sm:w-40 lg:w-64' onClick={() => setOpen(true)} variant={"outline"}><Search /> এলাকা <span className='hidden sm:flex'>সার্চ করুন</span></Button>
            {/* <CommandDialog className='anek' open={open} onOpenChange={setOpen} >
                <CommandInput
                    value={query}
                    onValueChange={setQuery}
                    className=''
                    placeholder="ইংরেজিতে এলাকার নাম টাইপ করুন ..." />
                <CommandList>
                    {query.length > 2 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}
                    <CommandGroup heading="ফেভারিট এলাকা">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="সাম্প্রতিক সার্চ">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    {locations && locations.length > 0 && (
                        <CommandGroup heading="ফেভারিট এলাকা">
                            <CommandItem>Calendar</CommandItem>
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog> */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandItem> <Computer /> Under development...  </CommandItem>
            </CommandDialog>
        </>
    );
};

export default memo(CitySearch);