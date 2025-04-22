# Crumb

A Crumb egy magyar morfológiai generátor. Képes dinamikusan előállítani különböző magyar szavakat toldalékolással, de
számos egyéb alapeszközt biztosít természetes mondatok generálásához.

## Telepítés

A teljes projekt telepítése:

```bash
npm install crumb
```

## Használat

### Toldalékolás

A toldalékoláshoz használd a `suffix` metódust:

```javascript
import {suffix} from 'crumb';

suffix.dative('kutya'); // "kutyának"
```

A `suffix` metódus a magyar nyelv toldalékolási szabályait implementálja, figyelembe véve a magánhangzó-harmóniát és
egyéb nyelvtani szabályokat.
A csomag a következő toldalékokat támogatja:

**Esetragok:**

- `accusative`: tárgyeset (-t, -ot, -at, -et, -öt) - pl. `suffix.accusative('ház')` → "házat"
- `dative`: részeshatározó (-nak, -nek) - pl. `suffix.dative('macska')` → "macskának"
- `ablative`: távolító eset (-tól, -től) - pl. `suffix.ablative('iskola')` → "iskolától"
- `adessive`: veszteglő eset (-nál, -nél) - pl. `suffix.adessive('ajtó')` → "ajtónál"
- `allative`: közelítő eset (-hoz, -hez, -höz) - pl. `suffix.allative('szék')` → "székhez"
- `delative`: leható eset (-ról, -ről) - pl. `suffix.delative('tető')` → "tetőről"
- `elative`: kiható eset (-ból, -ből) - pl. `suffix.elative('doboz')` → "dobozból"
- `illative`: beható eset (-ba, -be) - pl. `suffix.illative('ház')` → "házba"
- `insessive`: bentlakó eset (-ban, -ben) - pl. `suffix.insessive('kert')` → "kertben"
- `sublative`: felható eset (-ra, -re) - pl. `suffix.sublative('asztal')` → "asztalra"
- `superessive`: felülmaradó eset (-on, -en, -ön) - pl. `suffix.superessive('föld')` → "földön"
- `terminative`: határvető eset (-ig) - pl. `suffix.terminative('sarok')` → "sarokig"
- `translative`: változtató eset (-vá, -vé) - pl. `suffix.translative('jég')` → "jéggé"
- `instrumentalComitative`: eszközhatározó (-val, -vel) - pl. `suffix.instrumentalComitative('toll')` → "tollal"
- `locative`: helyhatározó (-ott, -ett, -ött) - pl. `suffix.locative('minden')` → "mindenütt"
- `genitive`: birtokos eset (-é) - pl. `suffix.genitive('tanár')` → "tanáré"

**Egyéb toldalékok:**

- `plural`: többes szám (-k, -ok, -ak, -ek, -ök) - pl. `suffix.plural('kutya')` → "kutyák"
- `adjective`: melléknévképző (-i, -s, -os, -as, -es, -ös) - pl. `suffix.adjective('Budapest')` → "budapesti"
- `privative`: fosztóképző (-talan, -telen, -atlan, -etlen) - pl. `suffix.privative('hiba')` → "hibátlan"
- `temporal`: időhatározó (-kor) - pl. `suffix.temporal('három')` → "háromkor"
- `essiveFormal`: alakhatározó (-ként) - pl. `suffix.essiveFormal('tanár')` → "tanárként"
- `essiveModal`: módhatározó (-ul, -ül) - pl. `suffix.essiveModal('példa')` → "példaul"
- `sociative`: társhatározó (-stul, -stül) - pl. `suffix.sociative('család')` → "családostul"
- `distributiveTemporal`: osztó időhatározó (-onta, -ente) - pl. `suffix.distributiveTemporal('hét')` → "hetente"
- `distributive`: osztóhatározó (-onként, -enként) - pl. `suffix.distributive('darab')` → "darabonként"
- `formal`: alakhatározó (-képpen) - pl. `suffix.formal('más')` → "másképpen"
- `modalEssive`: módhatározó (-ul, -ül) - pl. `suffix.modalEssive('magyar')` → "magyarul"
- `multiplicative`: szorzó (-szor, -szer, -ször) - pl. `suffix.multiplicative('három')` → "háromszor"
- `frequentative`: gyakorító (-gat, -get) - pl. `suffix.frequentative('néz')` → "nézeget"
- `finalCasual`: célhatározó (-ért) - pl. `suffix.finalCasual('pénz')` → "pénzért"

**Fokozás:**
A csomag támogatja a melléknevek fokozását is a `grade` objektumon keresztül:

```javascript
import {grade} from 'crumb';

grade.comparative('szép'); // "szebb"
grade.superlative('szép'); // "legszebb"
grade.excessive('szép');   // "legeslegszebb"
```

##### Speciális esetek és kivételek

A csomag kezeli a magyar nyelv speciális eseteit és kivételeit, például:

- Mássalhangzó-hasonulás (pl. "toll" + "val" → "tollal")
- Hangkivetés (pl. "bokor" → "bokrot")
- Hangzórövidülés (pl. "kéz" → "kezet")
- Egyéb rendhagyó alakok (pl. "ló" → "lovat")

##### Példák

```javascript
import {suffix, grade} from 'crumb';

// Esetragok
suffix.accusative('alma');     // "almát"
suffix.dative('ház');          // "háznak"
suffix.ablative('iskola');     // "iskolától"
suffix.insessive('doboz');     // "dobozban"
suffix.superessive('szék');    // "széken"

// Többes szám
suffix.plural('kutya');        // "kutyák"
suffix.plural('ember');        // "emberek"
suffix.plural('könyv');        // "könyvek"

// Birtokos eset
suffix.genitive('tanár');      // "tanáré"
suffix.genitive('diák');       // "diáké"

// Fokozás
grade.comparative('nagy');     // "nagyobb"
grade.superlative('szép');     // "legszebb"
grade.excessive('jó');         // "legeslegjobb"

// Kivételek kezelése
suffix.accusative('ló');       // "lovat"
suffix.plural('tó');           // "tavak"
```

## Command Line Interface

```bash
crumb suffix accusative alma // "almát"
crumb grade comparative szép // "szebb"
crumb numeral 6524 // hatezer-
```

## Licenc

MIT
