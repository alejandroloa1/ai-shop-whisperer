
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Customers from "./pages/Customers";
import RFMAnalysis from "./pages/RFMAnalysis";
import LTV from "./pages/LTV";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/segments" element={<Customers />} />
          <Route path="/audiences" element={<NotFound />} />
          <Route path="/campaigns" element={<NotFound />} />
          <Route path="/insights" element={<NotFound />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/ltv" element={<LTV />} />
          <Route path="/rfm-analysis" element={<RFMAnalysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
