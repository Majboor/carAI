
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminNavLink } from "./AdminNavLink";
import { Bell, LayoutDashboard, Menu } from "lucide-react";
import ScrollNav from "./ScrollNav";
import { useNotifications } from "@/contexts/NotificationsContext";
import NotificationDropdown from "./NotificationDropdown";
import { MobileSidebar } from "./MobileSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

// Navigation data - Updated to point to search page with appropriate queries
const buyDropdownItems = [
  { title: "All cars for sale", href: "/search" },
  { title: "New cars", href: "/search?condition=new" },
  { title: "Used cars", href: "/search?condition=used" },
  { title: "Dealer cars", href: "/search?sellerType=dealer" },
  { title: "Private seller cars", href: "/search?sellerType=private" },
  { title: "Electric cars", href: "/search?fuelType=electric" },
  { title: "Finance", href: "/search?financeAvailable=true" },
  { title: "Inspections", href: "/search?inspected=true" },
];

// Updated sell dropdown items to all point to add-listing
const sellDropdownItems = [
  { title: "Create an ad", href: "/add-listing" },
  { title: "Get an Instant Offer™", href: "/add-listing" },
  { title: "Manage my ad", href: "/add-listing" },
  { title: "Value my car", href: "/value-my-car" },
];

const researchDropdownItems = [
  { title: "Research all cars", href: "/search?researchType=all" },
  { title: "All news and reviews", href: "/search?researchType=news-reviews" },
  { title: "News", href: "/search?researchType=news" },
  { title: "Reviews", href: "/search?researchType=reviews" },
  { title: "Advice", href: "/search?researchType=advice" },
  { title: "Best cars", href: "/search?researchType=best" },
  { title: "Owner reviews", href: "/search?researchType=owner-reviews" },
  { title: "Compare cars", href: "/search?researchType=compare" },
  { title: "Electric cars", href: "/search?fuelType=electric" },
  { title: "Car of the year", href: "/search?researchType=car-of-year" },
];

const showroomDropdownItems = [
  { title: "Showroom", href: "/search?showroom=all" },
  { title: "Electric cars", href: "/search?fuelType=electric" },
  { title: "Certified pre-owned", href: "/search?certified=true" },
  { title: "New car calendar", href: "/search?calendar=new" },
];

const popularMakes = [
  "Audi", "BMW", "Ford", "Holden", "Hyundai", "Kia", "Mazda",
  "Mercedes-Benz", "Mitsubishi", "Nissan", "Tesla", "Toyota"
];

const bodyTypes = [
  "Cab Chassis", "Convertible", "Coupe", "Hatch", "Sedan",
  "SUV", "Ute", "Van", "Wagon"
];

const locations = [
  "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"
];

export function Navbar() {
  const { user, signOut, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Show compact navbar when scrolled past 200px
      const isScrolled = window.scrollY > 200;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <>
      {/* Compact navbar that appears on scroll */}
      {scrolled && <ScrollNav visible={scrolled} />}
      
      {/* Main navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="mr-2"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <img 
                src="https://i.ibb.co/FqhBrfc1/Whats-App-Image-2025-04-24-at-16-33-19.jpg" 
                alt="Snap My Car"
                className="h-12 w-auto" 
              />
            </Link>
            <nav className="hidden md:flex gap-6 items-center">
              {/* Main Navigation Menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Buy Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Buy</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-3 p-4 w-[800px]">
                        <div>
                          <h3 className="font-medium mb-2 text-sm">Primary Links</h3>
                          <ul className="space-y-2">
                            {buyDropdownItems.map((item) => (
                              <li key={item.title}>
                                <Link to={item.href} className="text-sm hover:text-primary">
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2 text-sm">Popular Makes</h3>
                          <ul className="grid grid-cols-2 gap-2">
                            {popularMakes.map((make) => (
                              <li key={make}>
                                <Link to={`/search?make=${make}`} className="text-sm hover:text-primary">
                                  {make}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="mb-4">
                            <h3 className="font-medium mb-2 text-sm">Body Types</h3>
                            <ul className="grid grid-cols-2 gap-2">
                              {bodyTypes.map((type) => (
                                <li key={type}>
                                  <Link to={`/search?bodyType=${type}`} className="text-sm hover:text-primary">
                                    {type}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2 text-sm">Locations</h3>
                            <ul className="grid grid-cols-2 gap-2">
                              {locations.map((location) => (
                                <li key={location}>
                                  <Link to={`/search?location=${location}`} className="text-sm hover:text-primary">
                                    {location}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Sell Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Sell</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid p-4 w-[200px] gap-2">
                        {sellDropdownItems.map((item) => (
                          <li key={item.title}>
                            <Link to={item.href} className="text-sm hover:text-primary">
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Research Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Research</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 p-4 w-[600px]">
                        <div>
                          <h3 className="font-medium mb-2 text-sm">Research Links</h3>
                          <ul className="space-y-2">
                            {researchDropdownItems.map((item) => (
                              <li key={item.title}>
                                <Link to={item.href} className="text-sm hover:text-primary">
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2 text-sm">Popular Makes</h3>
                          <ul className="grid grid-cols-2 gap-2">
                            {popularMakes.map((make) => (
                              <li key={make}>
                                <Link to={`/search?make=${make}`} className="text-sm hover:text-primary">
                                  {make}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Showroom Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Showroom</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 p-4 w-[500px]">
                        <div>
                          <h3 className="font-medium mb-2 text-sm">Showroom Links</h3>
                          <ul className="space-y-2">
                            {showroomDropdownItems.map((item) => (
                              <li key={item.title}>
                                <Link to={item.href} className="text-sm hover:text-primary">
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2 text-sm">Popular Body Types</h3>
                          <ul className="space-y-2">
                            {bodyTypes.map((type) => (
                              <li key={type}>
                                <Link to={`/search?bodyType=${type}`} className="text-sm hover:text-primary">
                                  {type}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Value My Car (single link) */}
                  <NavigationMenuItem>
                    <Link to="/value-my-car" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      Value my car
                    </Link>
                  </NavigationMenuItem>
                  
                  {/* Snap-AI */}
                  <NavigationMenuItem>
                    <Link to="/snap-ai" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      Snap-AI
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <AdminNavLink />
            </nav>
          </div>
          
          {/* Logo for mobile */}
          <div className="md:hidden">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.ibb.co/FqhBrfc1/Whats-App-Image-2025-04-24-at-16-33-19.jpg" 
                alt="Snap My Car"
                className="h-10 w-auto" 
              />
            </Link>
          </div>
          
          {/* Right Side Utility Buttons */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center gap-2">
              {user && <NotificationDropdown />}
              
              {loading ? (
                <Button variant="ghost" size="sm" disabled>
                  Loading...
                </Button>
              ) : user ? (
                <div className="flex items-center gap-4">
                  {/* Dashboard Link */}
                  <Link to="/dashboard" className="flex items-center gap-1 text-sm text-gray-700 hover:text-primary">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link to="/add-listing">
                    <Button size="sm" className="px-4">
                      Add Listing
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-4"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/auth">
                    <Button size="sm" variant="ghost">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/add-listing">
                    <Button size="sm" variant="default" className="ml-2">
                      Sell my car
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Sheet - Only shown when trigger is clicked */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 w-[85%] max-w-[300px]">
          <MobileSidebar onNavItemClick={() => setIsMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}

// Need to add a default export to match the import in Index.tsx
export default Navbar;
