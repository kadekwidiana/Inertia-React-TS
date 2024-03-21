<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with('category');
        $categories = Category::all();

        // Mengambil nilai dari request
        $search = $request->search;
        $filter = $request->filter;
        $perPage = $request->perpage ?? 10;

        // Jika ada pencarian, tambahkan kondisi pencarian ke query
        if ($search) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        // Jika ada filter, tambahkan kondisi filter ke query
        if ($filter) {
            $query->where(function ($innerQuery) use ($filter) {
                $innerQuery->where('category_id', $filter)
                    ->orWhereHas('category', function ($innerQuery) use ($filter) {
                        $innerQuery->where('name', 'like', '%' . $filter . '%');
                    });
            });
        }

        // Lakukan paginasi dengan query yang sudah disesuaikan
        $posts = $query->paginate($perPage)->withQueryString();

        // Render halaman dengan menggunakan Inertia
        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Posts/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'category_id' => 'required',
            'image' => 'required',
            'description' => 'required'
        ]);

        if ($request->file('image')) {
            $data['image'] = $request->file('image')->store('post-image');
        }

        Post::create($data);
        // dd($data);

        //redirect
        return redirect()->route('posts.index')->with('message', 'Data successfuly saved!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $postById = Post::with('category')->where('id', $id)->first();
        $categories = Category::all();
        return Inertia::render('Posts/Detail', [
            'postById' => $postById,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $postById = Post::findOrFail($id);
        $categories = Category::all();
        return Inertia::render('Posts/Edit', [
            'postById' => $postById,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'title' => 'required',
            'category_id' => 'required',
            'image' => 'required',
            'description' => 'required'
        ]);

        // $post untuk variabel data post by id
        $post = Post::findOrFail($id);

        if ($request->file('image')) {
            // $post sesuai dengan model nama di model nya
            if ($post->image) {
                Storage::delete($post->image);
            }
            $data['image'] = $request->file('image')->store('post-image');
        }

        $post->update($data);

        //redirect
        return redirect()->route('posts.index')->with('message', 'Data successfuly update!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);

        // Hapus gambar terkait jika ada
        if ($post->image) {
            Storage::delete($post->image);
        }

        $post->delete();

        //redirect
        return redirect()->route('posts.index')->with('message', 'Data successfuly deleted!');
    }
}
