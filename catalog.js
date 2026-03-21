(() => {
    const root = document.documentElement;
    const storageKey = "catalog-theme";

    const applyTheme = (theme) => {
        if (theme === "light" || theme === "dark") {
            root.dataset.theme = theme;
        } else {
            delete root.dataset.theme;
        }
    };

    try {
        applyTheme(localStorage.getItem(storageKey));
    } catch (_) {
        applyTheme(null);
    }

    const setupThemeSwitch = () => {
        const buttons = Array.from(document.querySelectorAll(".theme-switch-button"));
        const switchGroup = document.querySelector(".theme-switch");
        if (!buttons.length) return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const getStoredTheme = () => localStorage.getItem(storageKey);

        const syncTheme = (theme) => {
            applyTheme(theme);

            const selected = theme === "light" || theme === "dark" ? theme : "auto";
            if (switchGroup) {
                switchGroup.dataset.selected = selected;
            }

            buttons.forEach((button) => {
                button.setAttribute("aria-pressed", String(button.dataset.themeValue === selected));
            });
        };

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const nextTheme = button.dataset.themeValue;

                if (nextTheme === "auto") {
                    localStorage.removeItem(storageKey);
                    syncTheme(null);
                    return;
                }

                localStorage.setItem(storageKey, nextTheme);
                syncTheme(nextTheme);
            });
        });

        media.addEventListener("change", () => {
            if (!getStoredTheme()) {
                syncTheme(null);
            }
        });

        syncTheme(getStoredTheme());
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            setupThemeSwitch();
        });
    } else {
        setupThemeSwitch();
    }
})();
