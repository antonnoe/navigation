'use client';
import React, { useEffect } from 'react';
import { SpeechEngine } from './SpeechEngine';

interface EmergencyButtonProps {
  onClose: () => void;
}

export default function EmergencyButton({ onClose }: EmergencyButtonProps) {
  const frenchLocationString = "Autoroute A26, Borne Kilométrique PR 142 point 2, Direction Saint-Quentin naar Reims.";

  useEffect(() => {
    // Spreek direct de instructie uit zodat ze weten wat ze moeten doen
    SpeechEngine.speakMixedSentence([
      { text: 'Noodmodus geactiveerd. Lees de grote Franse tekst op het scherm voor aan de hulpdiensten.', lang: 'nl-NL', priority: 'safety' }
    ], 'toergids');
  }, []);

  return (
    <div className="fixed inset-0 bg-red-950 text-white p-6 z-50 flex flex-col justify-between overflow-y-auto">

      <div className="space-y-6 mt-4">
        <header className="text-center border-b border-red-800 pb-4">
          <h2 className="text-3xl font-black tracking-wider text-red-400">🚨 ALARMCENTRALE PECHSCHERM</h2>
          <p className="text-slate-300 text-base mt-2">Blijf rustig. Geef deze gegevens door aan de Franse operator:</p>
        </header>

        {/* GIGANTISCHE LOCATIE KAART VOOR FRANS TALIGE OPERATOR */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border-4 border-red-500 my-4">
          <span className="text-xs uppercase tracking-widest text-red-600 font-bold block mb-2">Lees dit letterlijk voor (Frans):</span>
          <p className="text-2xl font-black leading-snug tracking-wide text-center bg-slate-100 p-4 rounded-xl font-mono">
            &quot;{frenchLocationString}&quot;
          </p>
        </div>

        {/* COORDINATEN EN TELEFOONNUMMER */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-red-900/50 p-4 rounded-xl border border-red-700">
            <span className="text-sm text-red-300 block">Exacte GPS Coördinaten:</span>
            <span className="text-xl font-bold font-mono block mt-1">Lat: 49.4174° N | Lng: 2.8942° E</span>
          </div>

          <div className="bg-blue-900/50 p-4 rounded-xl border border-blue-700">
            <span className="text-sm text-blue-300 block">Frans Noodnummer:</span>
            <span className="text-3xl font-black block mt-1 text-blue-400">📞 112 <span className="text-base font-normal text-white">(of praatpaal)</span></span>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl text-xl border-2 border-slate-700 shadow-md active:scale-95 transition-transform mt-8 mb-4"
      >
        ❌ Sluit Noodscherm & Ga terug naar Kaart
      </button>

    </div>
  );
}
