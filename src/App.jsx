import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Brain, Database, Warehouse, Search, Network, Cpu, Sigma, Trophy, RefreshCw, Filter, CheckCircle2, XCircle, Layers3 } from "lucide-react";

const sections = [
  { id: "all", title: "Allt efnið", subtitle: "Blandað úr öllum glærunum", icon: Layers3 },
  { id: "k1", title: "Kafli 1", subtitle: "Viðskiptagreind", icon: BookOpen },
  { id: "k2", title: "Kafli 2", subtitle: "Gervigreind", icon: Brain },
  { id: "k3", title: "Kafli 3", subtitle: "Gögn og gagnavinnsla", icon: Database },
  { id: "k4", title: "Kafli 4", subtitle: "Vöruhús gagna", icon: Warehouse },
  { id: "k5", title: "Kafli 5", subtitle: "Gagnanám", icon: Sigma },
  { id: "k6", title: "Kafli 6", subtitle: "Óskipulögð gögn og textanám", icon: Search },
  { id: "k7", title: "Kafli 7", subtitle: "Djúpnám og vitsmunavélar", icon: Cpu },
  { id: "k8", title: "Kafli 8", subtitle: "Forskriftargreiningar, bestun og hermun", icon: Trophy },
  { id: "hx", title: "Högun", subtitle: "Aðferðafræði, víddir og mælitöflur", icon: Network },
];

