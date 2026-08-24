'use client';
import React, { useEffect, useState, useRef } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import { UserPreferences } from './SettingsPanel';
import { SpeechEngine } from './SpeechEngine';
import { zoekDepartement, zoekNaderendEvent } from '@/lib/navigatie/geo-helpers';
import { streekVerhalen } from '@/lib/navigatie/streek-verhalen';

// Zorg dat de standaard Leaflet-stijlen worden ingeladen
import 'leaflet/dist/leaflet.css';

interface NavigationMapProps {
  preferences: UserPreferences;
  destination: string;
  onEmergency: () => void;
}

export default function NavigationMap({ preferences, destination, onEmergency }: NavigationMapProps) {
  const [currentRegion, setCurrentRegion] = useState('Zoeken...');
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [bisonAlert, setBisonAlert] = useState<string | null>(null);

  // Refs voor Leaflet DOM-instanties en afspeel-logs
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const geoWatchIdRef = useRef<number | null>(null);
  const afgespeeldeRegios = useRef<string[]>([]);
  const afgespeeldeEvents = useRef<string[]>([]);
  const afgespeeldeBisonAlerts = useRef<string[]>([]);

  useEffect(() => {
    // Controleer live Bison Futé Incidenten
    // TODO: dit is nog een gesimuleerde/gemockte melding, geen echte koppeling met
    // de open-data-feed van de Franse verkeerscentrale (data.gouv.fr).
    const controleerBisonFuteLive = async () => {
      try {
        const mockIncident = {
          id: "bison-10492",
          weg: "A26",
          omschrijving: "Verzadigd verkeer over vier kilometer vanwege wegwerkzaamheden bij het knooppunt.",
          verhaalNL: "Bison Futé meldt een actuele file van vier kilometer op de A26 vanwege wegwerkzaamheden. Verwachte vertraging is twintig minuten.",
        };

        if (!afgespeeldeBisonAlerts.current.includes(mockIncident.id)) {
          afgespeeldeBisonAlerts.current.push(mockIncident.id);
          setBisonAlert(`🚨 Verkeer (${mockIncident.weg}): ${mockIncident.omschrijving}`);

          // De Safety-stem heeft altijd voorrang bij acute verkeershinder
          SpeechEngine.speakMixedSentence([
            { text: "Let op! ", lang: "nl-NL", priority: "safety" },
            { text: mockIncident.verhaalNL, lang: "nl-NL", priority: "safety" }
          ], preferences.audioMode);
        }
      } catch (error) {
        console.error("Bison Futé API fout:", error);
      }
    };

    // Welkomstbericht bij start van de rit
    SpeechEngine.speakMixedSentence([
      { text: 'Navigatie gestart, richting', lang: 'nl-NL', priority: 'safety' },
      { text: destination, lang: 'fr-FR', priority: 'safety' },
      { text: 'Veiligheid staat voorop.', lang: 'nl-NL', priority: 'safety' }
    ], preferences.audioMode);

    const startKaartEnGPS = async () => {
      // Lazy load Leaflet uitsluitend client-side om SSR-fouten te voorkomen
      const L = await import('leaflet');

      // Fix voor ontbrekende marker-assets in Next.js/Webpack builds
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!("geolocation" in navigator)) {
        setGpsError("GPS wordt niet ondersteund.");
        return;
      }

      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentCoords({ lat: latitude, lng: longitude });
          setGpsError(null);

          // A. Leaflet instantie aanmaken of positie updaten
          const eersteLocatiefix = !mapRef.current;
          if (!mapRef.current) {
            // zoomControl: false dwingt ons om onze eigen grote seniorenknoppen te gebruiken
            mapRef.current = L.map('leaflet-map-container', { zoomControl: false }).setView([latitude, longitude], 14);

            // Rustige, hoog-contrast reiskaart van CartoDB Voyager (OpenStreetMap data)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
              attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
              maxZoom: 18
            }).addTo(mapRef.current);

            markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
          } else {
            mapRef.current.setView([latitude, longitude]);
            markerRef.current?.setLatLng([latitude, longitude]);
          }

          // B. Live data-pijplijn controleren: Departementen (Streekgids)
          const deptCode = await zoekDepartement(longitude, latitude);
          if (deptCode) {
            const streek = streekVerhalen[deptCode];
            if (streek && !afgespeeldeRegios.current.includes(deptCode)) {
              afgespeeldeRegios.current.push(deptCode);
              setCurrentRegion(`${streek.naam} (${deptCode})`);

              SpeechEngine.speakMixedSentence([
                { text: 'U rijdt nu het departement', lang: 'nl-NL', priority: 'info' },
                { text: streek.naam, lang: 'fr-FR', priority: 'info' },
                { text: `binnen. ${streek.verhaal}`, lang: 'nl-NL', priority: 'info' }
              ], preferences.audioMode);
            }
          } else {
            setCurrentRegion('Frankrijk (Transit)');
          }

          // C. Live data-pijplijn controleren: Wekelijkse Markten
          const naderendEvent = zoekNaderendEvent(longitude, latitude);
          if (naderendEvent && !afgespeeldeEvents.current.includes(naderendEvent.id)) {
            afgespeeldeEvents.current.push(naderendEvent.id);

            SpeechEngine.speakMixedSentence([
              { text: `Let op, u nadert ${naderendEvent.dorp}. `, lang: 'nl-NL', priority: 'info' },
              { text: naderendEvent.verhaal, lang: 'nl-NL', priority: 'info' }
            ], preferences.audioMode);
          }

          // D. Live data-pijplijn controleren: Realtime Bison Futé verkeer
          // Niet op de allereerste locatiefix: die zou als safety-melding het
          // welkomstbericht (ook safety) meteen afkappen, nog voor het goed en
          // wel begonnen is.
          if (!eersteLocatiefix && (preferences.radioCast || preferences.audioMode !== 'stil')) {
            await controleerBisonFuteLive();
          }
        },
        (error) => {
          console.error("GPS Verbindingsfout:", error);
          setGpsError("Wachten op satelliet-signaal...");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );

      geoWatchIdRef.current = watchId;
    };

    startKaartEnGPS();

    return () => {
      if (geoWatchIdRef.current !== null) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
        geoWatchIdRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      SpeechEngine.stopAll();
    };
  }, [destination, preferences.audioMode, preferences.radioCast]);

  const zoomIn = () => { mapRef.current?.zoomIn(); };
  const zoomOut = () => { mapRef.current?.zoomOut(); };

  return (
    <div className="relative flex flex-col h-screen bg-slate-900 text-white overflow-hidden">

      {/* BOVENBALK: Route & Live Bison Indicator */}
      <div className="bg-blue-950 p-5 shadow-lg border-b border-blue-900 z-20 flex justify-between items-center">
        <div className="truncate mr-4">
          <span className="text-slate-400 text-sm font-bold uppercase tracking-wider block">Actieve Route</span>
          <span className="text-2xl font-black block mt-1 truncate">Richting <span className="text-emerald-400 font-serif italic">{destination}</span></span>
        </div>
        <div className="bg-white text-slate-900 p-3 rounded-full w-14 h-14 flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-slate-300 shrink-0">
          130
        </div>
      </div>

      {/* MIDDEN: Leaflet Kaart en Overlays */}
      <div className="flex-1 relative z-10">
        <div id="leaflet-map-container" className="w-full h-full bg-slate-800" />

        {/* DRINGENDE WAARSCHUWINGEN OVERLAY (BISON FUTÉ) */}
        <div className="absolute top-4 left-4 right-4 z-30 space-y-2 pointer-events-none">
          {gpsError && (
            <p className="text-amber-400 bg-amber-950/95 px-4 py-2.5 rounded-xl border border-amber-900 font-bold text-sm shadow-xl animate-pulse">
              ⚠️ {gpsError}
            </p>
          )}
          {bisonAlert && (
            <p className="text-white bg-red-950/95 px-4 py-2.5 rounded-xl border border-red-700 font-medium text-sm shadow-xl border-l-8 border-l-red-500">
              {bisonAlert}
            </p>
          )}
          {!gpsError && currentCoords && (
            <span className="inline-block text-emerald-400 bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-800 font-sans text-xs font-bold shadow-md">
              🛰️ Regio: {currentRegion}
            </span>
          )}
        </div>

        {/* SENIORNVRIENDELIJKE VERPLICHTE INZOOM-KNOPPEN */}
        <div className="absolute right-4 bottom-6 flex flex-col space-y-3 z-30">
          <button
            onClick={zoomIn}
            className="w-16 h-16 bg-white text-slate-900 rounded-2xl font-black text-4xl shadow-2xl flex items-center justify-center border-2 border-slate-300 active:bg-slate-100 pointer-events-auto"
            aria-label="Inzoomen"
          >
            +
          </button>
          <button
            onClick={zoomOut}
            className="w-16 h-16 bg-white text-slate-900 rounded-2xl font-black text-4xl shadow-2xl flex items-center justify-center border-2 border-slate-300 active:bg-slate-100 pointer-events-auto"
            aria-label="Uitzoomen"
          >
            -
          </button>
        </div>
      </div>

      {/* ONDERBALK: Veiligheid & Pechbediening */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-4 z-20">
        <button
          onClick={() => {
            SpeechEngine.stopAll();
            SpeechEngine.speakSegment({ text: 'Informatie gids gedempt.', lang: 'nl-NL', priority: 'safety' });
          }}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-4 rounded-xl text-lg flex items-center justify-center space-x-2"
        >
          <span>Gids Dempen</span>
        </button>

        <button
          onClick={onEmergency}
          className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-4 rounded-xl text-xl tracking-wide shadow-lg"
        >
          🚨 PECH / ALARM
        </button>
      </div>

    </div>
  );
}
