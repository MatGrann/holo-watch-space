import { useState, useEffect } from "react";
import { 
  AlertTriangle, 
  AlertCircle,
  CheckCircle,
  Building2,
  Activity,
  WifiOff,
  BarChart3
} from "lucide-react";
import { MonitoringCard } from "@/components/MonitoringCard";
import { StoreSelector } from "@/components/StoreSelector";
import { StorePlantMap } from "@/components/StorePlantMap";
import { MultiStoreChart } from "@/components/MultiStoreChart";
import { HelpDesk } from "@/components/HelpDesk";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface DashboardData {
  single: {
    totalSensors: number;
    totalAlarms: number;
    totalConditions: number;
  };
  multiple: {
    totalStores: number;
    totalAlarms: number;
    totalConditions: number;
    offlineStores: number;
  };
}

const Index = () => {
  const [selectedProfile, setSelectedProfile] = useState<'single' | 'multiple'>('single');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    single: {
      totalSensors: 0,
      totalAlarms: 0,
      totalConditions: 0
    },
    multiple: {
      totalStores: 0,
      totalAlarms: 0,
      totalConditions: 0,
      offlineStores: 0
    }
  });

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        single: {
          totalSensors: 15,
          totalAlarms: 3,
          totalConditions: 8
        },
        multiple: {
          totalStores: 6,
          totalAlarms: 15,
          totalConditions: 41,
          offlineStores: 1
        }
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (type: string) => {
    console.log(`Navegando para detalhes de: ${type}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Sistema de Monitoramento
              </h1>
              <p className="text-muted-foreground">
                Dashboard de controle e alertas em tempo real
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <StoreSelector 
                selectedProfile={selectedProfile}
                onProfileChange={setSelectedProfile}
              />
              
              {isLoading && (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm text-muted-foreground">
                    Carregando dados...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {selectedProfile === 'single' ? (
          <div className="space-y-8">
            {/* Single Store Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MonitoringCard
                title="Total de Sensores"
                value={data.single.totalSensors}
                icon={Activity}
                type="info"
                isLoading={isLoading}
                onClick={() => handleCardClick('sensores')}
              />
              
              <MonitoringCard
                title="Alarmes - Produto em Risco"
                value={data.single.totalAlarms}
                icon={AlertTriangle}
                type="critical"
                isLoading={isLoading}
                onClick={() => handleCardClick('alarmes')}
              />
              
              <MonitoringCard
                title="Condições em Aberto"
                value={data.single.totalConditions}
                icon={AlertCircle}
                type="warning"
                isLoading={isLoading}
                onClick={() => handleCardClick('condicoes')}
              />
            </div>

            {/* Store Plant Map */}
            {!isLoading && (
              <div className="fade-in">
                <StorePlantMap />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Multiple Stores Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MonitoringCard
                title="Total de Lojas"
                value={data.multiple.totalStores}
                icon={Building2}
                type="info"
                isLoading={isLoading}
                onClick={() => handleCardClick('lojas')}
              />
              
              <MonitoringCard
                title="Total de Alarmes"
                value={data.multiple.totalAlarms}
                icon={AlertTriangle}
                type="critical"
                isLoading={isLoading}
                onClick={() => handleCardClick('alarmes-geral')}
              />
              
              <MonitoringCard
                title="Total de Condições"
                value={data.multiple.totalConditions}
                icon={AlertCircle}
                type="warning"
                isLoading={isLoading}
                onClick={() => handleCardClick('condicoes-geral')}
              />
              
              <MonitoringCard
                title="Lojas Offline"
                value={data.multiple.offlineStores}
                icon={WifiOff}
                type="offline"
                isLoading={isLoading}
                onClick={() => handleCardClick('offline')}
              />
            </div>

            {/* Multi Store Chart */}
            {!isLoading && (
              <div className="fade-in">
                <MultiStoreChart />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Help Desk */}
      <HelpDesk />
    </div>
  );
};

export default Index;
