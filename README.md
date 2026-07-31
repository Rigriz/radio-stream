# 📻 Radio Stream App

A lightweight, offline-capable web application to stream live radio stations — designed to work on **2G/3G networks** in low-connectivity areas like villages, valleys, and mountains.

Built as a **single HTML file** with zero external CSS/JS frameworks. No Bootstrap. No CDN dependencies for the UI. Pure native HTML5, CSS3, and JavaScript.

---

## ✨ Features

- **Live Radio Streaming** — All India Radio (AIR), BBC World Service, Vividh Bharati, Red FM, Radio Mirchi, Radio City, Radio Mango, Kundapura 89.6, Shivamogga 90.8 FM, and more.
- **HLS (m3u8) & Direct Audio Support** — Integrated with `HLS.js` for HTTP Live Streaming and native HTML5 audio fallback for MP3 streams.
- **TuneIn Integration** — Embedded iframe player support for TuneIn radio streams and podcasts.
- **Interactive Station Grid** — Dynamic clickable station cards with a persistent sticky audio player bar at the bottom of the screen.
- **Category Navigation Toggle** — Click `TuneIn` or `Radio` in the navbar to show/hide the station list; clicking the same nav item again collapses the list.
- **2G/3G Low-Bandwidth Optimized** — The entire UI loads in under 5 KB with no image assets and no external framework downloads.
- **Offline UI via Service Worker (PWA)** — On the first visit, the app shell is cached locally. Subsequent visits load the UI instantly from device storage, using zero mobile data for the interface.
- **Zero CDN UI Dependencies** — No Bootstrap, no Google Fonts, no icon library. The entire UI shell downloads in a single request.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|:---|:---|
| **HTML5** | Structure and semantic layout |
| **Vanilla CSS3 (Flexbox)** | Responsive UI — ~1.5 KB, fully inline, no external file |
| **Vanilla JavaScript (ES6)** | All interactivity, DOM manipulation, navbar toggle |
| **HLS.js** | HTTP Live Streaming (m3u8) audio playback |
| **Service Worker (`sw.js`)** | PWA offline UI caching for 2G/3G environments |

> ⚠️ **Bootstrap was intentionally removed.** It was replaced with ~1.5 KB of native CSS Flexbox, saving **~240 KB** of CDN payload on every first-time page load.

---

## 📂 File Structure

```
radio-stream/
├── index.html   # Main app: UI, station data, HLS logic, player controls
├── sw.js        # Service Worker: caches UI shell for offline/low-network use
└── README.md    # Project documentation
```

---

## 🌐 How Low-Bandwidth Mode Works

This app is optimized by default for weak network environments. No toggle needed.

1. **First visit**: The browser downloads `index.html` (~5 KB) and `sw.js` registers in the background.
2. **Service Worker caches** `index.html` to the device's local browser storage.
3. **Every visit after that**: The UI loads instantly from local cache — **0 KB of UI data** is downloaded over the network.
4. **All mobile data is reserved exclusively for audio streaming**, which is the core purpose of the app.

### What was optimized:

| Optimization | Savings |
|:---|:---|
| Removed Bootstrap CSS CDN | −160 KB per load |
| Removed Bootstrap JS CDN | −80 KB per load |
| Removed inline Base64 station images | −~50 KB from HTML payload |
| Service Worker UI caching | 0 KB UI on repeat visits |
| **Total saving per repeat visit** | **~290 KB** |

---

## 🚀 How to Run

No build step. No npm install. Just open the file:

```bash
# Option 1: Open directly in browser
start index.html

# Option 2: Serve with any local server (required for Service Worker to activate)
npx serve .
# or
python -m http.server 8080
```

> **Note:** The Service Worker (`sw.js`) requires the page to be served over `http://` or `https://` — it will not activate when opened as a local `file://` URL. Use a local server for full PWA/offline functionality.

---

## 📻 Supported Radio Stations

### Default Grid
Namma Radio · AIR Bengaluru 100.1 FM · AIR 621 AM Bangalore · Red FM 92.5 · Kundapura 89.6 · Shivamogga 90.8 FM · Radio Mirchi 98.3 · Radio City 91.1 FM · Radio Mango

### Radio Category
AIR News 24x7 · Vividh Bharati · Air Rainbow · BBC World Service · Radio Indigo 91.9 FM · Bollywood Radio and Beyond · All India Radio AIR Chhatarpur · Youth One Radio · NDTV 24x7 Radio · Radio Olive Kids · Radio Retro Bollywood

### TuneIn Category
India's Travel Radio · 5-80s Melodies · Revive Your Mood · AIR India · WYNC · The Rhythm of The Valley · India Today · Aaj Tak News · The Story of Mahabharath · Chanakya Sutra · and more

---

## 👤 Author

Built for low-connectivity radio streaming in rural and remote areas of India.
