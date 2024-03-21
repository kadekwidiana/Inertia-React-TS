import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function MapsPage({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="SIG Distan Buleleng" />
            <div className="">
                Maps
            </div>
        </>
    );
}
