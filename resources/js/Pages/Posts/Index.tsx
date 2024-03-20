import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useRef, useState } from 'react';
import { pickBy } from 'lodash';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default function PostsPage({ auth }: PageProps) {
    // data props
    const { categories, posts, flash }: any = usePage().props;
    const perpage = useRef(posts.per_page);
    const [isLoading, setIsLaoding] = useState(false);
    const [search, setSearch] = useState('');
    const filter = useRef(posts.filter);

    const handleChangePerPage = (e: any) => {
        perpage.current = e.target.value;
        getData();
    }

    const handleFilter = (e: any) => {
        filter.current = e.target.value;
        getData();
    }

    const handleSearch = (e: any) => {
        e.preventDefault();
        getData();
    }

    const getData = () => {
        setIsLaoding(true);
        router.get(
            route('posts.index'),
            pickBy(
                {
                    perpage: perpage.current,
                    search: search,
                    filter: filter.current
                }
            ),
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLaoding(false)
            }
        )
    }

    const deleteData = async (id: number) => {
        await router.delete(`posts/${id}/delete`);
    }

    const deteleDataConfirm = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this data. This action cannot be undone.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>
            }
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Link href='/posts/create' className='m-2 px-3 py-2 text-sm text-center inline-flex items-center text-white font-semibold bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add Post</Link>
                        <div className="max-w-2xl mx-2 m-2">
                            <div className="flex">
                                <select defaultValue={perpage.current} onChange={handleChangePerPage} id="countries" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                    <option value={10} defaultChecked>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                                <select defaultValue={filter.current} onChange={handleFilter} name='filter' id="filter" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                    <option value="" defaultChecked>All</option>
                                    {categories && categories.map((category: any) => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                                <form onSubmit={handleSearch} className="relative w-full">
                                    <input value={search} onChange={(e: any) => setSearch(e.target.value)} name='search' type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm bg-gray-50 rounded-e-lg border-s-gray-50 border-s-1 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 focus:outline-none focus-visible:outline-none" placeholder="Search Postss..." />
                                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-500 rounded-e-lg border border-blue-600 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        No.
                                    </th>
                                    <th scope="col" className="px-2 py-3 w-2/5">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 flex justify-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.data.map((data: any, index: number) => (
                                    <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {posts.from + index}
                                        </th>
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-2/5">
                                            {data.title} {console.log('imagae list', data.image)}
                                        </th>

                                        <td className="px-6 py-4">
                                            <img src={`/storage/${data.image}`} alt="Image" className="w-32 bg-gray-50 rounded-sm" />
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">
                                            {data.category.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <Link href={`/posts/${data.id}/detail`} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                    Detail
                                                </Link>
                                                <Link href={`/posts/${data.id}/edit`} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Edit
                                                </Link>
                                                <button onClick={() => deteleDataConfirm(data.id)} className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                        {isLoading ?
                            <div className="flex items-center justify-center m-2">
                                <p className='font-semibold'>Loading..</p>
                            </div>
                            :
                            posts.data <= 0 &&
                            <div className="flex items-center justify-center m-2">
                                <p className='font-semibold'>Data not found!</p>
                            </div>
                        }
                        <div className="flex items-center justify-between m-2">
                            <div className="">
                                Showing {posts.from} to {posts.from} total{" "} {posts.total}
                            </div>
                            <div className="flex items-center gap-2">
                                {posts.links.map((link: any, index: any) => (
                                    <Link key={index} href={link.url} className='bg-blue-900 text-white p-2 text-sm rounded' preserveScroll preserveState>
                                        <div dangerouslySetInnerHTML={
                                            {
                                                __html: link.label,
                                            }
                                        } />
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
