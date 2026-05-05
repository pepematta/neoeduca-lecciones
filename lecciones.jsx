// Lecciones — Neo
// Pantalla de progreso de lecciones con metáfora de sendero serpenteante.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "typeface": "serif"
}/*EDITMODE-END*/;

// ─── Paletas ──────────────────────────────────────────────────
const PALETTES = {
  warm: {
    name: 'Cálida (Neo)',
    bg: '#FBF6EE',
    bgSoft: '#F4ECDD',
    ink: '#2B2118',
    inkSoft: '#6B5C4D',
    inkMuted: '#A89986',
    line: '#E8DCC6',
    pillar1: '#E89A6B', // Cuerpo & cuidados
    pillar1Soft: '#FBE3D2',
    pillar2: '#C2705A', // Vínculo & emociones
    pillar2Soft: '#F4D8CE',
    pillar3: '#7A8C6E', // Camino & comunidad
    pillar3Soft: '#DCE3D4',
    pathTrack: '#EADFC9',
    card: '#FFFCF6',
  },
  rosa: {
    name: 'Rosa amanecer',
    bg: '#FBF1EE',
    bgSoft: '#F5E3DD',
    ink: '#2B1F1B',
    inkSoft: '#6B5550',
    inkMuted: '#A89086',
    line: '#EBD6CE',
    pillar1: '#E08A8A',
    pillar1Soft: '#F8DADA',
    pillar2: '#C26A7E',
    pillar2Soft: '#F2D2D9',
    pillar3: '#8B8AA8',
    pillar3Soft: '#DEDDEA',
    pathTrack: '#EFDAD2',
    card: '#FFF7F4',
  },
  verde: {
    name: 'Salvia tibia',
    bg: '#F2F4EC',
    bgSoft: '#E5EAD9',
    ink: '#1F2A1F',
    inkSoft: '#4F5C4C',
    inkMuted: '#8A9682',
    line: '#D7DEC8',
    pillar1: '#B59A5E',
    pillar1Soft: '#EBDFC1',
    pillar2: '#7F9974',
    pillar2Soft: '#D2DDC9',
    pillar3: '#A86E5A',
    pillar3Soft: '#ECD3C7',
    pathTrack: '#DCE2CC',
    card: '#F8FAEF',
  },
};

const TYPEFACES = {
  serif: {
    name: 'Serif cálida (Source Serif)',
    head: '"Source Serif 4", "Source Serif Pro", Georgia, serif',
    body: '"Inter", -apple-system, system-ui, sans-serif',
  },
  sans: {
    name: 'Sans humanista (Nunito)',
    head: '"Nunito", -apple-system, system-ui, sans-serif',
    body: '"Nunito", -apple-system, system-ui, sans-serif',
  },
  fraunces: {
    name: 'Editorial (Fraunces + DM Sans)',
    head: '"Fraunces", Georgia, serif',
    body: '"DM Sans", -apple-system, system-ui, sans-serif',
  },
};

// ─── Datos del prototipo ──────────────────────────────────────
const BABY = { name: 'Lucas', daysInUCIN: 14 };

// 3 pilares × ~4 lecciones cada uno, en orden de camino.
const LESSONS = [
  // Pilar 1: Cuerpo & cuidados
  { id: 'l1', pillar: 1, title: 'Cómo se ve tu bebé hoy', minutes: 3, status: 'done' },
  { id: 'l2', pillar: 1, title: 'Entender los monitores', minutes: 5, status: 'done' },
  { id: 'l3', pillar: 1, title: 'Tocar y contener con calma', minutes: 4, status: 'current' },
  { id: 'l4', pillar: 1, title: 'Cambios de pañal en incubadora', minutes: 6, status: 'locked' },

  // Pilar 2: Vínculo & emociones
  { id: 'l5', pillar: 2, title: 'Tu voz también lo cuida', minutes: 3, status: 'locked' },
  { id: 'l6', pillar: 2, title: 'Método canguro, paso a paso', minutes: 7, status: 'locked' },
  { id: 'l7', pillar: 2, title: 'Cuando sientes que no puedes', minutes: 5, status: 'locked' },
  { id: 'l8', pillar: 2, title: 'Hablar con el equipo médico', minutes: 4, status: 'locked' },

  // Pilar 3: Camino & comunidad
  { id: 'l9',  pillar: 3, title: 'Pequeñas victorias diarias', minutes: 3, status: 'locked' },
  { id: 'l10', pillar: 3, title: 'Otros padres como tú', minutes: 6, status: 'locked' },
  { id: 'l11', pillar: 3, title: 'Preparando el alta', minutes: 5, status: 'locked' },
];

