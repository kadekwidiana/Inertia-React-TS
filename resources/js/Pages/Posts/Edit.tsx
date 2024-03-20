import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import PreviewImage from '@/Components/PriviewImage';
import { ChangeEvent, useState } from 'react';
import Swal from 'sweetalert2';

export default function EditPost({ auth }: PageProps) {
    // console.log(posts);
    const { categories, postById, errors }: any = usePage().props
    const { data, setData, post, put, progress, processing } = useForm({
        title: postById.title,
        category_id: postById.category_id,
        image: postById.image,
        description: postById.description,
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

    const submit = (e: any) => {
        e.preventDefault();
        // use method post, bcs put not working on upload file
        post(`/posts/${postById.id}/update`, {
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Data successfuly updated!",
                });
            }
        });
    }

    const previewImage = (event: ChangeEvent<HTMLInputElement>) => {
        const image = event.target;
        const imgPreview = document.querySelector(".img-preview") as HTMLImageElement;

        if (image.files && image.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e: ProgressEvent<FileReader>) {
                if (e.target?.result) {
                    imgPreview.src = e.target.result.toString();
                }
            };

            reader.readAsDataURL(image.files[0]);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Post</h2>
            }
        >
            <Head title="Edit Post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <Link href='/posts' className='m-2 px-3 py-2 text-sm text-center inline-flex items-center text-white font-semibold bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Back</Link>
                        <form onSubmit={submit} encType="multipart/form-data">
                            <div className="space-y-12">
                                <div className="sm:border-b border-gray-900/10 pb-12">
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        {/* Upload Photo */}
                                        {/* <PreviewImage></PreviewImage> */}
                                        <div className="col-span-full">
                                            <label htmlFor="file_input">Upload Photo</label>
                                            <img src={`/storage/${data.image}`} className="img-preview img-fluid mb-3 col-sm-5 rounded sm:w-1/2" />
                                            <input type="file" onChange={(e: any) => {
                                                previewImage(e);
                                                setData('image', e.target.files[0]);
                                            }} id="image" name="image" className={`${errors.image ? 'border border-red-500' : 'border border-gray-400'} p-3 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none focus-visible:outline-none file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary`} aria-describedby="image" />
                                            <p className={`${errors.image ? 'text-red-500' : ''} mt-1 text-sm text-gray-500 dark:text-gray-300" id="image`}>SVG, PNG, or JPG (MAX. 5MB).</p>
                                            {errors.image &&
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.image}</p>
                                            }
                                            {progress && (
                                                <progress value={progress.percentage} max="100" className='w-full'>
                                                    {progress.percentage}%
                                                </progress>
                                            )}
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="about" className=''>
                                                Title
                                            </label>
                                            <div className="mt-2">
                                                <textarea value={data.title} onChange={(e: any) => setData('title', e.target.value)}
                                                    id="title"
                                                    name="title"
                                                    rows={2}
                                                    className={`${errors.title ? 'border border-red-500' : 'border border-gray-400'} p-3 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none focus-visible:outline-none`}
                                                    placeholder='Enter title...'
                                                />
                                                {errors.title &&
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.title}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country">
                                                Category
                                            </label>
                                            <div className="mt-2">
                                                <select value={data.category_id} onChange={(e: any) => setData('category_id', e.target.value)}
                                                    id="category_id"
                                                    name="category_id"
                                                    autoComplete="country-name"
                                                    className={`${errors.category_id ? 'border border-red-500' : 'border border-gray-400'} p-3 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none focus-visible:outline-none`}
                                                >
                                                    {/* <option>-- Select category --</option> */}
                                                    {categories.map((category: any) => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))}
                                                </select>
                                                {errors.category_id &&
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.category_id}</p>
                                                }
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="about">
                                                Description
                                            </label>
                                            <div className="mt-2 mb-2">
                                                <textarea value={data.description} onChange={(e: any) => setData('description', e.target.value)}
                                                    id="description"
                                                    name="description"
                                                    rows={3}
                                                    className={`${errors.description ? 'border border-red-500' : 'border border-gray-400'} p-3 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none focus-visible:outline-none`}
                                                    placeholder='Enter description...'
                                                />
                                                {errors.description &&
                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.description}</p>
                                                }
                                                {/* <TextEditor></TextEditor> */}
                                            </div>
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
