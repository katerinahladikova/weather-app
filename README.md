# Aplikace počasí

## Popis aplikace
Aplikace Počasí zobrazuje aktuální a předpovězené meteorologické údaje pro zvolené město nebo aktuální polohu uživatele. Data jsou získávána pomocí API OpenWeatherMap. Uživatel může vyhledávat města, zobrazit předpověď na následujících několik dní a přehled dnešního počasí každé 3 hodiny.

## Podporované prohlížeče
* Google Chrome
* Mozilla Firefox
* Safari
* Opera

> Podporována je i mobilní verze.

## Struktura aplikace
Projekt je rozdělen do těchto souborů:  

### HTML (index.html)
HTML soubor obsahuje dvě hlavní části: levý sloupec s denními předpověďmi a pravou část s aktuálním výběrem města a hodinovou předpovědí.  

### CSS (style.css)
Styluje celé rozhraní včetně rozvržení, responzivity a tmavého průhledného pozadí. Používá Open Sans písmo a Google Material Icons.  

### JavaScript (script.js)
Obsahuje logiku aplikace rozdělenou do několika částí:  

**Geolokace:** `getLocation()` získává souřadnice uživatele a zobrazuje počasí pro aktuální polohu.  
**Načtení dat měst:** `getCities()` načítá seznam měst ze souboru `city.list.json.`  
**Vyhledávání měst:** `filterCities()` a `renderCity()` umožňují uživateli hledat a vybrat město ze seznamu.  
**Načítání počasí:** `getWeather()` získává předpověď počasí pro zadané souřadnice.  
**Zobrazení dat:**  
* `renderWeather()` zobrazuje aktuální teplotu, vítr, vlhkost, pocitovou teplotu a datum.
* `renderForecast()` zobrazuje předpověď na následující dny.
* `renderTodayForecast()` zobrazí dnešní nebo zítřejší vývoj počasí po 3 hodinách.

### Další soubory
`city.list.json` – seznam měst  
`images` – složka s obrázky

## Spuštění aplikace
Pro lokální spuštění aplikace postupujte podle následujících kroků:
* Naklonujte repozitář nebo si stáhněte zdrojové soubory.
* Ujistěte se, že máte ve složce soubory `index.html`, `style.css`, `script.js` `images` a také soubor `city.list.json`.

### Spuštění pomocí VS Code Live Server
1. Otevřete složku s projektem ve Visual Studio Code.

2. Nainstalujte rozšíření Live Server, pokud ho ještě nemáte:

   - Otevřete panel Extensions (ikona čtverečků v levém postranním panelu nebo Ctrl+Shift+X)
   - Vyhledejte Live Server
   - Klikněte na Install

3. Spusťte aplikaci přes Live Server:
   - Klikněte pravým tlačítkem myši index.html a zvolte "Open with Live Server"
   - Aplikace se otevře ve výchozím prohlížeči

### Pomocí Python
1. Ujistěte se, že máte nainstalovaný Python (verze 3+).
2. Spusťte lokální server.  
V terminálu napiště příkaz: `python -m http.server 8000`


3. Otevřete aplikaci v prohlížeči.  
Ve webovém prohlížeči přejděte na adresu: `http://localhost:8000`  

> Aplikace se načte a po povolení přístupu k poloze zobrazí aktuální předpověď počasí.
