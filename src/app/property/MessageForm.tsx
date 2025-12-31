"use client";
import { useState } from 'react';

export function MessageForm({ sellerEmail }: { sellerEmail: string }) {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: '', // TODO: get current user email from session
          to: sellerEmail,
          content,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setContent('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message');
      }
    } catch {
      setError('Failed to send message');
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label htmlFor="message-content" className="block font-semibold mb-1">Message to Seller</label>
      <textarea
        id="message-content"
        className="w-full border rounded p-2 mb-2 focus:outline-blue-600"
        rows={3}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your message to the seller..."
        required
        disabled={sending}
        aria-label="Message to Seller"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded focus:outline-blue-600 active:bg-blue-700"
        disabled={sending}
        aria-disabled={sending}
        style={{ touchAction: 'manipulation' }}
      >Send Message</button>
      {success && <div className="text-green-600 mt-2">Message sent!</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
}
