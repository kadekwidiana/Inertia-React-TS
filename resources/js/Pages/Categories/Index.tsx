import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useRef, useState } from 'react';
import { pickBy } from 'lodash';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default function PostsPage({ auth }: PageProps) {
    const { categories, posts, flash }: any = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>
            }
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Link href='/posts/create' className='m-2 px-3 py-2 text-sm text-center inline-flex items-center text-white font-semibold bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add Categories</Link>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        No.
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-2/5">
                                        Category Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 flex justify-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((data: any, index: number) => (
                                    <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {/* {categories.from + index} */}
                                            {data.id}
                                        </th>
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-2/5">
                                            {data.name} {console.log('imagae list', data.image)}
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <Link href={`/categories/${data.id}/detail`} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                    Detail
                                                </Link>
                                                <Link href={`/categories/${data.id}/edit`} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Edit
                                                </Link>
                                                {/* <button onClick={() => deteleDataConfirm(data.id)} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                    Delete
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
