import { Card, CardHeader, CardTitle, CardContent} from '@/shared/components/ui/card';

interface GeneralTypeCard {
  title: string;
  description: string;
  type: string;
}

const GeneralTypeCard = ({ title, description}: GeneralTypeCard) => {
  return (
    <Card className="w-full max-w-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-col space-y-1">
        <CardTitle className="text-xl font-bold tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 w-full bg-slate-100 rounded-md mb-4">{description}</div>
        <p className="text-sm text-slate-600 line-clamp-2">
          LLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </CardContent>
    </Card>
  );
};

export default GeneralTypeCard;
