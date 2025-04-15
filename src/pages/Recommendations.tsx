
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import RecommendationCard from '@/components/RecommendationCard';
import { recommendations } from '@/data/mockData';

const RecommendationsPage = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [impactFilter, setImpactFilter] = useState('all');

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesCategory = categoryFilter === 'all' || rec.category === categoryFilter;
    const matchesImpact = impactFilter === 'all' || rec.impact === impactFilter;
    return matchesCategory && matchesImpact;
  });

  const highImpactRecs = recommendations.filter(rec => rec.impact === 'High');
  const retentionRecs = recommendations.filter(rec => rec.category === 'Retention');
  const reactivationRecs = recommendations.filter(rec => rec.category === 'Reactivation');
  const growthRecs = recommendations.filter(rec => rec.category === 'Growth');

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recomendaciones Inteligentes</h1>
          <p className="text-muted-foreground mt-1">
            Estrategias automatizadas basadas en análisis RFM y LTV
          </p>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="high-impact">Alto Impacto</TabsTrigger>
              <TabsTrigger value="retention">Retención</TabsTrigger>
              <TabsTrigger value="reactivation">Reactivación</TabsTrigger>
              <TabsTrigger value="growth">Crecimiento</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="Promotion">Promoción</SelectItem>
                  <SelectItem value="Retention">Retención</SelectItem>
                  <SelectItem value="Reactivation">Reactivación</SelectItem>
                  <SelectItem value="Growth">Crecimiento</SelectItem>
                </SelectContent>
              </Select>
              <Select value={impactFilter} onValueChange={setImpactFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Impacto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los impactos</SelectItem>
                  <SelectItem value="High">Alto</SelectItem>
                  <SelectItem value="Medium">Medio</SelectItem>
                  <SelectItem value="Low">Bajo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRecommendations.map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
                </div>
                {filteredRecommendations.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No se encontraron recomendaciones que coincidan con los filtros seleccionados.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="high-impact">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {highImpactRecs.map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
                </div>
                {highImpactRecs.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No hay recomendaciones de alto impacto disponibles actualmente.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="retention">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {retentionRecs.map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
                </div>
                {retentionRecs.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No hay recomendaciones de retención disponibles actualmente.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reactivation">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {reactivationRecs.map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
                </div>
                {reactivationRecs.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No hay recomendaciones de reactivación disponibles actualmente.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="growth">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {growthRecs.map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
                </div>
                {growthRecs.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No hay recomendaciones de crecimiento disponibles actualmente.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RecommendationsPage;
