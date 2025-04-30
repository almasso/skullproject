function loadNews() {
    fetch("assets/data/blog.json").then(response => response.json()).then(data => {
        const container = document.getElementById("news-container");

        data.forEach(entry => {
            const div = document.createElement("div");
            div.className = "news-entry";

            div.innerHTML = `
            <img src="${entry.image}" alt="${entry.title}">
            <div class="news-content">
                <div class="meta">
                    <span class="tag">${entry.tag}</span>
                    <span class="date">${entry.date}</span>
                </div>
                <h2>${entry.title}</h2>
                <p>${entry.description}</p>
                <p class="full-text">${entry.content}</p>
            </div>
            `;

            div.addEventListener("click", () => {
                div.classList.toggle("expanded");
            });

            container.appendChild(div);
        });
    });

}