const questionBank = [
  // Kafli 1
  {
    id: "k1-1",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best viðskiptagreind (Business Intelligence, BI) samkvæmt glærunum?",
    options: [
      "Samansafn af aðferðum, tækni og ferlum sem styðja gagnadrifna ákvarðanatöku",
      "Aðferð til að þjálfa tauganet á óskipulögðum gögnum eingöngu",
      "Tól til að geyma hrá gögn án hreinsunar og samþættingar",
      "Aðferð til að hámarka markfall með skorðum í línulegri bestun"
    ],
    answer: "Samansafn af aðferðum, tækni og ferlum sem styðja gagnadrifna ákvarðanatöku",
    explanation: "BI er regnhlífarhugtak yfir aðferðir, tækni, verkfæri og ferla sem styðja gagnadrifna ákvörðunartöku."
  },
  {
    id: "k1-2",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða hugtak er líklegast tengt meiri fókus á hvað hefur gerst fremur en spá fyrir og hagræðingu?",
    options: [
      "Viðskiptagreind (Business Intelligence, BI)",
      "Viðskiptagreining (Business Analytics, BA)",
      "Gagna vísindi (Data Science)",
      "Forskriftargreining (Prescriptive Analytics)"
    ],
    answer: "Viðskiptagreind (Business Intelligence, BI)",
    explanation: "Í glærunum er BI tengt sterkari fókus á hvað hefur gerst, á meðan BA og gagnavísindi fara meira í spár og hagræðingu."
  },
  {
    id: "k1-3",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða samsetning styður best hlutlausa ákvörðunartöku samkvæmt kennsluefninu?",
    options: [
      "Staðlaðir mælikvarðar, myndræn framsetning og ný gögn",
      "Óstaðlaðar skilgreiningar, eldri gögn og sterk magatilfinning",
      "Aðeins innsæi stjórnenda og engin sýnileg mæligildi",
      "Mikið magn gagna án skýringa og engar sameiginlegar skilgreiningar"
    ],
    answer: "Staðlaðir mælikvarðar, myndræn framsetning og ný gögn",
    explanation: "Glærurnar leggja áherslu á staðlaða mælikvarða, sjónræna framsetningu og uppfærð gögn til að styðja hlutlausari ákvarðanatöku."
  },
  {
    id: "k1-4",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "binary",
    prompt: "Rétt eða rangt: Ef gögn og skoðun rekast á, þá á alltaf að afskrifa magatilfinningu alveg.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Í glærunum kemur fram að ekki eigi að afskrifa magatilfinningu alveg, þótt gögn skipti miklu máli."
  },
  {
    id: "k1-5",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við þekkingu (knowledge) fremur en gögn eða upplýsingar?",
    options: [
      "Styður við ákvörðunartöku, gefur samhengi og byggir á reynslu",
      "Hrá og samhengislaus atriði sem erfitt er að nota beint",
      "Vensluð og merkt gögn sem verða læsilegri",
      "Óhreinsuð skeyti með breytilegu skema"
    ],
    answer: "Styður við ákvörðunartöku, gefur samhengi og byggir á reynslu",
    explanation: "Gögn eru hrá, upplýsingar eru unnar, en þekking bætir samhengi og nýtist beint í ákvörðunartöku."
  },
  {
    id: "k1-6",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvað kemur næst á eftir upplýsinga- og þekkingaröflun í kerfisbundnu líkani Simons um ákvarðanatöku?",
    options: [
      "Hönnun ákvörðunarlíkans",
      "Útfærsla og þróun",
      "Sannprófun með ROC-kúrfu",
      "Val á ETL-verkfæri"
    ],
    answer: "Hönnun ákvörðunarlíkans",
    explanation: "Skrefin eru: upplýsinga-/þekkingaröflun, hönnun ákvörðunarlíkans, val á lausn og útfærsla/þróun."
  },
  {
    id: "k1-7",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hver eftirfarandi er líklegust til að teljast innleiðingaráskorun í viðskiptagreind frekar en tæknilegt smáatriði?",
    options: [
      "Að samræma BI við lykilverkefni stefnu fyrirtækisins",
      "Að velja milli int og bigint í einni SQL-töflu",
      "Að nota aðeins dökka liti í mælaborðum",
      "Að geyma allar víddir sem JSON sjálfgefið"
    ],
    answer: "Að samræma BI við lykilverkefni stefnu fyrirtækisins",
    explanation: "Stuðningur við stefnu fyrirtækisins, gagnadrifin menning, samþætting kerfa og væntingastjórnun eru hluti af innleiðingaráskorunum BI."
  },

  // Kafli 2
  {
    id: "k2-1",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða útfærsla gervigreindar (AI) er fyrst og fremst hugsuð til að vinna með fólki við flóknari verkefni, frekar en að vera bara viðvörun eða full sjálfvirkni?",
    options: [
      "Viðbótargreind (Augmented Intelligence)",
      "Aðstoðargreind (Assisted Intelligence)",
      "Sjálfvirk gervigreind (Autonomous AI)",
      "Fastreglugreind (Rule-only Intelligence)"
    ],
    answer: "Viðbótargreind (Augmented Intelligence)",
    explanation: "Augmented Intelligence er milli assisted og autonomous og vinnur með fólki við flóknari verkefni."
  },
  {
    id: "k2-2",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing aðgreinir best djúpnám (Deep Learning, DL) frá vélrænu námi (Machine Learning, ML) í glærunum?",
    options: [
      "DL byggir á tauganetum og er þjálfað á miklu gagnamagni, oft úr óskipulögðum gögnum",
      "DL notar aðeins reglur sem eru skilgreindar fyrirfram og aðlagast ekki",
      "ML er alltaf notað á myndir, en DL aðeins á töflur",
      "ML krefst meiri reiknikrafts en DL í öllum tilvikum"
    ],
    answer: "DL byggir á tauganetum og er þjálfað á miklu gagnamagni, oft úr óskipulögðum gögnum",
    explanation: "Samkvæmt glærunum er ML frekar á skipulögðum gögnum og DL byggir á tauganetum og miklu gagnamagni, oft á óskipulögðum gögnum."
  },
  {
    id: "k2-3",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða atriði passar best við sjálfvirka ákvörðunartöku (Automatic decision-making)?",
    options: [
      "Byggir á fyrirfram skilgreindum reglum og er fyrirsjáanleg og rekjanleg",
      "Lærir stöðugt af niðurstöðum og breytist yfir tíma án reglna",
      "Krefst alltaf tauganets með mörgum földum lögum",
      "Er aðeins notuð í sjálfkeyrandi bílum og spjallmennum"
    ],
    answer: "Byggir á fyrirfram skilgreindum reglum og er fyrirsjáanleg og rekjanleg",
    explanation: "Automatic ákvarðanataka byggir á reglum fyrirfram, án lærðrar aðlögunar."
  },
  {
    id: "k2-4",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða atriði er sterkasta vísbendingin um sjálfstæða ákvörðunartöku (Autonomous decision-making)?",
    options: [
      "Markmiðadrifin hegðun sem lærir út frá niðurstöðum og breytist yfir tíma",
      "Alger stöðugleiki þar sem engin aðlögun á sér stað",
      "Að aðeins ein regla gildi fyrir allar aðstæður",
      "Að lausnin sé auðveld í útskýringu og áhættulítil"
    ],
    answer: "Markmiðadrifin hegðun sem lærir út frá niðurstöðum og breytist yfir tíma",
    explanation: "Autonomous kerfi læra, aðlagast og krefjast eftirlits og afmarkana."
  },
  {
    id: "k2-5",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best spunagreind (Generative AI)?",
    options: [
      "Lausnir sem búa til nýtt, áður óséð efni",
      "Lausnir sem hreinsa gögn í ETL-ferli",
      "Lausnir sem geyma sögu í Type 2 víddum",
      "Lausnir sem hámarka markfall með línulegri bestun"
    ],
    answer: "Lausnir sem búa til nýtt, áður óséð efni",
    explanation: "Í glærunum er spunagreind tengd því að útbúa nýtt efni fremur en að einungis greina það sem fyrir er."
  },
  {
    id: "k2-6",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "binary",
    prompt: "Rétt eða rangt: Spjallmenni (Chatbots) geta aðeins átt samskipti skriflega, ekki með tali eða myndum.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Glærurnar segja að samskiptin geti verið skrifleg, í samtali og jafnvel með myndum."
  },
  {
    id: "k2-7",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða dæmi passar best við aðstoðargreind (Assisted Intelligence)?",
    options: [
      "Aðvörunarhljóð í bíl þegar ökumaður er nálægt því að keyra á eitthvað",
      "Sjálfkeyrandi bíll sem tekur allar ákvarðanir sjálfur í umferð",
      "Kerfi sem skrifar forrit með forritara og bætir uppkast",
      "LSTM-net sem vinnur úr löngum textaraðum"
    ],
    answer: "Aðvörunarhljóð í bíl þegar ökumaður er nálægt því að keyra á eitthvað",
    explanation: "Assisted Intelligence er einfaldasta og afmarkaðasta útfærslan, eins og viðvörunarkerfi."
  },

  // Kafli 3
  {
    id: "k3-1",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða gagnategund lýsir best JSON-skeyti þar sem reitir geta verið til staðar í einni færslu en vantað í aðra?",
    options: [
      "Hálf-skipulögð gögn (Semi-structured data)",
      "Skipulögð gögn (Structured data)",
      "Óskipulögð gögn (Unstructured data)",
      "Samfelld dreifing (Continuous distribution)"
    ],
    answer: "Hálf-skipulögð gögn (Semi-structured data)",
    explanation: "Hálf-skipulögð gögn hafa oft breytilegt skema, eins og JSON, YAML eða XML."
  },
  {
    id: "k3-2",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða flokkun gagna (taxonomy) á best við um röð eins og „stutt, miðlungs, langt“?",
    options: [
      "Raðgögn (Ordinal)",
      "Nafngögn (Nominal)",
      "Bilsgögn (Interval)",
      "Hlutfallsgögn (Ratio)"
    ],
    answer: "Raðgögn (Ordinal)",
    explanation: "Ordinal lýsir stigvaxandi eða minnkandi röð, en ekki jöfnu bili á milli gilda."
  },
  {
    id: "k3-3",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða aðferð í forvinnslu er líklegust þegar markmiðið er að tengja gögn úr mörgum áttum í eitt nothæft greiningarmengi?",
    options: [
      "Blöndun gagna (Data Blending)",
      "Næmnigreining (Sensitivity analysis)",
      "Hlutverkavídd (Role-playing dimension)",
      "Stokastísk hermun (Probabilistic simulation)"
    ],
    answer: "Blöndun gagna (Data Blending)",
    explanation: "Data Blending er sérstaklega nefnt þegar gögn eru tengd úr mörgum áttum."
  },
  {
    id: "k3-4",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða atriði lýsir best atburðagreiningu (Stream Analytics)?",
    options: [
      "Stöðug vinnsla gagnastrauma nánast í rauntíma þegar gögnin verða til",
      "Mánaðarleg samantekt á stöðu út frá lokastöðu í bókhaldi",
      "Einungis myndræn framsetning á sögulegum gögnum",
      "Að safna gögnum saman og vinna þau eingöngu í lok árs"
    ],
    answer: "Stöðug vinnsla gagnastrauma nánast í rauntíma þegar gögnin verða til",
    explanation: "Stream analytics vinnur með gögn þegar þau berast, ólíkt hefðbundnum batch-ferlum."
  },
  {
    id: "k3-5",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða áskorun er sértæk fyrir atburðagreiningu (Stream Analytics) frekar en hefðbundið gagnavöruhús?",
    options: [
      "Atburðir geta borist í öfugri tímaröð eða of seint",
      "Víddartöflur eru yfirleitt minni en fact-töflur",
      "Mæligildi eru oft notuð í pivot-töflum",
      "Söguleg gögn geta nýst í forspárgreiningu"
    ],
    answer: "Atburðir geta borist í öfugri tímaröð eða of seint",
    explanation: "Slík tímaröð, seinkun og endurtekning atburða eru klassískar áskoranir í straumvinnslu."
  },
  {
    id: "k3-6",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "binary",
    prompt: "Rétt eða rangt: Hálf-skipulögð gögn eru oft erfiðari hvað varðar gagnagæði og fyrirspurnir en hefðbundin skipulögð töflugögn.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar nefna breytilegt skema, erfiðari fyrirspurnir og erfiðari framfylgd gagnagæða."
  },
  {
    id: "k3-7",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við áreiðanleika (Reliability) í samhengi gagna í kafla 3?",
    options: [
      "Að verið sé að nota rétt gögn, helst beint úr grunnkerfi",
      "Að gögnin innihaldi sem flest NULL-gildi svo þau verði sveigjanleg",
      "Að notendur hafi ekki aðgang að gögnunum til að rugla þeim ekki saman",
      "Að öll gögn séu óskipulögð svo hægt sé að lesa þau frjálslega"
    ],
    answer: "Að verið sé að nota rétt gögn, helst beint úr grunnkerfi",
    explanation: "Reliability er tengt því að gögnin séu áreiðanleg og rétt sótt, helst beint úr grunnkerfi."
  },

  // Kafli 4
  {
    id: "k4-1",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða samsetning eru helstu eiginleikar vöruhúss gagna (Data Warehouse)?",
    options: [
      "Efnisflokkað, samþætt, tímaraðir gagna og óhverful/óbreytilegt",
      "Óskipulagt, handhófskennt, án sögu og stöðugt uppfært af notendum",
      "Aðeins rauntímagögn, eingöngu óskipulögð og án hreinsunar",
      "Sjálfkeyrandi, markmiðadrifið, lærandi og óútskýranlegt"
    ],
    answer: "Efnisflokkað, samþætt, tímaraðir gagna og óhverful/óbreytilegt",
    explanation: "Þetta eru klassísku eiginleikarnir sem nefndir eru á glærunum."
  },
  {
    id: "k4-2",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við rekstrargagnageymslu (Operational Data Store, ODS)?",
    options: [
      "Lifandi eða nýlegt afrit af rekstrarkerfum með litla vinnslu og takmarkaða sögu",
      "Miðlægt og samþætt sögulegt vöruhús sem geymir eingöngu gagnamarkaði",
      "Óskipulagt gagnalón fyrir myndir og hljóð en aldrei töflugögn",
      "Stjörnulíkan með Type 2 víddum sem er eingöngu hannað fyrir spjallmenni"
    ],
    answer: "Lifandi eða nýlegt afrit af rekstrarkerfum með litla vinnslu og takmarkaða sögu",
    explanation: "ODS geymir oft nýlegt afrit, með litla vinnslu og takmarkaða sögu, og er mikið notað fyrir rekstrarskýrslur."
  },
  {
    id: "k4-3",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best gagnamarkaði (Data Mart)?",
    options: [
      "Sérhæfð uppbygging á töflum til að svara tilteknum spurningum um afmarkað viðskiptasvið",
      "Óunnið lag af hráum gögnum sem á aldrei að nýta í skýrslur",
      "Miðlæg stjórnun stofngagna í öllum kerfum fyrirtækisins",
      "Aðferð til að bæta við einni breytu í n-tengsl í sambandsgreiningu"
    ],
    answer: "Sérhæfð uppbygging á töflum til að svara tilteknum spurningum um afmarkað viðskiptasvið",
    explanation: "Data Mart er þverskurður á tiltekinn viðskiptaferil eða svið, með áherslu á einfaldari greiningu."
  },
  {
    id: "k4-4",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Í ETL-dæminu, hvaða skref myndi líklegast fela í sér að tengja færslu við víddir og önnur tengd gögn?",
    options: [
      "Lookup",
      "Validate",
      "Cleanup",
      "Report"
    ],
    answer: "Lookup",
    explanation: "Lookup er notað til að tengja færslur við tengdar töflur, oft sem auðgun gagna."
  },
  {
    id: "k4-5",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða atriði er sterkast rök fyrir vöruhúsi gagna fremur en að keyra allt beint á grunnkerfum?",
    options: [
      "Samræmd hreinsun, samræmdar skilgreiningar og söguleg gögn á stöðluðu formi",
      "Að grunnkerfi séu sérstaklega hönnuð fyrir þungar ad-hoc greiningar",
      "Að gögn breytist aldrei og skilgreiningar séu stöðugar til lengri tíma",
      "Að ETL sé óþarfi ef notendur þekkja SQL vel"
    ],
    answer: "Samræmd hreinsun, samræmdar skilgreiningar og söguleg gögn á stöðluðu formi",
    explanation: "Þetta eru helstu ástæður sem nefndar eru í glærunum fyrir gagnavöruhúsi."
  },
  {
    id: "k4-6",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "binary",
    prompt: "Rétt eða rangt: Gagnalón (Data Lake) tekur yfirleitt við fleiri tegundum gagna en hefðbundið EDW/DWH og getur geymt hrá gögn ef ekki er enn ljóst hvort þau fari inn í EDW.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar lýsa gagnalóni sem geymslu fyrir fjölbreytt og hrá gögn, meðal annars fyrir ML og AI."
  },
  {
    id: "k4-7",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða lýsing á myndrænni greiningu (Visual Analytics) er líklegust rétt?",
    options: [
      "Sameinar myndræna framsetningu og spádómsgreiningar til að skilja flókin gögn betur",
      "Er eingöngu notuð til að teikna stöplarit án tölfræði",
      "Er samheiti yfir Type 2 víddir í gagnamörkuðum",
      "Er aðeins notuð þegar engar mælingar eru til staðar"
    ],
    answer: "Sameinar myndræna framsetningu og spádómsgreiningar til að skilja flókin gögn betur",
    explanation: "Visual analytics sameinar sjónræna framsetningu og predictive analytics samkvæmt glærunum."
  },

  // Kafli 5
  {
    id: "k5-1",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best gagnanámi (Data Mining)?",
    options: [
      "Að leita að gagnlegum mynstrum í gögnum sem voru áður óþekkt",
      "Að byggja aðeins lýsandi skýrslur í Power BI",
      "Að geyma hrá gögn í gagnalóni án úrvinnslu",
      "Að festa sögu í Type 2 víddum og keyra ETL á nóttunni"
    ],
    answer: "Að leita að gagnlegum mynstrum í gögnum sem voru áður óþekkt",
    explanation: "Þetta er kjarnaskilgreiningin á data mining í kennsluefninu."
  },
  {
    id: "k5-2",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða pörun er rétt samkvæmt glærunum?",
    options: [
      "Spálíkön – viðgjafarnám (Supervised Learning)",
      "Sambandsgreining – viðgjafarnám (Supervised Learning)",
      "Hópun – alltaf viðgjafarnám (Supervised Learning)",
      "Tímaraðir – alltaf viðgjafalaust nám (Unsupervised Learning)"
    ],
    answer: "Spálíkön – viðgjafarnám (Supervised Learning)",
    explanation: "Spálíkön byggja á dæmum og þekktri niðurstöðu, á meðan sambandsgreining og hópun eru viðgjafalausari nálganir."
  },
  {
    id: "k5-3",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða aðferð er líklegust ef markmiðið er að spá fyrir um töluvert gildi fremur en flokk?",
    options: [
      "Aðhvarfsgreining (Regression)",
      "Flokkun (Classification)",
      "Körfugreining (Market Basket / Association)",
      "Útlagagreining (Outlier Detection)"
    ],
    answer: "Aðhvarfsgreining (Regression)",
    explanation: "Regression er notuð þegar eiginleikar í gögnum eiga að gefa spágildi."
  },
  {
    id: "k5-4",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða aðferð myndir þú helst velja til að finna hvaða vörur eru keyptar saman?",
    options: [
      "Sambandsgreining (Association Analysis)",
      "Hópun (Clustering)",
      "Næmnigreining (Sensitivity Analysis)",
      "Hermun (Simulation)"
    ],
    answer: "Sambandsgreining (Association Analysis)",
    explanation: "Association er sérstaklega nefnd fyrir vörur sem eru keyptar saman og svipuð tengsl."
  },
  {
    id: "k5-5",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða aðferð hentar best ef markmiðið er að skipta viðskiptavinum í hópa eftir svipuðum eiginleikum án þess að tilgreina hópana fyrirfram?",
    options: [
      "Klösun (Clustering)",
      "Flokkun (Classification)",
      "Línuleg bestun (Linear Optimization)",
      "Viðhorfsgreining (Sentiment Analysis)"
    ],
    answer: "Klösun (Clustering)",
    explanation: "Clustering er hópun án fyrirfram skilgreindra flokka."
  },
  {
    id: "k5-6",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða mistök eru glærurnar sérstaklega að vara við með orðinu „glópagull“?",
    options: [
      "Að nota önnur spágildi sem að hluta byggja á sömu gögnum til að búa til nýtt spálíkan",
      "Að geyma hrá gögn í gagnalóni áður en ákveðið er hvort þau fari í EDW",
      "Að skipta spurningum niður í smærri áfanga í stað þess að leysa allt í einu",
      "Að sannreyna gögn þó einhver segi að þau séu í lagi"
    ],
    answer: "Að nota önnur spágildi sem að hluta byggja á sömu gögnum til að búa til nýtt spálíkan",
    explanation: "Það getur gefið blekkjandi góðar prófanir en ótrúverðugar niðurstöður í raun."
  },
  {
    id: "k5-7",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "binary",
    prompt: "Rétt eða rangt: Gagnanám getur bjargað verkefni þó gögnin séu ófullnægjandi, lýsigögn vanti og saga sé holótt.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Kennsluefnið segir skýrt að gagnanám leysi ekki vandamál sem stafa af slökum eða ófullnægjandi gögnum."
  },

  // Kafli 6
  {
    id: "k6-1",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best viðhorfsgreiningu (Sentiment Analysis)?",
    options: [
      "Að greina skoðanir og viðhorf einstaklinga gagnvart ákveðnum viðfangsefnum",
      "Að finna hagkvæmustu lausn miðað við skorður og markfall",
      "Að skipta gagnamengi í training og test og hámarka accuracy",
      "Að umbreyta óskipulögðum gögnum í Type 2 víddir"
    ],
    answer: "Að greina skoðanir og viðhorf einstaklinga gagnvart ákveðnum viðfangsefnum",
    explanation: "Sentiment analysis svarar í grunninn spurningunni um hvað fólki finnist um tiltekið efni."
  },
  {
    id: "k6-2",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða röð lýsir ferli viðhorfsgreiningar best samkvæmt glærunum?",
    options: [
      "Greina hvort viðhorf sé til staðar, meta hvort það sé jákvætt eða neikvætt, greina á hverju það er og taka niðurstöður saman",
      "Greina fyrst NER, síðan LSTM, þá ETL, og að lokum mælaborð",
      "Byrja á að hámarka markfall, síðan setja skorður og að lokum túlka viðhorf",
      "Hlaða gögnum í ODS, keyra síðan k-means og loks byggja star schema"
    ],
    answer: "Greina hvort viðhorf sé til staðar, meta hvort það sé jákvætt eða neikvætt, greina á hverju það er og taka niðurstöður saman",
    explanation: "Þetta er bein upptalning úr glærunum um ferli sentiment analysis."
  },
  {
    id: "k6-3",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða stytting passar við „rödd viðskiptavinarins“?",
    options: [
      "VOC (Voice of the Customer)",
      "VOM (Voice of the Market)",
      "VOE (Voice of the Employee)",
      "NER (Named Entity Recognition)"
    ],
    answer: "VOC (Voice of the Customer)",
    explanation: "VOC er rödd viðskiptavinarins, VOM markaðarins og VOE starfsmannsins."
  },
  {
    id: "k6-4",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða aðferð í textanámi er líklegust ef notandi vill fá stutta samantekt á löngu skjali til að spara tíma?",
    options: [
      "Samantekt (Summarization)",
      "Efnisvöktun (Topic Tracking)",
      "Hugtakavensl (Concept Linking)",
      "Stofngreining (Stemming)"
    ],
    answer: "Samantekt (Summarization)",
    explanation: "Summarization dregur saman það helsta úr skjali."
  },
  {
    id: "k6-5",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða ferlisskref er nefnt þegar lykilupplýsingar eins og nöfn, staðir og fyrirtæki eru flokkuð úr texta?",
    options: [
      "Nafngreining (Named Entity Recognition, NER)",
      "Orðskipting (Tokenization)",
      "Lemmun (Lemmatization)",
      "Staðfesting (Validation)"
    ],
    answer: "Nafngreining (Named Entity Recognition, NER)",
    explanation: "NER er notað til að bera kennsl á og flokka nöfn, staði, fyrirtæki og aðrar einingar."
  },
  {
    id: "k6-6",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða fullyrðing um leitarvélabestun (SEO) er réttust miðað við glærurnar?",
    options: [
      "Markmiðið er að gera vefsíður sýnilegri í niðurstöðum leitarvéla, en svart-hatta SEO reynir að gabba leitarvélar",
      "SEO er fyrst og fremst notað til að búa til nýjan texta með LLM-líkönum",
      "SEO er bara annað orð yfir vefnotkunargreiningu (Web Usage Mining)",
      "SEO á aðeins við þegar vefsíður eru geymdar í ODS"
    ],
    answer: "Markmiðið er að gera vefsíður sýnilegri í niðurstöðum leitarvéla, en svart-hatta SEO reynir að gabba leitarvélar",
    explanation: "Þetta er bein lýsing úr glærunum á SEO og black-hat SEO."
  },
  {
    id: "k6-7",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "binary",
    prompt: "Rétt eða rangt: Samfélagsnet (Social Networks) og samfélagsmiðill (Social Media) eru nákvæmlega sama hugtakið í glærunum.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Samfélagsnet eru tengingar milli aðila, en samfélagsmiðill er tæknin sem styður samskipti milli aðila."
  },

  // Kafli 7
  {
    id: "k7-1",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða fullyrðing lýsir best djúpnámi (Deep Learning)?",
    options: [
      "Undirgrein gervigreindar sem reynir að læra mynstur og eiginleika sjálf, oft með tauganetum",
      "Aðferð sem krefst alltaf fyrirfram skilgreindra reglna og enginnar aðlögunar",
      "Aðferð sem vinnur aðeins á litlum skipulögðum gagnasöfnum",
      "Ferli til að samþætta gögn í vöruhús með ETL"
    ],
    answer: "Undirgrein gervigreindar sem reynir að læra mynstur og eiginleika sjálf, oft með tauganetum",
    explanation: "Djúpnám á að uppgötva mynstur og eiginleika í gögnum frekar en að reiða sig eingöngu á þekkt mynstur."
  },
  {
    id: "k7-2",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða lög mynda grunnuppbyggingu tauganets samkvæmt glærunum?",
    options: [
      "Intakslag (Input layer), falið lag (Hidden layer) og úttakslag (Output layer)",
      "Markfall, skorður og ákvarðanabreytur",
      "Extract, Transform og Load",
      "Nominal, Ordinal og Ratio"
    ],
    answer: "Intakslag (Input layer), falið lag (Hidden layer) og úttakslag (Output layer)",
    explanation: "Þetta eru þrjú grunnlögin sem sýnd eru í glærunum."
  },
  {
    id: "k7-3",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða gerð tauganets er sérstaklega tengd myndgreiningu og góð í að greina línur, lögun og áferð?",
    options: [
      "Samvöfunartauganet (Convolutional Neural Networks, CNN)",
      "Endurkvæmt tauganet (Recurrent Neural Network, RNN)",
      "Djúp trúarnet (Deep Belief Network, DBN)",
      "Ákvörðunartré (Decision Tree)"
    ],
    answer: "Samvöfunartauganet (Convolutional Neural Networks, CNN)",
    explanation: "CNN eru sögð upphaflega notuð fyrir myndgreiningu og góð í línur, lögun og áferð."
  },
  {
    id: "k7-4",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða samsetning hentar best fyrir texta, tal og tímaraðir þar sem fyrri niðurstöður eru mataðar aftur inn til að muna samhengi?",
    options: [
      "RNN og sérstaklega LSTM",
      "CNN og sérstaklega OLAP",
      "Kimball og sérstaklega Inmon",
      "SEO og sérstaklega black-hat SEO"
    ],
    answer: "RNN og sérstaklega LSTM",
    explanation: "RNN henta raðgögnum og LSTM er hannað til að bæta langtímaminni."
  },
  {
    id: "k7-5",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða aðferð byggir á leikjafræði og gefur hverju inntaksgildi vægi þegar reynt er að skýra svartan kassa?",
    options: [
      "SHAP",
      "LIME",
      "NER",
      "VOC"
    ],
    answer: "SHAP",
    explanation: "SHAP byggir á leikjafræði, en LIME er einnig notað til að skilja áhrif inntaksbreyta."
  },
  {
    id: "k7-6",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "binary",
    prompt: "Rétt eða rangt: Eitt helsta vandamálið við djúp tauganet (DNN) er að þau eru oft dýr í þjálfun og geta verið erfið að útskýra.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar nefna að þau krefjist mikils reiknikrafts og séu oft svartur kassi."
  },
  {
    id: "k7-7",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða atriði tengist sérstaklega ChatGPT í glærunum?",
    options: [
      "Styrkingarlærdómur út frá endurgjöf manna (Reinforcement Learning from Human Feedback, RLHF)",
      "Aðeins star schema og OLAP-kubbar",
      "Type 2 víddir með valid-from og current-flag",
      "Línuleg bestun með integer constraints"
    ],
    answer: "Styrkingarlærdómur út frá endurgjöf manna (Reinforcement Learning from Human Feedback, RLHF)",
    explanation: "Í glærunum um ChatGPT er RLHF sérstaklega nefnt."
  },

  // Kafli 8
  {
    id: "k8-1",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða spurningu svarar forskriftargreining (Prescriptive Analytics) best?",
    options: [
      "Hvað eigum við að gera næst?",
      "Hvað gerðist?",
      "Hvað gæti gerst?",
      "Hvernig skiptist texti í orð?"
    ],
    answer: "Hvað eigum við að gera næst?",
    explanation: "Descriptive svarar hvað gerðist, predictive hvað gæti gerst, prescriptive hvað eigi að gera næst."
  },
  {
    id: "k8-2",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða atriði er forsenda í línulegri bestun samkvæmt glærunum?",
    options: [
      "Línulegt samband milli stærða",
      "Að allar breytur verði að vera heiltölur",
      "Að kerfið sé alltaf handahófskennt",
      "Að einungis sé unnið með textagögn"
    ],
    answer: "Línulegt samband milli stærða",
    explanation: "Línuleg bestun gerir ráð fyrir línulegu sambandi, skýru markmiði og takmörkuðum aðföngum."
  },
  {
    id: "k8-3",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða hugtak vísar til þess sem er hámarkað eða lágmarkað í bestunarlíkani?",
    options: [
      "Markfall (Objective Function)",
      "Ákvarðanabreytur (Decision Variables)",
      "Skorður (Constraints)",
      "Virkjunarfall (Activation Function)"
    ],
    answer: "Markfall (Objective Function)",
    explanation: "Markfallið er það sem á að hámarka eða lágmarka."
  },
  {
    id: "k8-4",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvenær er líklegast að heiltölubestun (Integer Optimization) sé valin fremur en hefðbundin línuleg bestun með deilanleika?",
    options: [
      "Þegar lausnin má ekki skiptast niður í brot, eins og einn starfsmaður eða ein flugvél",
      "Þegar gögnin eru öll texti og þarf NER",
      "Þegar við viljum meta jákvætt eða neikvætt viðhorf í umsögnum",
      "Þegar við viljum geyma söguleg gögn í ODS"
    ],
    answer: "Þegar lausnin má ekki skiptast niður í brot, eins og einn starfsmaður eða ein flugvél",
    explanation: "Deilanleiki er ekki alltaf raunhæfur; þá þarf integer optimization."
  },
  {
    id: "k8-5",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða fullyrðing um hermun (Simulation) er réttust?",
    options: [
      "Hermun gerir „what-if“ tilraunir en leitar ekki sjálfkrafa að bestu lausn",
      "Hermun finnur alltaf global optimum ef næg gögn eru til staðar",
      "Hermun er sama og supervised learning",
      "Hermun krefst þess að allar skorður séu línulegar"
    ],
    answer: "Hermun gerir „what-if“ tilraunir en leitar ekki sjálfkrafa að bestu lausn",
    explanation: "Glærurnar leggja áherslu á að simulation prófi sviðsmyndir, en sé ekki sjálfvirk bestunaraðferð."
  },
  {
    id: "k8-6",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða tegund hermunar er líklegust þegar slembni og líkur skipta máli í stað þess að allt sé fyrirfram ákveðið?",
    options: [
      "Líkindahermun (Probabilistic Simulation)",
      "Forákvörðuð hermun (Deterministic Simulation)",
      "Hálf-skipulögð hermun (Semi-structured Simulation)",
      "Type 2 hermun (Slowly Changing Simulation)"
    ],
    answer: "Líkindahermun (Probabilistic Simulation)",
    explanation: "Probabilistic simulation tekur óvissu og slembni með í reikninginn."
  },
  {
    id: "k8-7",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvað einkennir sjónræna gagnvirka hermun (Visual Interactive Simulation, VIS)?",
    options: [
      "Notendur breyta forsendum og sjá áhrif ákvarðana myndrænt",
      "Kerfið velur sjálft bestu lausn án afskipta notanda",
      "Aðeins er unnið með texta og samantektir á skjölum",
      "Engar afmarkanir eða forsendur eru skilgreindar"
    ],
    answer: "Notendur breyta forsendum og sjá áhrif ákvarðana myndrænt",
    explanation: "VIS sýnir áhrif ákvarðana sjónrænt og gerir notendum kleift að prófa mismunandi forsendur."
  },

  // Högun / methodology
  {
    id: "hx-1",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða pörun er réttust um Kimball og Inmon?",
    options: [
      "Kimball – bottom-up frá gagnamörkuðum; Inmon – top-down frá miðlægu vöruhúsi",
      "Kimball – top-down frá miðlægu vöruhúsi; Inmon – bottom-up frá gagnamörkuðum",
      "Bæði eru eingöngu nýtt til að vinna með óskipulögð gögn",
      "Bæði gera ráð fyrir að gögn séu geymd óunnin og án skilgreindra vídda"
    ],
    answer: "Kimball – bottom-up frá gagnamörkuðum; Inmon – top-down frá miðlægu vöruhúsi",
    explanation: "Glærurnar setja Kimball fram sem bottom-up og Inmon sem top-down."
  },
  {
    id: "hx-2",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir vídd sem er notuð í mörgum gagnamörkuðum, eins og dimCalendar eða dimCustomer?",
    options: [
      "Sameiginleg vídd (Common Dimension)",
      "Óeiginleg vídd (Degenerate Dimension)",
      "Hlutverkavídd (Role-playing Dimension)",
      "Brúartafla (Bridge Table)"
    ],
    answer: "Sameiginleg vídd (Common Dimension)",
    explanation: "Common dimensions eru endurnýttar í mörgum gagnamörkuðum."
  },
  {
    id: "hx-3",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best pöntunarnúmeri sem er geymt beint í fact-töflu og notað í talningar eða afmörkun?",
    options: [
      "Óeiginleg vídd (Degenerate Dimension)",
      "Type 2 vídd",
      "Sameiginleg vídd",
      "Vörpunartafla (Mapping Table)"
    ],
    answer: "Óeiginleg vídd (Degenerate Dimension)",
    explanation: "Degenerate dimensions eru víddarlík gildi sem búa beint í fact-töflu, oft með fáum eigindum."
  },
  {
    id: "hx-4",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða dæmi passar best við hlutverkavídd (Role-playing Dimension)?",
    options: [
      "Sama dagsetningarvídd notuð sem Order Date, Ship Date og Delivery Date",
      "Sama fact-töflu notuð fyrir sales og inventory án breytinga",
      "Sama ETL-ferli keyrt bæði á kvöldin og morgnana",
      "Sama skýring notuð fyrir rétt og rangt svar í prófi"
    ],
    answer: "Sama dagsetningarvídd notuð sem Order Date, Ship Date og Delivery Date",
    explanation: "Role-playing dimension er sama víddin í mismunandi hlutverkum með skýrri nafnagift."
  },
  {
    id: "hx-5",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða fullyrðing greinir best á milli Type 1 og Type 2 vídda?",
    options: [
      "Type 1 geymir ekki sögu, en Type 2 geymir sögu með t.d. valid-from/to og current-flag",
      "Type 1 er alltaf stærri en fact-töflur, en Type 2 er alltaf minni",
      "Type 1 er fyrir textagögn, en Type 2 er fyrir tölugögn",
      "Type 1 er fyrir ODS, en Type 2 er eingöngu fyrir Data Lakes"
    ],
    answer: "Type 1 geymir ekki sögu, en Type 2 geymir sögu með t.d. valid-from/to og current-flag",
    explanation: "Type 1 yfirskrifar, Type 2 varðveitir sögu."
  },
  {
    id: "hx-6",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða tegund fact-töflu sýnir stöðu á tilteknum tímapunkti, til dæmis dagslokastöðu eða mánaðarlokastöðu?",
    options: [
      "Periodic Snapshot",
      "Transaction Fact",
      "Accumulating Snapshot",
      "Degenerate Fact"
    ],
    answer: "Periodic Snapshot",
    explanation: "Periodic snapshot sýnir stöðu á tilteknum tímapunkti. Transaction facts bæta yfirleitt við en uppfæra ekki."
  },
  {
    id: "hx-7",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða mæligildi er líklegast semi-additive frekar en additive eða non-additive?",
    options: [
      "Staða bankareiknings í lok mánaðar",
      "Heildarupphæð seldra vara í tiltekinni færslu",
      "Einkvæmur fjöldi seldra vara yfir allar víddir",
      "Fjöldi kílómetra eknir í einstökum akstri"
    ],
    answer: "Staða bankareiknings í lok mánaðar",
    explanation: "Lokastaða reiknings er klassískt semi-additive dæmi; hún má ekki summast frjálslega yfir tíma."
  },
];

