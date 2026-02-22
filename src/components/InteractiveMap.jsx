import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { territories } from "../data/territories.js";
import { asset } from "../utils/assets.js";

const GEO_URL = asset("maps/co.json");

function Lightbox({ open, items, index, setIndex, onClose }) {
  const item = items?.[index];
  if (!open || !item) return null;

  const prev = (e) => {
    e?.stopPropagation?.();
    setIndex((i) => (i - 1 + items.length) % items.length);
  };

  const next = (e) => {
    e?.stopPropagation?.();
    setIndex((i) => (i + 1) % items.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="lb2-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className="lb2-modal"
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="lb2-close" type="button" aria-label="Cerrar" onClick={onClose}>
            ×
          </button>

          {items.length > 1 ? (
            <>
              <button className="lb2-nav lb2-prev" type="button" aria-label="Anterior" onClick={prev}>
                ‹
              </button>
              <button className="lb2-nav lb2-next" type="button" aria-label="Siguiente" onClick={next}>
                ›
              </button>
            </>
          ) : null}

          <div className="lb2-media">
            <img src={asset(item.src)} alt={item.caption || "Evidencia"} />
          </div>

          {item.caption ? <div className="lb2-caption">{item.caption}</div> : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Ajustes de encuadre inicial (Colombia)
const DEFAULT_VIEW = { center: [-74, 4.5], zoom: 1 };

function normalizeDeptNameFromGeo(geo) {
  const p = geo?.properties || {};
  return (
    p.name ||
    p.NAME_1 ||
    p.NOMBRE_DPT ||
    p.NOM_DEP ||
    p.DEPARTAMEN ||
    p.departamento ||
    p.DEPTO ||
    ""
  );
}

// Helpers
function byName(name) {
  const n = (name || "").trim().toLowerCase();
  return territories.find((t) => t.name.toLowerCase() === n);
}


export default function InteractiveMap() {
  const territoryByName = useMemo(() => {
    const m = new Map();
    territories.forEach((t) => m.set(t.name.toLowerCase(), t));
    return m;
  }, []);

  // selección y vista del mapa
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState(DEFAULT_VIEW);
  const [hoverName, setHoverName] = useState("");
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  React.useEffect(() => {
  if (!lbOpen) return;

  const onKey = (e) => {
    if (e.key === "Escape") setLbOpen(false);
    if (e.key === "ArrowLeft") setLbIndex((i) => (i - 1 + (selected?.evidences?.length || 1)) % (selected?.evidences?.length || 1));
    if (e.key === "ArrowRight") setLbIndex((i) => (i + 1) % (selected?.evidences?.length || 1));
  };

  const prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";
  window.addEventListener("keydown", onKey);

  return () => {
    document.documentElement.style.overflow = prevOverflow;
    window.removeEventListener("keydown", onKey);
  };
}, [lbOpen, selected]);

  // DEMO: solo 1 departamento "full" (Caldas). Los demás quedan en gris.
  const isDemo = true;
  const demoDept = "Caldas";

  const pick = (deptName, geo) => {
    const name = (deptName || "").trim();
    const t =
      territoryByName.get(name.toLowerCase()) ||
      byName(name) || { name, color: "#cfd8dc", visited: false, evidences: [] };

    // zoom al depto (si el geo trae centroid, mejor; si no, acercamos igual)
    // Ojo: centroid en react-simple-maps no siempre viene, por eso dejamos fallback.
    setSelected(t);
    setView((v) => ({ ...v, zoom: 2.2 })); // zoom suave (ajustable)
  };

  const reset = () => {
    setSelected(null);
    setView(DEFAULT_VIEW);
  };

  return (
    <div className="tm2-wrap">
      {/* LEFT: Map */}
      <div className="tm2-mapCard">
        <div className="tm2-head">
          <div>
            <h2 className="section-title" style={{ marginBottom: 6 }}>
              Presencia en el territorio
            </h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Haz click en un departamento para ver evidencias.
            </p>
          </div>

          <div className="tm2-actions">
            {selected ? (
              <button className="btn btn-ghost" type="button" onClick={reset}>
                Volver al mapa
              </button>
            ) : null}
          </div>
        </div>

        <div className="tm2-mapArea">
          {hoverName ? <div className="tm2-tooltip">{hoverName}</div> : null}

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-74, 4.5], scale: 2500 }}
            width={900}
            height={520}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup
              center={view.center}
              zoom={view.zoom}
              onMoveEnd={(p) => setView({ center: p.coordinates, zoom: p.zoom })}
              translateExtent={[
                [-200, -200],
                [1100, 900],
              ]}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const deptName = normalizeDeptNameFromGeo(geo);
                    const t = territoryByName.get(deptName.toLowerCase());

                    const demoAllowed = !isDemo || deptName === demoDept;

                    const visited = demoAllowed && Boolean(t?.visited);
                    const fill = visited ? t.color : "#e9eef2";

                    const isSelected = selected?.name?.toLowerCase() === deptName.toLowerCase();

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHoverName(deptName)}
                        onMouseLeave={() => setHoverName("")}
                        onClick={() => pick(deptName, geo)}
                        style={{
                          default: {
                            fill,
                            stroke: "#fff",
                            strokeWidth: isSelected ? 2 : 1,
                            outline: "none",
                            cursor: "pointer",
                            filter: isSelected
                              ? "drop-shadow(0px 16px 24px rgba(0,0,0,.20))"
                              : visited
                                ? "drop-shadow(0px 10px 18px rgba(0,0,0,.14))"
                                : "none",
                          },
                          hover: {
                            fill: visited ? t.color : "#dfe8ee",
                            stroke: "#fff",
                            strokeWidth: 2,
                            outline: "none",
                            cursor: "pointer",
                            filter: "drop-shadow(0px 18px 26px rgba(0,0,0,.22))",
                          },
                          pressed: {
                            fill,
                            stroke: "#fff",
                            strokeWidth: 2,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>

      {/* RIGHT: Side Panel (no modal) */}
      <aside className="tm2-panel">
        <div className="tm2-panelHead">
          <div className="tm2-titleRow">
            <span className="tm2-dot" style={{ background: selected?.color || "#cfd8dc" }} />
            <div>
              <h3 style={{ margin: 0 }}>{selected?.name || "Selecciona un departamento"}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {selected ? "Evidencias del territorio" : "Haz click en el mapa para explorar"}
              </p>
            </div>
          </div>
        </div>

        <div className="tm2-panelBody">
          {!selected ? (
            <div className="card">
              <p className="muted" style={{ margin: 0 }}>
                Tip: selecciona un departamento (por ahora estamos en demo con <b>{demoDept}</b>).
              </p>
            </div>
          ) : selected?.evidences?.length ? (
          <div className="tm2-grid">
            {selected?.evidences?.map((ev, i) => (
              <button
                key={`${ev.src}-${i}`}
                className="tm2-ev tm2-evBtn"
                type="button"
                onClick={() => {
                console.log("CLICK EVIDENCIA");
                setLbIndex(i);
                setLbOpen(true);
              }}
              >
                <div className="tm2-thumb">
                  <img src={asset(ev.src)} alt={ev.caption || "Evidencia"} loading="lazy" />
                </div>
                <div className="tm2-cap">{ev.caption || "Evidencia"}</div>
              </button>
            ))}
          </div>
          ) : (
            <div className="card">
              <p className="muted" style={{ margin: 0 }}>
                Aún no hay evidencias cargadas para este territorio.
              </p>
            </div>
          )}
        </div>
      </aside>
      <Lightbox
        open={lbOpen}
        items={selected?.evidences || []}
        index={lbIndex}
        setIndex={setLbIndex}
        onClose={() => setLbOpen(false)}
      />
    </div>
  );
}