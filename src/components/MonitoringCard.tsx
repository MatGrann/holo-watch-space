import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MonitoringCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  type: 'critical' | 'warning' | 'success' | 'info' | 'offline';
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

const cardTypeStyles = {
  critical: "card-critical",
  warning: "card-warning", 
  success: "card-success",
  info: "card-info",
  offline: "bg-offline-warning-bg border-offline-warning/20"
};

const iconTypeStyles = {
  critical: "text-critical-alarm",
  warning: "text-warning-condition",
  success: "text-success-normal", 
  info: "text-info-general",
  offline: "text-offline-warning"
};

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-muted rounded mb-2"></div>
    <div className="h-12 bg-muted rounded mb-4"></div>
    <div className="h-9 bg-muted rounded"></div>
  </div>
);

export function MonitoringCard({ 
  title, 
  value, 
  icon: Icon, 
  type, 
  isLoading = false,
  onClick,
  className 
}: MonitoringCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        cardTypeStyles[type],
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          <Icon className={cn("h-5 w-5", iconTypeStyles[type])} />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="text-3xl font-bold mb-4 tabular-nums">
              {value.toLocaleString()}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              Ver Detalhes
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}