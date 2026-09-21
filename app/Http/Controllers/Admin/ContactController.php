<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ContactMessage::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $messages = $query->latest()->paginate(5)->withQueryString();

        $unreadCount = ContactMessage::where('status', 'Unread')->count();

        return Inertia::render('Admin/Contacts/Index', [
            'messages' => $messages,
            'unreadCount' => $unreadCount,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function updateStatus(Request $request, ContactMessage $message)
    {
        $validated = $request->validate([
            'status' => 'required|in:Unread,Read,Resolved',
        ]);

        $message->update($validated);

        return back()->with('success', "Message status changed to {$validated['status']}.");
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();
        return back()->with('success', 'Message deleted.');
    }
}
