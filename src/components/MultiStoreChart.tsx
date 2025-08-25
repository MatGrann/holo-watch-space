import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

interface StoreData {
  name: string;
  alarmes: number;
  condicoes: number;
  sensores: number;
  status: 'online' | 'offline';
}

const mockStoreData: StoreData[] = [
  { name: "Loja Centro", alarmes: 3, condicoes: 8, sensores: 12, status: 'online' },
  { name: "Loja Shopping", alarmes: 1, condicoes: 4, sensores: 15, status: 'online' },
  { name: "Loja Norte", alarmes: 5, condicoes: 12, sensores: 18, status: 'online' },
  { name: "Loja Sul", alarmes: 0, condicoes: 2, sensores: 10, status: 'offline' },
  { name: "Loja Oeste", alarmes: 2, condicoes: 6, sensores: 14, status: 'online' },
  { name: "Loja Aeroporto", alarmes: 4, condicoes: 9, sensores: 16, status: 'online' }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function MultiStoreChart() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(mockStoreData.length / itemsPerPage);
  
  const currentData = mockStoreData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleBarClick = (data: any) => {
    setSelectedStore(data.name);
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Comparativo Entre Lojas - Alarmes vs Condições
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm text-muted-foreground px-2">
              {currentPage + 1} de {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onClick={handleBarClick}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Bar 
                dataKey="alarmes" 
                name="Alarmes Críticos"
                fill="hsl(var(--critical-alarm))"
                radius={[4, 4, 0, 0]}
                className="cursor-pointer hover:opacity-80"
              />
              
              <Bar 
                dataKey="condicoes" 
                name="Condições de Atenção"
                fill="hsl(var(--warning-condition))"
                radius={[4, 4, 0, 0]}
                className="cursor-pointer hover:opacity-80"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {selectedStore && (
          <div className="mt-4 p-4 bg-info-general-bg border border-info-general/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-info-general">
                  {selectedStore} - Navegação Rápida
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Clique para visualizar detalhes desta loja
                </p>
              </div>
              <Button size="sm" onClick={() => setSelectedStore(null)}>
                Acessar Loja
              </Button>
            </div>
          </div>
        )}
        
        {/* Store Status Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
          {mockStoreData.map((store) => (
            <div
              key={store.name}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                store.status === 'offline' 
                  ? 'bg-offline-warning-bg border-offline-warning/20' 
                  : 'bg-success-normal-bg border-success-normal/20'
              }`}
              onClick={() => setSelectedStore(store.name)}
            >
              <div className="text-xs font-medium mb-1">{store.name}</div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  store.status === 'offline' ? 'bg-offline-warning' : 'bg-success-normal'
                }`}></div>
                <span className="text-xs text-muted-foreground">
                  {store.status === 'offline' ? 'Offline' : 'Online'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}