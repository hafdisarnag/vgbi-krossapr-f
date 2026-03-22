import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Brain, Database, Warehouse, Search, Network,
  Cpu, Sigma, Trophy, RefreshCw, Filter, CheckCircle2,
  XCircle, Layers3
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

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
const extraQuestions = [
  // Kafli 1 - fleiri
  {
    id: "k1-8",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing lýsir best gagnadrifinni ákvörðunartöku (Data-driven decision-making, DDDM)?",
    options: [
      "Gögn og tölfræði eru mikið notuð og spálíkön verða sífellt mikilvægari",
      "Ákvarðanir eru eingöngu byggðar á innsæi og reynslu en aldrei mælingum",
      "Einungis er verið að teikna skýrslur án tengingar við rekstur",
      "Áherslan er fyrst og fremst á að forðast sjálfvirkni og hraða"
    ],
    answer: "Gögn og tölfræði eru mikið notuð og spálíkön verða sífellt mikilvægari",
    explanation: "DDDM í glærunum tengist meiri notkun gagna, tölfræði og spálíkana í ákvörðunartöku."
  },
  {
    id: "k1-9",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða valkostur passar best við áskorun sem gerir BI flóknara en einfalt CSV/SQL dæmi?",
    options: [
      "Gögn koma úr mörgum áttum, breytast yfir tíma og skilgreiningar færast til",
      "Gögn eru fá, stöðug og öll í einni einfaldri töflu",
      "Skýrslur eru ekki notaðar af neinum í rekstrinum",
      "Notendur vilja aðeins lesa textaskrár án nokkurrar samantektar"
    ],
    answer: "Gögn koma úr mörgum áttum, breytast yfir tíma og skilgreiningar færast til",
    explanation: "Kennsluefnið nefnir marga gagnagjafa, breytingar yfir tíma og breytilegar skilgreiningar sem ástæður fyrir skipulagðri BI nálgun."
  },
  {
    id: "k1-10",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "binary",
    prompt: "Rétt eða rangt: Í kerfisbundnu ákvörðunarlíkani Simons kemur val á lausn á undan hönnun ákvörðunarlíkans.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Hönnun ákvörðunarlíkans kemur á undan vali á lausn."
  },
  {
    id: "k1-11",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða valkostur er dæmi um hlutdrægni eða skekkju sem getur gert ákvörðun síður hlutlausa?",
    options: [
      "Hópþrýstingur, rangtúlkun og bjartsýni",
      "Samræmdir kjarnamælikvarðar og uppfærð gögn",
      "Vel merktar upplýsingar og sameiginlegar skilgreiningar",
      "Stöðluð sjónræn framsetning og skýrt samhengi"
    ],
    answer: "Hópþrýstingur, rangtúlkun og bjartsýni",
    explanation: "Í glærunum eru nefnd dæmi um skekkjuþætti eins og rangtúlkun, bjartsýni og hópþrýsting."

  },

  // Kafli 2 - fleiri
  {
    id: "k2-8",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við máltækni (Natural Language Processing, NLP)?",
    options: [
      "Samskipti við tölvur á mannamáli, hvort sem það er talað eða skrifað",
      "Aðeins þýðing milli tveggja fyrirfram skilgreindra tungumála",
      "Aðferð til að geyma texta í star schema",
      "Reglubundin ETL-vinnsla á töflugögnum í ODS"
    ],
    answer: "Samskipti við tölvur á mannamáli, hvort sem það er talað eða skrifað",
    explanation: "NLP er í glærunum skilgreint sem samskipti við tölvur á mannamáli."
  },
  {
    id: "k2-9",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing um snjallþjónustur (Intelligent Agents) er réttust?",
    options: [
      "Þær fylgjast með, læra og bregðast við breytingum í umhverfi sínu til að ná markmiði",
      "Þær eru ófærar um að bregðast við neinum breytingum eftir innleiðingu",
      "Þær eru eingöngu notaðar í myndgreiningu og ekkert annað",
      "Þær verða alltaf að vera fullkomlega sjálfkeyrandi og án notenda"
    ],
    answer: "Þær fylgjast með, læra og bregðast við breytingum í umhverfi sínu til að ná markmiði",
    explanation: "Snjallþjónustur eru lýstar sem sjálfstæðum þjónustum sem fylgjast með, læra og bregðast við breytingum."
  },
  {
    id: "k2-10",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða dæmi úr glærunum passar best við sjálfstæða ákvörðunartöku (Autonomous)?",
    options: [
      "Breytileg verðlagning sem lærir og aðlagast yfir tíma",
      "Greiðslusamþykki byggt á föstum reglum",
      "Skýrslusíða sem sýnir aðeins söguleg KPI",
      "CSV útflutningur úr rekstrarkerfi"
    ],
    answer: "Breytileg verðlagning sem lærir og aðlagast yfir tíma",
    explanation: "Breytileg verðlagning er nefnd sem dæmi um autonomous ákvörðunartöku."
  },
  {
    id: "k2-11",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "binary",
    prompt: "Rétt eða rangt: Ein af veikleikunum við sjálfvirka ákvörðunartöku (Automatic) er að hún brotnar frekar auðveldlega við nýjar sviðsmyndir.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Automatic ákvarðanataka er fyrirsjáanleg og útskýranleg en glímir verr við nýjar sviðsmyndir."
  },

  // Kafli 3 - fleiri
  {
    id: "k3-8",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða lýsing er líklegust á skipulögðum gögnum (Structured data)?",
    options: [
      "Gögn í fyrirfram skilgreindu skema með skilgreindum gagnatökum og leyfðum gildum",
      "Gögn þar sem engin uppbygging er fyrirfram skilgreind og aðeins menn skilja þau",
      "Gögn sem eru alltaf í hljóði og myndum en aldrei í töflum",
      "Gögn sem eru aðeins til í samfélagsmiðlaloggum"
    ],
    answer: "Gögn í fyrirfram skilgreindu skema með skilgreindum gagnatökum og leyfðum gildum",
    explanation: "Structured data er í glærunum lýst með fyrirfram skilgreindu skema, gagnatökum og leyfðum gildum."
  },
  {
    id: "k3-9",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða gæðahugtak passar best við setninguna „fylgja allar upplýsingar og hefur lýsigögnum verið bætt við“?",
    options: [
      "Auðgun (Richness)",
      "Tímanleiki (Timeliness)",
      "Áreiðanleiki (Reliability)",
      "Öryggi (Security)"
    ],
    answer: "Auðgun (Richness)",
    explanation: "Richness í glærunum snýr að því hvort allar upplýsingar fylgi og lýsigögnum hafi verið bætt við."
  },
  {
    id: "k3-10",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða aðgerð er líklegust í gagnavinnslu þegar gagnamengi er mjög skekkt (skewed) og markmiðið er að bæta spálíkan?",
    options: [
      "Jöfnun gagnamengis (Balancing)",
      "Að geyma gögnin óhreinsuð í ODS",
      "Að umbreyta öllum víddum í degenerate dimensions",
      "Að sleppa öllum lýsigögnum til að einfalda líkanið"
    ],
    answer: "Jöfnun gagnamengis (Balancing)",
    explanation: "Balancing er nefnt sem leið til að bæta gagnamengi sem eru ekki með jafna dreifingu."
  },
  {
    id: "k3-11",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "binary",
    prompt: "Rétt eða rangt: Óskipulögð gögn (Unstructured data) fylgja yfirleitt fyrirfram skilgreindu skema sem tryggir að allar færslur líti eins út.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Óskipulögð gögn hafa ekki slíkt fyrirfram skilgreint skema."
  },

  // Kafli 4 - fleiri
  {
    id: "k4-8",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða tegund vöruhúss er líklegust þegar sérhæfð lausn á að þjóna ákveðnu sviði eða deild fremur en öllu fyrirtækinu?",
    options: [
      "Gagnamarkaður (Data Mart)",
      "Rekstrarkerfi (OLTP system)",
      "Sjálfstæð ákvörðunartaka (Autonomous)",
      "Líkindahermun (Probabilistic Simulation)"
    ],
    answer: "Gagnamarkaður (Data Mart)",
    explanation: "Data mart er sérhæft vöruhús fyrir ákveðið svið eða deild."
  },
  {
    id: "k4-9",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða lýsing á ODS er réttust í samanburði við EDW/DWH?",
    options: [
      "ODS sækir oft gögn nær rauntíma og gerir lágmarks hreinsun og samþættingu",
      "ODS er alltaf fullkomlega sögulegt og geymir aðeins type 2 víddir",
      "ODS er fyrst og fremst notað fyrir óskipulögð mynd- og hljóðgögn",
      "ODS er sama hugtak og independent data marts"
    ],
    answer: "ODS sækir oft gögn nær rauntíma og gerir lágmarks hreinsun og samþættingu",
    explanation: "ODS í glærunum les oft gögn beint úr grunnkerfi með lágmarks vinnslu."
  },
  {
    id: "k4-10",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Í ETL-flæðinu, hvaða skref er líklegast að framkvæma afleiddar útreiknaðar stærðir eins og summur eða prósentur?",
    options: [
      "Calc",
      "Extract",
      "Approve",
      "Cleanup"
    ],
    answer: "Calc",
    explanation: "Calc er í glærunum notað fyrir útreiknaðar stærðir eins og summur og +/-/%."
  },
  {
    id: "k4-11",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "binary",
    prompt: "Rétt eða rangt: Ein af stefnunum í vöruhúsum gagna sem nefnd er í glærunum er aukin notkun rauntíma vöruhúsa.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Rauntíma vöruhús eru nefnd sem spennandi stefna í þróun vöruhúsa gagna."
  },

  // Kafli 5 - fleiri
  {
    id: "k5-8",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða líkan er líklegast ef markmiðið er að gefa líkur á einhverju út frá röð spurninga og upplýsingagildi (information gain)?",
    options: [
      "Ákvörðunartökutré (Decision Tree)",
      "Samvöfunartauganet (CNN)",
      "Sjónræn gagnvirk hermun (VIS)",
      "Periodic Snapshot"
    ],
    answer: "Ákvörðunartökutré (Decision Tree)",
    explanation: "Decision tree velur breytu sem gefur mestar upplýsingar um niðurstöðuna, samkvæmt glærunum."
  },
  {
    id: "k5-9",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða aðferð hentar best ef við viljum finna bæði hópa og möguleg óeðlileg tilvik í tölulegum gögnum?",
    options: [
      "Hópun (Clustering)",
      "Sambandsgreining (Association)",
      "Línuleg bestun (Linear Optimization)",
      "ETL lookup"
    ],
    answer: "Hópun (Clustering)",
    explanation: "Clustering er í glærunum notað bæði til að finna hópa og óeðlileg tilvik."
  },
  {
    id: "k5-10",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við ensemble nálgun í gagnanámi?",
    options: [
      "Sameinar niðurstöður mismunandi líkana til að auka áreiðanleika og nákvæmni",
      "Notar aðeins eitt líkan en með fleiri dálkum",
      "Sleppir öllu mati á gæðum og treystir á innsæi",
      "Þvingar öll líkön til að gefa sömu niðurstöðu með handvirkum reglum"
    ],
    answer: "Sameinar niðurstöður mismunandi líkana til að auka áreiðanleika og nákvæmni",
    explanation: "Ensemble er í glærunum lýst sem samsetningu niðurstaðna margra líkana."
  },
  {
    id: "k5-11",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "binary",
    prompt: "Rétt eða rangt: Spádómsgreiningar (Predictive Analytics) snúast fyrst og fremst um að lýsa því sem þegar hefur gerst en ekki því sem líklega gerist næst.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Predictive analytics snýst um að spá fyrir um hvað líklega gerist í framtíðinni."
  },

  // Kafli 6 - fleiri
  {
    id: "k6-8",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða aðferð í textanámi myndi líklegast reyna að spá fyrir um hvaða texta notandi vill nálgast byggt á fyrri notkun?",
    options: [
      "Efnisvöktun (Topic Tracking)",
      "Samantekt (Summarization)",
      "Nafngreining (NER)",
      "Stofngreining (Stemming)"
    ],
    answer: "Efnisvöktun (Topic Tracking)",
    explanation: "Topic Tracking er notað til að greina hvaða texta notandi vill líklega nálgast út frá fyrri notkun."
  },
  {
    id: "k6-9",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða aðferð hjálpar notendum helst að finna skjöl um tengd mál sem þeir hefðu líklega annars ekki fundið?",
    options: [
      "Hugtakavensl (Concept Linking)",
      "Svaraleit (Question Answering)",
      "Efnisflokkun (Categorization)",
      "Viðhorfsgreining (Sentiment Analysis)"
    ],
    answer: "Hugtakavensl (Concept Linking)",
    explanation: "Concept Linking tengir skyld hugtök og hjálpar notendum að finna efni sem þeir annars hefðu misst af."
  },
  {
    id: "k6-10",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða rödd er VOE samkvæmt glærunum?",
    options: [
      "Rödd starfsmannsins (Voice of the Employee)",
      "Rödd markaðarins (Voice of the Market)",
      "Rödd viðskiptavinarins (Voice of the Customer)",
      "Rödd vélarinnar (Voice of the Engine)"
    ],
    answer: "Rödd starfsmannsins (Voice of the Employee)",
    explanation: "VOE stendur fyrir Voice of the Employee."
  },
  {
    id: "k6-11",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "binary",
    prompt: "Rétt eða rangt: Svart-hatta leitarvélabestun (Black-hat SEO) reynir að gabba eða blekkja leitarvélar fremur en að bæta raunverulegt efni notenda.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar skilgreina black-hat SEO sem tilraun til að gabba leitarvélar."
  },

  // Kafli 7 - fleiri
  {
    id: "k7-8",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða atriði lýsir best þjálfun tauganets (Artificial Neural Network, ANN)?",
    options: [
      "Vægi (weights) eru leiðrétt endurtekið út frá villu þar til netið spáir betur",
      "Netið fær aðeins eina keyrslu og lærir síðan ekki meira",
      "Þjálfun felst fyrst og fremst í að velja litina á lögunum",
      "Markmiðið er að fjarlægja öll hidden layers svo líkanið verði djúpara"
    ],
    answer: "Vægi (weights) eru leiðrétt endurtekið út frá villu þar til netið spáir betur",
    explanation: "ANN þjálfun felst í að stilla weights út frá villu, oft með backpropagation."
  },
  {
    id: "k7-9",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða notkunartilvik er líklegast fyrir CNN fremur en RNN/LSTM?",
    options: [
      "Myndgreining þar sem línur, lögun og áferð skipta máli",
      "Tal- eða textaraðir þar sem fyrri orð skipta máli fyrir næstu",
      "Vaktaskipulag með markfalli og skorðum",
      "Skjalaflokkun byggð á fyrirfram skilgreindum handvirkum reglum"
    ],
    answer: "Myndgreining þar sem línur, lögun og áferð skipta máli",
    explanation: "CNN eru sérstaklega tengd myndgreiningu í glærunum."
  },
  {
    id: "k7-10",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða atriði er frekar kostur en galli við sjálfstæða ákvörðunartöku (Autonomous) samkvæmt glærunum?",
    options: [
      "Bregst betur við flóknum sviðsmyndum og batnar með tímanum",
      "Er alltaf auðveldari í útskýringu en reglubundin sjálfvirkni",
      "Þarfnast ekki eftirlits ef hún hefur séð nóg af gögnum",
      "Er áhættulaus svo lengi sem hún notar djúpnám"
    ],
    answer: "Bregst betur við flóknum sviðsmyndum og batnar með tímanum",
    explanation: "Þetta er einn helsti kosturinn sem nefndur er við autonomous kerfi."
  },
  {
    id: "k7-11",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "binary",
    prompt: "Rétt eða rangt: Djúpnám er almennt fljótlegra að þjálfa en hefðbundið vélrænt nám og krefst yfirleitt minna reikniafls.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Djúpnám er yfirleitt flóknara og krefst meira reikniafls en mörg hefðbundin ML líkön."
  },

  // Kafli 8 - fleiri
  {
    id: "k8-8",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða notkunartilvik er líklegast dæmi um línulega bestun samkvæmt glærunum?",
    options: [
      "Vaktaskipulag starfsmanna með takmörkuðum aðföngum",
      "Nafngreining á fyrirtækjum í texta",
      "Myndgreining með samvöfunartauganeti",
      "Type 2 söguvarsla í víddartöflu"
    ],
    answer: "Vaktaskipulag starfsmanna með takmörkuðum aðföngum",
    explanation: "Starfsmannaskipulag er eitt af dæmunum sem nefnd eru fyrir línulega bestun."
  },
  {
    id: "k8-9",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða atriði er dæmi um skorðu (Constraint) fremur en markfall eða ákvarðanabreytu?",
    options: [
      "Takmarkað hráefni, fjármagn eða fjöldi starfsmanna",
      "Hámarka hagnað eða lágmarka kostnað",
      "Fjöldi eininga af vöru A sem á að framleiða",
      "Val á skýringaraðferð eins og SHAP eða LIME"
    ],
    answer: "Takmarkað hráefni, fjármagn eða fjöldi starfsmanna",
    explanation: "Takmörkuð aðföng eru klassísk dæmi um skorður í bestun."
  },
  {
    id: "k8-10",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða fullyrðing um erfðafræðileg hermireiknirit (Genetic Algorithms) er réttust?",
    options: [
      "Þau meta mengi lausnartillagna, velja bestu, para þær saman og endurtaka ferlið",
      "Þau finna aðeins lausnir með því að prófa allar mögulegar samsetningar nákvæmlega",
      "Þau eru sama hugtak og deterministic simulation",
      "Þau eru notuð eingöngu til að lesa og flokka textaskjöl"
    ],
    answer: "Þau meta mengi lausnartillagna, velja bestu, para þær saman og endurtaka ferlið",
    explanation: "Genetic algorithms í glærunum byggja á survivial of the fittest og endurteknum betrumbótum á lausnum."
  },
  {
    id: "k8-11",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "binary",
    prompt: "Rétt eða rangt: Ef deilanleiki er ekki raunhæfur, til dæmis þegar lausnin verður að vera heill starfsmaður eða heil vél, getur heiltölubestun (Integer Optimization) verið viðeigandi.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Þetta er nákvæmlega dæmið sem glærurnar nefna fyrir integer optimization."
  },

  // Högun - fleiri
  {
    id: "hx-8",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða kostur er sterkast tengdur Kimball aðferðafræðinni samkvæmt glærunum?",
    options: [
      "Auðvelt að skilja og hentar vel skýrslutólum og endanotendum",
      "Byggir alltaf á 3NF í miðlægu EDW áður en gagnamarkaðir eru hannaðir",
      "Er fyrst og fremst hönnuð fyrir hrá gögn á diski í gagnalóni",
      "Forðast að nota víddir og mælitöflur til að einfalda arkitektúr"
    ],
    answer: "Auðvelt að skilja og hentar vel skýrslutólum og endanotendum",
    explanation: "Kimball er í glærunum talin notendavæn og góð fyrir skýrslutól."
  },
  {
    id: "hx-9",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við Inmon nálgunina?",
    options: [
      "Top-down miðlæg hönnun með mikilli áherslu á samþættingu og samræmi",
      "Bottom-up nálgun sem byrjar alltaf á einstökum gagnamörkuðum",
      "Aðferð sem sleppir miðlægri stjórnun og leyfir öllum teymum að gera sitt eigið",
      "Aðferð sem vinnur aðeins með óskipulögð gögn í Data Lake"
    ],
    answer: "Top-down miðlæg hönnun með mikilli áherslu á samþættingu og samræmi",
    explanation: "Inmon er top-down og leggur áherslu á miðlæga stjórnun, samþættingu og samræmi."
  },
  {
    id: "hx-10",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða tegund gagna teljast stofngögn (Masterdata) frekar en hefðbundin atburðagögn?",
    options: [
      "Vara, viðskiptamaður og verslun",
      "Stök sala á tilteknum tíma með upphæð og magni",
      "Einstök lagerhreyfing á klukkustund",
      "Úttak úr hermilíkani með 1.000 keyrslum"
    ],
    answer: "Vara, viðskiptamaður og verslun",
    explanation: "Masterdata eru gögn sem lýsa samhengi og breytast sjaldan, eins og vara og viðskiptamaður."
  },
  {
    id: "hx-11",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "binary",
    prompt: "Rétt eða rangt: Einkvæmur fjöldi seldra vara er dæmi um non-additive measure því ekki er hægt að leggja hann saman frjálslega yfir allar víddir.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar nefna þetta sem dæmi um non-additive measure."
  }
];

