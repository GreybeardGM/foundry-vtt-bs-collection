# Repository Instructions

Diese Vorgaben gelten für das gesamte Foundry-VTT-Modul in diesem Repository.

## Architektur: Funktionen strikt kapseln

- Jede Funktionalität liegt in einem eigenen ES-Modul unter `scripts/features/`.
- `scripts/main.js` ist nur der Einstiegspunkt: Es importiert Features und ruft deren Registrierungsfunktion auf. Fachlogik gehört nicht in den Einstiegspunkt.
- Ein Feature verwaltet seine Hooks, Konstanten, Zustände und Hilfsfunktionen selbst.
- Features importieren einander nicht direkt. Gemeinsam genutzter Code darf erst nach echtem Mehrfachbedarf nach `scripts/utils/` ausgelagert werden.
- Neue Features dürfen bestehende Features nicht stillschweigend verändern oder voraussetzen.
- Feature-Dateien erhalten sprechende, kleingeschriebene Dateinamen mit Bindestrichen.

## Änderungen schlank halten

- Vor neuen Helfern zuerst bestehende Feature-Module und `scripts/utils/` prüfen.
- Keine Helfer für einmalig genutzten Code anlegen, außer sie kapseln eine klare Fachregel oder Foundry-spezifisches Verhalten.
- Konstanten bleiben feature-lokal, solange sie nicht wirklich featureübergreifend benötigt werden.
- Keine stillen Fallbacks für unerwartete Zustände einführen. Notwendige Fallbacks eng begrenzen und nachvollziehbar machen.
- Kommentare erklären nur nicht offensichtliche Gründe oder Regressionrisiken. Code-Kommentare sind Englisch; sichtbare Texte dürfen Deutsch sein.
- Lesbaren, knappen Code bevorzugen und Duplikate vermeiden.

## Foundry-VTT-Kompatibilität

- Zielplattform und Mindestversion ist Foundry VTT 13.
- Foundry- und PIXI-APIs bevorzugen, bevor eigenes Verhalten nachgebaut wird.
- Für neue Oberflächen Application V2 und `foundry.applications.api.DialogV2` verwenden.
- Ereignisgetrieben mit Foundry-Hooks arbeiten; keine dauerhaft laufenden Timer, globalen Sweeps oder wiederholten Render-Schleifen ohne zwingenden Grund.
- Hook-Handler filtern früh und führen nur auf den betroffenen Clients Arbeit aus.
- Modul-ID `foundry-vtt-bs-collection` als Namespace für Settings, Flags und Ressourcen verwenden.

## Prüfung vor Abschluss

- Prüfen, dass jedes Feature ausschließlich über seinen eigenen ES-Modul-Einstieg registriert wird.
- Prüfen, dass alle Importpfade und Einträge in `module.json` stimmen.
- Geänderte JavaScript-Dateien mindestens auf Syntaxfehler prüfen.
- Foundry-Verhalten, das sich nicht automatisiert prüfen lässt, mit kurzen manuellen Prüfschritten dokumentieren.