const PILLARS = [
  { n: 1, title: 'Cuerpo & cuidados', subtitle: 'Conoce a tu bebé y aprende a acompañar su cuerpo.' },
  { n: 2, title: 'Vínculo & emociones', subtitle: 'Construye el vínculo, paso a paso, contigo y con él.' },
  { n: 3, title: 'Camino & comunidad', subtitle: 'No estás solo: lo que viene y quién te acompaña.' },
];

// ─── Helpers visuales ─────────────────────────────────────────
function pillarColor(p, palette, soft = false) {
  const k = `pillar${p}` + (soft ? 'Soft' : '');
  return palette[k];
}

// Pequeña ilustración de corazón (celebración)
function HeartMark({ color = '#C2705A', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-8-5.5-8-11.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 3.5C20 15.5 12 21 12 21z"
        fill={color}/>
    </svg>
  );
}

function CheckMark({ color = '#fff', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PlayMark({ color = '#fff', size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M7 4.5v15l13-7.5z" fill={color}/>
    </svg>
  );
}

// ─── Header ────────────────────────────────────────────────────
function Header({ palette, typeface }) {
  const completed = LESSONS.filter(l => l.status === 'done').length;
  const total = LESSONS.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div style={{ padding: '14px 22px 10px' }}>
      <div style={{
        fontFamily: typeface.body, fontSize: 13, color: palette.inkMuted,
        letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 500,
      }}>
        Día {BABY.daysInUCIN} en UCIN
      </div>
      <div style={{
        fontFamily: typeface.head, fontSize: 28, color: palette.ink,
        fontWeight: 600, lineHeight: 1.15, marginTop: 6, letterSpacing: -0.3,
      }}>
        Sigamos juntos,<br/>
        <span style={{ fontStyle: 'italic', color: palette.pillar2 }}>mamá de {BABY.name}</span>
      </div>

      {/* Progreso global */}
      <div style={{ marginTop: 18 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: typeface.body, fontSize: 13, color: palette.inkSoft,
          marginBottom: 6,
        }}>
          <span>Tu camino</span>
          <span style={{ color: palette.ink, fontWeight: 600 }}>
            {completed} de {total} lecciones
          </span>
        </div>
        <div style={{
          height: 8, borderRadius: 999, background: palette.line,
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${palette.pillar1}, ${palette.pillar2})`,
            borderRadius: 999,
          }}/>
        </div>
      </div>
    </div>
  );
}

// ─── Sendero ───────────────────────────────────────────────────
// Lecciones en zigzag: alternan izquierda/derecha. Entre cada par
// dibujamos una curva SVG que conecta los nodos.
const NODE_SIZE = 76;
const ROW_HEIGHT = 132;
const PHONE_WIDTH = 402;
const PADDING_X = 22;
const PATH_AMPLITUDE = 92; // desplazamiento horizontal desde centro
const CENTER_X = PHONE_WIDTH / 2;

function nodePosition(idx) {
  // zig-zag: 0 izq, 1 der, 2 izq, etc
  const side = idx % 2 === 0 ? -1 : 1;
  const x = CENTER_X + side * PATH_AMPLITUDE;
  const y = 40 + idx * ROW_HEIGHT;
  return { x, y };
}

function PillarMarker({ pillar, palette, typeface, y }) {
  return (
    <div style={{
      position: 'absolute', top: y - 36, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{
        background: palette.bg,
        padding: '6px 14px',
        borderRadius: 999,
        border: `1px solid ${pillarColor(pillar.n, palette)}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: 999,
          background: pillarColor(pillar.n, palette),
        }}/>
        <span style={{
          fontFamily: typeface.body, fontSize: 11,
          color: pillarColor(pillar.n, palette),
          fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase',
        }}>
          Pilar {pillar.n} · {pillar.title}
        </span>
      </div>
    </div>
  );
}

