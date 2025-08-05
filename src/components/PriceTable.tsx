import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceItem {
  destination: string;
  price: string;
}

interface PriceTableProps {
  title: string;
  subtitle?: string;
  prices: PriceItem[];
}

const PriceTable = ({ title, subtitle, prices }: PriceTableProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-xl text-center">{title}</CardTitle>
        {subtitle && (
          <p className="text-muted-foreground text-center text-sm">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {prices.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 hover:bg-muted/20 transition-colors">
              <span className="font-medium text-foreground">{item.destination}</span>
              <span className="font-bold text-primary text-lg">{item.price}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTable;