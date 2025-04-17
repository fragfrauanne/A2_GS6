const tasks = [
    { question: "Ich - wollen - anrufen - dich - .", answer: "Ich wollte dich anrufen." },
    { question: "bis 18 Uhr - arbeiten - Er - müssen - .", answer: "Er musste bis 18 Uhr arbeiten." },
    { question: "ihr - Können - noch Tickets - bekommen - ?", answer: "Konntet ihr noch Tickets bekommen?" },
    { question: "Wir - leider nicht - kommen - können - .", answer: "Wir konnten leider nicht kommen." },
    { question: "Dürfen - ihr - mit 12 Jahren - allein zu Hause bleiben - ?", answer: "Durftet ihr mit 12 Jahren allein zu Hause bleiben?" },
    { question: "eine Prüfung - machen - du - Müssen - ?", answer: "Musstest du eine Prüfung machen?" },
    { question: "sehr gut - können - Fußball spielen - Mein Bruder - .", answer: "Mein Bruder konnte sehr gut Fußball spielen." },
    { question: "ihr - in der Schule - besondere Kleidung - tragen - Müssen - ?", answer: "Musstet ihr in der Schule besondere Kleidung tragen?" },
    { question: "er - dürfen - studieren - Nach dem Abitur - an der Universität - .", answer: "Nach dem Abitur durfte er an der Universität studieren." },
    { question: "Er - mir - gestern - sollen - antworten - .", answer: "Er sollte mir gestern antworten." },
    { question: "mit meinen Geschwistern - spielen - sollen - Ich - .", answer: "Ich sollte mit meinen Geschwistern spielen." },
    { question: "gut verstehen - Ich - können - meinen Freund - .", answer: "Ich konnte meinen Freund gut verstehen." },
    { question: "Ich - fahren - dürfen - in den Ferien - zu meiner Oma.", answer: "Ich durfte in den Ferien zu meiner Oma fahren." },
    { question: "Er - Schauspieler werden - dürfen - nicht - .", answer: "Er durfte nicht Schauspieler werden." },
    { question: "Er - eine neue Wohnung - wollen - suchen - .", answer: "Er wollte eine neue Wohnung suchen." },
    { question: "100 Euro - bezahlen - ich - müssen - Für den Kurs - .", answer: "Für den Kurs musste ich 100 Euro bezahlen." },
    { question: "wollen - wir - ins Schwimmbad - Gestern - gehen - .", answer: "Gestern wollten wir ins Schwimmbad gehen." },
    { question: "früher - du - Wollen - Schneiderin - werden - ?", answer: "Wolltest du früher Schneiderin werden?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);