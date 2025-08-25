import { useState } from "react";
import { Building, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StoreSelectorProps {
  selectedProfile: 'single' | 'multiple';
  onProfileChange: (profile: 'single' | 'multiple') => void;
}

export function StoreSelector({ selectedProfile, onProfileChange }: StoreSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
      <Button
        variant={selectedProfile === 'single' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onProfileChange('single')}
        className={cn(
          "flex items-center gap-2 transition-all duration-200",
          selectedProfile === 'single' 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "hover:bg-background"
        )}
      >
        <Building className="h-4 w-4" />
        Loja Única
      </Button>
      
      <Button
        variant={selectedProfile === 'multiple' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onProfileChange('multiple')}
        className={cn(
          "flex items-center gap-2 transition-all duration-200",
          selectedProfile === 'multiple' 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "hover:bg-background"
        )}
      >
        <Building2 className="h-4 w-4" />
        Várias Lojas
      </Button>
    </div>
  );
}