questionBank.push(...extraQuestions);

const moreExtraQuestions = [
  // Kafli 1
  {
    id: "k1-12",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða hugtak er víðtækast samkvæmt glærunum þegar verið er að tala um allt svið gagnagreiningar?",
    options: [
      "Gagnagreining (Data Intelligence)",
      "Viðskiptagreind (Business Intelligence, BI)",
      "Viðskiptagreining (Business Analytics, BA)",
      "Gagnavísindi (Data Science)"
    ],
    answer: "Gagnagreining (Data Intelligence)",
    explanation: "Í glærunum er gagnagreining sett fram sem víðtækasta hugtakið."
  },
  {
    id: "k1-13",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða valkostur passar best við viðskiptagreiningu (Business Analytics, BA) fremur en hefðbundna BI nálgun?",
    options: [
      "Spár og hagræðing fremur en aðeins yfirlit um það sem hefur gerst",
      "Aðeins skýrslugerð um fortíðina án líkangerðar",
      "Einföld geymsla hrára gagna á diski",
      "Aðeins handvirk vinnsla án tölfræðilegra aðferða"
    ],
    answer: "Spár og hagræðing fremur en aðeins yfirlit um það sem hefur gerst",
    explanation: "BA tengist meira spá og hagræðingu en BI sem er oft meira um hvað hefur gerst."
  },
  {
    id: "k1-14",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða notkunartilvik í kennslustofuefninu bendir sterkast til þess að rauntímagreining gæti verið gagnleg?",
    options: [
      "Öryggi og frávik í rekstri",
      "Að skrifa út ársreikning einu sinni á ári",
      "Að endurnefna dálka í CSV skrá",
      "Að velja leturgerð fyrir mælaborð"
    ],
    answer: "Öryggi og frávik í rekstri",
    explanation: "Í glærunum eru öryggi og rekstrarfrávik meðal dæma sem líklega krefjast rauntímagreininga."
  },
  {
    id: "k1-15",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "binary",
    prompt: "Rétt eða rangt: Viðskiptagreind (BI) og viðskiptagreining (BA) eru alltaf skilgreind nákvæmlega eins alls staðar og enginn merkingarmunur er nefndur í efninu.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Glærurnar taka fram að skilningur á þessum hugtökum sé ekki alltaf sá sami."

  },

  // Kafli 2
  {
    id: "k2-12",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða gervigreindaraðferð er sögð hlutmengi af vélrænu námi (ML) og styðjast við tauganet?",
    options: [
      "Djúpnám (Deep Learning, DL)",
      "Nafngreining (NER)",
      "Leitarvélabestun (SEO)",
      "Markfall (Objective Function)"
    ],
    answer: "Djúpnám (Deep Learning, DL)",
    explanation: "DL er í glærunum sett fram sem hlutmengi af ML sem hermir eftir mannheilanum með tauganetum."
  },
  {
    id: "k2-13",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða atriði er nefnt sem takmörkun gervigreindarlausna í glærunum?",
    options: [
      "Þær bera ekki skynbragð á rétt og rangt eins og manneskjur",
      "Þær geta aðeins unnið með myndir en ekki texta",
      "Þær geta ekki verið notaðar í lánveitingum",
      "Þær eru alltaf ódýrari en hefðbundnar lausnir"
    ],
    answer: "Þær bera ekki skynbragð á rétt og rangt eins og manneskjur",
    explanation: "Glærurnar nefna að gervigreind sé aðeins algrím en ekki manneskja og geti ekki borið skynbragð á rétt og rangt."
  },
  {
    id: "k2-14",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða dæmi úr glærunum passar best við viðbótargreind (Augmented Intelligence)?",
    options: [
      "Aðstoð við forritun eða textasmíð út frá fáum athugasemdum",
      "Sjálfkeyrandi bíll sem sér alfarið um akstur",
      "Fast reglukerfi sem samþykkir greiðslur",
      "CSV innlestur án greiningar"
    ],
    answer: "Aðstoð við forritun eða textasmíð út frá fáum athugasemdum",
    explanation: "Augmented Intelligence er lýst sem lausn sem vinnur með fólki við flóknari hluti, t.d. forritun og skrif."
  },
  {
    id: "k2-15",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "binary",
    prompt: "Rétt eða rangt: Snjallþjónustur (Intelligent Agents) fylgjast ekki með umhverfi sínu heldur keyra alltaf sömu hegðun óháð breytingum.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Snjallþjónustur fylgjast með, læra og bregðast við breytingum í umhverfi sínu."
  },

  // Kafli 3
  {
    id: "k3-12",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða gagnategund er líklegust ef verið er að vinna með myndskeið, hljóð eða frjálsan texta án skýrs töflusniðs?",
    options: [
      "Óskipulögð gögn (Unstructured data)",
      "Skipulögð gögn (Structured data)",
      "Raðgögn (Ordinal)",
      "Bilsgögn (Interval)"
    ],
    answer: "Óskipulögð gögn (Unstructured data)",
    explanation: "Myndir, hljóð og frjáls texti falla yfirleitt undir óskipulögð gögn."
  },
  {
    id: "k3-13",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða eiginleiki gagnanna skiptir mestu ef markmiðið er að sjá áhrif ákvarðana hratt og byggja á nýjustu stöðu?",
    options: [
      "Tímanleiki (Timeliness)",
      "Auðgun (Richness)",
      "Nominal flokkun",
      "Role-playing dimension"
    ],
    answer: "Tímanleiki (Timeliness)",
    explanation: "Tímanleiki snýst um að gögn séu ný og uppfærð þegar ákvörðun er tekin."
  },
  {
    id: "k3-14",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða atriði er líklegast dæmi um forvinnslu til að bæta lærdóm líkans fremur en að bæta uppsetningu gagnagrunns?",
    options: [
      "Stöðlun eða breyting á dreifingu breyta áður en líkan er þjálfað",
      "Að endurnefna gagnamarkað í EDW",
      "Að bæta við current-flag í Type 2 vídd",
      "Að flytja gögn úr ODS í Data Lake"
    ],
    answer: "Stöðlun eða breyting á dreifingu breyta áður en líkan er þjálfað",
    explanation: "Slík umbreyting er dæmigerð forvinnsla fyrir greiningu eða líkön."
  },
  {
    id: "k3-15",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "binary",
    prompt: "Rétt eða rangt: Í straumgreiningu (Stream Analytics) er eðlilegt að gera ráð fyrir að allir atburðir berist alltaf í fullkominni tímaröð og engir tvíteknir atburðir komi fyrir.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Glærurnar nefna að atburðir geti borist seint, í öfugri röð og jafnvel tvítekið."
  },

  // Kafli 4
  {
    id: "k4-12",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða atriði er sterkasti ávinningurinn af vöruhúsi gagna í samhengi ad-hoc greininga?",
    options: [
      "Þær verða einfaldari og hraðari vegna samræmdrar og hreinsaðrar sýnar á gögn",
      "Þær hverfa alveg því engar spurningar þurfa lengur að vera óundirbúnar",
      "Þær eru aðeins leyfðar í ODS en ekki í DWH",
      "Þær þurfa alltaf minni sögu til að virka"
    ],
    answer: "Þær verða einfaldari og hraðari vegna samræmdrar og hreinsaðrar sýnar á gögn",
    explanation: "Glærurnar nefna að vöruhús gagna flýti og einfaldi ad-hoc greiningar."
  },
  {
    id: "k4-13",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða tegund geymslu tekur við öllum tegundum gagna og hentar vel þegar ekki er enn ljóst hvort gögn fari inn í EDW?",
    options: [
      "Gagnalón (Data Lake)",
      "Periodic Snapshot",
      "ODS eingöngu",
      "Decision Tree"
    ],
    answer: "Gagnalón (Data Lake)",
    explanation: "Data Lake tekur við öllum tegundum gagna og geymir jafnvel hrá gögn ef framtíðarnýting er óljós."
  },
  {
    id: "k4-14",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "mcq",
    prompt: "Hvaða atriði lýsir best öryggis- og stjórnunaráskorun í vöruhúsi gagna samkvæmt glærunum?",
    options: [
      "Ofurnotendur geta þurft beinan aðgang og því þarf skýr ferli um réttindi og eftirlit",
      "Enginn nema DBA má nokkurn tíma sjá gögn í vöruhúsi",
      "Vöruhús þarf ekki eftirlit með keyrslum eða aðgengi",
      "Öryggi á aðeins við rekstrarkerfi en ekki greiningarkerfi"
    ],
    answer: "Ofurnotendur geta þurft beinan aðgang og því þarf skýr ferli um réttindi og eftirlit",
    explanation: "Í glærunum er þetta sérstaklega nefnt sem öryggis- og stjórnunaratriði."
  },
  {
    id: "k4-15",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna",
    type: "binary",
    prompt: "Rétt eða rangt: Samkvæmt glærunum ætti innleiðing vöruhúss gagna yfirleitt að taka skemmri tíma og kosta minna en upphafleg áætlun.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Glærurnar vara sérstaklega við því að innleiðing taki oft lengri tíma og kosti meira en áætlað var."
  },

  // Kafli 5
  {
    id: "k5-12",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða líkan er líklegast notað þegar niðurstaðan er oftast já eða nei og markmiðið er að meta hvort atburður muni gerast?",
    options: [
      "Tvíkosta aðhvarfsgreining (Logistic Regression)",
      "Periodic Snapshot",
      "Samantekt (Summarization)",
      "Markfall (Objective Function)"
    ],
    answer: "Tvíkosta aðhvarfsgreining (Logistic Regression)",
    explanation: "Í glærunum er logistic regression nefnd fyrir binary niðurstöður og hvort atburður muni gerast."
  },
  {
    id: "k5-13",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða mælikvarði er nefndur í glærunum þegar gæði aðhvarfslíkans eru metin með tilliti til tengsla milli breytna?",
    options: [
      "R²",
      "VOC",
      "NER",
      "VIS"
    ],
    answer: "R²",
    explanation: "Í glærunum um aðhvarfsgreiningu er oft horft á R² til að meta gæði niðurstöðu."
  },
  {
    id: "k5-14",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "mcq",
    prompt: "Hvaða aðferð myndir þú velja ef markmiðið er að finna umfangsmeiri tengsl með því að bæta einum hlut í einu við n-sambönd?",
    options: [
      "Sambandsgreining (Association)",
      "Flokkun (Classification)",
      "Aðhvarfsgreining (Regression)",
      "Visual Analytics"
    ],
    answer: "Sambandsgreining (Association)",
    explanation: "Glærurnar lýsa sambandsgreiningu nákvæmlega með þessari stigvaxandi leit að n-samböndum."
  },
  {
    id: "k5-15",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám",
    type: "binary",
    prompt: "Rétt eða rangt: Sameinaðar niðurstöður mismunandi líkana (Ensemble) geta aukið áreiðanleika og nákvæmni samkvæmt glærunum.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Í glærunum er ensemble sérstaklega sagt auka áreiðanleika og nákvæmni."
  },

  // Kafli 6
  {
    id: "k6-12",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða textanámsaðferð flokkast best sem leið til að setja skjöl í fyrirfram skilgreinda efnisflokka?",
    options: [
      "Efnisflokkun (Categorization)",
      "Hópun (Clustering)",
      "Concept Linking",
      "Question Answering"
    ],
    answer: "Efnisflokkun (Categorization)",
    explanation: "Categorization er notað þegar flokkarnir eru skilgreindir fyrirfram."
  },
  {
    id: "k6-13",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða aðferð hentar best ef markmiðið er að finna besta svarið við spurningu með þekkingarstýrðri mynstursgreiningu?",
    options: [
      "Svaraleit (Question Answering)",
      "Samantekt (Summarization)",
      "Nafngreining (NER)",
      "Topic Tracking"
    ],
    answer: "Svaraleit (Question Answering)",
    explanation: "Question Answering er í glærunum skilgreint nákvæmlega með þessum hætti."
  },
  {
    id: "k6-14",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "mcq",
    prompt: "Hvaða notkunartilvik úr glærunum passar best við textanám í rafrænum samskiptum?",
    options: [
      "Ruslsíur, forgangsröðun, flokkun og sjálfvirk svörun",
      "Vaktaskipulag og hráefnisbestun",
      "Hlutabréfaviðskipti og dynamic pricing",
      "Type 2 söguvarsla í customer vídd"
    ],
    answer: "Ruslsíur, forgangsröðun, flokkun og sjálfvirk svörun",
    explanation: "Þessi dæmi eru tekin beint úr glærunum um textanám."
  },
  {
    id: "k6-15",
    section: "k6",
    sectionLabel: "Kafli 6 – Óskipulögð gögn og textanám",
    type: "binary",
    prompt: "Rétt eða rangt: Hópun (Clustering) í textanámi gerir ráð fyrir að hóparnir séu fyrirfram skilgreindir áður en skjölunum er raðað í þá.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Í hópun eru svipuð skjöl flokkuð saman án þess að hóparnir séu skilgreindir fyrirfram."
  },

  // Kafli 7
  {
    id: "k7-12",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða lýsing á ANN er réttust samkvæmt kennslustofuefninu?",
    options: [
      "Reiknilíkan sem hermir eftir virkni taugakerfis mannsheilans og lærir mynstur í gögnum",
      "Fast reglukerfi sem breytist aldrei eftir innleiðingu",
      "Gagnageymslulíkan fyrir stjörnu skema",
      "Aðferð til að samþætta textagögn í ODS"
    ],
    answer: "Reiknilíkan sem hermir eftir virkni taugakerfis mannsheilans og lærir mynstur í gögnum",
    explanation: "Þetta er bein lýsing á ANN í kennslustofuglærunum."
  },
  {
    id: "k7-13",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða atriði er líklegast ástæða þess að djúpnám hefur fleygt fram samkvæmt glærunum?",
    options: [
      "Aukin geta vélbúnaðar, gagnagnótt og framþróun í bestun",
      "Að gögn hafi orðið minni og einfaldari",
      "Að öll líkön séu nú fullkomlega útskýrð",
      "Að reglubundin kerfi hafi alveg horfið"
    ],
    answer: "Aukin geta vélbúnaðar, gagnagnótt og framþróun í bestun",
    explanation: "Þetta eru drifkraftarnir sem eru sérstaklega nefndir fyrir DNN í glærunum."
  },
  {
    id: "k7-14",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "mcq",
    prompt: "Hvaða aðferð myndir þú helst velja ef þú vilt breyta einu inntaksgildi og skilja staðbundin áhrif þess á niðurstöðu líkans?",
    options: [
      "LIME",
      "SHAP",
      "NER",
      "Goal-seek"
    ],
    answer: "LIME",
    explanation: "Í glærunum er LIME lýst sem aðferð þar sem einu inntaksgildi er breytt til að skilja niðurstöður betur."
  },
  {
    id: "k7-15",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám og vitsmunavélar",
    type: "binary",
    prompt: "Rétt eða rangt: Tauganet eru lýst sem svörtum kassa í glærunum vegna þess að niðurstöður geta verið erfiðar eða ómögulegar að útskýra.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar taka skýrt fram að tauganet séu oft svartur kassi og niðurstöður geti verið mjög erfiðar að útskýra."
  },

  // Kafli 8
  {
    id: "k8-12",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða aðferð leitar að inntaksgildum sem gefa ákveðið úttaksgildi, eins og að ná 10% vexti á næsta ári?",
    options: [
      "Goal-seek",
      "Summarization",
      "Association",
      "Backpropagation"
    ],
    answer: "Goal-seek",
    explanation: "Glærurnar lýsa goal-seek nákvæmlega sem leit að inntaki sem gefur tiltekið úttak."
  },
  {
    id: "k8-13",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við what-if greiningu samkvæmt kennslustofuefni?",
    options: [
      "Metur áhrif breytinga á einni eða fleiri inntaksbreytum á lokaniðurstöðu líkans",
      "Finnur alltaf bestu mögulegu lausn með markfalli og skorðum",
      "Flokkar skjöl í efnisflokka út frá innihaldi",
      "Reiknar vægi í tauganeti með backpropagation"
    ],
    answer: "Metur áhrif breytinga á einni eða fleiri inntaksbreytum á lokaniðurstöðu líkans",
    explanation: "What-if er í glærunum skilgreint sem mat á áhrifum breytinga á inntaksbreytum."
  },
  {
    id: "k8-14",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "mcq",
    prompt: "Hvaða notkunartilvik er nefnt fyrir Monte Carlo hermun í glærunum?",
    options: [
      "Áhættumat á lánasöfnum",
      "Nafngreining á fyrirtækjum í texta",
      "Stjórnun á type 2 víddum",
      "Skýrslugerð á star schema"
    ],
    answer: "Áhættumat á lánasöfnum",
    explanation: "Monte Carlo hermun er nefnd sem dæmi fyrir áhættumat á lánasöfnum."
  },
  {
    id: "k8-15",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar, bestun og hermun",
    type: "binary",
    prompt: "Rétt eða rangt: Hermun gefur endilega alltaf bestu mögulegu niðurstöðu ef nóg af sviðsmyndum eru prófaðar.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Glærurnar taka sérstaklega fram að hermun gefur ekki endilega bestu mögulegu niðurstöðu."
  },

  // Högun
  {
    id: "hx-12",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða atriði er sterkast tengt Kimball nálgun í glærunum?",
    options: [
      "Stjörnu skema, viðskiptaferlar og gagnamarkaðir út frá viðskiptaþörf",
      "Miðlægt normalize-að EDW í 3NF sem byrjar á öllu fyrirtækinu",
      "Geymsla allra gagna hrá á diski án vídda",
      "Að sleppa mæligildum og nota aðeins lýsigögn"
    ],
    answer: "Stjörnu skema, viðskiptaferlar og gagnamarkaðir út frá viðskiptaþörf",
    explanation: "Kimball er í glærunum mjög skýrt tengt star schema, business process og data marts."
  },
  {
    id: "hx-13",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða galli er líklegast tengdur Kimball samkvæmt glærunum?",
    options: [
      "Hönnun getur verið erfið að breyta eftir á ef ekki er vandað til í upphafi",
      "Hentar alls ekki skýrslutólum og endanotendum",
      "Styður ekki sögulegar greiningar undir neinum kringumstæðum",
      "Krefst þess að öll gögn séu óskipulögð"
    ],
    answer: "Hönnun getur verið erfið að breyta eftir á ef ekki er vandað til í upphafi",
    explanation: "Kimball krefst aga í upphafi og getur verið erfitt að breyta eftir á."
  },
  {
    id: "hx-14",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best gögnum eins og vara, viðskiptamaður og verslun sem breytast hægar og lýsa samhengi fremur en einstökum atburðum?",
    options: [
      "Stofngögn (Masterdata)",
      "Atburðagögn (Transactional data)",
      "Óskipulögð gögn",
      "Constraint data"
    ],
    answer: "Stofngögn (Masterdata)",
    explanation: "Masterdata lýsir stöðugra samhengi eins og vöru, viðskiptamanni eða verslun."
  },
  {
    id: "hx-15",
    section: "hx",
    sectionLabel: "Högun – Aðferðafræði, víddir og mælitöflur",
    type: "binary",
    prompt: "Rétt eða rangt: Inmon nálgun er yfirleitt talin flóknari í hönnun og getur tekið lengri tíma í þróun en er sterk í samþættingu og miðlægum skilgreiningum.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Þetta er nákvæmlega hvernig Inmon er sett fram í glærunum."
  }
];

