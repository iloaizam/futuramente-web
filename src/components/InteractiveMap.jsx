import React, { useMemo, useState } from "react";
import { geoCentroid, geoMercator, geoPath } from "d3-geo";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { territories } from "../data/territories.js";
import { asset } from "../utils/assets.js";

const GEO_URL = asset("maps/co.json");
const MAP_CENTER = [-74, 4.5];
const MAP_SCALE = 3300;
const MAP_WIDTH = 1400;
const MAP_HEIGHT = 1000;
const DEFAULT_VIEW = { center: MAP_CENTER, zoom: 1 };
const MIN_FOCUS_ZOOM = 2.15;
const MAX_FOCUS_ZOOM = 4.35;
const isDemo = true;
const DEMO_DEPTS = ['Caldas', 'Tolima', 'Atlántico', 'Valle del Cauca', 'Arauca', 'Cundinamarca', 'Amazonas'];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

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
    ''
  );
}

function byName(name) {
  const n = (name || '').trim().toLowerCase();
  return territories.find((t) => t.name.toLowerCase() === n);
}

function getViewForDepartment(geo) {
  if (!geo) return DEFAULT_VIEW;

  const projection = geoMercator()
    .center(MAP_CENTER)
    .scale(MAP_SCALE)
    .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
  const path = geoPath(projection);
  const bounds = path.bounds(geo);
  const featureWidth = Math.max(bounds[1][0] - bounds[0][0], 1);
  const featureHeight = Math.max(bounds[1][1] - bounds[0][1], 1);
  const zoom = clamp(
    Math.min((MAP_WIDTH * 0.55) / featureWidth, (MAP_HEIGHT * 0.55) / featureHeight),
    MIN_FOCUS_ZOOM,
    MAX_FOCUS_ZOOM
  );

  return {
    center: geoCentroid(geo),
    zoom,
  };
}