function LessonNode({ lesson, idx, palette, typeface, onTap }) {
  const { x, y } = nodePosition(idx);
  const isDone = lesson.status === 'done';
  const isCurrent = lesson.status === 'current';
  const isLocked = lesson.status === 'locked';
  const color = pillarColor(lesson.pillar, palette);
  const colorSoft = pillarColor(lesson.pillar, palette, true);

  // Estilo del círculo según estado
  let bg, border, content;
  if (isDone) {
    bg = color;
    border = color;
    content = <HeartMark color="#FFF8EE" size={26} />;
  } else if (isCurrent) {
    bg = palette.card;
    border = color;
    content = (
      <div style={{
        width: 42, height: 42, borderRadius: 999,
        background: color, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
      }}>
        <PlayMark color="#fff" size={16}/>
      </div>
    );
  } else {
    bg = colorSoft;
    border = 'transparent';
    content = (
      <div style={{
        fontFamily: typeface.head, fontSize: 22,
        color: color, opacity: 0.55, fontWeight: 600,
      }}>
        {idx + 1}
      </div>
    );
  }

  // Etiqueta de texto al lado del nodo
  const labelOnRight = idx % 2 === 0; // si nodo está a la izquierda, label a la derecha
  const labelX = labelOnRight ? x + NODE_SIZE/2 + 16 : x - NODE_SIZE/2 - 16 - 150;
  const labelAlign = labelOnRight ? 'left' : 'right';

  return (
    <>
      {/* Pulso si es current */}
      {isCurrent && (
        <div style={{
          position: 'absolute', left: x - 56, top: y - 56,
          width: 112, height: 112, borderRadius: 999,
          border: `2px solid ${color}`,
          opacity: 0.35,
          animation: 'neoPulse 2.4s ease-out infinite',
          pointerEvents: 'none',
        }}/>
      )}
      {/* Nodo */}
      <button
        onClick={() => !isLocked && onTap(lesson)}
        style={{
          position: 'absolute', left: x - NODE_SIZE/2, top: y - NODE_SIZE/2,
          width: NODE_SIZE, height: NODE_SIZE, borderRadius: 999,
          background: bg, border: `2px solid ${border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: isLocked ? 'default' : 'pointer',
          boxShadow: isCurrent
            ? `0 6px 20px ${color}55, 0 2px 4px rgba(0,0,0,0.06)`
            : isDone
              ? `0 4px 12px ${color}44`
              : 'none',
          transition: 'transform 0.15s ease',
          padding: 0,
          fontFamily: 'inherit',
        }}
        onMouseDown={e => !isLocked && (e.currentTarget.style.transform = 'scale(0.95)')}
        onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {content}
      </button>

      {/* Etiqueta */}
      <div style={{
        position: 'absolute', left: labelX, top: y - 26,
        width: 150, textAlign: labelAlign,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: typeface.head, fontSize: 15,
          color: isLocked ? palette.inkMuted : palette.ink,
          fontWeight: 600, lineHeight: 1.25, letterSpacing: -0.1,
        }}>
          {lesson.title}
        </div>
        <div style={{
          fontFamily: typeface.body, fontSize: 12,
          color: palette.inkMuted, marginTop: 4,
          display: 'flex', gap: 6,
          justifyContent: labelAlign === 'right' ? 'flex-end' : 'flex-start',
          alignItems: 'center',
        }}>
          {isLocked ? (
            <span style={{
              background: palette.bgSoft,
              color: pillarColor(lesson.pillar, palette),
              padding: '2px 8px', borderRadius: 999,
              fontWeight: 600, letterSpacing: 0.3, fontSize: 10,
              textTransform: 'uppercase',
            }}>
              Pronto
            </span>
          ) : isCurrent ? (
            <span style={{
              color: pillarColor(lesson.pillar, palette),
              fontWeight: 600,
            }}>
              Continúa aquí · {lesson.minutes} min
            </span>
          ) : isDone ? (
            <span>Completada · {lesson.minutes} min</span>
          ) : (
            <span>{lesson.minutes} min</span>
          )}
        </div>
      </div>
    </>
  );
}

// Curvas entre nodos
function PathCurves({ palette }) {
  const segments = [];
  for (let i = 0; i < LESSONS.length - 1; i++) {
    const a = nodePosition(i);
    const b = nodePosition(i + 1);
    const sameSide = (i % 2) === ((i + 1) % 2); // never true, but keep
    // curva en S
    const midY = (a.y + b.y) / 2;
    const d = `M ${a.x} ${a.y + NODE_SIZE/2 - 4}
               C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y - NODE_SIZE/2 + 4}`;
    const lessonAfter = LESSONS[i + 1];
    const isCompleted = LESSONS[i].status === 'done' && (lessonAfter.status === 'done' || lessonAfter.status === 'current');
    segments.push(
      <path key={i} d={d}
        fill="none"
        stroke={isCompleted ? palette.pillar1 : palette.pathTrack}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={isCompleted ? 'none' : '2 10'}
        opacity={isCompleted ? 0.5 : 1}
      />
    );
  }
  const totalHeight = 40 + LESSONS.length * ROW_HEIGHT;
  return (
    <svg width={PHONE_WIDTH} height={totalHeight}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      {segments}
    </svg>
  );
}

function PathView({ palette, typeface, onTapLesson }) {
  // Para cada pilar, encontrar primer índice y mostrar marker arriba.
  const firstIdxByPillar = {};
  LESSONS.forEach((l, i) => {
    if (firstIdxByPillar[l.pillar] === undefined) firstIdxByPillar[l.pillar] = i;
  });

  const totalHeight = 40 + LESSONS.length * ROW_HEIGHT + 80;

  return (
    <div style={{
      position: 'relative', width: PHONE_WIDTH, height: totalHeight,
      margin: '0 auto',
    }}>
      <PathCurves palette={palette} />

      {PILLARS.map(p => {
        const idx = firstIdxByPillar[p.n];
        if (idx === undefined) return null;
        const { y } = nodePosition(idx);
        return <PillarMarker key={p.n} pillar={p} palette={palette} typeface={typeface} y={y - NODE_SIZE/2 - 8} />;
      })}

      {LESSONS.map((l, i) =>
        <LessonNode key={l.id} lesson={l} idx={i}
          palette={palette} typeface={typeface} onTap={onTapLesson} />
      )}

      {/* Final del camino */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: 40 + LESSONS.length * ROW_HEIGHT - 40,
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{
          display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          padding: '14px 20px',
        }}>
          <div style={{
            fontFamily: typeface.head, fontSize: 14, color: palette.inkMuted,
            fontStyle: 'italic',
          }}>
            Más lecciones aparecerán<br/>según el día de {BABY.name}.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Ilustración: manos conteniendo bebé ───────────────────────
function ContainIllustration({ color, colorSoft }) {
  return (
    <svg viewBox="0 0 280 180" width="100%" style={{ display: 'block' }}>
      {/* Incubadora — cuerpo */}
      <rect x="40" y="80" width="200" height="80" rx="18" fill={colorSoft} stroke={color} strokeWidth="1.5" strokeOpacity="0.4"/>
      {/* Ventanillas */}
      <rect x="58" y="98" width="36" height="44" rx="8" fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.35"/>
      <rect x="186" y="98" width="36" height="44" rx="8" fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.35"/>
      {/* Bebé — cuerpo */}
      <ellipse cx="140" cy="123" rx="28" ry="20" fill={color} opacity="0.18"/>
      <ellipse cx="140" cy="123" rx="20" ry="14" fill={color} opacity="0.28"/>
      {/* Bebé — cabeza */}
      <circle cx="140" cy="103" r="13" fill={color} opacity="0.32"/>
      {/* Mano izquierda — palma sobre cabeza */}
      <ellipse cx="140" cy="89" rx="22" ry="9" rx2="22" fill={color} opacity="0.55"/>
      <rect x="118" y="80" width="44" height="10" rx="5" fill={color} opacity="0.55"/>
      {/* Dedos mano izquierda */}
      {[122, 130, 138, 146, 154].map((x, i) => (
        <rect key={i} x={x} y={68} width="7" height={10 + i % 3 * 2} rx="3.5" fill={color} opacity="0.45"/>
      ))}
      {/* Mano derecha — palma sobre pies */}
      <rect x="118" y="135" width="44" height="10" rx="5" fill={color} opacity="0.55"/>
      {/* Dedos mano derecha */}
      {[122, 130, 138, 146, 154].map((x, i) => (
        <rect key={i} x={x} y={145} width="7" height={8 + i % 3 * 2} rx="3.5" fill={color} opacity="0.45"/>
      ))}
      {/* Monitor líneas */}
      <rect x="56" y="62" width="60" height="14" rx="4" fill={colorSoft} stroke={color} strokeWidth="1" strokeOpacity="0.3"/>
      <polyline points="60,69 66,69 70,63 74,75 78,66 82,69 110,69" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Contenido completo: Tocar y contener con calma ────────────
function LessonContentTocar({ palette, typeface, onClose, onComplete }) {
  const color = palette.pillar1;
  const colorSoft = palette.pillar1Soft;
  const [scrollPct, setScrollPct] = React.useState(0);

  const handleScroll = e => {
    const el = e.currentTarget;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setScrollPct(Math.min(1, pct));
  };

  const STEPS = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6.5 2h11a1 1 0 011 1v2a4 4 0 01-4 4h-5a4 4 0 01-4-4V3a1 1 0 011-1z" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M12 9v4M8 17h8" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M5 13c0 3.866 3.134 7 7 7s7-3.134 7-7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Lava y calienta tus manos',
      text: 'Frota las palmas entre sí por 30 segundos. Las manos frías pueden asustar a tu bebé — el calor es parte del mensaje.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="8" width="18" height="12" rx="3" stroke={color} strokeWidth="1.8"/>
          <path d="M7 8V6a5 5 0 0110 0v2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="14" r="2" fill={color} opacity="0.5"/>
        </svg>
      ),
      title: 'Pide abrir las ventanitas',
      text: 'Avisa a la enfermera o neonatólogo. Ellos abrirán los portillos laterales de la incubadora para que puedas poner tus manos.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C8 3 5 6 5 10c0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z" stroke={color} strokeWidth="1.8" fill={colorSoft}/>
          <circle cx="12" cy="10" r="2.5" stroke={color} strokeWidth="1.5"/>
        </svg>
      ),
      title: 'Una mano en la cabeza, otra en los pies',
      text: 'Coloca suavemente una palma sobre la cabecita de {nombre} y la otra cubriendo sus pies y glúteos. Sin presionar — solo apoyar.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Quédate quieta. Respira.',
      text: 'No acaricies ni muevas las manos. Inhala profundo — tu bebé siente tu ritmo. Mantén la posición 5 a 10 minutos.',
    },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: palette.bg, zIndex: 30,
      display: 'flex', flexDirection: 'column',
      animation: 'neoSlideUp 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
    }}>
      {/* Barra superior fija */}
      <div style={{
        position: 'relative', zIndex: 10,
        background: palette.bg,
        borderBottom: `1px solid ${palette.line}`,
        flexShrink: 0,
      }}>
        {/* Barra de progreso de lectura */}
        <div style={{
          position: 'absolute', bottom: -1, left: 0,
          height: 2, borderRadius: 999,
          background: color,
          width: `${scrollPct * 100}%`,
          transition: 'width 0.1s linear',
        }}/>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '52px 16px 14px',
        }}>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 999,
            background: palette.bgSoft, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0, flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M15 5l-7 7 7 7" stroke={palette.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ textAlign: 'center', flex: 1, padding: '0 12px' }}>
            <div style={{
              fontFamily: typeface.body, fontSize: 13, fontWeight: 600,
              color: palette.ink, letterSpacing: -0.1,
            }}>Tocar y contener con calma</div>
            <div style={{
              fontFamily: typeface.body, fontSize: 11,
              color: palette.inkMuted, marginTop: 2,
            }}>Lección 3 · 4 min</div>
          </div>
          <div style={{ width: 36 }}/>
        </div>
      </div>

      {/* Scroll body */}
      <div onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Hero ilustración */}
        <div style={{
          background: colorSoft,
          padding: '28px 24px 20px',
          borderBottom: `1px solid ${color}22`,
        }}>
          <div style={{
            fontFamily: typeface.body, fontSize: 11, color: color,
            fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase',
            marginBottom: 12,
          }}>Pilar 1 · Cuerpo & cuidados</div>
          <ContainIllustration color={color} colorSoft={palette.card}/>
          <div style={{
            marginTop: 16,
            fontFamily: typeface.body, fontSize: 12,
            color: palette.inkMuted, textAlign: 'center', fontStyle: 'italic',
          }}>
            El toque contenedor: dos manos, un abrazo sin movimiento.
          </div>
        </div>

        <div style={{ padding: '26px 22px 0' }}>

          {/* Intro */}
          <p style={{
            fontFamily: typeface.head, fontSize: 20, color: palette.ink,
            lineHeight: 1.42, fontWeight: 600, margin: 0,
            letterSpacing: -0.2,
          }}>
            Tocar a <em style={{ color: color, fontStyle: 'italic' }}>{BABY.name}</em> de la manera correcta puede ser su mejor regulador en este momento.
          </p>
          <p style={{
            fontFamily: typeface.body, fontSize: 15, color: palette.inkSoft,
            lineHeight: 1.65, marginTop: 14, marginBottom: 0,
          }}>
            No se trata de acariciar. En la UCIN, el movimiento puede ser demasiado estímulo para un bebé prematuro. Lo que necesita es <strong style={{ color: palette.ink }}>contención</strong>: presión firme, calida y quieta, como el abrazo del útero.
          </p>

          {/* Callout: ¿Qué es? */}
          <div style={{
            marginTop: 24,
            background: palette.card,
            border: `1.5px solid ${color}44`,
            borderLeft: `4px solid ${color}`,
            borderRadius: 14, padding: '16px 18px',
          }}>
            <div style={{
              fontFamily: typeface.body, fontSize: 11, fontWeight: 700,
              color: color, letterSpacing: 0.7, textTransform: 'uppercase',
              marginBottom: 8,
            }}>¿Qué es el toque contenedor?</div>
            <p style={{
              fontFamily: typeface.body, fontSize: 14, color: palette.ink,
              lineHeight: 1.6, margin: 0,
            }}>
              Una técnica de cuidado canguro básica donde apoyás ambas palmas —una en la cabeza, otra en los pies— sin moverte. Reproduce la sensación de estar envuelto y protegido.
            </p>
          </div>

          {/* Sección pasos */}
          <div style={{
            marginTop: 30,
            fontFamily: typeface.head, fontSize: 17, fontWeight: 600,
            color: palette.ink, letterSpacing: -0.2, marginBottom: 16,
          }}>Cómo hacerlo, paso a paso</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{
                background: palette.card,
                border: `1px solid ${palette.line}`,
                borderRadius: 18, padding: '16px 18px',
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: colorSoft,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: typeface.body, fontSize: 14, fontWeight: 700,
                    color: palette.ink, marginBottom: 5, display: 'flex',
                    alignItems: 'center', gap: 8,
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 999,
                      background: color, color: '#fff',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, flexShrink: 0,
                    }}>{i + 1}</span>
                    {step.title}
                  </div>
                  <div style={{
                    fontFamily: typeface.body, fontSize: 13,
                    color: palette.inkSoft, lineHeight: 1.6,
                  }}>
                    {step.text.replace('{nombre}', BABY.name)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ¿Por qué funciona? */}
          <div style={{
            marginTop: 30,
            background: `linear-gradient(135deg, ${colorSoft}, ${palette.bgSoft})`,
            borderRadius: 18, padding: '20px 20px',
            border: `1px solid ${color}33`,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a7 7 0 017 7c0 2.5-1.3 4.7-3.3 6L15 17H9l-.7-2C6.3 13.7 5 11.5 5 9a7 7 0 017-7z" stroke={color} strokeWidth="1.8" fill={colorSoft}/>
                <path d="M9 21h6M10 17v4M14 17v4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <div style={{
                fontFamily: typeface.body, fontSize: 12, fontWeight: 700,
                color: color, letterSpacing: 0.5, textTransform: 'uppercase',
              }}>¿Por qué funciona?</div>
            </div>
            <p style={{
              fontFamily: typeface.body, fontSize: 14, color: palette.ink,
              lineHeight: 1.65, margin: 0,
            }}>
              El tacto firme activa el sistema nervioso parasimpático del bebé, reduciendo el cortisol (hormona del estrés). Estudios en neonatología muestran que bebés que reciben toque contenedor regularmente <strong>aumentan de peso más rápido</strong> y tienen ciclos de sueño más estables.
            </p>
          </div>

          {/* Tips */}
          <div style={{ marginTop: 28 }}>
            <div style={{
              fontFamily: typeface.head, fontSize: 17, fontWeight: 600,
              color: palette.ink, letterSpacing: -0.2, marginBottom: 14,
            }}>Para tener en cuenta</div>
            {[
              { emoji: '🤲', text: 'Podés turnarte con tu pareja — ambos pueden practicarlo.' },
              { emoji: '🔕', text: 'Apagá o silenciá el celular antes de comenzar.' },
              { emoji: '⏱', text: 'Con 5 a 10 minutos es suficiente. No es necesario más tiempo.' },
              { emoji: '💬', text: 'Podés hablarle en voz muy baja mientras lo hacés.' },
            ].map((tip, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '10px 0',
                borderBottom: i < 3 ? `1px solid ${palette.line}` : 'none',
              }}>
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{tip.emoji}</span>
                <div style={{
                  fontFamily: typeface.body, fontSize: 14,
                  color: palette.inkSoft, lineHeight: 1.55,
                }}>{tip.text}</div>
              </div>
            ))}
          </div>

          {/* Dato curioso */}
          <div style={{
            marginTop: 28,
            background: palette.card,
            border: `1px solid ${palette.line}`,
            borderRadius: 18, padding: '18px 20px',
            display: 'flex', gap: 14,
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>🌿</div>
            <div>
              <div style={{
                fontFamily: typeface.body, fontSize: 11, fontWeight: 700,
                color: palette.inkMuted, letterSpacing: 0.6,
                textTransform: 'uppercase', marginBottom: 6,
              }}>Sabías que</div>
              <p style={{
                fontFamily: typeface.body, fontSize: 14, color: palette.ink,
                lineHeight: 1.6, margin: 0,
              }}>
                El olfato es uno de los sentidos más desarrollados en los prematuros. {BABY.name} ya reconoce tu olor. Tu presencia, aunque no puedas verlo, lo calma.
              </p>
            </div>
          </div>

          {/* Espacio para CTA */}
          <div style={{ height: 100 }}/>
        </div>
      </div>

      {/* CTA fijo al fondo */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 22px 36px',
        background: `linear-gradient(180deg, ${palette.bg}00 0%, ${palette.bg} 36%)`,
        flexShrink: 0,
      }}>
        <button onClick={onComplete} style={{
          width: '100%', height: 54, borderRadius: 999,
          background: color, color: '#fff', border: 'none',
          fontFamily: typeface.body, fontSize: 16, fontWeight: 600,
          letterSpacing: 0.2, cursor: 'pointer',
          boxShadow: `0 4px 18px ${color}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Marcar como completada
        </button>
      </div>
    </div>
  );
}

// ─── Detail view (preview antes de iniciar) ─────────────────────
function LessonDetail({ lesson, palette, typeface, onClose, onStart }) {
  const color = pillarColor(lesson.pillar, palette);
  const colorSoft = pillarColor(lesson.pillar, palette, true);
  const pillar = PILLARS.find(p => p.n === lesson.pillar);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: palette.bg, zIndex: 30,
      display: 'flex', flexDirection: 'column',
      animation: 'neoSlideUp 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
    }}>
      {/* Hero */}
      <div style={{
        background: colorSoft, padding: '54px 22px 28px',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 60, left: 16,
          width: 36, height: 36, borderRadius: 999,
          background: palette.card, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path d="M15 5l-7 7 7 7" stroke={palette.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{
          fontFamily: typeface.body, fontSize: 11, color: color,
          fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase',
          marginTop: 18,
        }}>
          Pilar {pillar.n} · {pillar.title}
        </div>
        <div style={{
          fontFamily: typeface.head, fontSize: 28, color: palette.ink,
          fontWeight: 600, lineHeight: 1.18, marginTop: 8,
          letterSpacing: -0.4,
        }}>
          {lesson.title}
        </div>
        <div style={{
          fontFamily: typeface.body, fontSize: 13, color: palette.inkSoft,
          marginTop: 12, display: 'flex', gap: 14, alignItems: 'center',
        }}>
          <span>⏱ {lesson.minutes} min</span>
          <span>·</span>
          <span>Lectura corta</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '22px 22px 100px' }}>
        <p style={{
          fontFamily: typeface.head, fontSize: 18, color: palette.ink,
          lineHeight: 1.45, fontWeight: 500, margin: 0,
          letterSpacing: -0.1,
        }}>
          Tocar a {BABY.name} de la manera correcta puede ser su mejor regulador. No se trata de acariciar, sino de <em style={{ color: color }}>contener</em>.
        </p>
        <div style={{ height: 18 }}/>
        <p style={{
          fontFamily: typeface.body, fontSize: 15, color: palette.inkSoft,
          lineHeight: 1.65, margin: 0,
        }}>
          En esta lección aprenderás la técnica del "toque contenedor": apoyar tus manos sobre la cabeza y los pies de tu bebé, sin movimiento, dejando que sienta tu calor y tu calma.
        </p>
        <div style={{
          marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap',
        }}>
          {['4 pasos prácticos', 'Por qué funciona', 'Tips para ambos papás', 'Dato curioso'].map((tag, i) => (
            <div key={i} style={{
              background: colorSoft, color: color,
              padding: '6px 14px', borderRadius: 999,
              fontFamily: typeface.body, fontSize: 12, fontWeight: 600,
            }}>{tag}</div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 22px 38px',
        background: `linear-gradient(180deg, ${palette.bg}00 0%, ${palette.bg} 30%)`,
      }}>
        <button onClick={onStart} style={{
          width: '100%', height: 54, borderRadius: 999,
          background: color, color: '#fff', border: 'none',
          fontFamily: typeface.body, fontSize: 16, fontWeight: 600,
          letterSpacing: 0.2, cursor: 'pointer',
          boxShadow: `0 4px 14px ${color}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <PlayMark color="#fff" size={14}/>
          Empezar lección
        </button>
      </div>
    </div>
  );
}

// ─── Tabs (mock) ────────────────────────────────────────────────
function TabBar({ palette, typeface }) {
  const tabs = [
    { id: 'home', label: 'Hoy', icon: 'home' },
    { id: 'lecc', label: 'Lecciones', icon: 'book', active: true },
    { id: 'diary', label: 'Diario', icon: 'note' },
    { id: 'me', label: 'Yo', icon: 'user' },
  ];
  const Icon = ({ k, color }) => {
    const stroke = { stroke: color, strokeWidth: 1.8, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (k === 'home') return <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 9.5V20h14V9.5" {...stroke}/></svg>;
    if (k === 'book') return <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 5a2 2 0 012-2h12v18H6a2 2 0 01-2-2V5zM8 7h8M8 11h6" {...stroke}/></svg>;
    if (k === 'note') return <svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 4h11l4 4v12H5V4zM15 4v5h5M8 13h8M8 17h6" {...stroke}/></svg>;
    return <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" {...stroke}/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" {...stroke}/></svg>;
  };
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingTop: 10, paddingBottom: 28,
      background: palette.bg,
      borderTop: `1px solid ${palette.line}`,
      display: 'flex', justifyContent: 'space-around',
      zIndex: 20,
    }}>
      {tabs.map(t => (
        <div key={t.id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 4, padding: '4px 14px', cursor: 'pointer',
        }}>
          <Icon k={t.icon} color={t.active ? palette.pillar2 : palette.inkMuted}/>
          <div style={{
            fontFamily: typeface.body, fontSize: 10,
            color: t.active ? palette.pillar2 : palette.inkMuted,
            fontWeight: t.active ? 700 : 500,
            letterSpacing: 0.2,
          }}>
            {t.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Pantalla completa ─────────────────────────────────────────
function LeccionesScreen({ palette, typeface }) {
  const [openLesson, setOpenLesson] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);

  const handleClose = () => { setOpenLesson(null); setShowContent(false); };
  const handleComplete = () => { setOpenLesson(null); setShowContent(false); };

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: palette.bg, overflow: 'hidden',
    }}>
      {/* Status bar background */}
      <div style={{ height: 58, background: palette.bg }}/>

      {/* Top chrome */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 22px 4px',
      }}>
        <div style={{
          fontFamily: typeface.head, fontSize: 18, fontWeight: 600,
          color: palette.ink, letterSpacing: -0.2,
        }}>
          Lecciones
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: palette.bgSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="4" viewBox="0 0 22 6">
            <circle cx="3" cy="3" r="2" fill={palette.inkSoft}/>
            <circle cx="11" cy="3" r="2" fill={palette.inkSoft}/>
            <circle cx="19" cy="3" r="2" fill={palette.inkSoft}/>
          </svg>
        </div>
      </div>

      {/* Scroll body */}
      <div style={{
        position: 'absolute', top: 58, left: 0, right: 0, bottom: 0,
        overflow: 'auto', paddingBottom: 90,
      }}>
        <Header palette={palette} typeface={typeface}/>
        <div style={{ height: 6 }}/>
        <PathView palette={palette} typeface={typeface} onTapLesson={setOpenLesson}/>
      </div>

      <TabBar palette={palette} typeface={typeface}/>

      {/* Preview de lección */}
      {openLesson && !showContent && (
        <LessonDetail
          lesson={openLesson} palette={palette} typeface={typeface}
          onClose={handleClose}
          onStart={openLesson.id === 'l3'
            ? () => setShowContent(true)
            : undefined
          }
        />
      )}

      {/* Contenido completo: solo para l3 por ahora */}
      {openLesson && showContent && openLesson.id === 'l3' && (
        <LessonContentTocar
          palette={palette} typeface={typeface}
          onClose={() => setShowContent(false)}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}

// ─── App con Tweaks ─────────────────────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[tweaks.palette] || PALETTES.warm;
  const typeface = TYPEFACES[tweaks.typeface] || TYPEFACES.serif;

  return (
    <>
      <style>{`
        .neo-mobile { display: block; }
        .neo-desktop { display: none; }
        @media (min-width: 768px) {
          .neo-mobile { display: none; }
          .neo-desktop { display: flex; }
        }
      `}</style>

      {/* Mobile: fullscreen directo */}
      <div className="neo-mobile" style={{
        width: '100%', height: '100dvh',
        background: palette.bg,
        fontFamily: typeface.body,
        overflow: 'hidden',
        position: 'fixed', inset: 0,
      }}>
        <LeccionesScreen palette={palette} typeface={typeface}/>
      </div>

      {/* Desktop: iPhone frame */}
      <div className="neo-desktop" style={{
        minHeight: '100vh',
        alignItems: 'center', justifyContent: 'center',
        background: '#EFE7DA',
        padding: '40px 20px',
        fontFamily: typeface.body,
      }}>
        <IOSDevice width={PHONE_WIDTH} height={874} dark={false}>
          <LeccionesScreen palette={palette} typeface={typeface}/>
        </IOSDevice>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Paleta">
          <TweakRadio
            value={tweaks.palette}
            onChange={v => setTweak('palette', v)}
            options={[
              { value: 'warm', label: 'Cálida' },
              { value: 'rosa', label: 'Rosa' },
              { value: 'verde', label: 'Salvia' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Tipografía">
          <TweakRadio
            value={tweaks.typeface}
            onChange={v => setTweak('typeface', v)}
            options={[
              { value: 'serif', label: 'Source Serif' },
              { value: 'sans', label: 'Nunito' },
              { value: 'fraunces', label: 'Fraunces' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
