import React, { useEffect } from 'react'

export default function Test() {
    useEffect(() => {
        // Buat elemen <script> baru
        const script = document.createElement('script');

        // Tentukan sumber atau URL dari skrip JavaScript
        script.src = './test.js'; // Ganti dengan lokasi file skrip Anda

        // Tambahkan elemen <script> ke dalam body
        document.body.appendChild(script);

        // Membersihkan elemen <script> setelah komponen tidak lagi digunakan
        return () => {
            document.body.removeChild(script);
        };
    }, []); // [] menandakan bahwa efek hanya akan dijalankan sekali setelah komponen dirender

    return (
        <div>
            Hello
            <button id='buttonClick'>Click</button>
        </div>
    )
}