questionBank.push(...moreExtraQuestions);
const evenMoreQuestions = [
  // Kafli 1 – Viðskiptagreind (Business Intelligence, BI)
  {
    id: "k1-16",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind (Business Intelligence, BI)",
    type: "mcq",
    prompt: "Hvaða atriði styður best hlutlausa ákvörðunartöku (Objective Decision-Making) samkvæmt glærunum?",
    options: [
      "Vel unnir kjarnamælikvarðar, myndræn framsetning og ný gögn",
      "Óstaðlaðar skilgreiningar, gömul gögn og sterk reynslubundin tilfinning",
      "Að sleppa samræmdum mælikvörðum svo hvert svið túlki gögnin sjálft",
      "Að hafa sem flestar skýrslur en sem minnst samhengi"
    ],
    answer: "Vel unnir kjarnamælikvarðar, myndræn framsetning og ný gögn",
    explanation: "Þetta er sú samsetning sem glærurnar tengja helst við hlutlausari ákvörðunartöku."
  },
  {
    id: "k1-17",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind (Business Intelligence, BI)",
    type: "mcq",
    prompt: "Hvaða lýsing á upplýsingum (Information) er réttust fremur en á gögnum (Data) eða þekkingu (Knowledge)?",
    options: [
      "Unnin, flokkuð, merkt og vensluð gögn sem veita innsýn",
      "Hrá, samhengislaus og erfið gögn sem erfitt er að nota beint",
      "Reynslubundið samhengi sem styður ákvörðunartöku",
      "Óunnar textaskrár án nokkurrar framsetningar"
    ],
    answer: "Unnin, flokkuð, merkt og vensluð gögn sem veita innsýn",
    explanation: "Glærurnar skilgreina upplýsingar sem unnin og læsileg gögn sem veita innsýn."
  },
  {
    id: "k1-18",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind (Business Intelligence, BI)",
    type: "binary",
    prompt: "Rétt eða rangt: Hópþrýstingur (Group Pressure) og bjartsýni (Optimism) geta skekkt ákvörðunartöku þótt gögn séu til staðar.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Í glærunum eru þetta dæmi um þætti sem geta dregið úr hlutleysi ákvörðunartöku."
  },

  // Kafli 2 – Gervigreind (Artificial Intelligence, AI)
  {
    id: "k2-16",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind (Artificial Intelligence, AI)",
    type: "mcq",
    prompt: "Hvaða hugtak er regnhlífarhugtak (Umbrella Term) yfir aðferðir eins og vélrænt nám (Machine Learning, ML), djúpnám (Deep Learning, DL) og máltækni (Natural Language Processing, NLP)?",
    options: [
      "Gervigreind (Artificial Intelligence, AI)",
      "Viðskiptagreining (Business Analytics, BA)",
      "Vöruhús gagna (Data Warehouse, DWH)",
      "Textanám (Text Mining)"
    ],
    answer: "Gervigreind (Artificial Intelligence, AI)",
    explanation: "AI er sett fram sem regnhlífarhugtak yfir margar skyldar aðferðir."
  },
  {
    id: "k2-17",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind (Artificial Intelligence, AI)",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við máltækni (Natural Language Processing, NLP)?",
    options: [
      "Að vinna með talað eða skrifað mannamál í samskiptum við tölvur",
      "Að hámarka markfall (Objective Function) með skorðum (Constraints)",
      "Að geyma sögu í Type 2 víddum (Dimensions)",
      "Að greina aðeins myndir með samvöfunartauganetum (CNN)"
    ],
    answer: "Að vinna með talað eða skrifað mannamál í samskiptum við tölvur",
    explanation: "NLP snýst um samskipti við tölvur á mannamáli, bæði skrifuðu og töluðu."
  },
  {
    id: "k2-18",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind (Artificial Intelligence, AI)",
    type: "binary",
    prompt: "Rétt eða rangt: Spunagreind (Generative AI) er í glærunum tengd því að búa til nýtt efni fremur en aðeins að greina fyrirliggjandi gögn.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar aðgreina spunagreind með því að hún útbúi nýtt efni."
  },

  // Kafli 3 – Gögn og gagnavinnsla (Data and Data Processing)
  {
    id: "k3-16",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla (Data and Data Processing)",
    type: "mcq",
    prompt: "Hvaða gagnategund (Data Type) er líklegust ef skema (Schema) getur verið breytilegt á milli færslna?",
    options: [
      "Hálf-skipulögð gögn (Semi-Structured Data)",
      "Skipulögð gögn (Structured Data)",
      "Raðgögn (Ordinal Data)",
      "Hlutfallsgögn (Ratio Data)"
    ],
    answer: "Hálf-skipulögð gögn (Semi-Structured Data)",
    explanation: "Semi-structured gögn hafa gjarnan breytilegt skema, eins og JSON eða XML."
  },
  {
    id: "k3-17",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla (Data and Data Processing)",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir því best að gögn séu ný og uppfærð þegar þau eru notuð?",
    options: [
      "Tímanleiki (Timeliness)",
      "Auðgun (Richness)",
      "Áreiðanleiki (Reliability)",
      "Óeiginleg vídd (Degenerate Dimension)"
    ],
    answer: "Tímanleiki (Timeliness)",
    explanation: "Timeliness snýst um að gögn séu nýleg og uppfærð á réttu augnabliki."
  },
  {
    id: "k3-18",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla (Data and Data Processing)",
    type: "binary",
    prompt: "Rétt eða rangt: Straumgreining (Stream Analytics) gerir yfirleitt ráð fyrir að allir atburðir komi í fullkominni tímaröð án seinkunar.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Í straumgreiningu geta atburðir komið seint, í öfugri röð eða tvítekið."
  },

  // Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)
  {
    id: "k4-16",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða samsetning lýsir best vöruhúsi gagna (Data Warehouse, DWH)?",
    options: [
      "Efnisflokkað (Subject-Oriented), samþætt (Integrated), tímaraðir (Time Series) og óhverft (Non-Volatile)",
      "Óskipulagt (Unstructured), breytilegt (Volatile), ótímabundið og deildarsértækt",
      "Aðeins hrá gögn (Raw Data), án hreinsunar og samþættingar",
      "Sjálfvirkt (Autonomous), skýranlegt og eingöngu rauntímadrifið"
    ],
    answer: "Efnisflokkað (Subject-Oriented), samþætt (Integrated), tímaraðir (Time Series) og óhverft (Non-Volatile)",
    explanation: "Þetta eru helstu eiginleikar vöruhúss gagna í glærunum."
  },
  {
    id: "k4-17",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða geymsla (Storage) er líklegust ef gögn eru geymd hrá (Raw) og ekki er enn ljóst hvort þau fari í EDW/DWH?",
    options: [
      "Gagnalón (Data Lake)",
      "Rekstrargagnageymsla (Operational Data Store, ODS)",
      "Mælitafla (Fact Table)",
      "Ákvörðunartökutré (Decision Tree)"
    ],
    answer: "Gagnalón (Data Lake)",
    explanation: "Data Lake geymir hrá og fjölbreytt gögn þegar framtíðarnýting er ekki að fullu ljós."
  },
  {
    id: "k4-18",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "binary",
    prompt: "Rétt eða rangt: Í ETL-flæði (Extract, Transform, Load) er útreikningur á stærðum eins og summum og prósentum líklegast í Calc-skrefinu (Calculation Step).",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Calc-skrefið er notað fyrir útreiknaðar stærðir eins og summur og prósentur."
  },

  // Kafli 5 – Gagnanám (Data Mining)
  {
    id: "k5-16",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða líkan (Model) er líklegast ef markmiðið er að svara spurningum og gefa líkur út frá upplýsingagildi (Information Gain)?",
    options: [
      "Ákvörðunartökutré (Decision Tree)",
      "Tauganet (Artificial Neural Network, ANN)",
      "Hópun (Clustering)",
      "Sambandsgreining (Association Analysis)"
    ],
    answer: "Ákvörðunartökutré (Decision Tree)",
    explanation: "Decision tree velur breytu út frá information gain samkvæmt glærunum."
  },
  {
    id: "k5-17",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) hentar best til að finna óeðlileg tilvik (Anomalies) eða hópa í gögnum?",
    options: [
      "Hópun (Clustering)",
      "Tvíkosta aðhvarfsgreining (Logistic Regression)",
      "Nafngreining (Named Entity Recognition, NER)",
      "What-if greining (What-If Analysis)"
    ],
    answer: "Hópun (Clustering)",
    explanation: "Clustering er notað bæði til að finna hópa og möguleg frávik í gögnum."
  },
  {
    id: "k5-18",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "binary",
    prompt: "Rétt eða rangt: Sameining líkana (Ensemble) er í glærunum tengd meiri áreiðanleika (Reliability) og nákvæmni (Accuracy).",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Ensemble nálgun er sögð geta aukið bæði áreiðanleika og nákvæmni."
  },

  // Kafli 6 – Textanám (Text Mining) og óskipulögð gögn (Unstructured Data)
  {
    id: "k6-16",
    section: "k6",
    sectionLabel: "Kafli 6 – Textanám (Text Mining) og óskipulögð gögn (Unstructured Data)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) flokkar skjöl í fyrirfram skilgreinda efnisflokka?",
    options: [
      "Efnisflokkun (Categorization)",
      "Hópun (Clustering)",
      "Hugtakavensl (Concept Linking)",
      "Svaraleit (Question Answering)"
    ],
    answer: "Efnisflokkun (Categorization)",
    explanation: "Categorization vinnur með fyrirfram skilgreinda flokka."
  },
  {
    id: "k6-17",
    section: "k6",
    sectionLabel: "Kafli 6 – Textanám (Text Mining) og óskipulögð gögn (Unstructured Data)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) hjálpar notendum að finna skjöl sem fjalla um tengd mál sem þeir hefðu annars líklega ekki fundið?",
    options: [
      "Hugtakavensl (Concept Linking)",
      "Samantekt (Summarization)",
      "Efnisvöktun (Topic Tracking)",
      "Viðhorfsgreining (Sentiment Analysis)"
    ],
    answer: "Hugtakavensl (Concept Linking)",
    explanation: "Concept Linking tengir skyld viðfangsefni og leiðir notendur áfram í tengt efni."
  },
  {
    id: "k6-18",
    section: "k6",
    sectionLabel: "Kafli 6 – Textanám (Text Mining) og óskipulögð gögn (Unstructured Data)",
    type: "binary",
    prompt: "Rétt eða rangt: Rödd starfsmannsins (Voice of the Employee, VOE) og rödd viðskiptavinarins (Voice of the Customer, VOC) eru sama hugtakið í glærunum.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "VOE og VOC eru aðskilin hugtök með mismunandi áherslur."
  },

  // Kafli 7 – Djúpnám (Deep Learning, DL) og vitsmunavélar (Cognitive Computing)
  {
    id: "k7-16",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL) og vitsmunavélar (Cognitive Computing)",
    type: "mcq",
    prompt: "Hvaða lýsing á tauganeti (Artificial Neural Network, ANN) er réttust?",
    options: [
      "Reiknilíkan sem hermir eftir virkni taugakerfis og lærir mynstur í gögnum",
      "Fast reglukerfi sem breytist ekki eftir innleiðingu",
      "Aðferð til að hanna gagnamarkaði (Data Marts)",
      "Skjalaflokkun sem byggir aðeins á fyrirfram skilgreindum efnisorðum"
    ],
    answer: "Reiknilíkan sem hermir eftir virkni taugakerfis og lærir mynstur í gögnum",
    explanation: "Þetta er kjarnalýsing ANN í kennsluefninu."
  },
  {
    id: "k7-17",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL) og vitsmunavélar (Cognitive Computing)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) byggir á leikjafræði (Game Theory) og gefur hverju inntaksgildi vægi?",
    options: [
      "SHAP",
      "LIME",
      "NER",
      "CNN"
    ],
    answer: "SHAP",
    explanation: "SHAP er í glærunum sérstaklega tengt leikjafræði og vægi inntaksbreyta."
  },
  {
    id: "k7-18",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL) og vitsmunavélar (Cognitive Computing)",
    type: "binary",
    prompt: "Rétt eða rangt: Samvöfunartauganet (Convolutional Neural Networks, CNN) eru í glærunum frekar tengd myndgreiningu (Image Recognition) en endurkvæm tauganet (Recurrent Neural Networks, RNN).",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "CNN eru fyrst og fremst tengd myndgreiningu, en RNN/LSTM frekar röðum eins og texta og tali."
  },

  // Kafli 8 – Forskriftargreiningar (Prescriptive Analytics), bestun (Optimization) og hermun (Simulation)
  {
    id: "k8-16",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar (Prescriptive Analytics), bestun (Optimization) og hermun (Simulation)",
    type: "mcq",
    prompt: "Hvaða atriði er líklegast dæmi um skorðu (Constraint) í bestunarlíkani (Optimization Model)?",
    options: [
      "Takmarkaður fjöldi starfsmanna, hráefnis eða fjármagns",
      "Hámarka hagnað (Profit) eða lágmarka kostnað (Cost)",
      "Fjöldi eininga af vöru sem á að framleiða",
      "Skýringaraðferð eins og SHAP eða LIME"
    ],
    answer: "Takmarkaður fjöldi starfsmanna, hráefnis eða fjármagns",
    explanation: "Skorður eru takmarkanir á aðföngum eða öðrum skilyrðum í líkaninu."
  },
  {
    id: "k8-17",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar (Prescriptive Analytics), bestun (Optimization) og hermun (Simulation)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) leitar að inntaki sem skilar ákveðnu úttaki, eins og tilteknu markmiði í vexti eða afkomu?",
    options: [
      "Markleit (Goal-Seek)",
      "Hópun (Clustering)",
      "Viðhorfsgreining (Sentiment Analysis)",
      "Samantekt (Summarization)"
    ],
    answer: "Markleit (Goal-Seek)",
    explanation: "Goal-seek snýst um að finna inntak sem leiðir til tiltekins úttaks."
  },
  {
    id: "k8-18",
    section: "k8",
    sectionLabel: "Kafli 8 – Forskriftargreiningar (Prescriptive Analytics), bestun (Optimization) og hermun (Simulation)",
    type: "binary",
    prompt: "Rétt eða rangt: Hermun (Simulation) tryggir sjálfkrafa bestu mögulegu lausn ef nóg er af sviðsmyndum (Scenarios).",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Hermun prófar sviðsmyndir en finnur ekki sjálfkrafa bestu lausn."
  },

  // Högun (Architecture) og aðferðafræði (Methodology)
  {
    id: "hx-16",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Aðferðafræði (Methodology), víddir (Dimensions) og mæligildi (Measures)",
    type: "mcq",
    prompt: "Hvaða lýsing á Kimball-aðferðafræði (Kimball Methodology) er réttust?",
    options: [
      "Bottom-up nálgun sem byrjar á gagnamörkuðum (Data Marts) og vex með tíma",
      "Top-down nálgun sem byrjar á miðlægu 3NF vöruhúsi (Enterprise Data Warehouse)",
      "Aðferð sem geymir aðeins hrá gögn á diski í gagnalóni (Data Lake)",
      "Aðferð sem sleppir víddum (Dimensions) og vinnur aðeins með mæligildi (Measures)"
    ],
    answer: "Bottom-up nálgun sem byrjar á gagnamörkuðum (Data Marts) og vex með tíma",
    explanation: "Kimball er í glærunum sett fram sem bottom-up nálgun."
  },
  {
    id: "hx-17",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Aðferðafræði (Methodology), víddir (Dimensions) og mæligildi (Measures)",
    type: "mcq",
    prompt: "Hvaða mæligildi (Measure) er líklegast hálf-summanlegt (Semi-Additive Measure)?",
    options: [
      "Staða reiknings í lok mánaðar",
      "Heildarupphæð seldra vara í stakri færslu",
      "Fjöldi seldra eininga í söluviðburði",
      "Fjöldi ekinna kílómetra í einni ferð"
    ],
    answer: "Staða reiknings í lok mánaðar",
    explanation: "Lokastaða reiknings er klassískt dæmi um semi-additive measure."
  },
  {
    id: "hx-18",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Aðferðafræði (Methodology), víddir (Dimensions) og mæligildi (Measures)",
    type: "binary",
    prompt: "Rétt eða rangt: Hlutverkavídd (Role-Playing Dimension) felur í sér að sama vídd (Dimension) sé notuð í mismunandi hlutverkum, eins og pöntunardagsetning (Order Date) og sendingardagsetning (Ship Date).",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Role-playing dimension er nákvæmlega þetta mynstur í víddarlíkönum."
  }
];


