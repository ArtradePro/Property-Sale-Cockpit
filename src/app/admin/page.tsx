
import { useSession } from 'next-auth/react';
import { Shell } from '@/components/layout/Shell';
import { Card } from '@/components/ui/Card';
import { getProperty, getDashboardStats } from '@/lib/data';
import { getUsers, User } from '@/lib/users';

export default function AdminDashboard() {
  const { data: session } = useSession();
  if (!session || session.user.role !== 'admin') {
    return <Shell title="Admin Dashboard"><Card>You do not have access to this page.</Card></Shell>;
  }
  const property = getProperty();
  const users = getUsers();
  const stats = getDashboardStats();
  return (
    <Shell title="Admin Dashboard">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold mb-2">Manage Properties</h2>
          <div>
            <div className="font-bold">{property.headline}</div>
            <div>Status: {property.status}</div>
            <div>Price: {property.askingPrice}</div>
            <div>Bedrooms: {property.bedrooms}</div>
            <div>Bathrooms: {property.bathrooms}</div>
            <div>Garages: {property.garages}</div>
            <button
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => {
                // Example: update price
                const newPrice = prompt('Enter new price:', property.askingPrice.toString());
                if (newPrice) {
                  fetch('/api/admin-update-property', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...property, askingPrice: Number(newPrice) }),
                  }).then(() => window.location.reload());
                }
              }}
            >Edit Price</button>
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold mb-2">Manage Users</h2>
          <ul>
            {users.map((user: User) => (
              <li key={user.id} className="mb-2 flex items-center justify-between">
                <span><span className="font-bold">{user.name}</span> ({user.email}) - <span>{user.role}</span></span>
                {user.role !== 'admin' && (
                  <button
                    className="ml-4 px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => {
                      if (confirm(`Delete user ${user.name}?`)) {
                        fetch('/api/admin-delete-user', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: user.id }),
                        }).then(() => window.location.reload());
                      }
                    }}
                  >Delete</button>
                )}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-semibold mb-2">Analytics</h2>
          <div>
            <div>Legal Progress: <span className="font-bold">{stats.legalProgress}%</span></div>
            <div>Marketing Progress: <span className="font-bold">{stats.marketingProgress}%</span></div>
            <div>Active Buyers: <span className="font-bold">{stats.activeBuyers}</span></div>
            <div>Viewings Scheduled: <span className="font-bold">{stats.viewingsScheduled}</span></div>
            <div>Offers Received: <span className="font-bold">{stats.offersReceived}</span></div>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
