import { useState } from "react";
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface HelpOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
}

export function HelpDesk() {
  const [isOpen, setIsOpen] = useState(false);

  const helpOptions: HelpOption[] = [
    {
      id: "faq",
      title: "FAQ - Perguntas Frequentes",
      description: "Respostas para as dúvidas mais comuns sobre o sistema",
      icon: FileText,
      action: () => {
        console.log("Abrindo FAQ");
        setIsOpen(false);
      }
    },
    {
      id: "chat",
      title: "Chat de Suporte",
      description: "Converse em tempo real com nossa equipe",
      icon: MessageCircle,
      action: () => {
        console.log("Abrindo Chat");
        setIsOpen(false);
      }
    },
    {
      id: "phone",
      title: "Suporte por Telefone",
      description: "Ligue para (11) 3456-7890 - Seg à Sex, 8h às 18h",
      icon: Phone,
      action: () => {
        window.open("tel:+551134567890");
        setIsOpen(false);
      }
    },
    {
      id: "email",
      title: "Suporte por Email",
      description: "Envie sua dúvida para suporte@monitoramento.com",
      icon: Mail,
      action: () => {
        window.open("mailto:suporte@monitoramento.com");
        setIsOpen(false);
      }
    }
  ];

return (
  <>
    {/* Help Button */}
    <Button
      onClick={() => setIsOpen(true)}
      className={cn(
        "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg",
        "bg-green-600 hover:bg-green-700 text-white", // botão principal verde
        "transition-all duration-300 hover:scale-110"
      )}
      size="lg"
    >
      <HelpCircle className="h-6 w-6" />
    </Button>

    {/* Help Modal */}
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Modal Content */}
        <Card className="relative w-full max-w-md mx-4 fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <HelpCircle className="h-5 w-5 text-green-600" />
                Central de Ajuda
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:bg-green-100"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-2">
            {helpOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={option.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-4 h-auto hover:bg-green-50"
                    onClick={option.action}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-shrink-0">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm text-green-700">{option.title}</div>
                        <div className="text-xs text-green-600 mt-1">
                          {option.description}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-green-500 flex-shrink-0" />
                    </div>
                  </Button>
                  {index < helpOptions.length - 1 && <Separator className="my-1" />}
                </div>
              );
            })}
            
            <div className="pt-4 text-center">
              <div className="text-xs text-green-600">
                Sistema de Monitoramento v2.1.0
              </div>
              <div className="text-xs text-green-500 mt-1">
                Precisa de ajuda? Estamos aqui para apoiar você!
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )}
  </>
); }