questionBank.push(...evenMoreQuestions);

const megaQuestions = [
  // Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)
  {
    id: "k4-19",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða lýsing á rekstrargagnageymslu (Operational Data Store, ODS) er réttust miðað við glærurnar?",
    options: [
      "Les oft gögn beint úr grunnkerfi, gerir lágmarks hreinsun og nýtist gjarnan sem millilag",
      "Er alltaf fullbúið samstæðu-vöruhús (Enterprise Data Warehouse, EDW) með allri sögu",
      "Er eingöngu notað fyrir óskipulögð gögn (Unstructured Data)",
      "Er sérhæfð mælitafla (Fact Table) fyrir eina deild"
    ],
    answer: "Les oft gögn beint úr grunnkerfi, gerir lágmarks hreinsun og nýtist gjarnan sem millilag",
    explanation: "ODS er í glærunum lýst sem nær rauntíma afriti með lágmarks vinnslu og oft sem millilagi."
  },
  {
    id: "k4-20",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða atriði er sterkasta ástæðan fyrir því að vöruhús gagna (Data Warehouse, DWH) einfaldar óundirbúnar greiningar (Ad-hoc Analysis)?",
    options: [
      "Samræmd hreinsun, samræmdar skilgreiningar og söguleg gögn á stöðluðu formi",
      "Að gögnin séu alltaf hrá (Raw) og ósamræmd svo notendur geti túlkað þau frjálst",
      "Að ekkert ETL-flæði (Extract, Transform, Load) sé notað",
      "Að grunnkerfin séu hönnuð eingöngu fyrir greiningar"
    ],
    answer: "Samræmd hreinsun, samræmdar skilgreiningar og söguleg gögn á stöðluðu formi",
    explanation: "Glærurnar leggja áherslu á samræmda sýn, samræmdar skilgreiningar og sögu fyrir greiningar."
  },
  {
    id: "k4-21",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða ETL-skref (Extract, Transform, Load) er líklegast að sannreyna gæði gagna áður en þau haldast áfram í flæðinu?",
    options: [
      "Staðfesting (Validate)",
      "Uppfletting (Lookup)",
      "Hreinsun vinnslutaflna (Cleanup)",
      "Birting (Report)"
    ],
    answer: "Staðfesting (Validate)",
    explanation: "Validate er skrefið þar sem gögn eru prófuð og metin áður en þau haldast áfram."
  },
  {
    id: "k4-22",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða fullyrðing um öryggi og stjórnun (Security and Administration) í vöruhúsi gagna er réttust?",
    options: [
      "Ofurnotendur (Superusers) geta þurft beinan aðgang og því þarf skýr ferli um réttindi og eftirlit",
      "Vöruhús gagna þarf yfirleitt minna eftirlit en flest önnur kerfi",
      "Aðskilnaður milli rekstrarkerfa og notenda gengur alltaf fullkomlega upp í vöruhúsi",
      "Aðgangsstýring skiptir litlu máli svo lengi sem skýrslur eru til"
    ],
    answer: "Ofurnotendur (Superusers) geta þurft beinan aðgang og því þarf skýr ferli um réttindi og eftirlit",
    explanation: "Þetta er sérstaklega nefnt í glærunum um öryggi og stjórnun vöruhúsa gagna."
  },
  {
    id: "k4-23",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "binary",
    prompt: "Rétt eða rangt: Gagnalón (Data Lake) tekur aðeins við skipulögðum gögnum (Structured Data) en ekki hálf-skipulögðum (Semi-Structured Data) eða óskipulögðum gögnum (Unstructured Data).",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Glærurnar segja að gagnalón taki við öllum tegundum gagna og jafnvel meira magni en hefðbundið EDW/DWH."
  },
  {
    id: "k4-24",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða þróunarstefna (Trend) er nefnd sem sérstaklega gagnleg fyrir rauntímagreiningar í vöruhúsum gagna?",
    options: [
      "In-memory geymsla (In-Memory Storage)",
      "Stofngögn (Masterdata)",
      "Degenerate víddir (Degenerate Dimensions)",
      "Spjallmenni (Chatbots)"
    ],
    answer: "In-memory geymsla (In-Memory Storage)",
    explanation: "Glærurnar nefna in-memory geymslu sem gagnlega fyrir rauntímagreiningar."
  },

  // Kafli 5 – Gagnanám (Data Mining)
  {
    id: "k5-19",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) er líklegust þegar markmiðið er að finna sambönd milli vara eða einkenna með því að byggja upp sífellt stærri mynstur?",
    options: [
      "Sambandsgreining (Association Analysis)",
      "Flokkun (Classification)",
      "Línuleg bestun (Linear Optimization)",
      "Nafngreining (Named Entity Recognition, NER)"
    ],
    answer: "Sambandsgreining (Association Analysis)",
    explanation: "Association byggir upp hópa þar sem n-sambönd eru til staðar og bætir einum hlut í einu við leitina."
  },
  {
    id: "k5-20",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða mælikvarði (Metric) er nefndur í glærunum til að meta gæði aðhvarfsgreiningar (Regression Analysis)?",
    options: [
      "R²",
      "VOC (Voice of the Customer)",
      "SHAP",
      "OLAP"
    ],
    answer: "R²",
    explanation: "R² er nefnt sem mælikvarði á gæði niðurstöðu í aðhvarfsgreiningu."
  },
  {
    id: "k5-21",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða fullyrðing um tvíkosta aðhvarfsgreiningu (Logistic Regression) er réttust?",
    options: [
      "Hún er notuð þegar niðurstaðan er oft Já/Nei og markmiðið er að meta hvort atburður muni gerast",
      "Hún er aðeins notuð fyrir myndgreiningu (Image Recognition)",
      "Hún finnur alltaf hópa án þess að niðurstaða sé fyrirfram þekkt",
      "Hún er óviðkomandi spádómsgreiningum (Predictive Analytics)"
    ],
    answer: "Hún er notuð þegar niðurstaðan er oft Já/Nei og markmiðið er að meta hvort atburður muni gerast",
    explanation: "Glærurnar lýsa logistic regression nákvæmlega með þessum hætti."
  },
  {
    id: "k5-22",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða kostur við sameinaðar niðurstöður mismunandi líkana (Ensemble) er sérstaklega nefndur?",
    options: [
      "Aukin áreiðanleiki (Reliability) og nákvæmni (Accuracy)",
      "Að engin þörf sé lengur á að prófa fleiri en eitt líkan",
      "Að líkönin verði alltaf einfaldari í útskýringu en áður",
      "Að samantektir (Summaries) úr texta verði sjálfkrafa betri"
    ],
    answer: "Aukin áreiðanleiki (Reliability) og nákvæmni (Accuracy)",
    explanation: "Ensemble er í glærunum tengt við meiri áreiðanleika og nákvæmni."
  },
  {
    id: "k5-23",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "binary",
    prompt: "Rétt eða rangt: Ákvörðunartökutré (Decision Tree) er í glærunum tengt því að svar við einni breytu afmarki mögulegar niðurstöður.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Þetta er bein lýsing í glærunum á decision trees."
  },
  {
    id: "k5-24",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) er líklegust ef markmiðið er að skipta svipuðum skjölum eða viðskiptavinum í hópa án þess að hóparnir séu skilgreindir fyrirfram?",
    options: [
      "Hópun (Clustering)",
      "Efnisflokkun (Categorization)",
      "Tvíkosta aðhvarfsgreining (Logistic Regression)",
      "Markleit (Goal-Seek)"
    ],
    answer: "Hópun (Clustering)",
    explanation: "Clustering er einmitt notað þegar hópar eru ekki skilgreindir fyrirfram."
  },

  // Kafli 7 – Djúpnám (Deep Learning, DL)
  {
    id: "k7-19",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "mcq",
    prompt: "Hvaða atriði er nefnt sem drifkraftur (Driver) fyrir hraða þróun djúpra tauganeta (Deep Neural Networks, DNN)?",
    options: [
      "Aukin geta vélbúnaðar, gagnagnótt og framþróun í bestun",
      "Að gögn hafi orðið minni og einfaldari",
      "Að öll líkön séu orðin fullkomlega útskýrð",
      "Að textanám hafi leyst af hólmi vélrænt nám (Machine Learning, ML)"
    ],
    answer: "Aukin geta vélbúnaðar, gagnagnótt og framþróun í bestun",
    explanation: "Þetta er nákvæm upptalning úr glærunum um DNN."
  },
  {
    id: "k7-20",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) myndir þú helst velja ef þú vilt breyta einu inntaksgildi og skilja staðbundin áhrif þess á niðurstöðu líkans?",
    options: [
      "LIME",
      "SHAP",
      "CNN",
      "Ensemble"
    ],
    answer: "LIME",
    explanation: "LIME er í glærunum tengt við að breyta einu inntaksgildi til að skilja niðurstöður betur."
  },
  {
    id: "k7-21",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "mcq",
    prompt: "Hvaða lýsing á samvöfunartauganeti (Convolutional Neural Network, CNN) er réttust?",
    options: [
      "Hentar sérstaklega vel fyrir myndgreiningu (Image Recognition) og getur greint línur, lögun og áferð",
      "Hentar fyrst og fremst fyrir tímaröð gagna (Time Series) og orðaraðir",
      "Er fyrst og fremst aðferðafræði fyrir gagnamörkuð (Data Marts)",
      "Er einfaldlega annað orð yfir aðhvarfsgreiningu (Regression)"
    ],
    answer: "Hentar sérstaklega vel fyrir myndgreiningu (Image Recognition) og getur greint línur, lögun og áferð",
    explanation: "Glærurnar tengja CNN sérstaklega við myndgreiningu."
  },
  {
    id: "k7-22",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "mcq",
    prompt: "Hvaða samsetning er réttust fyrir endurkvæm tauganet (Recurrent Neural Networks, RNN) og LSTM (Long Short-Term Memory)?",
    options: [
      "Texti, tal og tímaraðir þar sem fyrri niðurstöður skipta máli fyrir næstu",
      "Aðeins myndir þar sem lögun og áferð skipta máli",
      "Aðeins ETL-flæði (Extract, Transform, Load) í vöruhúsi gagna",
      "Aðeins static mapping töflur"
    ],
    answer: "Texti, tal og tímaraðir þar sem fyrri niðurstöður skipta máli fyrir næstu",
    explanation: "RNN og sérstaklega LSTM eru í glærunum tengd við texta, tal og tímaraðir."
  },
  {
    id: "k7-23",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "binary",
    prompt: "Rétt eða rangt: Í glærunum er tekið fram að stærri og flóknari tauganet geti á endanum skilað betri niðurstöðum, en séu jafnframt erfiðari að útskýra.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Þetta er kjarni glæranna um að tauganet séu svartur kassi."
  },
  {
    id: "k7-24",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "mcq",
    prompt: "Hvaða dæmi úr glærunum bendir helst til þess að djúpnám eða gervigreind geti minnkað fölsk jákvæð tilvik (False Positives) í flóknum rekstri?",
    options: [
      "Svindlgreining hjá banka þar sem hit-rate jókst og false positives lækkuðu",
      "Type 2 vídd (Dimension) með valid-from og current-flag",
      "Static vörpunartafla (Mapping Table)",
      "Samantekt (Summarization) á löngu skjali"
    ],
    answer: "Svindlgreining hjá banka þar sem hit-rate jókst og false positives lækkuðu",
    explanation: "Glærurnar um Danske Bank taka þetta dæmi sérstaklega."
  },

  // Högun (Architecture) / Kimball / Inmon / víddir
  {
    id: "hx-19",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Kimball, Inmon og víddir (Dimensions)",
    type: "mcq",
    prompt: "Hvaða fullyrðing um Kimball-aðferðafræði (Kimball Methodology) er réttust?",
    options: [
      "Áhersla á stjörnulíkan (Star Schema), viðskiptaferla og gagnamarkaði út frá viðskiptaþörf",
      "Áhersla á miðlægt 3NF vöruhús (Third Normal Form Warehouse) áður en nokkuð annað er hannað",
      "Áhersla á að geyma öll gögn hrá á diski án vídda og mæligilda",
      "Áhersla á að sleppa skýrslutólum (Reporting Tools) og einbeita sér að grunnkerfum"
    ],
    answer: "Áhersla á stjörnulíkan (Star Schema), viðskiptaferla og gagnamarkaði út frá viðskiptaþörf",
    explanation: "Þetta er bein lýsing á Kimball nálguninni í glærunum."
  },
  {
    id: "hx-20",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Kimball, Inmon og víddir (Dimensions)",
    type: "mcq",
    prompt: "Hvaða fullyrðing um Inmon-aðferðafræði (Inmon Methodology) er réttust?",
    options: [
      "Top-down nálgun með miðlægu vöruhúsi, 3NF hönnun og áherslu á samþættingu og samræmi",
      "Bottom-up nálgun sem byrjar alltaf á stakri fact töflu",
      "Aðferð sem er fyrst og fremst fyrir óskipulögð gögn (Unstructured Data)",
      "Aðferð sem hentar aðeins litlum fyrirtækjum með engin söguleg gögn"
    ],
    answer: "Top-down nálgun með miðlægu vöruhúsi, 3NF hönnun og áherslu á samþættingu og samræmi",
    explanation: "Þetta er kjarninn í Inmon samkvæmt glærunum."
  },
  {
    id: "hx-21",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Kimball, Inmon og víddir (Dimensions)",
    type: "mcq",
    prompt: "Hvaða víddartegund (Dimension Type) á best við ef sama dagsetningarvídd (Date Dimension) er notuð sem pöntunardagur (Order Date), sendingardagur (Ship Date) og afhendingardagur (Delivery Date)?",
    options: [
      "Hlutverkavídd (Role-Playing Dimension)",
      "Óeiginleg vídd (Degenerate Dimension)",
      "Sameiginleg vídd (Common Dimension)",
      "Snjókornalíkan (Snowflake Schema)"
    ],
    answer: "Hlutverkavídd (Role-Playing Dimension)",
    explanation: "Þetta er klassískt dæmi um role-playing dimension."
  },
  {
    id: "hx-22",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Kimball, Inmon og víddir (Dimensions)",
    type: "mcq",
    prompt: "Hvaða lýsing á óeiginlegri vídd (Degenerate Dimension) er réttust?",
    options: [
      "Víddarlíkt gildi sem er oft geymt beint í mælitöflu (Fact Table), eins og pöntunarnúmer",
      "Vídd sem geymir fulla sögu með valid-from/to og current-flag",
      "Vídd sem er notuð í mörgum gagnamörkuðum (Data Marts)",
      "Vídd sem inniheldur aðeins lýsigögn (Metadata)"
    ],
    answer: "Víddarlíkt gildi sem er oft geymt beint í mælitöflu (Fact Table), eins og pöntunarnúmer",
    explanation: "Glærurnar nefna pöntunarnúmer og færslunúmer sem dæmi um degenerate dimension."
  },
  {
    id: "hx-23",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Kimball, Inmon og víddir (Dimensions)",
    type: "mcq",
    prompt: "Hvaða mæligildi (Measure) er líklegast ósummanlegt (Non-Additive Measure)?",
    options: [
      "Einkvæmur fjöldi seldra vara",
      "Heildarupphæð seldra vara",
      "Fjöldi seldra eininga",
      "Eknir kílómetrar í ferð"
    ],
    answer: "Einkvæmur fjöldi seldra vara",
    explanation: "Glærurnar nota þetta sem dæmi um non-additive measure."
  },
  {
    id: "hx-24",
    section: "hx",
    sectionLabel: "Högun (Architecture) – Kimball, Inmon og víddir (Dimensions)",
    type: "binary",
    prompt: "Rétt eða rangt: Stofngögn (Masterdata) eru gögn sem lýsa samhengi, breytast sjaldan og margar víddir (Dimensions) falla undir þann flokk.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar skilgreina masterdata nákvæmlega með þessum hætti."
  },

  // Kafli 8 – Bestun (Optimization) og hermun (Simulation)
  {
    id: "k8-19",
    section: "k8",
    sectionLabel: "Kafli 8 – Bestun (Optimization) og hermun (Simulation)",
    type: "mcq",
    prompt: "Hvaða notkunartilvik (Use Case) er nefnt í glærunum fyrir línulega bestun (Linear Optimization)?",
    options: [
      "Skipulag mannaforða, vaktir og mönnun samkvæmt kjarasamningi",
      "Nafngreining (Named Entity Recognition, NER) í texta",
      "Viðhorfsgreining (Sentiment Analysis) á umsögnum",
      "Role-playing dimension í dagsetningarvídd"
    ],
    answer: "Skipulag mannaforða, vaktir og mönnun samkvæmt kjarasamningi",
    explanation: "Þetta er eitt af skýru dæmunum í glærunum um mathematical programming optimization."
  },
  {
    id: "k8-20",
    section: "k8",
    sectionLabel: "Kafli 8 – Bestun (Optimization) og hermun (Simulation)",
    type: "mcq",
    prompt: "Hvaða lýsing á líffræðilegu hermireikniriti (Genetic Algorithm) er réttust?",
    options: [
      "Mengi lausna er metið, bestu lausnir valdar, paraðar saman og ferlið endurtekið",
      "Allar mögulegar lausnir eru reiknaðar nákvæmlega og allar prófaðar",
      "Aðferðin byggir á að breyta einu inntaksgildi og skoða staðbundin áhrif",
      "Aðferðin er aðeins notuð í textaflokkun"
    ],
    answer: "Mengi lausna er metið, bestu lausnir valdar, paraðar saman og ferlið endurtekið",
    explanation: "Þetta er bein lýsing á genetic algorithms úr glærunum."
  },
  {
    id: "k8-21",
    section: "k8",
    sectionLabel: "Kafli 8 – Bestun (Optimization) og hermun (Simulation)",
    type: "binary",
    prompt: "Rétt eða rangt: Markleit (Goal-Seek) og hvað-ef greining (What-If Analysis) eru í glærunum sett fram sem óskyld hugtök sem vinna hvorugt með breytingum á inntaksbreytum.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Báðar nálganir tengjast breytingum á inntaksbreytum, þó með ólík markmið."
  }
];

