(() => {
    const root = document.documentElement;
    const storageKey = "catalog-theme";

    const readTheme = () => {
        try {
            return localStorage.getItem(storageKey);
        } catch (_) {
            return null;
        }
    };

    const applyTheme = (theme) => {
        if (theme === "light" || theme === "dark") {
            root.dataset.theme = theme;
        } else {
            delete root.dataset.theme;
        }
    };

    applyTheme(readTheme());

    const setupThemeSwitch = () => {
        const buttons = Array.from(document.querySelectorAll(".theme-switch-button"));
        const switchGroup = document.querySelector(".theme-switch");
        const currentLabel = document.querySelector(".theme-current-label");
        if (!switchGroup || !buttons.length) return;
        const labels = { light: "Light", auto: "Auto", dark: "Dark" };

        const syncTheme = (theme) => {
            applyTheme(theme);
            const selected = root.dataset.theme || "auto";
            switchGroup.dataset.selected = selected;
            if (currentLabel) currentLabel.textContent = labels[selected];
            buttons.forEach((button) => {
                button.setAttribute("aria-pressed", String(button.dataset.themeValue === selected));
            });
        };

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const theme = button.dataset.themeValue;
                syncTheme(theme);
                switchGroup.open = false;
                switchGroup.querySelector("summary").focus();
                try {
                    if (theme === "auto") localStorage.removeItem(storageKey);
                    else localStorage.setItem(storageKey, theme);
                } catch (_) {
                    // Theme switching remains available without storage.
                }
            });
        });

        window.addEventListener("storage", (event) => {
            if (event.key === storageKey || event.key === null) syncTheme(readTheme());
        });

        document.addEventListener("click", (event) => {
            if (!switchGroup.contains(event.target)) switchGroup.open = false;
        });

        switchGroup.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                switchGroup.open = false;
                switchGroup.querySelector("summary").focus();
            }
        });

        syncTheme(readTheme());
    };

    const setupNavigation = () => {
        const navigation = document.querySelector(".catalog-header");
        if (!navigation) return;
        const links = Array.from(navigation.querySelectorAll('nav a[href^="#"]'));
        const sections = links.map(link => document.querySelector(link.hash));
        let frame;

        const update = () => {
            frame = null;
            const height = navigation.offsetHeight;
            root.style.setProperty("--scroll-offset", height + "px");
            let active = -1;
            sections.forEach((section, index) => {
                if (section && section.getBoundingClientRect().top <= height + 8) active = index;
            });
            if (scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) active = sections.length - 1;
            links.forEach((link, index) => {
                if (index === active) link.setAttribute("aria-current", "location");
                else link.removeAttribute("aria-current");
            });
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        const observer = new ResizeObserver(schedule);
        [navigation, ...sections].filter(Boolean).forEach(element => observer.observe(element));
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("pageshow", schedule);
        update();
    };

    const setupTooltips = () => {
        const classes = ["note", "info", "warning", "danger", "success", "soft", "ghost", "rounded", "rounded-full", "small", "sm", "large", "lg", "muted"];
        const scope = document.querySelectorAll(":is(#components, #specs) .tooltip");
        scope.forEach((element) => {
            element.classList.remove("tooltip");
            delete element.dataset.tooltip;
        });
        document.querySelectorAll(":is(#components, #specs) :is(button, input, select, textarea, a, code, kbd)").forEach((element) => {
            const names = classes.filter(name => element.classList.contains(name));
            if (!names.length) return;
            element.classList.add("tooltip");
            element.dataset.tooltip = names.join(" ");
        });
    };

    const setupTonePicker = () => {
        const picker = document.querySelector("#content-tone");
        const panel = document.querySelector(".content-panel");
        if (!picker || !panel) return;
        const tones = ["note", "info", "warning", "danger", "success"];

        const syncTone = (tone) => {
            panel.classList.remove(...tones);
            if (tones.includes(tone)) panel.classList.add(tone);
        };

        picker.addEventListener("change", () => syncTone(picker.value));
        syncTone(picker.value);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            setupNavigation();
            setupThemeSwitch();
            setupTonePicker();
            setupTooltips();
        });
    } else {
        setupNavigation();
        setupThemeSwitch();
        setupTonePicker();
        setupTooltips();
    }
})();