export default function InteractiveMap() {
  const navigate = useNavigate();

  const territoryByName = useMemo(() => {
    const m = new Map();
    territories.forEach((t) => m.set(t.name.toLowerCase(), t));
    return m;
  }, []);

  const [selected, setSelected] = useState(null);
  const [view, setView] = useState(DEFAULT_VIEW);
  const [hoverName, setHoverName] = useState('');

  const pick = (geo, deptName) => {
    const name = (deptName || "").trim();
    const t =
      territoryByName.get(name.toLowerCase()) ||
      byName(name) || {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        color: '#cfd8dc',
        visited: false,
        evidences: [],
      };

    setSelected(t);
    setView(getViewForDepartment(geo));
  };

  const reset = () => {
    setSelected(null);
    setView(DEFAULT_VIEW);
  };

  const previewSource = selected?.previewEvidences?.length ? selected.previewEvidences : selected?.evidences || [];
  const previewItems = previewSource.slice(0, 4);

  const goToDetail = () => {
    const targetSlug = selected?.slug || selected?.key;
    if (!targetSlug) return;
    navigate(`/departamentos/${targetSlug}`);
  };

  return (
    <section className="territory-showcase">
      <div className="territory-showcase-head">
        <span className="eyebrow">Evidencias en territorio</span>
        <h2>Explora experiencias por departamento</h2>
        <p>
          Selecciona un territorio en el mapa y descubre una vista previa visual
          del trabajo realizado.
        </p>
      </div>

      <div className="territory-layout">
        {/* MAPA */}
        <div className="territory-map-col">
          <div className="territory-map-toolbar">
            {selected ? (
              <button className="btn btn-ghost territory-reset" type="button" onClick={reset}>
                Volver al mapa completo
              </button>
            ) : null}
          </div>

          <div className="territory-map-stage">
            {hoverName ? <div className="territory-tooltip">{hoverName}</div> : null}

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ center: MAP_CENTER, scale: MAP_SCALE }}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup
                center={view.center}
                zoom={view.zoom}
                onMoveEnd={(p) => setView({ center: p.coordinates, zoom: p.zoom })}
                filterZoomEvent={(event) => event?.type === "wheel"}
                translateExtent={[
                  [-200, -200],
                  [1100, 950],
                ]}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const deptName = normalizeDeptNameFromGeo(geo);
                      const t = territoryByName.get(deptName.toLowerCase());

                      const demoAllowed = !isDemo || DEMO_DEPTS.includes(deptName);
                      const visited = demoAllowed && Boolean(t?.visited);
                      const fill = visited ? t.color : '#e8edf2';
                      const isSelected = selected?.name?.toLowerCase() === deptName.toLowerCase();

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => setHoverName(deptName)}
                          onMouseLeave={() => setHoverName("")}
                          onMouseDown={(event) => event.stopPropagation()}
                          onTouchStart={(event) => event.stopPropagation()}
                          onClick={() => pick(geo, deptName)}
                          style={{
                            default: {
                              fill,
                              stroke: '#ffffff',
                              strokeWidth: isSelected ? 2 : 1,
                              outline: 'none',
                              cursor: 'pointer',
                              filter: isSelected
                                ? 'drop-shadow(0px 16px 26px rgba(0,0,0,.18))'
                                : visited
                                  ? 'drop-shadow(0px 10px 18px rgba(0,0,0,.12))'
                                  : 'none',
                              transition: 'all .2s ease',
                            },
                            hover: {
                              fill: visited ? t.color : '#e1e7ec',
                              stroke: '#fff',
                              strokeWidth: 2,
                              outline: 'none',
                              cursor: 'pointer',
                            },

                            pressed: {
                              fill,
                              stroke: '#ffffff',
                              strokeWidth: 2,
                              outline: 'none',
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

        {/* PANEL DERECHO */}
        <aside className="territory-preview-col">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="empty"
                className="territory-preview-empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <span className="territory-preview-kicker">Vista previa</span>
                <h3>Vista previa del territorio</h3>
                <p>
                  Elige un territorio en el mapa para ver una galería visual rápida
                  del programa.
                </p>

                {/* <div className="territory-preview-chips">
                  <button
                    type="button"
                    className="chip dept"
                    onClick={() => pick(DEMO_DEPTS)}
                  >
                    Ver demo: {DEMO_DEPTS}
                  </button>
                </div> */}
              </motion.div>
            ) : (
              <motion.div
                key={selected.name}
                className="territory-preview-content"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
              >
                <div className="territory-preview-head">
                  <div>
                    <span className="territory-preview-kicker">Departamento</span>
                    <h3>{selected.name}</h3>
                  </div>

                  <span
                    className="territory-preview-dot"
                    style={{ background: selected.color || '#cfd8dc' }}
                  />
                </div>

                {previewItems.length ? (
                  <div className="territory-masonry">
                    {previewItems.map((ev, i) => (
                      <button
                        key={`${ev.src}-${i}`}
                        type="button"
                        className={`territory-tile tile-${i + 1}`}
                        onClick={goToDetail}
                      >
                        {ev.type === 'video' ? (
                          <video
                            src={asset(ev.src)}
                            poster={ev.poster ? asset(ev.poster) : undefined}
                            aria-label={ev.caption || `Video ${i + 1}`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                          />
                        ) : (
                          <img
                            src={asset(ev.src)}
                            alt={ev.caption || `Evidencia ${i + 1}`}
                            loading="lazy"
                          />
                        )}

                        <div className="territory-tile-overlay">
                          <span>{ev.type === 'video' ? 'Ver video' : 'Ver más'}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="territory-preview-empty-mini">
                    Aún no hay evidencias cargadas para este territorio.
                  </div>
                )}

                <button
                  type="button"
                  className="territory-more-btn"
                  onClick={goToDetail}
                >
                  Ver más evidencias
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </section>
  );
}
