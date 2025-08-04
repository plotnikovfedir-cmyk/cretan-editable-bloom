import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  url: string;
}

const BlogCard = ({ title, excerpt, image, url }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-foreground hover:text-primary transition-colors">
          <Link to={url}>{title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4">{excerpt}</p>
        <Link 
          to={url} 
          className="text-primary hover:text-primary-light font-medium inline-flex items-center"
        >
          Read More 
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;