const countOptions = [10, 15, 20, 30, "all"];

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuizPool(sectionId, count) {
  const pool = sectionId === "all"
    ? questionBank
    : questionBank.filter((q) => q.section === sectionId);

  const picked = count === "all"
    ? shuffleArray(pool)
    : shuffleArray(pool).slice(0, Math.min(Number(count), pool.length));

  return picked.map((q) => ({
    ...q,
    uiOptions: shuffleArray(q.options),
  }));
}

function ResultBadge({ ok }) {
  return ok ? (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
      <CheckCircle2 className="h-4 w-4" /> Rétt
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-1 text-sm text-rose-200">
      <XCircle className="h-4 w-4" /> Rangt
    </span>
  );
}

export default function VGBIQuizSite() {
  const [selectedSection, setSelectedSection] = useState("all");
  const [questionCount, setQuestionCount] = useState(15);
  const [quiz, setQuiz] = useState([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState([]);

  const statsBySection = useMemo(() => {
    const stats = {};
    for (const s of sections) {
      if (s.id === "all") {
        stats[s.id] = questionBank.length;
      } else {
        stats[s.id] = questionBank.filter((q) => q.section === s.id).length;
      }
    }
    return stats;
  }, []);

  const current = quiz[index];
  const progress = quiz.length ? ((index + (locked ? 1 : 0)) / quiz.length) * 100 : 0;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const scorePct = answers.length ? Math.round((correctCount / answers.length) * 100) : 0;

  const sectionTitle = useMemo(() => {
    return sections.find((s) => s.id === selectedSection)?.title || "Allt efnið";
  }, [selectedSection]);

  const availableMax = selectedSection === "all"
    ? questionBank.length
    : questionBank.filter((q) => q.section === selectedSection).length;

  function startQuiz() {
    const actualCount = questionCount === "all"
      ? "all"
      : Math.min(Number(questionCount), availableMax);

    const newQuiz = buildQuizPool(selectedSection, actualCount);
    setQuiz(newQuiz);
    setStarted(true);
    setFinished(false);
    setIndex(0);
    setSelectedOption(null);
    setLocked(false);
    setAnswers([]);
  }

  function answerQuestion(option) {
    if (locked || !current) return;
    const isCorrect = option === current.answer;
    setSelectedOption(option);
    setLocked(true);
    setAnswers((prev) => [
      ...prev,
      {
        id: current.id,
        prompt: current.prompt,
        sectionLabel: current.sectionLabel,
        selected: option,
        correctAnswer: current.answer,
        isCorrect,
        explanation: current.explanation,
        type: current.type,
      },
    ]);
  }

  function nextQuestion() {
    if (index === quiz.length - 1) {
      setFinished(true);
      setStarted(false);
      return;
    }
    setIndex((prev) => prev + 1);
    setSelectedOption(null);
    setLocked(false);
  }

  function resetAll() {
    setStarted(false);
    setFinished(false);
    setQuiz([]);
    setIndex(0);
    setSelectedOption(null);
    setLocked(false);
    setAnswers([]);
  }

  const reviewBySection = useMemo(() => {
    const grouped = {};
    for (const answer of answers) {
      if (!grouped[answer.sectionLabel]) grouped[answer.sectionLabel] = [];
      grouped[answer.sectionLabel].push(answer);
    }
    return grouped;
  }, [answers]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-2xl"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-200">
                <BookOpen className="h-4 w-4" /> VGBI æfingasíða
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Erfið og ruglingsleg krossapróf úr glærunum
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Veldu ákveðinn kafla til að æfa markvisst eða farðu í blandað próf úr öllu efninu.
                Spurningarnar eru settar fram bæði sem 4-valsspurningar og rétt/rangt spurningar,
                þar á meðal dæmisögur og hugtakaspurningar í anda leiðbeininganna.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-slate-400">Spurningar</div>
                <div className="mt-1 text-2xl font-semibold">{questionBank.length}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-slate-400">Kaflar</div>
                <div className="mt-1 text-2xl font-semibold">8 + Högun</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-slate-400">Hamur</div>
                <div className="mt-1 text-2xl font-semibold">Erfiður</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-slate-400">Svartegundir</div>
                <div className="mt-1 text-2xl font-semibold">4 / 2</div>
              </div>
            </div>
          </div>
        </motion.div>

        {!started && !finished && (
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl backdrop-blur">
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Filter className="h-5 w-5 text-indigo-300" /> Veldu efni
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const active = selectedSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setSelectedSection(section.id);
                        setQuestionCount(15);
                      }}
                      className={`rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-indigo-400 bg-indigo-500/15 shadow-lg shadow-indigo-900/40"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                          {statsBySection[section.id]} sp.
                        </span>
                      </div>
                      <div className="font-semibold">{section.title}</div>
                      <div className="mt-1 text-sm text-slate-400">{section.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl backdrop-blur">
              <div className="mb-4 text-lg font-semibold">Stilla próf</div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Valinn hluti</label>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium">{sectionTitle}</div>
                    <div className="mt-1 text-sm text-slate-400">
                      Hámark {availableMax} spurningar í þessu vali.
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">Fjöldi spurninga</label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value === "all" ? "all" : Number(e.target.value))}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-indigo-400"
                  >
                    {countOptions.map((count) => {
                      const label = count === "all" ? "Allar í valinu" : `${count} spurningar`;
                      const disabled = count !== "all" && Number(count) > availableMax;
                      return (
                        <option key={String(count)} value={count} disabled={disabled}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
                  <div className="font-semibold">Athugið</div>
                  <p className="mt-1 leading-6">
                    Spurningarnar eru viljandi ruglingslegar. Rétt svar er oft valið þannig að það sé ekki of augljóst,
                    og röng svör eru hönnuð til að vera nálægt rétta hugtakinu.
                  </p>
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400"
                >
                  Hefja próf
                </button>
              </div>
            </div>
          </div>
        )}

        {started && current && (
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm text-slate-400">Spurning {index + 1} af {quiz.length}</div>
                <div className="mt-1 text-lg font-semibold">{current.sectionLabel}</div>
              </div>
              <button
                onClick={resetAll}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
              >
                <RefreshCw className="h-4 w-4" /> Hætta og velja aftur
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
                    {current.type === "binary" ? "Rétt / Rangt" : "4 valmöguleikar"}
                  </span>
                  <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200">
                    Erfið útgáfa
                  </span>
                </div>

                <h2 className="text-xl font-semibold leading-8 sm:text-2xl">{current.prompt}</h2>

                <div className="mt-6 grid gap-3">
                  {current.uiOptions.map((option) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = locked && option === current.answer;
                    const isWrongSelected = locked && isSelected && option !== current.answer;

                    return (
                      <button
                        key={option}
                        onClick={() => answerQuestion(option)}
                        disabled={locked}
                        className={`rounded-2xl border p-4 text-left text-base leading-7 transition ${
                          isCorrect
                            ? "border-emerald-400 bg-emerald-500/10"
                            : isWrongSelected
                            ? "border-rose-400 bg-rose-500/10"
                            : isSelected
                            ? "border-indigo-400 bg-indigo-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        } ${locked ? "cursor-default" : "cursor-pointer"}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {locked && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <ResultBadge ok={selectedOption === current.answer} />
                      <div className="text-sm text-slate-400">Rétt svar: <span className="font-medium text-slate-200">{current.answer}</span></div>
                    </div>
                    <p className="leading-7 text-slate-300">{current.explanation}</p>

                    <button
                      onClick={nextQuestion}
                      className="mt-4 rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400"
                    >
                      {index === quiz.length - 1 ? "Sjá niðurstöður" : "Næsta spurning"}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {finished && (
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 shadow-2xl">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                    <Trophy className="h-4 w-4 text-amber-300" /> Niðurstöður
                  </div>
                  <h2 className="text-3xl font-bold">{scorePct}% rétt</h2>
                  <p className="mt-2 text-slate-300">
                    Þú svaraðir {correctCount} af {answers.length} spurningum rétt í valinu <span className="font-semibold text-white">{sectionTitle}</span>.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-slate-400">Rétt</div>
                    <div className="mt-1 text-2xl font-semibold text-emerald-300">{correctCount}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-slate-400">Rangt</div>
                    <div className="mt-1 text-2xl font-semibold text-rose-300">{answers.length - correctCount}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-slate-400">Valið</div>
                    <div className="mt-1 text-lg font-semibold">{sectionTitle}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-slate-400">Fjöldi</div>
                    <div className="mt-1 text-2xl font-semibold">{answers.length}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={startQuiz}
                  className="rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400"
                >
                  Taka nýtt próf úr sama vali
                </button>
                <button
                  onClick={resetAll}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold transition hover:bg-white/10"
                >
                  Velja annan kafla
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {Object.entries(reviewBySection).map(([label, group]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{label}</h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                      {group.filter((g) => g.isCorrect).length}/{group.length} rétt
                    </span>
                  </div>

                  <div className="space-y-4">
                    {group.map((item, idx) => (
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                          <div className="font-medium leading-7">{idx + 1}. {item.prompt}</div>
                          <ResultBadge ok={item.isCorrect} />
                        </div>
                        <div className="space-y-1 text-sm leading-6 text-slate-300">
                          <div><span className="text-slate-400">Þitt svar:</span> {item.selected}</div>
                          <div><span className="text-slate-400">Rétt svar:</span> {item.correctAnswer}</div>
                          <div className="pt-1 text-slate-200">{item.explanation}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