questionBank.push(...megaQuestions);


const fullChapterQuestions = [
  // Kafli 1 – Viðskiptagreind (Business Intelligence, BI)
  {
    id: "k1-19",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind (Business Intelligence, BI)",
    type: "mcq",
    prompt: "Hvaða fullyrðing um gagnadrifna ákvörðunartöku (Data-driven Decision-Making, DDDM) er réttust?",
    options: [
      "Gögn og tölfræði eru mikið notuð og notkun spálíkana eykst",
      "Ákvarðanir eru fyrst og fremst byggðar á innsæi og tilfinningu en ekki gögnum",
      "DDDM á aðeins við um textanám (Text Mining)",
      "DDDM dregur úr þörf fyrir traust í dreifðri stjórnun"
    ],
    answer: "Gögn og tölfræði eru mikið notuð og notkun spálíkana eykst",
    explanation: "Glærurnar tengja DDDM við aukna notkun gagna, tölfræði og spálíkana."
  },
  {
    id: "k1-20",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind (Business Intelligence, BI)",
    type: "mcq",
    prompt: "Hvaða skref kemur síðast í kerfisbundnu ákvörðunarlíkani Simons (Simon Decision Model)?",
    options: [
      "Útfærsla / þróun (Implementation / Development)",
      "Hönnun ákvörðunarlíkans (Design of Decision Model)",
      "Val á lausn (Choice of Solution)",
      "Upplýsinga- / þekkingaröflun (Intelligence / Knowledge Gathering)"
    ],
    answer: "Útfærsla / þróun (Implementation / Development)",
    explanation: "Skrefin enda á útfærslu eða þróun samkvæmt glærunum."
  },
  {
    id: "k1-21",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind (Business Intelligence, BI)",
    type: "binary",
    prompt: "Rétt eða rangt: Gagnagreining (Data Intelligence) er sett fram sem víðtækasta hugtakið í efninu.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Í glærunum er gagnagreining sett fram sem víðtækasta hugtakið."
  },

  // Kafli 2 – Gervigreind (Artificial Intelligence, AI)
  {
    id: "k2-19",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind (Artificial Intelligence, AI)",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best vélrænu námi (Machine Learning, ML) samkvæmt glærunum?",
    options: [
      "Aðferð sem auðkennir mynstur, spáir fyrir um og aðlagast",
      "Aðferð sem vinnur aðeins með fyrirfram skilgreindar reglur og aðlagast ekki",
      "Aðferð sem er aðeins notuð í gagnamörkuðum (Data Marts)",
      "Aðferð sem geymir hrá gögn í gagnalóni (Data Lake)"
    ],
    answer: "Aðferð sem auðkennir mynstur, spáir fyrir um og aðlagast",
    explanation: "ML er í glærunum lýst með þessum hætti."
  },
  {
    id: "k2-20",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind (Artificial Intelligence, AI)",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við snjallþjónustu (Intelligent Agent)?",
    options: [
      "Sjálfstæð þjónusta sem fylgist með, lærir og bregst við breytingum í umhverfi sínu",
      "Kyrrstætt reglukerfi sem má ekki breytast eftir innleiðingu",
      "Víddartafla (Dimension Table) sem lýsir samhengi",
      "Mælitafla (Fact Table) sem geymir töluleg gildi"
    ],
    answer: "Sjálfstæð þjónusta sem fylgist með, lærir og bregst við breytingum í umhverfi sínu",
    explanation: "Þetta er bein skilgreining úr glærunum."
  },
  {
    id: "k2-21",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind (Artificial Intelligence, AI)",
    type: "binary",
    prompt: "Rétt eða rangt: Djúpnám (Deep Learning, DL) er í glærunum sett fram sem hlutmengi af vélrænu námi (Machine Learning, ML).",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "DL er sérstaklega sagt vera hlutmengi af ML."
  },

  // Kafli 3 – Gögn og gagnavinnsla (Data and Data Processing)
  {
    id: "k3-19",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla (Data and Data Processing)",
    type: "mcq",
    prompt: "Hvaða gagnategund (Data Type) á best við um XML eða JSON með breytilegu skema (Schema)?",
    options: [
      "Hálf-skipulögð gögn (Semi-Structured Data)",
      "Skipulögð gögn (Structured Data)",
      "Óskipulögð gögn (Unstructured Data)",
      "Hlutfallsgögn (Ratio Data)"
    ],
    answer: "Hálf-skipulögð gögn (Semi-Structured Data)",
    explanation: "JSON og XML eru dæmigerð semi-structured gögn í glærunum."
  },
  {
    id: "k3-20",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla (Data and Data Processing)",
    type: "mcq",
    prompt: "Hvaða gæðahugtak lýsir best því að allar upplýsingar fylgi og að lýsigögnum (Metadata) hafi verið bætt við?",
    options: [
      "Auðgun (Richness)",
      "Tímanleiki (Timeliness)",
      "Áreiðanleiki (Reliability)",
      "Staðfesting (Validation)"
    ],
    answer: "Auðgun (Richness)",
    explanation: "Richness er í glærunum tengt því að allar upplýsingar fylgi og lýsigögn séu til staðar."
  },
  {
    id: "k3-21",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla (Data and Data Processing)",
    type: "binary",
    prompt: "Rétt eða rangt: Í straumgreiningu (Stream Analytics) geta atburðir borist seint, í öfugri tímaröð eða tvíteknir.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Þetta er nefnt sem klassísk áskorun í stream analytics."
  },

  // Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)
  {
    id: "k4-25",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða fullyrðing um vöruhús gagna (Data Warehouse, DWH) er réttust?",
    options: [
      "Það sameinar gögn frá mörgum gagnalindum, hreinsar þau og geymir sögu yfir tíma",
      "Það geymir aðeins gögn úr einu grunnkerfi og engin söguleg gögn",
      "Það er alltaf það sama og rekstrarkerfi (OLTP System)",
      "Það vinnur aðeins með óskipulögð gögn (Unstructured Data)"
    ],
    answer: "Það sameinar gögn frá mörgum gagnalindum, hreinsar þau og geymir sögu yfir tíma",
    explanation: "Þetta er kjarnalýsing glæranna á data warehouse."
  },
  {
    id: "k4-26",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "mcq",
    prompt: "Hvaða atriði er nefnt sem áhættuþáttur við innleiðingu vöruhúss gagna?",
    options: [
      "Að hlaða öllu inn í vöruhús og hanna það eins og færslukerfi",
      "Að skilgreina gögn vel og hugsa viðskiptalega",
      "Að stilla væntingar og fá réttan stuðning",
      "Að nota staðlaða aðferðafræði (Methodology)"
    ],
    answer: "Að hlaða öllu inn í vöruhús og hanna það eins og færslukerfi",
    explanation: "Þetta er sérstaklega nefnt meðal áhættuþátta í glærunum."
  },
  {
    id: "k4-27",
    section: "k4",
    sectionLabel: "Kafli 4 – Vöruhús gagna (Data Warehouse, DWH)",
    type: "binary",
    prompt: "Rétt eða rangt: Rekstrargagnageymsla (Operational Data Store, ODS) er oft notuð sem millilag áður en gögn fara inn í vöruhús gagna.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "ODS er í glærunum nefnt sem millilag og stundum eins konar gagnamarkaður fyrir afmarkaðar skýrslur."
  },

  // Kafli 5 – Gagnanám (Data Mining)
  {
    id: "k5-25",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) er líklegust þegar markmiðið er að finna reglur um hvaða vörur eru oft keyptar saman?",
    options: [
      "Sambandsgreining (Association Analysis)",
      "Aðhvarfsgreining (Regression Analysis)",
      "Tvíkosta aðhvarfsgreining (Logistic Regression)",
      "Sjónræn gagnvirk hermun (Visual Interactive Simulation, VIS)"
    ],
    answer: "Sambandsgreining (Association Analysis)",
    explanation: "Association analysis er klassíska aðferðin fyrir slík tengslamynstur."
  },
  {
    id: "k5-26",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) er líklegust ef markmiðið er að spá fyrir um tölulegt gildi fremur en flokk?",
    options: [
      "Aðhvarfsgreining (Regression Analysis)",
      "Flokkun (Classification)",
      "Hópun (Clustering)",
      "Viðhorfsgreining (Sentiment Analysis)"
    ],
    answer: "Aðhvarfsgreining (Regression Analysis)",
    explanation: "Regression er notuð þegar niðurstaðan er tölulegt gildi."
  },
  {
    id: "k5-27",
    section: "k5",
    sectionLabel: "Kafli 5 – Gagnanám (Data Mining)",
    type: "binary",
    prompt: "Rétt eða rangt: Hópun (Clustering) gerir ráð fyrir að flokkar séu fyrirfram skilgreindir áður en gögnunum er raðað í þá.",
    options: ["Rétt", "Rangt"],
    answer: "Rangt",
    explanation: "Í clustering eru hóparnir ekki skilgreindir fyrirfram."
  },

  // Kafli 6 – Textanám (Text Mining)
  {
    id: "k6-19",
    section: "k6",
    sectionLabel: "Kafli 6 – Textanám (Text Mining)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) hentar best ef markmiðið er að stytta langt skjal og draga fram það helsta?",
    options: [
      "Samantekt (Summarization)",
      "Nafngreining (Named Entity Recognition, NER)",
      "Efnisvöktun (Topic Tracking)",
      "Hópun (Clustering)"
    ],
    answer: "Samantekt (Summarization)",
    explanation: "Summarization er notuð til að þjappa efni og draga fram meginatriði."
  },
  {
    id: "k6-20",
    section: "k6",
    sectionLabel: "Kafli 6 – Textanám (Text Mining)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) er líklegust ef markmiðið er að bera kennsl á nöfn fyrirtækja, einstaklinga eða staða í texta?",
    options: [
      "Nafngreining (Named Entity Recognition, NER)",
      "Viðhorfsgreining (Sentiment Analysis)",
      "Markleit (Goal-Seek)",
      "Aðhvarfsgreining (Regression Analysis)"
    ],
    answer: "Nafngreining (Named Entity Recognition, NER)",
    explanation: "NER er einmitt notað til að greina slíkar einingar í texta."
  },
  {
    id: "k6-21",
    section: "k6",
    sectionLabel: "Kafli 6 – Textanám (Text Mining)",
    type: "binary",
    prompt: "Rétt eða rangt: Leitarvélabestun (Search Engine Optimization, SEO) getur falið í sér að reyna að gabba leitarvélar ef um svart-hatta SEO (Black-hat SEO) er að ræða.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar lýsa black-hat SEO sem tilraun til að gabba eða blekkja leitarvélar."
  },

  // Kafli 7 – Djúpnám (Deep Learning, DL) og tauganet (Neural Networks)
  {
    id: "k7-25",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "mcq",
    prompt: "Hvaða lög (Layers) mynda grunnuppbyggingu tauganets (Artificial Neural Network, ANN)?",
    options: [
      "Inntakslag (Input Layer), falið lag (Hidden Layer) og úttakslag (Output Layer)",
      "Extract, Transform og Load",
      "Víðir, staðreyndir og brúartöflur",
      "Goal-seek, What-if og Monte Carlo"
    ],
    answer: "Inntakslag (Input Layer), falið lag (Hidden Layer) og úttakslag (Output Layer)",
    explanation: "Þetta eru þrjú grunnlög tauganets samkvæmt glærunum."
  },
  {
    id: "k7-26",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "mcq",
    prompt: "Hvaða atriði er nefnt sem áskorun í djúpnámi (Deep Learning, DL)?",
    options: [
      "Erfitt að skilja hvernig lausnin kemst að niðurstöðu og hún krefst mikils reikniafls",
      "Að hún geti aðeins unnið með texta en ekki myndir",
      "Að hún sé alltaf auðskýrð vegna einfaldra reglna",
      "Að hún þurfi aldrei lýsigögn (Metadata)"
    ],
    answer: "Erfitt að skilja hvernig lausnin kemst að niðurstöðu og hún krefst mikils reikniafls",
    explanation: "Glærurnar nefna bæði skýranleika og computational requirements sem áskoranir."
  },
  {
    id: "k7-27",
    section: "k7",
    sectionLabel: "Kafli 7 – Djúpnám (Deep Learning, DL)",
    type: "binary",
    prompt: "Rétt eða rangt: Endurkvæm tauganet (Recurrent Neural Networks, RNN) og LSTM (Long Short-Term Memory) henta vel fyrir texta, tal og tímaraðir.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar tengja RNN og LSTM við raðir, texta, tal og tímaháð gögn."
  },

  // Kafli 8 – Forskriftargreiningar (Prescriptive Analytics), bestun (Optimization) og hermun (Simulation)
  {
    id: "k8-22",
    section: "k8",
    sectionLabel: "Kafli 8 – Bestun (Optimization) og hermun (Simulation)",
    type: "mcq",
    prompt: "Hvaða aðferð (Method) metur áhrif breytinga á einni eða fleiri inntaksbreytum á niðurstöðu reiknilíkans?",
    options: [
      "Hvað-ef greining (What-If Analysis)",
      "Nafngreining (Named Entity Recognition, NER)",
      "Hópun (Clustering)",
      "Role-Playing Dimension"
    ],
    answer: "Hvað-ef greining (What-If Analysis)",
    explanation: "Glærurnar skilgreina what-if nákvæmlega með þessum hætti."
  },
  {
    id: "k8-23",
    section: "k8",
    sectionLabel: "Kafli 8 – Bestun (Optimization) og hermun (Simulation)",
    type: "mcq",
    prompt: "Hvaða gerð hermunar (Simulation Type) tekur óvissu og handahófskennd gildi sérstaklega með í reikninginn?",
    options: [
      "Líkindahermun (Probabilistic Simulation)",
      "Forákvörðuð hermun (Deterministic Simulation)",
      "Ótímaháð vídd (Non-Time Dimension)",
      "Stjörnulíkan (Star Schema)"
    ],
    answer: "Líkindahermun (Probabilistic Simulation)",
    explanation: "Probabilistic simulation byggir á óvissu og handahófskenndu inntaki."
  },
  {
    id: "k8-24",
    section: "k8",
    sectionLabel: "Kafli 8 – Bestun (Optimization) og hermun (Simulation)",
    type: "binary",
    prompt: "Rétt eða rangt: Sjónræn gagnvirk hermun (Visual Interactive Simulation, VIS) leyfir notendum að breyta forsendum og sjá áhrif ákvarðana myndrænt.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Þetta er bein lýsing á VIS í glærunum."
  },

  // Högun (Architecture), aðferðafræði (Methodology), víddir (Dimensions), mæligildi (Measures)
  {
    id: "hx-25",
    section: "hx",
    sectionLabel: "Högun (Architecture) og aðferðafræði (Methodology)",
    type: "mcq",
    prompt: "Hvaða fullyrðing um Kimball-aðferðafræði (Kimball Methodology) er réttust?",
    options: [
      "Hún er bottom-up nálgun sem byrjar á gagnamörkuðum (Data Marts) og hentar vel skýrslutólum",
      "Hún er top-down nálgun sem byrjar alltaf á miðlægu 3NF vöruhúsi (Third Normal Form Warehouse)",
      "Hún gengur út á að geyma eingöngu hrá gögn í gagnalóni (Data Lake)",
      "Hún sleppir víddum (Dimensions) og vinnur aðeins með mæligildi (Measures)"
    ],
    answer: "Hún er bottom-up nálgun sem byrjar á gagnamörkuðum (Data Marts) og hentar vel skýrslutólum",
    explanation: "Þetta er kjarnalýsing Kimball úr glærunum."
  },
  {
    id: "hx-26",
    section: "hx",
    sectionLabel: "Högun (Architecture) og aðferðafræði (Methodology)",
    type: "mcq",
    prompt: "Hvaða mæligildi (Measure) er líklegast ósummanlegt (Non-Additive Measure)?",
    options: [
      "Einkvæmur fjöldi seldra vara",
      "Heildarupphæð seldra vara",
      "Fjöldi seldra eininga",
      "Fjöldi ekinna kílómetra"
    ],
    answer: "Einkvæmur fjöldi seldra vara",
    explanation: "Glærurnar nefna þetta sérstaklega sem dæmi um non-additive measure."
  },
  {
    id: "hx-27",
    section: "hx",
    sectionLabel: "Högun (Architecture) og aðferðafræði (Methodology)",
    type: "binary",
    prompt: "Rétt eða rangt: Stofngögn (Masterdata) eru gögn sem lýsa samhengi, breytast sjaldan og margar víddir (Dimensions) falla undir þann flokk.",
    options: ["Rétt", "Rangt"],
    answer: "Rétt",
    explanation: "Glærurnar skilgreina masterdata á nákvæmlega þennan hátt."
  }
];

