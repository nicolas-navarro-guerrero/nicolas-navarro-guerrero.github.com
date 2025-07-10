const icon = document.getElementById("darkmode-icon");
const savedTheme = localStorage.getItem("theme") || "light";

icon.classList.toggle("fa-moon", savedTheme === "light");
icon.classList.toggle("fa-sun", savedTheme === "dark");
document.documentElement.setAttribute("data-bs-theme", savedTheme);

document.getElementById("darkModeToggle").addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
    
        document.documentElement.setAttribute("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        
        icon.classList.toggle("fa-moon", newTheme === "light");
        icon.classList.toggle("fa-sun", newTheme === "dark");
});