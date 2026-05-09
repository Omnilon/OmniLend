const divisionRoutes = {
  interiors: "/interiors",
  "asset-fortification": "/asset-fortification",
  finance: "/finance"
};

document.querySelectorAll("[data-division]").forEach((control) => {
  control.addEventListener("click", () => {
    const target = control.getAttribute("data-division");
    const route = target ? divisionRoutes[target] : null;

    if (route) {
      window.location.assign(route);
    }
  });
});
