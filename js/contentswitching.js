async function loadPage(pageName) {
    const content = document.getElementById("content");

    content.classList.add("fade-out");

    await new Promise(resolve => setTimeout(resolve, 400));

    try {
        const response = await fetch(`pages/${pageName}.html`);
        const html = await response.text();
        content.innerHTML = html;
    } catch (e) {
        
    }

    content.classList.remove('fade-out');
}

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");

        const page = link.textContent.trim().toLowerCase();
        loadPage(page);
    });
});

window.addEventListener("DOMContentLoaded", () => {
    loadPage("inicio");
});