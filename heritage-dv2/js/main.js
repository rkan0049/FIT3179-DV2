const charts = {
    "#radial_family_tree": "js/radial_family_tree.vg.json",
    "#map_nhl": "js/map_nhl.vg.json",
    "#map_state": "js/map_state.vg.json",
    "#line_growth": "js/line_growth.vg.json",
    "#chart_state_added": "js/chart_state_added.vg.json",
    "#butterfly_land_sea": "js/butterfly_land_sea.vg.json",
    "#heatmap_qld_sites": "js/heatmap_qld_sites.vg.json",
    "#waffle_protection": "js/waffle_protection.vg.json",
    "#marimekko_pressures": "js/marimekko_pressures.vg.json",
    "#radial_indigenous": "js/radial_indigenous.vg.json",
    "#funnel_management": "js/funnel_management.vg.json",
    "#sankey_grants": "js/sankey_grants.vg.json",
    "#timeline_ningaloo": "js/timeline_ningaloo.vg.json",
    "#pareto_wh_funding": "js/pareto_wh_funding.vg.json"
};

const views = {};

for (const [id, spec] of Object.entries(charts)) {
    vegaEmbed(id, spec, { actions: false })
        .then((result) => { views[id] = result.view; })
        .catch(console.error);
}

// Fade in charts and photos as they scroll into view
const revealItems = document.querySelectorAll(".chart-card, .callout, .photo-break, .number-panel");
const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    }
}, { threshold: 0.15 });

for (const item of revealItems) {
    item.classList.add("reveal");
    observer.observe(item);
}

// Scrollytelling for the Part 02 map: each text step tells the map which view to show
const steps = document.querySelectorAll(".scrolly-step");
const stepObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            steps.forEach((step) => step.classList.remove("active"));
            entry.target.classList.add("active");

            const mapView = views["#map_nhl"];
            if (mapView) {
                mapView.signal("step", Number(entry.target.dataset.step)).run();
            }
        }
    }
}, { rootMargin: "-50% 0px -50% 0px" });

steps.forEach((step) => stepObserver.observe(step));
