// Nederlandse wetenswaardigheden per departement, opgezocht op departementcode
//
// Bronnen: INAO-bestanden (data.gouv.fr, versie 9 oktober 2025),
// geo.api.gouv.fr, Wikidata (CC0). Werkt volledig offline.
// De teksten bevatten bewust geen cijfers (jaartallen, inwonertallen,
// oppervlaktes), zodat er niets in verloopt.

export type StreekVerhaal = {
  naam: string;
  verhaal: string;
};

export const streekVerhalen: Record<string, StreekVerhaal> = {
  "01": {
    naam: "Ain",
    verhaal: "U bent nu in Ain, waar de wijnbouwers van de Bugey en de mousserende Bugey Cerdon zorgen dat de borrelplank zelden saai is. In Bourg-en-Bresse werd de astronoom Jérôme Lalande geboren, en de rechter Jean Anthelme Brillat-Savarin zag het levenslicht in het hôtel Brillat-Savarin. Ook de Coteaux de l'Ain leveren wijn voor wie liever bij het glas dan bij het boek blijft.",
  },
  "02": {
    naam: "Aisne",
    verhaal: "Aisne begint hier, in het gebied waar de boon voor de Haricot de Soissons groeit en de geurige Maroilles rijpt. In Villers-Cotterêts werd de schrijver Alexandre Dumas père geboren, en Château-Thierry bracht de advocaat Jean de La Fontaine voort. Wie hier stopt, proeft dus evengoed geschiedenis als kaas.",
  },
  "03": {
    naam: "Allier",
    verhaal: "Welkom in Allier, waar de Poulet du Bourbonnais en de wijn van Saint-Pourçain al generaties op het menu staan. In Moulins werd de schrijver Théodore de Banville geboren, en de scenarioschrijver Sandrine Bonnaire komt uit Gannat, iets verderop. Ook de Volailles du Charolais bewijzen dat de boer hier van geen ophouden weet.",
  },
  "04": {
    naam: "Alpes-de-Haute-Provence",
    verhaal: "Dit is Alpes-de-Haute-Provence, waar de wijn van Pierrevert en de appels van de Alpes de Haute Durance de oogst bepalen. In Champtercier werd de natuuronderzoeker Pierre Gassendi geboren, en Manosque bracht de scenarioschrijver Jean Giono voort. Twee namen die laten zien dat deze hoogvlakte meer voortbrengt dan alleen fruit.",
  },
  "05": {
    naam: "Hautes-Alpes",
    verhaal: "Voor u ligt Hautes-Alpes, waar de appels van de Alpes de Haute Durance en de abrikozen van de Baronnies tegen de bergwanden rijpen. Beroemdheden zijn hier dun gezaaid, maar wie de bergtoppen rondom bekijkt, snapt vanzelf hoe dat komt: eenmaal op zo'n hoogte aangekomen wil kennelijk niemand meer naar beneden om elders naam te maken. Ook de wijn die simpelweg Hautes-Alpes heet, blijft liever dicht bij huis.",
  },
  "06": {
    naam: "Alpes-Maritimes",
    verhaal: "U rijdt nu Alpes-Maritimes binnen, waar de citroenen van Menton en de olijfolie van Nice de keuken kleuren, aangevuld met de wijn van Côtes de Provence. In Nice werden de schrijvers Giuseppe Garibaldi en Jean-Marie Gustave Le Clezio geboren, twee heel verschillende pennen uit dezelfde stad. Ook de olijven van Nice zelf, simpelweg Olive de Nice genoemd, verdienen een plek op het bord.",
  },
  "07": {
    naam: "Ardèche",
    verhaal: "U trekt nu door de Ardèche, waar de wijn van Cornas en Saint-Péray het imago van de rivierkloven met gemak overstijgt. Waarom hier zo weinig beroemdheden geboren zijn? Vermoedelijk simpelweg omdat de ham en de worst van de Ardèche al te veel tijd opeisten om ook nog ergens anders naam te maken. Ook de Côtes du Vivarais schenkt liever een glas dan dat hij naam maakt buiten de regio.",
  },
  "08": {
    naam: "Ardennes",
    verhaal: "U bevindt zich nu in de Ardennes, waar de Boudin blanc de Rethel en de gedroogde ham van de Ardennes al eeuwenlang de slagerij vullen. In Charleville werd de schrijver Arthur Rimbaud geboren, en Sedan bracht de zanger Yannick Noah voort. Twee heel verschillende stemmen uit dezelfde beboste streek.",
  },
  "09": {
    naam: "Ariège",
    verhaal: "Hier start Ariège, waar de wijn die naar de Catharen verwijst, Cathare, naast de streekwijn Ariège op tafel komt. In Pamiers werd de componist Gabriel Fauré geboren, en Lavelanet bracht de voetballer Fabien Barthez voort. Twee inwoners die allebei op hun eigen manier de aandacht wisten te trekken.",
  },
  "10": {
    naam: "Aube",
    verhaal: "U komt nu Aube binnen, waar de kaas van Chaource en Soumaintrain de kaasplank vullen en de Rosé des Riceys voor de rest zorgt. In Arcis-sur-Aube werd de advocaat Georges Danton geboren, en Troyes bracht de schrijver Chretien de Troyes voort. Ook de Brie de Melun wordt hier gemaakt, ver van de stad waar hij zijn naam aan dankt.",
  },
  "11": {
    naam: "Aude",
    verhaal: "U bent nu in Aude, waar de streekwijn simpelweg Aude heet en de wijngaarden het landschap kleuren. In Carcassonne werden de natuurkundige Albert Fert en de academisch docent Paul Sabatier geboren, allebei op loopafstand van dezelfde stadsmuren. Ook Narbonne draagt zijn steentje bij, met de acteur Charles Trenet als geboren zoon.",
  },
  "12": {
    naam: "Aveyron",
    verhaal: "Zo, u bent in Aveyron, waar de kaas van Laguiole en de Tome fraîche de l'Aubrac zwaar op de kaasplank drukken, geholpen door de wijn van Marcillac. In Rodez werd de illustrator Pierre Soulages geboren, en Saint-Léons bracht de natuuronderzoeker Jean-Henri Fabre voort. Ook de Côtes de Millau schenkt mee, voor wie na al dat kaas nog dorst heeft.",
  },
  "13": {
    naam: "Bouches-du-Rhône",
    verhaal: "U bevindt zich nu in Bouches-du-Rhône, waar de wijn van Cassis en Les Baux de Provence naast de olijfolie uit de vallei van de Baux-de-Provence op tafel staan. In Aix-en-Provence werd de kunstschilder Paul Cézanne geboren, en Saint-Rémy-de-Provence bracht de astronoom Nostradamus voort. Zelfs het hooi hier, de Foin de Crau, heeft een eigen naam om trots op te zijn.",
  },
  "14": {
    naam: "Calvados",
    verhaal: "U rijdt nu Calvados binnen, vernoemd naar de sterke drank die hier al generaties wordt gestookt, met de boter en room van Isigny als stevig tegenwicht. In Falaise werd de monarch Willem de Veroveraar geboren, en Honfleur bracht de componist Erik Satie voort. Ook de kaas van Livarot en de wijnen van de Pays d'Auge willen hun deel van de aandacht.",
  },
  "15": {
    naam: "Cantal",
    verhaal: "Welkom in Cantal, waar de kazen Saint-Nectaire, Fourme d'Ambert en Laguiole vechten om een plek op de plank. In Montboudif werd de politicus Georges Pompidou geboren, en Aurillac bracht de politicus Paul Doumer voort, twee mannen met een flinke politieke carrière achter hun geboorteplaats. Ook de wijn van Entraygues-Le Fel schenkt hier gewoon mee.",
  },
  "16": {
    naam: "Charente",
    verhaal: "Dit is Charente, waar de Cognac Borderies en de Cassis de Saintonge voor een aangenaam glas zorgen. De advocaat François Mitterrand werd geboren in wat de maison natale de François Mitterrand heet, en Cognac bracht de politicus Frans I van Frankrijk voort. Twee heel verschillende staatslieden uit dezelfde regio.",
  },
  "17": {
    naam: "Charente-Maritime",
    verhaal: "U passeert de grens naar Charente-Maritime, waar de oesters van Marennes Oléron en de aardappelen van de Ile de Ré de kust typeren. In Hiers-Brouage werd de militair Samuel de Champlain geboren, en Rochefort bracht de schrijver Pierre Loti voort. Ook het zout van de Ile de Ré en de asperges van de Blayais vullen de markt hier.",
  },
  "18": {
    naam: "Cher",
    verhaal: "Hier ligt Cher, waar de wijnen van Sancerre, Menetou-Salon en Quincy elkaar beconcurreren om de beste fles. In Bourges werd de politicus Lodewijk XI van Frankrijk geboren, en La Chapelle-d'Angillon bracht de schrijver Alain-Fournier voort. Ook de geitenkaas van Chavignol hoort hier gewoon bij het glas.",
  },
  "19": {
    naam: "Corrèze",
    verhaal: "U bent aangekomen in Corrèze, waar de streekwijn Corrèze en de wijn uit de Pays de Brive de kelders vullen. In Rosiers-d'Égletons werd de bisschop Paus Clemens VI geboren, en Tulle bracht de acteur Éric Rohmer voort. Twee inwoners met een heel andere loopbaan, uit dezelfde glooiende heuvels.",
  },
  "21": {
    naam: "Côte-d'Or",
    verhaal: "U komt nu Côte-d'Or binnen, waar de wijn van Aloxe-Corton en de premier cru Clos du Chapitre de kelders van de streek vullen. In Dijon werden de architect Gustave Eiffel en de politicus Karel de Stoute geboren, allebei met naam gemaakt op heel verschillend terrein. Wijnliefhebbers weten hier inmiddels feilloos de weg te vinden.",
  },
  "22": {
    naam: "Côtes-d'Armor",
    verhaal: "Hier begint Côtes-d'Armor, waar de witte boon Coco de Paimpol en de coquille Saint-Jacques van de kust de kaart bepalen. In Tréguier werd de schrijver Ernest Renan geboren, en Saint-Brieuc bracht de acteur Patrick Dewaere voort. Twee heel verschillende Bretonse stemmen, allebei geboren aan dezelfde kust.",
  },
  "23": {
    naam: "Creuse",
    verhaal: "Vanaf hier heet het Creuse, waar het vlees van het Limousin-rund en het lamsvlees van de Limousin de boventoon voeren. In Masbaraud-Mérignat werd de kapper Raymond Poulidor geboren, en Châtelus-le-Marcheix bracht de schrijver Pierre Michon voort. Een kapper en een schrijver, in een streek die verder zelden in de schijnwerpers staat.",
  },
  "24": {
    naam: "Dordogne",
    verhaal: "U bent nu in Dordogne, waar de wijnen van Bergerac, Monbazillac en Pécharmant de kelders van de Périgord Dordogne vullen. In Saint-Michel-de-Montaigne werd de schrijver Michel de Montaigne geboren, en Sainte-Mondane bracht de schrijver François Fénelon voort. Twee schrijvers uit dezelfde glooiende streek, met eeuwen ertussen.",
  },
  "25": {
    naam: "Doubs",
    verhaal: "U rijdt nu Doubs binnen, waar de absint van Pontarlier en de romige Mont d'Or elkaar in de winter afwisselen. In Besançon werd de schrijver Victor Hugo geboren, en Ornans bracht de kunstenaar Gustave Courbet voort. Ook de Macvin du Jura hoort hier gewoon bij het aperitief.",
  },
  "26": {
    naam: "Drôme",
    verhaal: "U rijdt Drôme binnen, waar de mousserende Clairette de Die en de wijn van Crozes-Hermitage voor een aangename middag zorgen. Wie op zoek gaat naar een grote naam uit de Drôme, komt bedrogen thuis, en de knoflook van de streek is daar misschien niet vreemd aan: wie zo lekker kookt, hoeft de deur niet uit om indruk te maken. De Coteaux des Baronnies schenkt intussen rustig door, wachtend tot iemand alsnog van gedachten verandert.",
  },
  "27": {
    naam: "Eure",
    verhaal: "U komt nu Eure binnen, waar de Calvados Pays d'Auge en de kaas van Livarot de tafel domineren. In Les Andelys werd de kunstschilder Nicolas Poussin geboren, en Vernon bracht de voetballer Ousmane Dembélé voort. Ook de Volailles de Houdan lopen hier nog altijd rond op de erven.",
  },
  "28": {
    naam: "Eure-et-Loir",
    verhaal: "Dit is Eure-et-Loir, waar de Cidre du Perche en de Volailles de Houdan de streekkeuken typeren. In Nogent-le-Rotrou werd de arts Gustave Le Bon geboren, en Dreux bracht de acteur François Philidor voort. Twee heel verschillende loopbanen, uit dezelfde glooiende graanvlakte.",
  },
  "29": {
    naam: "Finistère",
    verhaal: "Welkom in Finistère, waar de cider van Cornouaille en de rode uien van Roscoff de markt sieren. In Quimper werden de arts René Laennec en de schrijver Max Jacob geboren, allebei met een stevige naam buiten hun geboortestad. Aan het uiterste puntje van Bretagne voelt de zee hier nooit ver weg.",
  },
  "2A": {
    naam: "Corse-du-Sud",
    verhaal: "U rijdt de grens van Corse-du-Sud over, waar de wijn van Ajaccio en de Vin de Corse de tafel vullen, samen met de kaas Brocciu en de Clémentine de Corse. In Ajaccio werd de keizer Napoleon Bonaparte geboren, en dezelfde stad bracht ook de zanger Alizée voort. Twee heel verschillende soorten roem, uit dezelfde havenstad.",
  },
  "2B": {
    naam: "Haute-Corse",
    verhaal: "U staat nu op het grondgebied van Haute-Corse, waar de wijn van Patrimonio en de Muscat du Cap Corse naast de kiwi's en pomelo's van Corsica groeien. In Corte werd de politicus Jozef Bonaparte geboren, en Morosaglia bracht de politicus Pasquale Paoli voort. Ook hier belandt de kaas Brocciu op vrijwel elke tafel.",
  },
  "30": {
    naam: "Gard",
    verhaal: "U bent aangekomen in Gard, waar de wijnen van Costières de Nîmes en de Duché d'Uzès de kelders vullen. In Nîmes werd de schrijver Alphonse Daudet geboren, en Alès bracht de voetbaltrainer Laurent Blanc voort. Ook de Cévennes en de Clairette de Bellegarde schenken hier volop mee.",
  },
  "31": {
    naam: "Haute-Garonne",
    verhaal: "U bent nu in Haute-Garonne, waar de wijn van Fronton en de paarse knoflook van Cadours de markt van Toulouse vullen. In Toulouse werden de componist Carlos Gardel en de arts Jean Dausset geboren, allebei geboren in dezelfde roze stad. Ook de Volailles du Lauragais vinden hier nog altijd hun weg naar de pan.",
  },
  "32": {
    naam: "Gers",
    verhaal: "U rijdt nu Gers binnen, waar de Armagnac en de foie gras van de Gers de tafel zwaar laten doorbuigen. In Lectoure werd de militair Jean Lannes geboren, en het kasteel van Castelmore bracht de schrijver Charles de Batz-Castelmore d'Artagnan voort. Ook de wijn van Saint-Mont en de witte knoflook van Lomagne schuiven hier gewoon aan.",
  },
  "33": {
    naam: "Gironde",
    verhaal: "U bent nu in Gironde, waar de wijn van Bordeaux, Barsac, Blaye en Cadillac de kelders van de streek vullen. In het kasteel van La Brède werd de rechter Charles de Montesquieu geboren, en Bordeaux bracht de scenarioschrijver François Mauriac voort. Wijn is hier zowel handel als gesprek van de dag.",
  },
  "34": {
    naam: "Hérault",
    verhaal: "Hier ligt Hérault, waar de Clairette du Languedoc en de cru van Cabrières de wijnkaart bepalen. In Montpellier werd de schrijver Auguste Comte geboren, en Sète bracht de singer-songwriter Georges Brassens voort. Twee heel verschillende soorten roem, allebei geworteld in dezelfde kuststreek.",
  },
  "35": {
    naam: "Ille-et-Vilaine",
    verhaal: "Voor u ligt Ille-et-Vilaine, waar de mosselen van de baai van de Mont-Saint-Michel de kust hun naam geven. In Saint-Malo werden de zeeman Jacques Cartier en de schrijver François De Chateaubriand geboren, allebei vanuit dezelfde ommuurde havenstad de wereld in getrokken. Wie hier aankomt, ruikt eerst de zee en pas daarna de geschiedenis.",
  },
  "36": {
    naam: "Indre",
    verhaal: "U bent aangekomen in Indre, waar de geitenkazen van Pouligny-Saint-Pierre, Valençay en Selles-sur-Cher de kaasplank compleet maken. In Châteauroux werd de zanger Gérard Depardieu geboren, en Chabris bracht de onderzoeker Luc Montagnier voort. Ook de wijn van Reuilly schenkt hier rustig mee.",
  },
  "37": {
    naam: "Indre-et-Loire",
    verhaal: "U rijdt nu Indre-et-Loire binnen, waar de wijnen van Chinon, Bourgueil en Vouvray elkaar beconcurreren langs de Loire. In het stadje Descartes werd de natuuronderzoeker René Descartes geboren, en Tours bracht de schrijver Honoré de Balzac voort. Ook Montlouis-sur-Loire schenkt hier onverstoorbaar mee.",
  },
  "38": {
    naam: "Isère",
    verhaal: "Hier begint Isère, waar de blauwe kaas van Vercors-Sassenage en de Raviole du Dauphiné de keuken bepalen. In Grenoble werd de schrijver Stendhal geboren, en La Côte-Saint-André bracht de schrijver Hector Berlioz voort. Ook de wijn die simpelweg Isère heet, schenkt hier volop mee.",
  },
  "39": {
    naam: "Jura",
    verhaal: "U bent aangekomen in Jura, waar de wijn van Arbois en Château-Chalon de kelders van de streek sieren. In Dole werd de scheikundige Louis Pasteur geboren, en Lons-le-Saunier bracht de schrijver Rouget de Lisle voort. Ook de Macvin du Jura en de blauwe kaas van Gex schuiven hier aan.",
  },
  "40": {
    naam: "Landes",
    verhaal: "U trekt nu de Landes in, waar de foie gras en het rundvlees van de Chalosse de tafel zwaar maken. Het is niet dat hier geen talent zou zijn, het is eerder dat niemand zin had om voor wat roem de eindeloze pijnbossen en de rust van de kust in te ruilen. De wijn die simpelweg Landes heet, blijft intussen net zo onopvallend goed.",
  },
  "41": {
    naam: "Loir-et-Cher",
    verhaal: "U komt nu Loir-et-Cher binnen, waar de wijnen van Cheverny, Cour-Cheverny en Touraine de kelders vullen. In het kasteel van La Possonnière werd de schrijver Pierre de Ronsard geboren, en het kasteel van Blois bracht de soeverein Lodewijk XII van Frankrijk voort. Ook de Coteaux du Vendômois schenkt hier rustig mee.",
  },
  "42": {
    naam: "Loire",
    verhaal: "Dit is Loire, waar de wijnen van de Côte roannaise en de Côtes du Forez de kelders van de streek vullen. In Lorette werd de autocoureur Alain Prost geboren, en Montaud bracht de componist Jules Massenet voort. Ook de kaas van Montbrison en het piepkleine Château-Grillet schuiven hier aan.",
  },
  "43": {
    naam: "Haute-Loire",
    verhaal: "Welkom in Haute-Loire, waar de groene linzen van Le Puy en het gevogelte van de Velay de kaart bepalen. In Chavaniac-Lafayette werd de officier Gilbert du Motier de la Fayette geboren, en Le Puy-en-Velay bracht de sportcommentator Marion Bartoli voort. Ook de Fin Gras du Mézenc schuift hier stevig aan.",
  },
  "44": {
    naam: "Loire-Atlantique",
    verhaal: "In Loire-Atlantique bent u nu te gast, waar de Muscadet Sèvre et Maine en de Coteaux d'Ancenis de wijnkaart vullen. In Nantes werd de schrijver Jules Verne geboren, en Le Pallet bracht de schrijver Petrus Abaelardus voort. Ook de witte bonen, de Mogette de Vendée, horen hier vast op het bord.",
  },
  "45": {
    naam: "Loiret",
    verhaal: "U bevindt zich nu in Loiret, waar de wijnen van Orléans en Orléans-Cléry naast de Coteaux du Giennois op de kaart staan. In Orléans werden de politicus Robert II van Frankrijk en de schrijver Charles Péguy geboren, eeuwen na elkaar maar in dezelfde straten. Ook de geitenkaas van Chavignol schuift hier weer aan.",
  },
  "46": {
    naam: "Lot",
    verhaal: "Hier start Lot, waar de wijn van Cahors en de foie gras van de Quercy de tafel bepalen. In Figeac werd de egyptoloog Jean-François Champollion geboren, en Cajarc bracht de scenarioschrijver Françoise Sagan voort. Ook de druiven van Chasselas de Moissac en de aardbeien van de Périgord schuiven hier aan.",
  },
  "47": {
    naam: "Lot-et-Garonne",
    verhaal: "U komt nu Lot-et-Garonne binnen, waar de wijn van Buzet en de Agenais naast de Armagnac op tafel staan. In Agen werd de natuurkundige Alain Aspect geboren, en Fumel bracht de architect Jean Nouvel voort. Ook de wijn van Côtes de Duras schenkt hier rustig mee.",
  },
  "48": {
    naam: "Lozère",
    verhaal: "Voor u ligt Lozère, waar de kaas van Laguiole en de Tome fraîche de l'Aubrac de kaasplank vullen. In het kasteel van Grizac werd de academisch docent Paus Urbanus V geboren, en Chaulhac bracht de arts Guy de Chauliac voort. Ook de Fin Gras du Mézenc hoort hier stevig bij het bord.",
  },
  "49": {
    naam: "Maine-et-Loire",
    verhaal: "U rijdt nu Maine-et-Loire binnen, waar de wijnen van Anjou Brissac, Bonnezeaux en de Coteaux du Layon de kelders vullen. In Saumur werd de ondernemer Coco Chanel geboren, en Liré bracht de schrijver Joachim du Bellay voort. Twee heel verschillende soorten faam, uit dezelfde Loirestreek.",
  },
  "50": {
    naam: "Manche",
    verhaal: "U bent aangekomen in Manche, waar de wulk uit de baai van Granville en de prei van Créances de markt vullen. In Granville werd de zakenpersoon Christian Dior geboren, en Cherbourg bracht de schrijver Roland Barthes voort. Ook de cider van de Cotentin en de boter van Isigny schuiven hier aan.",
  },
  "51": {
    naam: "Marne",
    verhaal: "Dit is Marne, midden in het gebied waar de Champagne en de Coteaux champenois vandaan komen. In Châtillon-sur-Marne werd de priester Paus Urbanus II geboren, en Reims bracht de politicus Jean-Baptiste Colbert voort. Ook de Volailles de la Champagne en de Brie de Meaux horen hier gewoon bij de lunch.",
  },
  "52": {
    naam: "Haute-Marne",
    verhaal: "U bevindt zich nu in Haute-Marne, waar de kazen Langres en Epoisses de kaasplank stevig vullen. In Langres werd de schrijver Denis Diderot geboren, en Vroncourt-la-Côte bracht de schrijver Louise Michel voort. Ook de wijn van Coiffy en het gevogelte van de hoogvlakte van Langres schuiven hier aan.",
  },
  "53": {
    naam: "Mayenne",
    verhaal: "U komt nu Mayenne binnen, waar de eau-de-vie en de Pommeau du Maine naast de Calvados Domfrontais op de kaart staan. In Laval werden de kunstenaar Henri Rousseau en de arts Ambroise Paré geboren, twee heel verschillende beroepen uit dezelfde stad. Ook de cider van Domfront schenkt hier stevig mee.",
  },
  "54": {
    naam: "Meurthe-et-Moselle",
    verhaal: "Hier ligt Meurthe-et-Moselle, waar de wijnen van Côtes de Toul, Moselle en Lorraine de kelders van de streek vullen. In Nancy werd de schrijver Henri Poincaré geboren, en Jœuf bracht de voetbaltrainer Michel Platini voort. Twee heel verschillende soorten scherpte, uit dezelfde streek.",
  },
  "55": {
    naam: "Meuse",
    verhaal: "Welkom in Meuse, waar de wijnen van Côtes de Meuse en Lorraine de kelders van deze glooiende streek vullen. In Bar-le-Duc werd de politicus Raymond Poincaré geboren, en Luméville-en-Ornois bracht de historicus Fernand Braudel voort. Twee heel verschillende loopbanen, uit dezelfde grensstreek.",
  },
  "56": {
    naam: "Morbihan",
    verhaal: "U rijdt nu Morbihan binnen, waar het zout van Guérande, de Fleur de Sel, met de hand uit de zoutpannen wordt gehaald. In Vannes werd de scenarioschrijver Alain Resnais geboren, en Landévant bracht de fotograaf Henri Cartier-Bresson voort. Twee mannen die allebei met beeld werkten, ieder op hun eigen manier.",
  },
  "57": {
    naam: "Moselle",
    verhaal: "U trekt nu Moselle binnen, waar de wijnen van Moselle en Lorraine de kelders van deze grensstreek vullen. In Metz werd de schrijver Paul Verlaine geboren, en Dieuze bracht de wiskundige Charles Hermite voort. Twee heel verschillende disciplines, allebei geworteld in dezelfde grond.",
  },
  "58": {
    naam: "Nièvre",
    verhaal: "Zo, u bent in Nièvre, waar de Pouilly-Fumé en de wijn van de Coteaux de Tannay de kelders van de streek vullen. In Clamecy werden de schrijver Romain Rolland en de schrijver Louis Antoine de Saint-Just geboren, twee heel verschillende pennen uit hetzelfde stadje. Ook de Côtes de la Charité schenkt hier rustig mee.",
  },
  "59": {
    naam: "Nord",
    verhaal: "U staat nu op het grondgebied van Nord, waar de gerookte knoflook van Arleux en de Genièvre Flandre-Artois de markt kleuren. In Lille werd de politicus Charles de Gaulle geboren, en Le Cateau-Cambrésis bracht de kunstenaar Henri Matisse voort. Ook de Maroilles en de aardappelen van Merville horen hier gewoon bij de lunch.",
  },
  "60": {
    naam: "Oise",
    verhaal: "U komt nu Oise binnen, waar de kaas Neufchâtel al eeuwen in de schappen van de streek ligt. In Noyon werd de schrijver Johannes Calvijn geboren, en Beauvais bracht de wiskundige Henri Lebesgue voort. Twee denkers uit dezelfde vlakke streek, met eeuwen ertussen.",
  },
  "61": {
    naam: "Orne",
    verhaal: "Hier begint Orne, waar de Calvados Domfrontais en de Calvados Pays d'Auge naast de Cidre du Perche op de kaart staan. In Tinchebray werd de schrijver André Breton geboren, en Alençon bracht de schrijver Theresia van Lisieux voort. Ook de kaas van Livarot hoort hier gewoon bij het bord.",
  },
  "62": {
    naam: "Pas-de-Calais",
    verhaal: "Dit is Pas-de-Calais, waar de kippen van Licques en de gerookte knoflook van Arleux de markt bepalen. In Arras werd de advocaat Maximilien de Robespierre geboren, en Boulogne-sur-Mer bracht de voetbaltrainer Franck Ribéry voort. Ook de Genièvre Flandre-Artois en het zilte lamsvlees van de baai van Somme schuiven hier aan.",
  },
  "63": {
    naam: "Puy-de-Dôme",
    verhaal: "Hier ligt Puy-de-Dôme, waar de wijnen van de Côtes d'Auvergne en de Marc d'Auvergne de kelders van de streek vullen. De schrijver Blaise Pascal werd geboren in wat nu de maison natale de Blaise Pascal heet, en Gergovie bracht de militair Vercingetorix voort. Twee heel verschillende soorten roem, eeuwen uit elkaar.",
  },
  "64": {
    naam: "Pyrénées-Atlantiques",
    verhaal: "U trekt nu Pyrénées-Atlantiques binnen, waar de Piment d'Espelette en de kaas Ossau-Iraty de Baskische keuken kleuren. In Ciboure werd de componist Maurice Ravel geboren, en het kasteel van Pau bracht de monarch Hendrik IV van Frankrijk voort. Ook de wijnen van Irouléguy en Jurançon schenken hier stevig mee.",
  },
  "65": {
    naam: "Hautes-Pyrénées",
    verhaal: "Voor u ligt Hautes-Pyrénées, waar de wijnen van Madiran en Pacherenc du Vic-Bilh naast de Béarn op tafel staan. In Tarbes werd de fotograaf Théophile Gautier geboren, en Lourdes bracht de kloosterzuster Bernadette Soubirous voort. Ook het lamsvlees van Barèges-Gavarnie hoort hier gewoon bij het bord.",
  },
  "66": {
    naam: "Pyrénées-Orientales",
    verhaal: "U komt nu Pyrénées-Orientales binnen, waar de wijnen van Banyuls en Collioure de Côte Vermeille hun naam geven. In Estagel werd de schrijver François Arago geboren, en Banyuls-sur-Mer bracht de kunstschilder Aristide Maillol voort. Ook de rode abrikozen van de Roussillon horen hier gewoon bij het fruitschap.",
  },
  "67": {
    naam: "Bas-Rhin",
    verhaal: "Welkom in Bas-Rhin, waar de Alsace-crus van Scherwiller en Ottrott de wijnkaart van de streek vullen. In Strasbourg werden de wetenschapper Hans Bethe en de voetbaltrainer Arsène Wenger geboren, twee heel verschillende vakgebieden uit dezelfde stad. Ook de Alsace Klevener de Heiligenstein schenkt hier rustig mee.",
  },
  "68": {
    naam: "Haut-Rhin",
    verhaal: "U bevindt zich nu in Haut-Rhin, waar de Alsace-crus van Bergheim en Rodern de wijnkaart van de streek vullen. In Kaysersberg werd de componist Albert Schweitzer geboren, en Mulhouse bracht de officier Alfred Dreyfus voort. Ook de Alsace Vallée Noble schenkt hier volop mee.",
  },
  "69": {
    naam: "Rhône",
    verhaal: "U trekt nu Rhône binnen, waar de Beaujolais-crus van Beaujeu en Cercié de wijnkaart van de streek vullen. In Saint-Julien werd de arts Claude Bernard geboren, en Dardilly bracht de priester Johannes Maria Vianney voort. Twee heel verschillende roepingen, uit dezelfde streek rond Lyon.",
  },
  "70": {
    naam: "Haute-Saône",
    verhaal: "U komt nu Haute-Saône binnen, waar de Kirsch de Fougerolles al generaties uit de kersenboomgaarden wordt gestookt. Zoek hier niet naar een beroemde naam; de kersenboomgaarden en de stookketel hielden kennelijk iedereen te druk bezig om ook nog wereldberoemd te worden. Wie hier stopt, doet er goed aan eerst een borrel te proberen voordat hij verder rijdt.",
  },
  "71": {
    naam: "Saône-et-Loire",
    verhaal: "Hier ligt Saône-et-Loire, waar de Beaujolais-crus van Chânes en Leynes naast de Bourgogne Côte Chalonnaise op de kaart staan. In Mâcon werden de schrijver Alphonse de Lamartine en de voetballer Antoine Griezmann geboren, allebei in dezelfde stad aan de Saône. Twee heel verschillende soorten roem, met meer dan een eeuw ertussen.",
  },
  "72": {
    naam: "Sarthe",
    verhaal: "Zo, u bent in Sarthe, waar de wijn van Jasnières en de Coteaux du Loir de kelders van de streek vullen. In Le Mans werd de monarch Hendrik II van Engeland geboren, en Oizé bracht de astronoom Marin Mersenne voort. Ook de Cidre du Perche schenkt hier rustig mee.",
  },
  "73": {
    naam: "Savoie",
    verhaal: "U bent nu in Savoie, waar de Roussette de Savoie Marestel en de Vin de Savoie Apremont de wijnkaart bepalen. In Chambéry werden de voetballer Olivier Giroud en de schrijver Joseph de Maistre geboren, eeuwen na elkaar maar in dezelfde bergstad. Ook de Vin de Savoie Arbin schenkt hier stevig mee.",
  },
  "74": {
    naam: "Haute-Savoie",
    verhaal: "U rijdt nu Haute-Savoie binnen, waar de kazen Abondance en Beaufort naast de Vin de Savoie Ayze op tafel staan. In het kasteel van Sales werd de schrijver Franciscus van Sales geboren, en Annecy bracht de sprinter Christophe Lemaitre voort. Ook de Roussette de Savoie Frangy schenkt hier rustig mee.",
  },
  "75": {
    naam: "Paris",
    verhaal: "U bent nu in Paris, waar de wijn die simpelweg Île-de-France Paris heet, een verrassing is voor wie hier alleen boulevards verwacht. In Paris werden de schrijver Voltaire en de acteur Molière geboren, twee inwoners uit heel verschillende eeuwen. Wie hier is aangekomen, is hoe dan ook op de plek waar het allemaal om draait.",
  },
  "76": {
    naam: "Seine-Maritime",
    verhaal: "Hier begint Seine-Maritime, waar de kaas Neufchâtel al generaties in de schappen ligt. In Rouen werd de schrijver Gustave Flaubert geboren, en Tourville-sur-Arques bracht de schrijver Guy de Maupassant voort. Twee grote namen uit de Franse letteren, allebei geboren in deze Normandische streek.",
  },
  "77": {
    naam: "Seine-et-Marne",
    verhaal: "U bent aangekomen in Seine-et-Marne, waar de Brie de Melun en de wijnen van de Coteaux de Provins en Guérard de kaart bepalen. In Fontainebleau werd de politicus Lodewijk XIII van Frankrijk geboren, en Coupvray bracht de uitvinder Louis Braille voort. Twee heel verschillende soorten nalatenschap, uit dezelfde streek rond Parijs.",
  },
  "78": {
    naam: "Yvelines",
    verhaal: "U rijdt Yvelines binnen, waar de Volailles de Houdan nog altijd over de erven van de streek scharrelen. In Les Ulis werd de voetballer Thierry Henry geboren, en Argenteuil bracht de kunstenaar Georges Braque voort. Twee heel verschillende talenten, allebei geworteld in deze streek rond Versailles.",
  },
  "79": {
    naam: "Deux-Sèvres",
    verhaal: "U komt nu Deux-Sèvres binnen, waar de geitenkaas Chabichou du Poitou en de wijn van de Haut-Poitou de markt bepalen. Beroemdheid is in Deux-Sèvres dunner gezaaid dan het gevogelte van de Val de Sèvres, alsof iedereen het hier gewoon te goed had om zich ergens anders te willen bewijzen. Ook de Anjou schenkt hier rustig mee, zonder ergens naartoe te hoeven uitwijken.",
  },
  "80": {
    naam: "Somme",
    verhaal: "U komt nu Somme binnen, waar het zilte lamsvlees van de baai van Somme de kaart van de streek bepaalt. In Bazentin werd de schrijver Jean-Baptiste de Lamarck geboren, en Amiens bracht de onderwijzer Brigitte Macron voort. Twee heel verschillende loopbanen, uit dezelfde vlakke streek.",
  },
  "81": {
    naam: "Tarn",
    verhaal: "U komt nu Tarn binnen, waar de wijn van Gaillac en de roze knoflook van Lautrec de markt van de streek bepalen. In Albi werd de grafisch ontwerper Henri de Toulouse-Lautrec geboren, en Castres bracht de schrijver Jean Jaurès voort. Ook de ham van Lacaune hoort hier gewoon bij het bord.",
  },
  "82": {
    naam: "Tarn-et-Garonne",
    verhaal: "Hier begint Tarn-et-Garonne, waar de wijn van Lavilledieu en de druiven van Chasselas de Moissac de markt kleuren. In Montauban werd de architect Jean Auguste Dominique Ingres geboren, en Beaumont-de-Lomagne bracht de rechter Pierre de Fermat voort. Ook de wijn van Fronton schenkt hier rustig mee.",
  },
  "83": {
    naam: "Var",
    verhaal: "Welkom in Var, waar de wijn van Bandol en de Côtes de Provence Fréjus de kelders van de kuststreek vullen. In Gassin werd de acteur Emmanuelle Béart geboren, en Toulon bracht de historicus Jacques Le Goff voort. Ook de vijgen van Solliès horen hier gewoon bij het fruitschap.",
  },
  "84": {
    naam: "Vaucluse",
    verhaal: "Hier begint Vaucluse, waar de wijn van Châteauneuf-du-Pape en de Beaumes de Venise de kelders van de streek vullen. In Avignon werden de componist Olivier Messiaen en de acteur Mireille Mathieu geboren, allebei in dezelfde stad aan de Rhône. Ook de kersen van de Ventoux en de wijn van Cairanne schuiven hier aan.",
  },
  "85": {
    naam: "Vendée",
    verhaal: "U rijdt nu Vendée binnen, waar de Fiefs Vendéens Brem en Mareuil naast de aardappelen van Noirmoutier op tafel staan. In Mouilleron-en-Pareds werden de scenarioschrijver Georges Clemenceau en de militair Jean de Lattre de Tassigny geboren, twee grote namen uit hetzelfde kleine dorp. Ook de witte bonen, de Mogette de Vendée, horen hier vast bij de maaltijd.",
  },
  "86": {
    naam: "Vienne",
    verhaal: "Dit is Vienne, waar de wijn van de Haut-Poitou en de Saumur Puy-Notre-Dame de kelders van de streek vullen. In Poitiers werd de filosoof Michel Foucault geboren, en dezelfde stad bracht ook Eleonora van Aquitanië voort. Ook de geitenkaas Chabichou du Poitou hoort hier gewoon bij het glas wijn.",
  },
  "87": {
    naam: "Haute-Vienne",
    verhaal: "U komt nu Haute-Vienne binnen, waar de wijn die simpelweg Haute-Vienne heet nog altijd op sommige kaarten staat. In Limoges werden de decoratieschilder Pierre-Auguste Renoir en de politicus Marie François Sadi Carnot geboren, twee heel verschillende loopbanen uit dezelfde stad. Ook de appels van de Limousin en de poularde van de Périgord vinden hier hun weg naar de markt.",
  },
  "88": {
    naam: "Vosges",
    verhaal: "Hier ligt Vosges, waar de Kirsch de Fougerolles en de kaas Langres de streekkeuken bepalen. In Domrémy-la-Pucelle werd de militair Jeanne d'Arc geboren, en Épinal bracht de etnoloog Émile Durkheim voort. Twee heel verschillende soorten invloed, uit dezelfde beboste heuvels.",
  },
  "89": {
    naam: "Yonne",
    verhaal: "Welkom in Yonne, waar de wijn van Chablis en de Bourgogne Côte Saint-Jacques de kelders van de streek vullen. In Auxerre werd de wiskundige Joseph Fourier geboren, en Saint-Sauveur-en-Puisaye bracht de scenarioschrijver Colette voort. Ook de Bourgogne Tonnerre schenkt hier rustig mee.",
  },
  "90": {
    naam: "Territoire de Belfort",
    verhaal: "U komt nu Territoire de Belfort binnen, waar de wijn van de Franche-Comté nog altijd de kelders bereikt. Zoek niet te lang naar een bekende naam uit deze streek: de rust hier verklaart waarschijnlijk genoeg, want wie eenmaal is aangekomen, ziet weinig reden om ooit weer te vertrekken. Zo blijft alle aandacht netjes bij het glas.",
  },
  "91": {
    naam: "Essonne",
    verhaal: "U bevindt zich nu in Essonne, waar de wijn van de Île-de-France en het gevogelte van de Gâtinais de markt bepalen. In Les Ulis werd de voetbaltrainer Thierry Henry geboren, en Dourdan bracht Hugo Capet voort, lid van een koninklijke familie. Twee heel verschillende soorten aanzien, uit dezelfde streek ten zuiden van Parijs.",
  },
  "92": {
    naam: "Hauts-de-Seine",
    verhaal: "Voor u ligt Hauts-de-Seine, waar de wijn van de Coteaux de Suresne-Mont-Valérien een verrassing is zo dicht bij Parijs. In Sceaux werd de acteur Alain Delon geboren, en Neuilly-sur-Seine bracht de acteur Jean-Paul Belmondo voort. Twee grote namen van het Franse witte doek, allebei geboren in deze streek vlak bij Parijs.",
  },
  "93": {
    naam: "Seine-Saint-Denis",
    verhaal: "U komt nu Seine-Saint-Denis binnen, waar de Brie de Meaux een van de weinige streekproducten is die de kaart nog haalt. In Saint-Denis werd de Franse verzetsstrijder Paul Éluard geboren, en Le Blanc-Mesnil bracht de voetballer Moussa Sissoko voort. Twee heel verschillende soorten moed, elk op hun eigen veld.",
  },
  "94": {
    naam: "Val-de-Marne",
    verhaal: "Dit is Val-de-Marne, waar de wijn van de Île-de-France en de Brie de Meaux de markt van de streek bepalen. In Saint-Maurice werd de fotograaf Eugène Delacroix geboren, en Saint-Maur-des-Fossés bracht de acteur Vanessa Paradis voort. Twee heel verschillende tijdperken, allebei geworteld in deze streek ten zuidoosten van Parijs.",
  },
  "95": {
    naam: "Val-d'Oise",
    verhaal: "U bent aangekomen in Val-d'Oise, waar de wijn van de Île-de-France en het gevogelte van Normandië nog altijd de markt bereiken. In Pontoise werd de boekhandelaar Nicolas Flamel geboren, en Beaumont-sur-Oise bracht de voetballer Presnel Kimpembe voort. Twee heel verschillende eeuwen, verenigd in dezelfde streek ten noorden van Parijs.",
  },
};
