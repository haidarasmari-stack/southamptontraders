import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Admin from "@/pages/Admin";
import BrowseLanding from "@/pages/BrowseLanding";
import BuilderArea from "@/pages/BuilderArea";
import BuilderProfile from "@/pages/BuilderProfile";
import BusinessListing from "@/pages/BusinessListing";
import ContentPages from "@/pages/ContentPages";
import Directory from "@/pages/Directory";
import Home from "@/pages/Home";
import HomeExtensionGuide from "@/pages/HomeExtensionGuide";
import HomeownerGuides from "@/pages/HomeownerGuides";
import LoftConversionGuide from "@/pages/LoftConversionGuide";
import CheckingABuilderGuide from "@/pages/CheckingABuilderGuide";
import ProjectBrief from "@/pages/ProjectBrief";
import ServiceAreaLanding from "@/pages/ServiceAreaLanding";
import Shortlist from "@/pages/Shortlist";
import { ShortlistProvider } from "@/contexts/ShortlistContext";
import NotFound from "@/pages/NotFound";
import QuoteRequest from "@/pages/QuoteRequest";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteFrame from "./components/SiteFrame";
import { ThemeProvider } from "./contexts/ThemeContext";

function ServiceLanding() { return <BrowseLanding kind="service" />; }
function LocationLanding() { return <BrowseLanding kind="location" />; }

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/builders/:location/" component={Directory} />
    <Route path="/builder/reds-builders-limited/" component={BusinessListing} />
    <Route path="/builder/:slug/" component={BuilderProfile} />
    <Route path="/services/:slug/:area/" component={ServiceAreaLanding} />
    <Route path="/services/:slug/" component={ServiceLanding} />
    <Route path="/locations/:slug/" component={LocationLanding} />
    <Route path="/request-quote/" component={QuoteRequest} />
    <Route path="/project-brief/" component={ProjectBrief} />
    <Route path="/homeowner-guides/" component={HomeownerGuides} />
    <Route path="/guides/home-extension-planning/" component={HomeExtensionGuide} />
    <Route path="/guides/loft-conversion/" component={LoftConversionGuide} />
    <Route path="/guides/checking-a-builder/" component={CheckingABuilderGuide} />
    <Route path="/shortlist/" component={Shortlist} />
    <Route path="/builder-area/" component={BuilderArea} />
    <Route path="/admin/" component={Admin} />
    <Route path="/404" component={NotFound} />
    <Route path="/:slug/" component={ContentPages} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><ShortlistProvider><SiteFrame><Router /></SiteFrame></ShortlistProvider></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
