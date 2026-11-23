const blocks = [
  [0, 70, 150], [78, 54, 110], [140, 92, 180], [240, 60, 128], [308, 84, 205], [400, 48, 96],
  [456, 96, 160], [560, 66, 222], [634, 58, 138], [700, 110, 176], [960, 72, 150], [1040, 56, 112], [1104, 96, 190],
];
const lit = [[152, 150], [176, 186], [322, 120], [346, 168], [574, 104], [598, 152], [716, 150], [764, 198], [1120, 136], [1160, 180]];
const tower = [0, 1, 2, 3, 4, 5, 6, 7].flatMap((r) => [0, 1, 2].map((c) => [846 + c * 26, 66 + r * 30, (r * 3 + c) % 4 !== 1]));

export function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 1200 300" aria-hidden="true">
      <defs>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#FFC14D" stopOpacity=".55" />
          <stop offset="1" stopColor="#FFC14D" stopOpacity="0" />
        </radialGradient>
      </defs>
      {blocks.map(([x, w, h]) => (
        <rect key={x} x={x} y={300 - h} width={w} height={h} fill={h > 170 ? "#1A1640" : "#15123A"} />
      ))}
      {lit.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="10" height="14" fill="#F4EFFF" opacity=".28" />
      ))}
      <g className="rise">
        <circle cx="880" cy="18" r="90" fill="url(#glow)" />
        <rect x="826" y="40" width="108" height="420" fill="#241E5A" />
        <rect x="826" y="40" width="108" height="5" fill="#FFC14D" />
        {tower.map(([x, y, on]) => (
          <rect key={`${x}-${y}`} x={x as number} y={y as number} width="14" height="18" fill={on ? "#FFC14D" : "#F4EFFF"} opacity={on ? 0.9 : 0.12} />
        ))}
        <rect x="878" y="14" width="4" height="26" fill="#F4EFFF" />
        <circle className="beacon" cx="880" cy="12" r="6" fill="#FFC14D" />
      </g>
    </svg>
  );
}
