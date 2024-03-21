<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);

        Category::create($data);

        //redirect
        return redirect()->route('categories.index')->with('message', 'Data successfuly saved!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categoryById = Category::where('id', $id)->first();
        return Inertia::render('Categories/Detail', [
            'categoryById' => $categoryById,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $categoryById = Category::findOrFail($id);
        return Inertia::render('Categories/Edit', [
            'categoryById' => $categoryById
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);

        // $category untuk variabel data category by id
        $category = Category::findOrFail($id);

        $category->update($data);

        //redirect
        return redirect()->route('categories.index')->with('message', 'Data successfuly update!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);

        // Menghapus post jika data motor yang ingin di hapus ada di post
        $post = Post::where('category_id', $id)->first(); // mencari data post berdasarkan plat_motor
        if ($post) {
            $post->delete();
        }

        // Hapus gambar terkait jika ada
        if ($post->image) {
            Storage::delete($post->image);
        }

        $category->delete();

        //redirect
        return redirect()->route('categories.index')->with('message', 'Data successfuly deleted!');
    }
}
