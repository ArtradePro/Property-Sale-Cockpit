import { Shell } from '@/components/layout/Shell';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { StatusBadge } from '@/components/ui/Badge';
import { getLegalItems, calculateLegalProgress } from '@/lib/data';
import { CheckCircle2, Clock, AlertCircle, MinusCircle } from 'lucide-react';

export default function LegalPage() {
  const items = getLegalItems();
  const progress = calculateLegalProgress(items);
  
  // Group by category
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
  
  const statusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'not-required': return <MinusCircle className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };
  
  return (
    <Shell
      title="Legal & Compliance"
      description="Track documents and certificates required for transfer"
    >
      {/* Progress Overview */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>Overall Readiness</CardTitle>
            <CardDescription>Completed items vs. required items</CardDescription>
          </div>
          <div className="text-3xl font-bold text-gray-900">{progress}%</div>
        </div>
        <Progress value={progress} showPercentage={false} />
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          {[
            { status: 'complete', label: 'Complete', color: 'text-green-600' },
            { status: 'in-progress', label: 'In Progress', color: 'text-blue-600' },
            { status: 'pending', label: 'Pending', color: 'text-yellow-600' },
            { status: 'not-required', label: 'Not Required', color: 'text-gray-400' },
          ].map(({ status, label, color }) => (
            <div key={status} className="text-center">
              <div className={`text-2xl font-bold ${color}`}>
                {items.filter(i => i.status === status).length}
              </div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Checklist by Category */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([category, categoryItems]) => (
          <Card key={category}>
            <CardTitle>{category}</CardTitle>
            
            <div className="mt-4 divide-y">
              {categoryItems.map(item => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {statusIcon(item.status)}
                      <div>
                        <div className="font-medium text-gray-900">{item.item}</div>
                        {item.notes && (
                          <div className="text-sm text-gray-500 mt-1">{item.notes}</div>
                        )}
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      
      {/* Instructions */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardTitle>How to Update</CardTitle>
        <p className="text-sm text-gray-700 mt-2">
          Edit <code className="bg-white px-1 py-0.5 rounded">data/legal.json</code> to update statuses.
          Change <code className="bg-white px-1 py-0.5 rounded">status</code> to: pending, in-progress, complete, or not-required.
        </p>
      </Card>
    </Shell>
  );
}
