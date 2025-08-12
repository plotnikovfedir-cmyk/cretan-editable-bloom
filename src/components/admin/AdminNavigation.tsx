import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

interface AdminNavigationProps {
  title: string;
  showBackButton?: boolean;
  backTo?: string;
}

const AdminNavigation = ({ title, showBackButton = true, backTo = "/admin/dashboard" }: AdminNavigationProps) => {
  const location = useLocation();
  
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link to={backTo}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
            </Link>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Главная
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminNavigation;