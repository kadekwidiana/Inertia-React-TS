import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import PreviewImage from '@/Components/PriviewImage';
import { ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';

export default function EditPost({ auth }: PageProps) {
    // console.log(posts);
    const { categories, postById, errors }: any = usePage().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Post</h2>
            }
        >
            <Head title="Detail Post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <Link href='/posts' className='m-2 px-3 py-2 text-sm text-center inline-flex items-center text-white font-semibold bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Back</Link>
                        <h1 className='text-xl'>{postById.title}</h1>
                        <h2 className='text-lg'>{postById.category.name}</h2>
                        <img src={`/storage/${postById.image}`} alt="Image" className="w-56 bg-gray-50 rounded-sm" />

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
