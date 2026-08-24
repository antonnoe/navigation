'use client';
import React, { useState } from 'react';
import PreDrivePanel from '@/components/PreDrivePanel';
import SettingsPanel, { UserPreferences } from '@/components/SettingsPanel';
import NavigationMap from '@/components/NavigationMap';
import EmergencyButton from '@/components/EmergencyButton';

type AppStep = 'PRE_DRIVE' | 'SETTINGS' | 'NAVIGATION';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>('PRE_DRIVE');
  const [destination, setDestination] = useState('');
  const [showEmergency, setShowEmergency] = useState(false);

  const [preferences, setPreferences] = useState<UserPreferences>({
    audioMode: 'toergids',
    evCharging: false,
    dogFriendly: true,
    radioCast: true,
  });

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-200">

      {/* Fase 1: Pre-Drive Routeadvies */}
      {currentStep === 'PRE_DRIVE' && (
        <PreDrivePanel
          onRouteSelected={(dest) => {
            setDestination(dest);
            setCurrentStep('SETTINGS');
          }}
        />
      )}

      {/* Fase 2: Senioren Voorkeuren Dashboard */}
      {currentStep === 'SETTINGS' && (
        <SettingsPanel
          prefs={preferences}
          setPrefs={setPreferences}
          onStartRoute={() => setCurrentStep('NAVIGATION')}
        />
      )}

      {/* Fase 3: Live Navigatie & Kaart Omgeving */}
      {currentStep === 'NAVIGATION' && (
        <NavigationMap
          preferences={preferences}
          destination={destination}
          onEmergency={() => setShowEmergency(true)}
        />
      )}

      {/* Universele Safety-First Pech Overlay */}
      {showEmergency && (
        <EmergencyButton onClose={() => setShowEmergency(false)} />
      )}

    </main>
  );
}
