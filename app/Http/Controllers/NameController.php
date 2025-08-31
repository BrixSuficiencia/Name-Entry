<?php

namespace App\Http\Controllers;

use App\Models\Name;
use Illuminate\Http\Request;

class NameController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string'
        ]);

        $name = Name::create($request->all());
        return response()->json($name, 201);
    }

    public function index()
    {
        return response()->json(Name::all());
    }
}