questionBank.push(...fullChapterQuestions);

const chapter1ReviewQuestions = [
  {
    id: "k1-review-1",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing er réttust um tengd hugtök í kafla 1?",
    options: [
      "Kennarinn gerir alltaf mjög skýran og harðan greinarmun á BI, Data Analytics og Business Analytics",
      "Hugtökin eru alveg föst og eins skilin af öllum",
      "Skilningur á hugtökunum getur verið breytilegur eftir því við hvern er talað",
      "Viðskiptagreining merkir eingöngu hagræðingu en aldrei spá"
    ],
    answer: "Skilningur á hugtökunum getur verið breytilegur eftir því við hvern er talað",
    explanation: "Í glærunum er bent á að þessi hugtök eru ekki alltaf notuð nákvæmlega eins alls staðar. Það fer oft eftir samhengi, kennara, fyrirtæki eða fræðigrein."
  },
  {
    id: "k1-review-2",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Fyrirtæki vill sameina gögn úr mörgum kerfum í umhverfi sem hentar vel fyrir greiningu og skýrslugerð, án þess að yfirhlaða rekstrarkerfin. Hvaða hugtak lýsir þessu best?",
    options: [
      "Rekstrargagnagrunnur, OLTP",
      "Vöruhús gagna, Data Warehouse",
      "Gagnavísindi, Data Science",
      "Sjálfstæð ákvörðunartaka, Autonomous decision-making"
    ],
    answer: "Vöruhús gagna, Data Warehouse",
    explanation: "Vöruhús gagna er sérstaklega ætlað fyrir greiningu, samþættingu gagna og skýrslugerð."
  },
  {
    id: "k1-review-3",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Fyrirtæki notar vel skilgreindar reglur til að samþykkja einfaldar greiðslur og kerfið lærir ekki af niðurstöðum. Hvaða hugtak á best við?",
    options: [
      "Sjálfvirk ákvörðunartaka, Automatic",
      "Sjálfstæð ákvörðunartaka, Autonomous",
      "Spádómsgreining, Predictive Analytics",
      "Forskriftargreining, Prescriptive Analytics"
    ],
    answer: "Sjálfvirk ákvörðunartaka, Automatic",
    explanation: "Þetta er reglubundið og fyrirfram skilgreint ferli, ekki sjálfstætt kerfi sem lærir og aðlagast."
  },
  {
    id: "k1-review-4",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Greinandi fær hráar færslur úr mörgum kerfum. Eftir að þær eru flokkaðar, merktar og settar í samhengi verða þær auðlæsilegri og nýtilegri. Hvaða hugtak lýsir nýju stöðunni best?",
    options: [
      "Gögn, Data",
      "Þekking, Knowledge",
      "Upplýsingar, Information",
      "Hæfnisetur viðskiptagreindar, BI Competency Center"
    ],
    answer: "Upplýsingar, Information",
    explanation: "Gögn eru hráar færslur. Upplýsingar eru gögn sem búið er að vinna úr og setja í samhengi. Þekking er dýpri skilningur eða túlkun byggð á upplýsingum og reynslu."
  },
  {
    id: "k1-review-5",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Fyrirtæki vill skilja hvað gerðist í síðasta mánuði, hvaða vöruflokkar seldu mest og hvernig árangur var eftir svæðum. Hvaða tegund greiningar er líklegust?",
    options: [
      "Lýsandi greining, Descriptive Analytics",
      "Spádómsgreining, Predictive Analytics",
      "Forskriftargreining, Prescriptive Analytics",
      "Sjálfstæð ákvörðunartaka, Autonomous"
    ],
    answer: "Lýsandi greining, Descriptive Analytics",
    explanation: "Spurningin snýst um hvað gerðist, sem er kjarni lýsandi greiningar."
  },
  {
    id: "k1-review-6",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Tryggingafélag vill áætla hvaða nýir viðskiptavinir séu líklegastir til að lenda í háum kostnaði síðar. Hvaða aðferð er líklegust?",
    options: [
      "Lýsandi greining",
      "Spádómsgreining",
      "ETL",
      "OLTP vinnsla"
    ],
    answer: "Spádómsgreining",
    explanation: "Hér er verið að spá fyrir um framtíðarhegðun eða framtíðaráhættu."
  },
  {
    id: "k1-review-7",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Fyrirtæki vill ekki bara sjá líklega sölu heldur líka fá tillögu að besta verði til að ná tilteknu markmiði. Hvaða greining nálgast það best?",
    options: [
      "Lýsandi greining",
      "Spádómsgreining",
      "Forskriftargreining",
      "Gagnahreinsun"
    ],
    answer: "Forskriftargreining",
    explanation: "Forskriftargreining segir ekki bara hvað muni líklega gerast heldur líka hvaða aðgerð sé best."
  },
  {
    id: "k1-review-8",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Framkvæmdastjóri segir: Mig langar að ráðast í mjög spennandi BI verkefni af því nýja tæknin lítur vel út. Hvað er líklegasta gagnrýnin út frá glærunum?",
    options: [
      "Það er í lagi ef tæknin er ný",
      "BI á fyrst og fremst að styðja stefnu fyrirtækisins, ekki vera gæluverkefni",
      "Tækniverkefni þurfa ekki stuðning notenda",
      "BI á aðeins við í stórum fyrirtækjum"
    ],
    answer: "BI á fyrst og fremst að styðja stefnu fyrirtækisins, ekki vera gæluverkefni",
    explanation: "Glærurnar leggja áherslu á að BI eigi að styðja við raunveruleg markmið og stefnu, ekki bara vera spennandi tækni."
  },
  {
    id: "k1-review-9",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Fyrirtæki vill svara spurningunni Hvað hefur selst mikið síðustu 10 mínútur og einnig fylgjast með frávikum um leið og þau verða til. Hvað er líklegast að sé sérstaklega mikilvægt hér?",
    options: [
      "Að treysta aðeins á ársskýrslur",
      "Rauntímagreiningar",
      "Að nota eingöngu rekstrargagnagrunn án annarra verkfæra",
      "Að sleppa mælaborðum"
    ],
    answer: "Rauntímagreiningar",
    explanation: "Tíminn skiptir öllu hér. Þetta snýst um mjög nýleg gögn og skjót viðbrögð."
  },
  {
    id: "k1-review-10",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Hópur skoðar sömu sölutölur. Einn sér hrá gögn, annar sér samantekt með merkingu, og þriðji leggur til aðgerðir byggðar á reynslu og samhengi. Hver er röðin rétt frá einfaldasta stigi yfir í hæsta stigi?",
    options: [
      "Þekking -> Upplýsingar -> Gögn",
      "Gögn -> Upplýsingar -> Þekking",
      "Upplýsingar -> Gögn -> Þekking",
      "Gögn -> Þekking -> Upplýsingar"
    ],
    answer: "Gögn -> Upplýsingar -> Þekking",
    explanation: "Þetta er klassíska röðin frá hráu efni yfir í merkingu og síðan dýpri skilning."
  },
  {
    id: "k1-review-11",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Þið eruð að hanna BI lausn fyrir fyrirtæki og stjórnendur vilja mælikvarða sem allir skilja eins. Hvað er líklegasta fyrsta áherslan?",
    options: [
      "Sem flest ólík KPI fyrir mismunandi deildir",
      "Staðlaðir og auðskiljanlegir kjarnamælikvarðar",
      "Að hver deild skilgreini sín eigin hugtök óháð öðrum",
      "Að fela niðurstöður fyrir notendum þar til líkanið er fullkomið"
    ],
    answer: "Staðlaðir og auðskiljanlegir kjarnamælikvarðar",
    explanation: "Sameiginlegur skilningur á mælikvörðum er grunnur að góðri BI lausn."
  },
  {
    id: "k1-review-12",
    section: "k1",
    sectionLabel: "Kafli 1 – Viðskiptagreind",
    type: "mcq",
    prompt: "Ef notendur og stjórnendur skilja ekki verkefnið á sama hátt, hvaða vandamál er líklegast að komi upp?",
    options: [
      "Innleiðingin verður sjálfkrafa hraðari",
      "Gögnin verða sjálfkrafa hlutlausari",
      "Væntingar, forgangsröðun og notkun niðurstaðna verða óskýr",
      "OLTP kerfin verða stöðugri"
    ],
    answer: "Væntingar, forgangsröðun og notkun niðurstaðna verða óskýr",
    explanation: "Þegar fólk er ekki að horfa á verkefnið með sama skilningi verður auðvelt að lenda í misskilningi og röngum væntingum."
  }
];
questionBank.push(...chapter1ReviewQuestions);

