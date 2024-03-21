import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import PreviewImage from '@/Components/PriviewImage';
import { ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';

export default function CreateCategory({ auth }: PageProps) {
    // console.log(posts);
    const { categories, errors, flash }: any = usePage().props
    const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
        name: ""
    });

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    console.log('recent success', recentlySuccessful);

    const submit = (e: any) => {
        e.preventDefault();
        post('/categories', {
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Data successfuly saved!",
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Post</h2>
            }
        >
            <Head title="Add Post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <form onSubmit={submit} encType="multipart/form-data">
                            <div className="space-y-12">
                                <div className="sm:border-b border-gray-900/10 pb-12">
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                        <div className="col-span-full">
                                            <label htmlFor="about" className=''>
                                                Category Name
                                            </label>
                                            <input type="text" value={data.name} onChange={(e: any) => setData('name', e.target.value)}
                                                id="name"
                                                name="name"
                                                className={`${errors.name ? 'border border-red-500' : 'border border-gray-400'} p-3 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none focus-visible:outline-none`}
                                                placeholder='Enter name...' />
                                            {errors.name &&
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.title}</p>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-6 max-sm:mt-12 flex items-center justify-end gap-x-6">
                                <Link href='/post' className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                    Cancel
                                </Link>
                                <button disabled={processing}
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                    {processing ? 'Saved...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
