import { BrowserRouter, Route, Routes } from "react-router-dom";
import Collection from "@/pages/Collection";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Trade from "@/pages/Trade";
import Wishlist from "@/pages/Wishlist";
import { AppProviders } from "./components/AppProviders";
import Admin from "./pages/Admin";
import GroupDetail from "./pages/GroupDetails";
import Groups from "./pages/Groups";
import TradeArtist from "./pages/TradeArtist";

const App = () => (
	<AppProviders>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/collection" element={<Collection />} />
				<Route path="/wishlist" element={<Wishlist />} />
				<Route path="/trade" element={<Trade />} />
				<Route path="/trade/:artistId" element={<TradeArtist />} />
				<Route path="/groups" element={<Groups />} />
				<Route path="/groups/:groupId" element={<GroupDetail />} />

				{/* Admin Routes */}
				<Route path="/admin" element={<Admin />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</AppProviders>
);

export default App;
