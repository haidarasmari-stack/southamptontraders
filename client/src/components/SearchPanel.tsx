import { Search } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useLocation } from "wouter";
import { locations, services } from "@/data/catalog";

export default function SearchPanel({ compact = false }: { compact?: boolean }) {
  const [, setLocation] = useLocation();
  const [service, setService] = useState("");
  const [place, setPlace] = useState("southampton");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (service) params.set("service", service);
    const suffix = params.toString();
    setLocation(`/builders/${place || "southampton"}/${suffix ? `?${suffix}` : ""}`);
  }
  return <form className={`search-panel${compact ? " search-panel-compact" : ""}`} onSubmit={submit} aria-label="Search demo builders">
    <div className="search-field"><label htmlFor={compact ? "service-search-compact" : "service-search"}>What building work do you need?</label><select id={compact ? "service-search-compact" : "service-search"} value={service} onChange={(event) => setService(event.target.value)}><option value="">Choose a service</option>{services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></div>
    <div className="search-field search-place-field"><label htmlFor={compact ? "location-search-compact" : "location-search"}>Where?</label><select id={compact ? "location-search-compact" : "location-search"} value={place} onChange={(event) => setPlace(event.target.value)}>{locations.filter((item) => item.slug !== "nearby-hampshire").map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></div>
    <button className="button search-submit" type="submit"><Search size={18} aria-hidden="true" /><span>Find builders</span></button>
  </form>;
}