const kafli2QuestionBankExtra = [
  {
    id: "k2-22",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best lausn sem fylgist með umhverfi sínu, lærir og bregst við breytingum til að ná ákveðnu markmiði?",
    options: [
      "Máltækni (e. Natural Language Processing, NLP)",
      "Snjallþjónusta (e. Intelligent Agent)",
      "Vélþýðing (e. Machine Translation)",
      "Spjallmenni (e. Chatbot)"
    ],
    answer: "Snjallþjónusta (e. Intelligent Agent)",
    explanation: "Snjallþjónustur eru sjálfstæðar þjónustur sem fylgjast með, læra og bregðast við breytingum í umhverfi sínu til að ná markmiði."
  },
  {
    id: "k2-23",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing lýsir best muninum á vélrænu námi (e. Machine Learning, ML) og djúpnámi (e. Deep Learning, DL)?",
    options: [
      "ML byggir alltaf á tauganetum en DL ekki",
      "DL er hlutmengi af ML og er helst notað í flóknari notkunartilvikum",
      "ML er eingöngu notað í texta en DL í myndum",
      "DL þarf ekki gögn til að læra"
    ],
    answer: "DL er hlutmengi af ML og er helst notað í flóknari notkunartilvikum",
    explanation: "Djúpnám er hlutmengi af vélrænu námi og er notað í flóknari notkunartilvikum eins og sjálfkeyrandi bílum og rauntímakerfum."
  },
  {
    id: "k2-24",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða aðferð er líklegust að sé notuð þegar kerfi á að eiga samskipti við notanda á töluðu eða skrifuðu mannamáli?",
    options: [
      "Máltækni (e. NLP)",
      "Sjálfvirk útvistun",
      "Vélmennafræði (e. Robotics)",
      "Rökgreind"
    ],
    answer: "Máltækni (e. NLP)",
    explanation: "NLP snýst um samskipti við tölvur á mannamáli, hvort sem það er talað eða skrifað."
  },
  {
    id: "k2-25",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing um spunagreind (e. Generative AI) passar best við glærurnar?",
    options: [
      "Hún er notuð til að greina gögn en býr ekki til nýtt efni",
      "Hún er í raun bara annað orð yfir vélrænt nám",
      "Hún getur búið til nýtt, áður óséð efni",
      "Hún krefst alltaf handskrifaðra reglna"
    ],
    answer: "Hún getur búið til nýtt, áður óséð efni",
    explanation: "Spunagreind útbýr nýtt, áður óséð efni, sem er það sem aðgreinir hana sérstaklega í glærunum."
  },
  {
    id: "k2-26",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Fyrirtæki vill lausn sem leggur til bestu ákvörðunina, en starfsmaður þarf alltaf að fara yfir tillöguna áður en hún er framkvæmd. Hvaða 4x líkan Schrage passar best?",
    options: [
      "Sjálfvirki ráðgjafinn",
      "Sjálfvirk útvistun",
      "Samvinna manns og vélar",
      "Algert sjálfstæði vélar"
    ],
    answer: "Samvinna manns og vélar",
    explanation: "Í þessu líkani leggur lausnin til bestu lausnina en manneskja rýnir og samþykkir hana."
  },
  {
    id: "k2-27",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða Schrage-líkan á best við þegar reglur eru kýrskýrar og hægt er að færa ferlið nánast alveg yfir í sjálfvirkt kerfi?",
    options: [
      "Sjálfvirki ráðgjafinn",
      "Sjálfvirk útvistun",
      "Samvinna manns og vélar",
      "Greindarsamanburður"
    ],
    answer: "Sjálfvirk útvistun",
    explanation: "Sjálfvirk útvistun á við þegar reglur eru mjög skýrar og hægt er að láta kerfið sjá um framkvæmdina."
  },
  {
    id: "k2-28",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvað af eftirfarandi er best dæmi um snjallþjónustu (e. Intelligent Agent) samkvæmt glærunum?",
    options: [
      "Kerfi sem þýðir texta orð fyrir orð milli tungumála",
      "Vírusvörn sem finnur líkleg vírusmynstur",
      "PDF-lesari sem sýnir skjöl hraðar",
      "Lyklaborð sem leiðréttir innsláttarvillur með orðabók"
    ],
    answer: "Vírusvörn sem finnur líkleg vírusmynstur",
    explanation: "Vírusvörn er sérstaklega nefnd sem dæmi um snjallþjónustu sem finnur líkleg mynstur."
  },
  {
    id: "k2-29",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða dæmi á glærunum sýnir best snjallþjónustu sem nýtir samtengdar upplýsingar til að vekja athygli á grunsamlegri hegðun?",
    options: [
      "Sjálfkeyrandi bílar í borgarumferð",
      "Ólöglegt skógarhögg",
      "Vélþýðing á heilbrigðisgögnum",
      "Talgreining í símaappi"
    ],
    answer: "Ólöglegt skógarhögg",
    explanation: "Í glærunum er nefnt dæmi þar sem snjallþjónusta samtengir upplýsingar og lætur vita ef grunur er á ólöglegu skógarhöggi."
  },
  {
    id: "k2-30",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hver er líklegasta ástæðan fyrir því að illa skilgreindir viðskiptaferlar geti gert innleiðingu gervigreindar erfiða?",
    options: [
      "Gervigreind getur aðeins unnið með myndgögn",
      "Lausnir byggja oft á fyrirfram skilgreindum ferlum",
      "Gervigreind þarf alltaf handvirka samþykkt",
      "Viðskiptaferlar skipta litlu máli ef gögnin eru góð"
    ],
    answer: "Lausnir byggja oft á fyrirfram skilgreindum ferlum",
    explanation: "Ef viðskiptaferlar eru illa skilgreindir og síbreytilegir verður innleiðing erfið samkvæmt glærunum."
  },
  {
    id: "k2-31",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða atriði er nefnt sem hugsanleg takmörkun eða áhætta við innleiðingu gervigreindar?",
    options: [
      "Hún getur ekki svarað mörgum fyrirspurnum samtímis",
      "Hún hentar aðeins einföldum útreikningum",
      "Langtímasparnaður er ekki endilega til staðar",
      "Hún getur ekki haft áhrif á ákvarðanatöku"
    ],
    answer: "Langtímasparnaður er ekki endilega til staðar",
    explanation: "Í glærunum er nefnt að langtímasparnaður sé ekki endilega til staðar og að kostnaður og áhætta þurfi að meta."
  },
  {
    id: "k2-32",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða svar passar best við „virði gervigreindar“ eins og það er sett fram í glærunum?",
    options: [
      "Hún kemur alfarið í stað mannlegrar dómgreindar",
      "Hún býður upp á nýjar leiðir til að taka ákvarðanir hraðar en áður",
      "Hún er fyrst og fremst gagnleg þegar gögn eru lítil",
      "Hún skiptir mestu máli í afþreyingu en síður í rekstri"
    ],
    answer: "Hún býður upp á nýjar leiðir til að taka ákvarðanir hraðar en áður",
    explanation: "Virðið er meðal annars að geta brugðist hraðar við atburðum og tekið ákvarðanir skjótvirkar."
  },
  {
    id: "k2-33",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing er næst því sem glærurnar segja um vélrænt nám (e. ML)?",
    options: [
      "Það auðkennir mynstur, spáir fyrir um og aðlagast",
      "Það býr alltaf til nýtt efni fyrir notandann",
      "Það er sama hugtak og djúpnám",
      "Það er fyrst og fremst aðferð til að þýða tungumál"
    ],
    answer: "Það auðkennir mynstur, spáir fyrir um og aðlagast",
    explanation: "Þetta er nákvæm lýsingin á ML í glærunum."
  },
  {
    id: "k2-34",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hver eftirfarandi fullyrðinga um djúpnám (e. DL) er réttust miðað við glærurnar?",
    options: [
      "Það er einfaldari og minna gagnakræf útgáfa af ML",
      "Það hermir eftir hegðun mannsheilans og styðst við tauganet",
      "Það er eingöngu notað í reikningshaldi",
      "Það þarf ekki stöðuga aðlögun að nýjum gögnum"
    ],
    answer: "Það hermir eftir hegðun mannsheilans og styðst við tauganet",
    explanation: "Djúpnám byggir á tauganetum og hermir eftir hegðun mannsheilans."
  },
  {
    id: "k2-35",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða notkunartilvik var sérstaklega nefnt sem dæmi um flóknara notkunartilvik djúpnáms?",
    options: [
      "Skattframtöl einstaklinga",
      "Sjálfkeyrandi bílar",
      "Póstflokkun með handrituðum reglum",
      "Orðabókaforrit"
    ],
    answer: "Sjálfkeyrandi bílar",
    explanation: "Sjálfkeyrandi bílar eru sérstaklega nefndir sem dæmi um flóknari notkun djúpnáms."
  },
  {
    id: "k2-36",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvað af eftirfarandi er besta lýsingin á spjallmenni (e. Chatbot)?",
    options: [
      "Áþreifanlegt vélmenni sem flytur hluti í verksmiðju",
      "Tölvuvædd þjónusta sem leyfir samræður milli manneskju og hugbúnaðar",
      "Gagnagrunnskerfi sem svarar aðeins SQL fyrirspurnum",
      "Vélþýðingarforrit sem vinnur án notendasamskipta"
    ],
    answer: "Tölvuvædd þjónusta sem leyfir samræður milli manneskju og hugbúnaðar",
    explanation: "Spjallmenni eru tölvuvædd þjónusta sem leyfir samræður milli manneskju og hugbúnaðar á mannamáli."
  },
  {
    id: "k2-37",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing um vélmenni / vélmennafræði (e. Robotics) samræmist glærunum best?",
    options: [
      "Vélmenni eru alltaf hugbúnaður og aldrei áþreifanlegir hlutir",
      "Vélmenni skynja umhverfi sitt og geta haft áhrif á það",
      "Vélmenni þurfa ekki gervigreind til að teljast vélmenni samkvæmt glærunum",
      "Spjallmenni teljast ekki undir umræðu glæranna"
    ],
    answer: "Vélmenni skynja umhverfi sitt og geta haft áhrif á það",
    explanation: "Í glærunum kemur fram að vélmenni skynji umhverfi sitt og geti haft áhrif á það."
  },
  {
    id: "k2-38",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvað af eftirfarandi var nefnt sem raunhæf notkun gervigreindar í fjármálafyrirtækjum?",
    options: [
      "Að afnema allar lánareglur",
      "Lánveitingar án aðkomu starfsmanna",
      "Að banna netþjónustu",
      "Að sleppa svindleftirliti"
    ],
    answer: "Lánveitingar án aðkomu starfsmanna",
    explanation: "Lánveitingarferli eru nefnd sem dæmi um notkun gervigreindar í atvinnulífi."
  },
  {
    id: "k2-39",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða svarmöguleiki lýsir best því sem glærurnar segja um ráðningarferli og gervigreind?",
    options: [
      "Gervigreind á að taka allar ráðningarákvarðanir ein",
      "Gervigreind getur samræmt samskipti og flýtt fyrir ferli",
      "Gervigreind útilokar alltaf hlutdrægni",
      "Gervigreind á aðeins við um tæknistörf"
    ],
    answer: "Gervigreind getur samræmt samskipti og flýtt fyrir ferli",
    explanation: "Ráðningaferli er nefnt sem notkunartilvik og AI getur flýtt og samræmt ákveðna hluta ferlisins."
  },
  {
    id: "k2-40",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða fullyrðing um „greind“ úr kafla 2 er réttust?",
    options: [
      "Greind er eingöngu það sama og greindarvísitala",
      "Greind er regnhlífarhugtak og getur birst í fleiri en einni mynd",
      "Greind er óþarft hugtak þegar rætt er um gervigreind",
      "Greind er aðeins mæld með Turing-prófinu"
    ],
    answer: "Greind er regnhlífarhugtak og getur birst í fleiri en einni mynd",
    explanation: "Í efninu er gervigreind sjálf sett fram sem regnhlífarhugtak yfir margar aðferðir og birtingarmyndir."
  },
  {
    id: "k2-41",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða dæmi var notað í glærum til að sýna að gervigreindarlausnir hafa sigrað heimsmeistara eða sérfræðinga í afmörkuðum verkefnum?",
    options: [
      "Sudoku, Monopoly og Minecraft",
      "Skák, Jeopardy og Go / WeiQi",
      "Brids, poker og fótboltaþjálfun",
      "Forritun, hönnun og vélritun"
    ],
    answer: "Skák, Jeopardy og Go / WeiQi",
    explanation: "Þetta eru klassísk dæmi sem eru tengd framþróun gervigreindar í afmörkuðum verkefnum."
  },
  {
    id: "k2-42",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best kerfi sem getur búið til nýtt efni, til dæmis texta eða myndir, frekar en að einungis greina fyrirliggjandi gögn?",
    options: [
      "Vélrænt nám (ML)",
      "Spunagreind (Generative AI)",
      "Snjallþjónusta (Intelligent Agent)",
      "Vélþýðing (Machine Translation)"
    ],
    answer: "Spunagreind (Generative AI)",
    explanation: "Spunagreind býr til nýtt efni, til dæmis texta eða myndir."
  },
  {
    id: "k2-43",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best sjálfstæðri þjónustu sem fylgist með umhverfi, lærir og bregst við til að ná markmiði?",
    options: [
      "Spjallmenni (Chatbot)",
      "Snjallþjónusta (Intelligent Agent)",
      "Tauganet (Neural Network)",
      "Talgreining"
    ],
    answer: "Snjallþjónusta (Intelligent Agent)",
    explanation: "Þetta er bein skilgreining á snjallþjónustu í glærunum."
  },
  {
    id: "k2-44",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir best tölvuvæddri þjónustu sem líkist mannlegum samskiptum í stuttum spurningum og svörum?",
    options: [
      "Spjallmenni (Chatbot)",
      "Vélmenni (Robot)",
      "Sjálfvirk útvistun",
      "Rökgreind"
    ],
    answer: "Spjallmenni (Chatbot)",
    explanation: "Spjallmenni eru tölvuvædd þjónusta sem líkist mannlegum samskiptum í formi stuttra spurninga og svara."
  },
  {
    id: "k2-45",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða aðferð er líklegust að sé notuð við sjálfvirka þýðingu texta milli tungumála?",
    options: [
      "Vélþýðing (Machine Translation)",
      "Sjálfvirki ráðgjafinn",
      "Samvinna manns og vélar",
      "Vélmennafræði"
    ],
    answer: "Vélþýðing (Machine Translation)",
    explanation: "Machine Translation snýst um að þýða texta milli tungumála."
  },
  {
    id: "k2-46",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða aðferð er líklegust að sé notuð þegar kerfi þarf að greina mynstur í svindli og aðlagast nýjum gögnum?",
    options: [
      "Vélrænt nám (ML)",
      "Vélþýðing",
      "Turing-prófið",
      "Sjálfvirk útvistun"
    ],
    answer: "Vélrænt nám (ML)",
    explanation: "ML er notað til að greina mynstur, spá fyrir um og aðlagast, meðal annars í svindlgreiningu."
  },
  {
    id: "k2-47",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hvaða aðferð er líklegust að sé notuð þegar kerfi þarf að bregðast við töluðu eða skrifuðu mannamáli?",
    options: [
      "Máltækni (NLP)",
      "Vélmennafræði",
      "Rymdargreind",
      "Greindarvísitala"
    ],
    answer: "Máltækni (NLP)",
    explanation: "NLP snýst um að vinna með talað eða skrifað mannamál."
  },
  {
    id: "k2-48",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Stutt dæmisaga: Tryggingafélag vill innleiða lausn sem getur áætlað verð á flóknum tryggingavörum þó ekki séu allar breytur þekktar fyrirfram. Lausnin á að nýta gögn, læra af fyrri ákvörðunum og bæta sig með tímanum. Hvaða hugtak eða nálgun passar best?",
    options: [
      "Snjallþjónusta sem nýtir vélrænt nám",
      "Vélþýðing með föstum orðalista",
      "Sjálfvirk útvistun án reglna",
      "Spjallmenni án gagnalíkans"
    ],
    answer: "Snjallþjónusta sem nýtir vélrænt nám",
    explanation: "Þetta líkist dæmunum um verðlagningu á flóknum vörum og snjallþjónustur sem læra og bæta sig."
  },
  {
    id: "k2-49",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Stutt dæmisaga: Stór stofnun vill innleiða lausn sem finnur bestu tillögu að næstu aðgerð en yfirmaður þarf alltaf að staðfesta hana áður en hún er framkvæmd. Hvaða Schrage-líkan passar best?",
    options: [
      "Sjálfvirki ráðgjafinn",
      "Samvinna manns og vélar",
      "Algert sjálfstæði vélar",
      "Sjálfvirk útvistun"
    ],
    answer: "Samvinna manns og vélar",
    explanation: "Lausnin leggur til bestu lausnina en manneskja staðfestir hana áður en hún er framkvæmd."
  },
  {
    id: "k2-50",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Stutt dæmisaga: Fyrirtæki vill „setja AI á allt“ en þegar nánar er skoðað eru verkferlar óljósir, undantekningar margar og ákvarðanir mismunandi eftir deildum. Hver er líklegasta áskorunin samkvæmt glærunum?",
    options: [
      "Gervigreind virkar aðeins á ensku",
      "Illa skilgreindir viðskiptaferlar gera innleiðingu erfiða",
      "Snjallþjónustur geta ekki svarað samtíma fyrirspurnum",
      "Vélrænt nám hentar aðeins í verksmiðjur"
    ],
    answer: "Illa skilgreindir viðskiptaferlar gera innleiðingu erfiða",
    explanation: "Glærurnar nefna sérstaklega að illa skilgreindir og síbreytilegir ferlar geri innleiðingu erfiða."
  },
  {
    id: "k2-51",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Stutt dæmisaga: Netbanki vill veita þjónustu allan sólarhringinn, svara mörgum fyrirspurnum samtímis og bæta eftirlit með svindli. Hvaða rök fyrir gervigreind passa best við þessa lýsingu?",
    options: [
      "Hún er fyrst og fremst skemmtileg tækni",
      "Hún getur svarað mörgum samtíma fyrirspurnum og unnið úr stórum gagnamengjum",
      "Hún útilokar allan kostnað við innleiðingu",
      "Hún gerir gögn óþörf"
    ],
    answer: "Hún getur svarað mörgum samtíma fyrirspurnum og unnið úr stórum gagnamengjum",
    explanation: "Virði gervigreindar er meðal annars að geta svarað mörgum samtímis og unnið úr stórum gagnamengjum."
  },
  {
    id: "k2-52",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Ef hópur innleiðir gervigreindarlausn í verkefni, hvað ætti hann helst að geta útskýrt samkvæmt glærunum?",
    options: [
      "Að gervigreind sé alltaf ódýrari en hefðbundnar lausnir",
      "Hvaða tegund ákvörðunar er verið að sjálfvirknivæða og hvers vegna",
      "Að vélrænt nám og djúpnám séu nákvæmlega sama hugtak",
      "Að spunagreind leysi allar skipulagsáskoranir"
    ],
    answer: "Hvaða tegund ákvörðunar er verið að sjálfvirknivæða og hvers vegna",
    explanation: "Í glærunum er lögð áhersla á tegund ákvarðana, áhættu, kostnað og áhrif á ákvörðunartöku."
  },
  {
    id: "k2-53",
    section: "k2",
    sectionLabel: "Kafli 2 – Gervigreind",
    type: "mcq",
    prompt: "Hver væri sterkust fagleg röksemd í hópverkefni fyrir því að velja ekki fullsjálfvirka lausn?",
    options: [
      "Af því að gervigreind er of ný til að nota hana",
      "Af því að mannleg yfirferð getur verið mikilvæg þegar áhætta eða áhrif ákvarðana eru mikil",
      "Af því að spjallmenni eru alltaf betri en önnur líkön",
      "Af því að reglur mega aldrei vera skýrar"
    ],
    answer: "Af því að mannleg yfirferð getur verið mikilvæg þegar áhætta eða áhrif ákvarðana eru mikil",
    explanation: "Þegar áhætta er mikil eða áhrif ákvarðana veruleg getur mannleg yfirferð og samþykki skipt miklu máli."
  }
];

