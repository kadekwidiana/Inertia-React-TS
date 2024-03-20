import React, { ChangeEvent } from 'react';

interface PreviewImageProps {
    // Jika Anda memiliki properti tambahan, tambahkan di sini
}

const PreviewImage: React.FC<PreviewImageProps> = () => {
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
        <div className="col-span-full">
            <label htmlFor="file_input">Upload Photo</label>
            <img className="img-preview img-fluid mb-3 col-sm-5 rounded sm:w-1/2" />
            <input type="file" id="photo" name="photo" onChange={previewImage} className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" aria-describedby="photo" />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="photo">SVG, PNG, or JPG (MAX. 5MB).</p>
        </div>
    );
};

export default PreviewImage;
