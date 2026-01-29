<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Http\Requests\Admin\StoreMessageRequest;

class MessagesController extends Controller
{
    public function store(StoreMessageRequest $request)
    {
        $validated = $request->validated();
        $validated['body'] = $validated['message'];
        unset($validated['message']);

        $message = Message::create($validated);

        return response()->json(['message' => 'Message sent successfully!'], 201);
    }

    public function index(Request $request)
    {
        $messages = Message::latest()->paginate(20)->withQueryString();

        return Inertia::render('Admin/Messages', [
            'messages' => $messages,
            'user' => $request->user()?->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function show(Request $request, Message $message)
    {
        // mark as read (ensure persisting even if mass-assignment rules change)
        if (! $message->is_read) {
            $message->is_read = true;
            $message->save();
        }

        return Inertia::render('Admin/Messages/Show', [
            'message' => $message,
            'user' => $request->user()?->only(['id', 'name']),
        ]);
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with('success', 'Message deleted.');
    }

    public function destroyAll(Request $request)
    {
        return redirect('/admin/messages', 303);
    }
}
