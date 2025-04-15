
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Recommendation } from '@/types';
import { CheckCircle2, TrendingUp, Users, RotateCcw, Rocket } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Low':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Growth':
        return <Rocket className="h-5 w-5" />;
      case 'Retention':
        return <Users className="h-5 w-5" />;
      case 'Reactivation':
        return <RotateCcw className="h-5 w-5" />;
      case 'Promotion':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <CheckCircle2 className="h-5 w-5" />;
    }
  };

  return (
    <Card className="card-hover h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{recommendation.title}</CardTitle>
          <Badge variant="outline" className={getImpactColor(recommendation.impact)}>
            {recommendation.impact}
          </Badge>
        </div>
        <CardDescription className="pt-2">
          {recommendation.segment && (
            <Badge variant="secondary" className="mb-2">
              Segmento: {recommendation.segment}
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
      </CardContent>
      <CardFooter className="pt-2 pb-4 flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          {getCategoryIcon(recommendation.category)}
          <span className="ml-1">{recommendation.category}</span>
        </div>
        <Button size="sm">Implementar</Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
