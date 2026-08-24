# navigation

Route-assistent voor Nederlanders die tussen Frankrijk en Nederland rijden: live GPS-navigatie, per-departement streekverhalen (96 Franse departementen), marktmeldingen, en een tweestemmige spraak-gids (een korte "safety"-stem voor navigatie/waarschuwingen, een rustige "toergids"-stem voor streekverhalen met correcte Franse uitspraak).

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Spraak-engine: huidige staat en onderzoek (on hold)

**Huidige staat:** `src/components/SpeechEngine.tsx` gebruikt de gratis, browser-ingebouwde Web Speech API (`window.speechSynthesis`). Werkt, kost niets, maar klinkt robotachtig en de stemkwaliteit hangt volledig af van wat er toevallig op het apparaat van de gebruiker geïnstalleerd staat — geen garantie op een goede stem of correcte Franse uitspraak. Dit is een bewuste, tijdelijke keuze, geen bug.

**Onderzocht als upgrade-pad (augustus 2026), werk gepauzeerd — niet omdat het niet zou werken, maar omdat het een grote klus is die nu geen prioriteit heeft:**

- **Piper TTS (open source, offline)** — afgevallen. Reden: (1) de software zelf is GPL-3.0 gelicenseerd (`piper1-gpl`, voorheen `rhasspy/piper`) — alleen veilig te gebruiken als los commandoregel-programma om audio te *genereren*, nooit als gebundelde library/npm-dependency in de app zelf; (2) de repo vermeldt expliciet "intended for personal use and text to speech research only", wat wringt met een publieke gratis dienst; (3) losse stemmodellen hebben elk hun eigen licentie (te checken per stem, staat op huggingface.co); (4) de laagste kwaliteitslaag ("low") klonk bij een concrete test (`nl_NL-mls_7432-low`) ronduit slecht — de betere lagen (medium/high) zijn niet geverifieerd.
- **Google Cloud Text-to-Speech** — prijzen geverifieerd op [cloud.google.com/text-to-speech/pricing](https://cloud.google.com/text-to-speech/pricing) (24-08-2026):
  - Standard & WaveNet: $4 per 1 mln tekens, 4 mln tekens/maand gratis (WaveNet en Standard zitten nu op dezelfde SKU/prijs — geen typefout)
  - Neural2 / Polyglot (preview): $16 per 1 mln tekens, 1 mln gratis
  - Studio: $160 per 1 mln tekens, 1 mln gratis
  - Chirp 3: HD: $30 per 1 mln tekens, 1 mln gratis
  - Gemini-TTS (2.5 Flash / Flash-Lite / Pro, 3.1 Flash preview) — géén gratis quota, afrekening per token i.p.v. per teken: $0,50–$1,00 per 1 mln input-tokens, $10–$20 per 1 mln audio-tokens (1 mln audio-tokens ≈ 11 uur geluid). Enige laag die de **toon van de stem via een natuurlijke-taal-prompt** kan sturen (bv. "lees dit voor met een warme, kalme stem en let op correcte Franse uitspraak") — daarmee de beste kandidaat om zowel een scherpe navigatiestem als een warme toergidsstem te realiseren.
  - Concreet voor dit project: alle 96 streekverhalen (`src/lib/navigatie/streek-verhalen.ts`) samen zijn ~40.000 tekens. Eenmalig genereren met Gemini-TTS kost naar schatting **$0,60–$1,20 totaal** — bij dit volume is prijs geen onderscheidende factor tussen de opties.
- **ElevenLabs** — niet live geverifieerd (domein geblokkeerd tijdens onderzoek), indicatief: gratis tier ~10k tekens/maand niet-commercieel, betaalde tiers vanaf ~$5/maand. Sterkste kwaliteit/karakter, maar minder relevant nu Gemini-TTS's stuurbare toon een goedkoper alternatief lijkt.

**De architectuur-keuze die nog gemaakt moet worden (het echte werk):**
Streekverhalen zijn volledig statische tekst → eenmalig genereren met Gemini-TTS en als audiobestand hosten (`public/audio/...`), geen doorlopende kosten. Navigatie-instructies ("Over 500 meter neem de afrit richting...") bevatten dynamische waarden (afstand, plaatsnaam, straatnaam) die niet vooraf allemaal te genereren zijn. Twee opties, nog geen keuze gemaakt:
1. Live TTS-aanroep per instructie — simpel, maar werkt niet zonder internetverbinding (risico juist in afgelegen gebieden in Frankrijk).
2. Concatenatieve aanpak zoals klassieke TomTom/Garmin-apparaten: vaste zinsdelen + veelvoorkomende afstanden vooraf inspreken en opslaan, alleen de plaatsnaam/straatnaam dynamisch (live TTS of browserstem) invoegen. Meer werk, maar offline-robuust.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
