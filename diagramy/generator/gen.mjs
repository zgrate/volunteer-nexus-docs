import ELK from 'elkjs';
import fs from 'node:fs';
const [src, out] = process.argv.slice(2);
const models = {}, rels = [];
for (const line of fs.readFileSync(src, 'utf8').split('\n')) {
  const p = line.split('|');
  if (p[0] === 'MODEL') (models[p[1]] ??= []).push(p[2]);
  else if (p[0] === 'REL') rels.push(p.slice(1));
}
const LABEL = {users:'Użytkownicy (users)',events:'Wydarzenia, działy, zespoły (events)',agreements:'Umowy (agreements)',documents:'Dokumenty (documents)',benefits:'Benefity i godziny (benefits)',shifts:'Zmiany (shifts)',dispatch_requests:'Dyspozytor (dispatch_requests)',notifications:'Powiadomienia (notifications)',notes:'Notatki (notes)',telegram_events:'Telegram (telegram_events)',foxcons_schedule:'Harmonogram Foxcons (foxcons_schedule)',core:'Ustawienia, dziennik, wiadomości (core)'};
const COLOR = {users:['#dae8fc','#6c8ebf'],events:['#d5e8d4','#82b366'],agreements:['#ffe6cc','#d79b00'],documents:['#fff2cc','#d6b656'],benefits:['#e1d5e7','#9673a6'],shifts:['#f8cecc','#b85450'],dispatch_requests:['#f5f5f5','#666666'],notifications:['#e6f2ff','#4a86c5'],notes:['#e6f2ff','#4a86c5'],telegram_events:['#d0f0f0','#3a9d9d'],foxcons_schedule:['#f0e6d0','#a68a3a'],core:['#eeeeee','#888888']};
const appOf = {}; for (const [a, ms] of Object.entries(models)) for (const m of ms) appOf[m] = a;
const HEAD = 34;
const deg = {}; for (const [m, , , t] of rels) { deg[m] = (deg[m] || 0) + 1; if (t !== m) deg[t] = (deg[t] || 0) + 1; }
const graph = {
  id: 'root',
  layoutOptions: {
    'elk.algorithm': 'layered', 'elk.direction': 'RIGHT', 'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
    'elk.edgeRouting': 'ORTHOGONAL', 'elk.json.edgeCoords': 'ROOT',
    'elk.layered.spacing.nodeNodeBetweenLayers': '150', 'elk.spacing.nodeNode': '34',
    'elk.spacing.edgeEdge': '14', 'elk.spacing.edgeNode': '24',
    'elk.layered.spacing.edgeEdgeBetweenLayers': '14', 'elk.layered.spacing.edgeNodeBetweenLayers': '24',
    'elk.layered.mergeEdges': 'false', 'elk.edgeLabels.inline': 'false', 'elk.spacing.edgeLabel': '4',
    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX', 'elk.layered.thoroughness': '30',
  },
  children: Object.entries(models).map(([a, ms]) => ({
    id: 'app_' + a,
    layoutOptions: { 'elk.padding': `[top=${HEAD + 24},left=24,bottom=24,right=24]` },
    children: ms.sort().map(m => ({ id: 'm_' + m, width: Math.max(150, m.length * 8 + 30), height: Math.max(40, (deg[m] || 0) * 13) })),
  })),
  edges: rels.map(([m, field, typ, target, od], i) => ({
    id: 'r_' + i, sources: ['m_' + m], targets: ['m_' + target],
    labels: [{ id: 'l_' + i, text: field, width: field.length * 5.6 + 8, height: 13 }],
  })),
};
const res = await new ELK().layout(graph);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const cells = []; const abs = {};
for (const g of res.children) {
  const a = g.id.slice(4), [fill, stroke] = COLOR[a];
  cells.push(`<mxCell id="${g.id}" value="${esc(LABEL[a])}" style="swimlane;startSize=${HEAD};fontStyle=1;fontSize=14;fillColor=${fill};strokeColor=${stroke};swimlaneFillColor=#ffffff;rounded=1;" vertex="1" parent="1"><mxGeometry x="${g.x}" y="${g.y}" width="${g.width}" height="${g.height}" as="geometry"/></mxCell>`);
  for (const n of g.children) {
    const m = n.id.slice(2), hub = (m === 'User' || m === 'Event') ? 'fontStyle=1;strokeWidth=2;fontSize=14;' : '';
    cells.push(`<mxCell id="${n.id}" value="${esc(m)}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=12;fillColor=${fill};strokeColor=${stroke};${hub}" vertex="1" parent="${g.id}"><mxGeometry x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" as="geometry"/></mxCell>`);
    abs[n.id] = { x: g.x + n.x, y: g.y + n.y, w: n.width, h: n.height };
  }
}
const END = { 'N:1': ['ERmany', 'ERone'], '1:1': ['ERone', 'ERone'], 'N:N': ['ERmany', 'ERmany'] };
const LINE = { CASCADE: 'strokeColor=#333333;', SET_NULL: 'strokeColor=#333333;dashed=1;', PROTECT: 'strokeColor=#cc0000;strokeWidth=2;', RESTRICT: 'strokeColor=#cc0000;strokeWidth=2;', '-': 'strokeColor=#1f6fb2;' };
const frac = (v, a, len) => Math.min(1, Math.max(0, (v - a) / len)).toFixed(4);
let maxY = 0;
res.edges.forEach((e, i) => {
  const [m, field, typ, target, od] = rels[i]; const sec = e.sections[0];
  const pts = [sec.startPoint, ...(sec.bendPoints || []), sec.endPoint];
  const s = abs['m_' + m], t = abs['m_' + target];
  const [sa, ea] = END[typ];
  const style = `edgeStyle=none;rounded=1;html=1;fontSize=9;startArrow=${sa};startFill=0;endArrow=${ea};endFill=0;exitX=${frac(pts[0].x, s.x, s.w)};exitY=${frac(pts[0].y, s.y, s.h)};exitDx=0;exitDy=0;entryX=${frac(pts.at(-1).x, t.x, t.w)};entryY=${frac(pts.at(-1).y, t.y, t.h)};entryDx=0;entryDy=0;${LINE[od]}`;
  const way = pts.slice(1, -1).map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('');
  cells.push(`<mxCell id="${e.id}" style="${style}" edge="1" parent="1" source="m_${m}" target="m_${target}"><mxGeometry relative="1" as="geometry">${way ? `<Array as="points">${way}</Array>` : ''}</mxGeometry></mxCell>`);
  const l = e.labels[0];
  cells.push(`<mxCell id="l_${i}" value="${esc(field)}" style="text;html=1;align=center;verticalAlign=middle;fontSize=9;fontColor=#333333;labelBackgroundColor=#ffffff;" vertex="1" parent="1"><mxGeometry x="${l.x}" y="${l.y}" width="${l.width}" height="${l.height}" as="geometry"/></mxCell>`);
});
for (const g of res.children) maxY = Math.max(maxY, g.y + g.height);
const legend = `<b>Legenda</b><br>linia ciągła – CASCADE (rekord usuwany razem z celem)<br>linia przerywana – SET_NULL (pole staje się puste)<br>linia czerwona – PROTECT / RESTRICT (usunięcie celu blokowane)<br>linia niebieska – relacja N:N<br>„kurza stopka” – strona „wiele”, kreska – strona „jeden”<br>etykieta linii – nazwa pola w modelu źródłowym<br>Stan: commit 551cee1 (2026-11-20). ${Object.keys(appOf).length} modeli, ${rels.length} relacji, bez modeli Historical…`;
cells.push(`<mxCell id="legend" value="${esc(legend)}" style="text;html=1;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=12;strokeColor=#999999;fillColor=#ffffff;spacing=10;rounded=1;" vertex="1" parent="1"><mxGeometry x="${res.children[0].x}" y="${maxY + 60}" width="520" height="170" as="geometry"/></mxCell>`);
fs.writeFileSync(out, `<?xml version="1.0" encoding="UTF-8"?>\n<mxfile host="app.diagrams.net">\n  <diagram id="model-danych" name="Post-Futrołajki Model Danych">\n    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" math="0" shadow="0">\n      <root>\n        <mxCell id="0"/>\n        <mxCell id="1" parent="0"/>\n${cells.map(c => '        ' + c).join('\n')}\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>\n`);
console.log('modele', Object.keys(abs).length, 'relacje', res.edges.length, 'rozmiar', Math.round(res.width), 'x', Math.round(res.height));
