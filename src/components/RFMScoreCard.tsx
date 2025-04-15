
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface RFMScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  description: string;
}

const RFMScoreCard = ({ title, score, maxScore, description }: RFMScoreCardProps) => {
  const percentage = (score / maxScore) * 100;
  
  const getProgressColor = (percent: number) => {
    if (percent >= 80) return 'bg-green-500';
    if (percent >= 60) return 'bg-blue-500';
    if (percent >= 40) return 'bg-yellow-500';
    if (percent >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold">{score}</span>
          <span className="text-sm text-muted-foreground">/ {maxScore}</span>
        </div>
        <Progress value={percentage} className={cn("h-2", getProgressColor(percentage))} />
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default RFMScoreCard;
