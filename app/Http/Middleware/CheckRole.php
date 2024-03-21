<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // akses admin
        if ($role == 'superAdmin' && auth()->user()->role != 'superAdmin') {
            abort(403);
        }
        // akses guest
        if ($role == 'admin' && auth()->user()->role != 'admin' && auth()->user()->role != 'superAdmin') {
            abort(403);
        }
        // akses user
        if ($role == 'user' && auth()->user()->role != 'user') {
            abort(403);
        }
        return $next($request);
    }
}
