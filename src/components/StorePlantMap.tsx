import { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Thermometer,
  Droplets,
  Wind,
  Zap,
  Building
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Sensor {
  id: string;
  name: string;
  type: 'temperature' | 'humidity' | 'air' | 'energy';
  status: 'critical' | 'warning' | 'normal';
  value: string;
  position: { x: number; y: number }; // Percentage positions
  risk?: string;
}

const mockSensors: Sensor[] = [
  {
    id: "temp001",
    name: "Sensor Temp. Câmara Fria 1",
    type: "temperature",
    status: "critical",
    value: "8°C",
    position: { x: 15, y: 25 },
    risk: "Produto em risco - Temperatura acima do limite"
  },
  {
    id: "temp002", 
    name: "Sensor Temp. Câmara Fria 2",
    type: "temperature",
    status: "normal",
    value: "2°C",
    position: { x: 45, y: 25 }
  },
  {
    id: "hum001",
    name: "Sensor Umidade Estoque",
    type: "humidity", 
    status: "warning",
    value: "75%",
    position: { x: 75, y: 40 },
    risk: "Umidade elevada - Monitorar"
  },
  {
    id: "air001",
    name: "Qualidade do Ar Área Vendas",
    type: "air",
    status: "normal", 
    value: "Boa",
    position: { x: 30, y: 70 }
  },
  {
    id: "energy001",
    name: "Monitor Energia Equipamentos",
    type: "energy",
    status: "normal",
    value: "Normal",
    position: { x: 60, y: 80 }
  }
];

const sensorIcons = {
  temperature: Thermometer,
  humidity: Droplets,
  air: Wind,
  energy: Zap
};

const sensorStatusStyles = {
  critical: "sensor-critical pulse-critical",
  warning: "sensor-warning pulse-warning", 
  normal: "sensor-normal"
};

export function StorePlantMap() {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

  const handleSensorClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Planta da Unidade - Sensores Ativos
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          {/* Store Layout Background */}
          <div className="relative w-full h-80 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-4">
            
            {/* Store Areas */}
            <div className="absolute top-4 left-4 w-32 h-20 bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-xs font-medium text-blue-700">
              Câmara Fria 1
            </div>
            
            <div className="absolute top-4 left-40 w-32 h-20 bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-xs font-medium text-blue-700">
              Câmara Fria 2  
            </div>
            
            <div className="absolute top-4 right-4 w-32 h-24 bg-orange-100 border border-orange-300 rounded flex items-center justify-center text-xs font-medium text-orange-700">
              Estoque
            </div>
            
            <div className="absolute bottom-16 left-4 right-4 h-16 bg-green-100 border border-green-300 rounded flex items-center justify-center text-xs font-medium text-green-700">
              Área de Vendas
            </div>
            
            <div className="absolute bottom-4 right-4 w-20 h-8 bg-yellow-100 border border-yellow-300 rounded flex items-center justify-center text-xs font-medium text-yellow-700">
              Energia
            </div>

            {/* Sensors */}
            {mockSensors.map((sensor) => {
              const Icon = sensorIcons[sensor.type];
              return (
                <div
                  key={sensor.id}
                  className={cn(
                    "absolute sensor-marker",
                    sensorStatusStyles[sensor.status]
                  )}
                  style={{
                    left: `${sensor.position.x}%`,
                    top: `${sensor.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleSensorClick(sensor)}
                  onMouseEnter={() => setSelectedSensor(sensor)}
                  onMouseLeave={() => setSelectedSensor(null)}
                >
                  <Icon className="h-4 w-4" />
                </div>
              );
            })}
          </div>

          {/* Sensor Details Tooltip */}
          {selectedSensor && (
            <Card className="absolute top-4 right-4 w-72 fade-in z-10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{selectedSensor.name}</CardTitle>
                  <Badge 
                    variant={selectedSensor.status === 'critical' ? 'destructive' : 
                            selectedSensor.status === 'warning' ? 'outline' : 'default'}
                  >
                    {selectedSensor.status === 'critical' ? 'Crítico' :
                     selectedSensor.status === 'warning' ? 'Atenção' : 'Normal'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valor atual:</span>
                    <span className="font-medium">{selectedSensor.value}</span>
                  </div>
                  
                  {selectedSensor.risk && (
                    <div className="p-2 bg-critical-alarm-bg border border-critical-alarm/20 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-critical-alarm mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-critical-alarm">{selectedSensor.risk}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-critical-alarm"></div>
            <span>Crítico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning-condition"></div>
            <span>Atenção</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success-normal"></div>
            <span>Normal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}