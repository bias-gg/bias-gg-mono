import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Collection from "@/pages/Collection";
import Wishlist from "@/pages/Wishlist";
import Trade from "@/pages/Trade";
import TradeArtist from "./pages/TradeArtist";
import Admin from "./pages/Admin";
import { AdminProvider } from "./contexts/AdminContext";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/trade/:artistId" element={<TradeArtist />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/group/:groupId" element={<GroupDetail />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