questionBank.push(...kafli2QuestionBankExtra);

const kafli3QuestionBankExtra = [
  {
    id: "k3-22",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við skipulögð gögn?",
    options: [
      "Gögn með skýra uppbyggingu sem auðveldara er að vinna með",
      "Gögn sem eru alltaf texti af samfélagsmiðlum",
      "Gögn sem ekki er hægt að tengja saman",
      "Gögn sem innihalda eingöngu myndir og hljóð"
    ],
    answer: "Gögn með skýra uppbyggingu sem auðveldara er að vinna með",
    explanation: "Skipulögð gögn hafa skýra uppbyggingu og eru yfirleitt auðveldari í vinnslu og greiningu."
  },
  {
    id: "k3-23",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða lýsing passar best við hálf skipulögð gögn?",
    options: [
      "Gögn sem hafa enga byggingu yfirleitt",
      "Gögn sem hafa einhverja uppbyggingu en ekki jafn fasta og skipulögð gögn",
      "Gögn sem eru alltaf í töflureikni",
      "Gögn sem er ómögulegt að greina"
    ],
    answer: "Gögn sem hafa einhverja uppbyggingu en ekki jafn fasta og skipulögð gögn",
    explanation: "Hálf skipulögð gögn hafa ákveðna uppbyggingu, en hún er ekki jafn föst og í hefðbundnum töflugögnum."
  },
  {
    id: "k3-24",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða atriði lýsir best timeliness eða tímanleika gagna?",
    options: [
      "Að gögnin séu uppfærð og viðeigandi",
      "Að gögnin séu örugg gagnvart netárásum",
      "Að gögnin séu alltaf úr mörgum kerfum",
      "Að gögnin séu flokkuð sem nominal"
    ],
    answer: "Að gögnin séu uppfærð og viðeigandi",
    explanation: "Tímanleiki snýst um að gögn séu nægilega ný og viðeigandi þegar þau eru notuð."
  },
  {
    id: "k3-25",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða gæðaeiginleiki snýst um að öll gögn séu samræmd, tengd og án frávika?",
    options: [
      "Áreiðanleiki",
      "Samræmi",
      "Auðgun",
      "Aðgengi"
    ],
    answer: "Samræmi",
    explanation: "Samræmi snýst um að skilgreiningar og gögn passi saman og stangist ekki á milli kerfa eða sviða."
  },
  {
    id: "k3-26",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða flokkun gagna á best við þegar gildi eru bara nöfn eða flokkar án innbyrðis röðunar?",
    options: [
      "Ordinal",
      "Ratio",
      "Nominal",
      "Interval"
    ],
    answer: "Nominal",
    explanation: "Nominal gögn eru flokkar eða heiti án innbyrðis röðunar."
  },
  {
    id: "k3-27",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða flokkun gagna á best við þegar gildi hafa röð eins og stutt, miðlungs og langt?",
    options: [
      "Nominal",
      "Ordinal",
      "Interval",
      "Structured"
    ],
    answer: "Ordinal",
    explanation: "Ordinal gögn hafa röð, en bilið á milli gilda er ekki endilega jafnt."
  },
  {
    id: "k3-28",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvert er meginmarkmið forvinnslu gagna samkvæmt glærunum?",
    options: [
      "Að gera gögn tilbúin til notkunar í greiningum",
      "Að geyma öll gögn án breytinga",
      "Að eyða öllum auka færslum sjálfkrafa",
      "Að breyta öllum gögnum í óskipulögð gögn"
    ],
    answer: "Að gera gögn tilbúin til notkunar í greiningum",
    explanation: "Forvinnsla snýst um að undirbúa gögn svo þau nýtist betur í greiningum og líkönum."
  },
  {
    id: "k3-29",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða atriði er líklegast ástæða fyrir því að gagnavinnsla verði tímafrek?",
    options: [
      "Gögn þurfa aðeins að vera afrituð",
      "Þarf að skilja, tengja og laga gögnin",
      "Öll gögn eru sjálfkrafa tilbúin til greininga",
      "Skýrslur útiloka þörf fyrir forvinnslu"
    ],
    answer: "Þarf að skilja, tengja og laga gögnin",
    explanation: "Gagnavinnsla er oft tímafrek því gögn þarf að skilja, tengja saman, hreinsa og laga."
  },
  {
    id: "k3-30",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða aðferð er líklegust þegar gagnamengi er of stórt og of þungt í vinnslu?",
    options: [
      "Að nota hlutmengi",
      "Að bæta við fleiri flokkum",
      "Að nota eingöngu hágildi",
      "Að sleppa allri hreinsun"
    ],
    answer: "Að nota hlutmengi",
    explanation: "Þegar gagnamengi er mjög stórt getur verið gagnlegt að vinna með hlutmengi þess."
  },
  {
    id: "k3-31",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða fullyrðing lýsir best normalization í samhengi kafla 3?",
    options: [
      "Aðferð til að samræma gögn milli mismunandi gagnauppspretta",
      "Aðferð til að auka stærð gagnamengis",
      "Aðferð til að finna miðgildi",
      "Aðferð til að umbreyta skipulögðum gögnum í óskipulögð"
    ],
    answer: "Aðferð til að samræma gögn milli mismunandi gagnauppspretta",
    explanation: "Hér er normalization notað í merkingunni að samræma og laga gögn svo þau passi betur saman."
  },

  {
    id: "k3-32",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða aðferð er líklegust notuð þegar gagnamengi eru ekki með jafna dreifingu og þarf að jafna þau fyrir betri spálíkön?",
    options: [
      "Balancing",
      "Range",
      "Mode",
      "Timeliness"
    ],
    answer: "Balancing",
    explanation: "Balancing er notað til að jafna gagnamengi þegar dreifing flokka eða gilda er mjög skökk."
  },
  {
    id: "k3-33",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða hugtak lýsir því best að tengja gögn úr mörgum áttum saman í forvinnslu?",
    options: [
      "Data blending",
      "Quartile",
      "Accessibility",
      "Median"
    ],
    answer: "Data blending",
    explanation: "Data blending er notað þegar gögn frá mörgum áttum eru tengd saman í eitt greiningarmengi."
  },
  {
    id: "k3-34",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Í dæminu um brottfall nemenda var hvaða atriði sett fram sem kjarni málsins?",
    options: [
      "Að velja rétt mælaborð",
      "Gögn eru kjarni málsins",
      "Að nota eingöngu óskipulögð gögn",
      "Að nota aðeins rauntímagögn"
    ],
    answer: "Gögn eru kjarni málsins",
    explanation: "Í dæminu var lögð áhersla á að gögnin sjálf væru grunnurinn að því að geta spáð og brugðist við."
  },
  {
    id: "k3-35",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hver var niðurstaðan í dæminu um brottfall nemenda?",
    options: [
      "Líkanið spáði rétt fyrir um 50 prósent þeirra sem hætta",
      "Líkanið spáði rétt fyrir um 80 prósent þeirra sem hætta",
      "Líkanið spáði rétt fyrir um alla sem hætta",
      "Ekki tókst að byggja spálíkan"
    ],
    answer: "Líkanið spáði rétt fyrir um 80 prósent þeirra sem hætta",
    explanation: "Í dæminu var nefnt að líkanið næði að finna stóran hluta þeirra sem líklegir væru til að hætta."
  },
  {
    id: "k3-36",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða þrjú V voru upphaflega notuð til að lýsa gagnagnótt?",
    options: [
      "Value, veracity og variability",
      "Volume, variety og velocity",
      "Variance, value og volume",
      "Velocity, validity og visualization"
    ],
    answer: "Volume, variety og velocity",
    explanation: "Þetta eru klassísku þrjú V-in sem fyrst voru notuð um Big Data."
  },
  {
    id: "k3-37",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða atriði var síðar bætt við sem eitt af viðbótar V hugtökunum í gagnagnótt?",
    options: [
      "Veracity",
      "Visualization",
      "Versioning",
      "Validation only"
    ],
    answer: "Veracity",
    explanation: "Veracity tengist áreiðanleika og sannleiksgildi gagna og er eitt af viðbótar V-unum."
  },
  {
    id: "k3-38",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða fullyrðing um gagnagnótt er næst glærunum?",
    options: [
      "Söfnun mikils magns gagna ein og sér skapar sjálfkrafa virði",
      "Virði verður fyrst til þegar tekst að greina þetta mikla magn",
      "Gagnagnótt snýst eingöngu um geymslu gagna",
      "Big Data vísar bara til samfélagsmiðlagagna"
    ],
    answer: "Virði verður fyrst til þegar tekst að greina þetta mikla magn",
    explanation: "Mikið gagnamagn eitt og sér skapar ekki virði nema það sé unnið úr því og það nýtt."
  },
  {
    id: "k3-39",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða atriði er nefnt sem ein af helstu áskorunum við mikla gagnagnótt?",
    options: [
      "Að öll gögn séu of skipulögð",
      "Stjórnun og siðferði varðandi meðhöndlun",
      "Að gagnamagn sé of lítið",
      "Skortur á töflureiknum"
    ],
    answer: "Stjórnun og siðferði varðandi meðhöndlun",
    explanation: "Stjórnun gagna og siðferðileg meðferð þeirra eru mikilvægar áskoranir í gagnagnótt."
  },
  {
    id: "k3-40",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða þáttur stuðlar samkvæmt glærunum að velgengni verkefna tengdra gagnagnótt?",
    options: [
      "Að viðskiptahlið og UT hafi ólík markmið",
      "Stuðningur frá stjórnendum",
      "Að sleppa menningu fyrirtækisins",
      "Að nota nýjustu tækni óháð þörf"
    ],
    answer: "Stuðningur frá stjórnendum",
    explanation: "Stuðningur stjórnenda og skýr stefna eru lykilatriði í vel heppnuðum verkefnum."
  },
  {
    id: "k3-41",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða aðstæður benda helst til þess að ný gagnagnóttarlausn geti skapað virði?",
    options: [
      "Þegar núverandi lausn ræður vel við allt magn og alla hraða",
      "Þegar ný gögn berast of hratt eða of seint fyrir núverandi lausn",
      "Þegar öll gögn fylgja sömu stöðlum og engin áskorun er til staðar",
      "Þegar engin viðskiptaleg þörf er til staðar"
    ],
    answer: "Þegar ný gögn berast of hratt eða of seint fyrir núverandi lausn",
    explanation: "Ný lausn getur skapað virði þegar hraði, magn eða fjölbreytni gagna fer fram úr getu eldri lausna."
  },

  {
    id: "k3-42",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Fyrirtæki safnar gögnum úr skynjurum á sekúndufresti, viðskiptum úr sölukerfi og kvörtunum úr frjálsum texta. Hvaða samsetning lýsir best áskoruninni?",
    options: [
      "Aðallega nominal og ekkert annað",
      "Volume og variety",
      "Ordinal og median",
      "Range og mode"
    ],
    answer: "Volume og variety",
    explanation: "Hér er bæði mikið magn gagna og mikil fjölbreytni í gerðum gagna."
  },
  {
    id: "k3-43",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Greining sýnir miðgildi, meðaltal og fjórðungsmörk fyrir tekjur viðskiptavina. Hvaða gerð greiningar er þetta líklegast fyrst og fremst?",
    options: [
      "Lýsandi tölfræðigreining",
      "Forspárgreining",
      "Textavinnsla",
      "Balancing"
    ],
    answer: "Lýsandi tölfræðigreining",
    explanation: "Miðgildi, meðaltal og fjórðungsmörk eru dæmi um lýsandi tölfræðilega greiningu."
  },
  {
    id: "k3-44",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Viðskiptaaðili spyr hvers vegna tvær skýrslur sýna ólíka niðurstöðu fyrir sama tímabil. Í ljós kemur að deildir nota mismunandi skilgreiningar á virkum viðskiptavini. Hvaða hugtak er helst í húfi?",
    options: [
      "Consistency",
      "Velocity",
      "Quartile",
      "Range"
    ],
    answer: "Consistency",
    explanation: "Þetta er dæmi um skort á samræmi í skilgreiningum og því consistency vandamál."
  },
  {
    id: "k3-45",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Greiningarteymi vill finna samband milli auglýsingakostnaðar og sölu til að meta hvort breyting á öðru skýri hitt að hluta. Hvaða aðferð passar best?",
    options: [
      "Aðhvarfsgreining",
      "Nominal flokkun",
      "Balancing",
      "Normalization eingöngu"
    ],
    answer: "Aðhvarfsgreining",
    explanation: "Aðhvarfsgreining er notuð til að meta samband milli breyta og hvort önnur skýri hina."
  },
  {
    id: "k3-46",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða aðstæður styðja best við að nota nýja gagnagnóttarlausn frekar en hefðbundið gagnavöruhús eitt og sér?",
    options: [
      "Þegar núverandi lausn vinnur hraða, magn og fjölbreytni án vandræða",
      "Þegar nýjar gagnalindir og hraði gagna fara fram úr getu núverandi lausnar",
      "Þegar engin viðskiptaspurning liggur fyrir",
      "Þegar aðeins er unnið með lítil og stöðug töflugögn"
    ],
    answer: "Þegar nýjar gagnalindir og hraði gagna fara fram úr getu núverandi lausnar",
    explanation: "Þá getur ný gagnagnóttarlausn orðið réttlætanleg og skapað virði."
  },
  {
    id: "k3-47",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Í verkefni um brottfall nemenda nær líkan að finna stóran hluta þeirra sem eru líklegir til að hætta. Hvaða viðskiptalega gildi er líklegast að glærurnar vilji draga fram?",
    options: [
      "Að hægt sé að bregðast fyrr við með markvissum úrræðum",
      "Að ekki þurfi lengur mannlega túlkun",
      "Að öll gögn verði sjálfkrafa rétt",
      "Að samhengið skipti minna máli en tæknin"
    ],
    answer: "Að hægt sé að bregðast fyrr við með markvissum úrræðum",
    explanation: "Virðið felst í að geta gripið fyrr inn í og brugðist markvisst við."
  },
  {
    id: "k3-48",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða fullyrðing um gagnagæði er best?",
    options: [
      "Gagnagæði skipta helst máli eftir að líkan er tilbúið",
      "Slök gagnagæði geta rýrt bæði greiningu og ákvarðanir",
      "Gagnagæði skipta bara máli í óskipulögðum gögnum",
      "Gagnagæði snúast aðeins um aðgangsheimildir"
    ],
    answer: "Slök gagnagæði geta rýrt bæði greiningu og ákvarðanir",
    explanation: "Léleg gagnagæði hafa bein áhrif bæði á greiningar og ákvarðanatöku."
  },
  {
    id: "k3-49",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Breytan hitastig í gráðum á Celsíus er best flokkuð sem hvaða mælikvarði?",
    options: [
      "Nominal",
      "Ordinal",
      "Interval",
      "Ratio"
    ],
    answer: "Interval",
    explanation: "Celsíus hefur jöfn bil milli gilda en núllpunkturinn er ekki algert núll, þannig að þetta eru interval gögn."
  },
  {
    id: "k3-50",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvaða svar lýsir best muninum á skipulögðum og óskipulögðum gögnum í samhengi við gagnavinnslu?",
    options: [
      "Skipulögð gögn eru alltaf mikilvægari en óskipulögð",
      "Óskipulögð gögn hafa yfirleitt minna viðskiptalegt gildi",
      "Skipulögð gögn hafa fastara form en óskipulögð krefjast oftar meiri forvinnslu",
      "Það er enginn raunverulegur munur í vinnslu þeirra"
    ],
    answer: "Skipulögð gögn hafa fastara form en óskipulögð krefjast oftar meiri forvinnslu",
    explanation: "Skipulögð gögn eru fastari í formi en óskipulögð gögn þurfa oftar meiri vinnslu áður en þau nýtast."
  },
  {
    id: "k3-51",
    section: "k3",
    sectionLabel: "Kafli 3 – Gögn og gagnavinnsla",
    type: "mcq",
    prompt: "Hvað bendir sterkast til þess að verkefni í gagnagnótt fái góðan hljómgrunn og eigi meiri líkur á árangri?",
    options: [
      "Að aðeins tækniteymið skilji markmiðin",
      "Stuðningur stjórnenda og skýr tenging við viðskiptaþarfir",
      "Að tæknin sé ný og vinsæl",
      "Að gögnunum sé safnað án skýrra nota"
    ],
    answer: "Stuðningur stjórnenda og skýr tenging við viðskiptaþarfir",
    explanation: "Stuðningur stjórnenda og skýr tenging við raunverulegar viðskiptaþarfir eykur líkur á árangri."
  }
];

questionBank.push(...kafli3QuestionBankExtra);

const countOptions = [10, 15, 20, 30, 40, 50, 60, 80, 100, 120, 150, "all"];
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
    <>
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
    <Analytics />
  </>
  );
}
