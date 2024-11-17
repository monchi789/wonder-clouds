import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/ui/card';
import { CalendarDays } from 'lucide-react';

interface PostsCard {
  title: string;
  portada: string,
  date: string;
}

const PostsCard = ({ title, portada, date }: PostsCard) => {
  return (
    <Card className="w-full max-w-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-col space-y-1">
        <CardTitle className="text-xl font-bold tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 w-full bg-slate-100 rounded-md mb-4">{portada}</div>
        <p className="text-sm text-slate-600 line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-sm text-slate-500">
          <CalendarDays className="h-4 w-4 mr-2" />
          {date}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostsCard;