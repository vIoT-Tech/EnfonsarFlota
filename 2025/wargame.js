// Hier kannst du später Logik hinzufügen, um auf den Switch zu reagieren
const switches = document.querySelectorAll('input[name="mode"]');

switches.forEach(switchElement => {
    switchElement.addEventListener('change', (event) => {
        console.log(`Modus geändert zu: ${event.target.value}`);
        // Hier kannst du weitere Aktionen basierend auf dem gewählten Modus hinzufügen
    });
});
