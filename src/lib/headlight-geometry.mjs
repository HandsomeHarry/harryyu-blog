/** A rigid tapered housing lofted from equilateral cross-sections. Coordinates: x across, y up, z toward nose.
 * Rotate in model space, clip at the hood, then transform into camera space.
 * Camera perspective is deliberately long-lens to match the existing drawing.
 */
export const SIDE = 144;
const ELEVATION = Math.asin(64 / SIDE);
// The bulb face is 60° to the lid. Stop when its vertical tangent has
// zero camera-depth component, retaining the subtle mirrored 4° toe-out.
const OPEN_ANGLE = Math.PI / 6 + ELEVATION;
const FOCAL = 1800;
const YAW = 4 * Math.PI / 180;
// Inset the housing and glass together, leaving the original lid artwork
// full-size as a small overhanging lip. The hood plane stays at y=0.
const HOUSING_SCALE = .96;
const insetHousing = ([x,y,z]) => [x*HOUSING_SCALE,y*HOUSING_SCALE,
  SIDE/2+(z-SIDE/2)*HOUSING_SCALE];

// Original left cover's outer SVG perimeter, including its asymmetric taper
// and quadratic corners. Mirror the same artwork for the right assembly.
function coverOutline(ink = false) {
  const points = [[230,350]];
  const line = (x,y) => points.push([x,y]);
  const quad = (cx,cy,x,y) => {
    const start = points[points.length-1];
    for(let i=1;i<=12;i++) {
      const t=i/12, u=1-t;
      points.push([u*u*start[0]+2*u*t*cx+t*t*x,
                   u*u*start[1]+2*u*t*cy+t*t*y]);
    }
  };
  quad(290,343,374,348);
  if(ink) {
    // Original SVG filled contour, not a uniform-width stroke:
    // M230 350 Q290 343 374 348 Q292 347 234 353 L235 394
    // Q236 407 249 407 L340 407 Q352 407 356 394 L370 350
    // Q365 378 360 396 Q357 413 340 413 L248 412
    // Q230 412 230 395 Z
    quad(292,347,234,353);
    line(235,394);
    quad(236,407,249,407);
    line(340,407);
    quad(352,407,356,394);
    line(370,350);
  }
  quad(365,378,360,396);
  quad(357,413,340,413);
  line(248,412);
  quad(230,412,230,395);
  return points;
}

// Inverse-project the original drawn outline onto the closed lid plane.
// This preserves its exact screen footprint without warping it per frame:
// all of these fixed model-space vertices then undergo the same rigid motion.
function ontoLid([x,y]) {
  const u=302-x, v=y-346;
  const localX=(u-v/Math.tan(ELEVATION)*Math.sin(YAW))/Math.cos(YAW);
  const depth=v/Math.tan(ELEVATION)*Math.cos(YAW)-localX*Math.sin(YAW);
  const scale=1/(1+depth/FOCAL);
  return [localX*scale,0,v*scale/Math.sin(ELEVATION)];
}
const COVER = coverOutline().map(ontoLid);
const LID_INK = coverOutline(true).map(ontoLid);

// Loft triangular cross-sections through the actual curved lid footprint.
// At every x, P and A lie on the lid's back/front edges; B is the third
// equilateral vertex. The bulb shares A with the lid, so there is no box
// protruding beyond the cover and no disconnected decorative lid.
function sectionAt(x) {
  const intersections = [];
  for(let i=0;i<COVER.length;i++) {
    const a=COVER[i], b=COVER[(i+1)%COVER.length];
    if(x < Math.min(a[0],b[0])-1e-7 || x > Math.max(a[0],b[0])+1e-7) continue;
    if(Math.abs(b[0]-a[0])<1e-8) intersections.push(a[2],b[2]);
    else intersections.push(a[2]+(b[2]-a[2])*(x-a[0])/(b[0]-a[0]));
  }
  const back=Math.min(...intersections), front=Math.max(...intersections);
  return {p:[x,0,back], a:[x,0,front], b:[x,-Math.sqrt(3)*(front-back)/2,(back+front)/2]};
}
const SECTIONS = [...new Set(COVER.map(p=>p[0]))].sort((a,b)=>a-b).map(sectionAt);
const MESH = [
  {name:'lid', vertices:COVER},
  {name:'rear', vertices:[...SECTIONS.map(s=>s.p),...SECTIONS.map(s=>s.b).reverse()]},
  {name:'bulb', vertices:[...SECTIONS.map(s=>s.a),...SECTIONS.map(s=>s.b).reverse()]},
];

export function rotatePoint([x, y, z], progress) {
  const angle = Math.max(0, Math.min(1, progress)) * OPEN_ANGLE;
  return [x, y * Math.cos(angle) + z * Math.sin(angle), z * Math.cos(angle) - y * Math.sin(angle)];
}

// Sutherland–Hodgman clipping: below-hood parts are occluded, never scaled.
function aboveHood(points) {
  const output = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    const aIn = a[1] >= -1e-8, bIn = b[1] >= -1e-8;
    if (aIn) output.push(a);
    if (aIn !== bIn) {
      const t = a[1] / (a[1] - b[1]);
      output.push(a.map((v, j) => v + (b[j] - v) * t));
    }
  }
  return output;
}

export function pathData(points, close = true) {
  return points.length ? points.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(3)},${p[1].toFixed(3)}`).join('') + (close ? 'Z' : '') : '';
}

export function headlightFrame(progress, side) {
  const hingeX = side < 0 ? 302 : 898;
  const camera = ([x, y, z]) => {
    const down = z * Math.sin(ELEVATION) - y * Math.cos(ELEVATION);
    const depth = z * Math.cos(ELEVATION) + y * Math.sin(ELEVATION);
    return [side * (x * Math.cos(YAW) + depth * Math.sin(YAW)), down, depth * Math.cos(YAW) - x * Math.sin(YAW)];
  };
  const projectCamera = ([x,y,z]) => {
    const scale = FOCAL / (FOCAL - z);
    return [hingeX + x * scale, 346 + y * scale];
  };
  const project = p => projectCamera(camera(rotatePoint(p, progress)));
  const centerSection = sectionAt(0);
  const faces = MESH.map(face => {
    let vertices;
    if(face.name==='lid') vertices=aboveHood(face.vertices.map(v=>rotatePoint(v,progress)));
    else {
      // Clip each ruled strip before assembling its contour. A curved face
      // is not a single plane: clipping its perimeter as one polygon would
      // invent a straight chord through the rounded edge at hood height.
      const top=[], bottom=[];
      for(const section of SECTIONS) {
        const a=rotatePoint(insetHousing(face.name==='bulb'?section.a:section.p),progress);
        const b=rotatePoint(insetHousing(section.b),progress);
        if(a[1]<-1e-8 && b[1]<-1e-8) continue;
        const cut=()=>a.map((v,i)=>v+(b[i]-v)*a[1]/(a[1]-b[1]));
        top.push(a[1]>=0?a:cut());
        bottom.push(b[1]>=0?b:cut());
      }
      vertices=[...top,...bottom.reverse()];
    }
    const cam = vertices.map(camera);
    const points = cam.map(projectCamera);
    const area = points.reduce((sum,p,i)=> {
      const q=points[(i+1)%points.length];
      return sum+p[0]*q[1]-q[0]*p[1];
    },0)/2;
    return {name:face.name, points, depth:cam.reduce((sum,p)=>sum+p[2],0)/cam.length, area};
  }).filter(face=>face.points.length>=3 && (face.name === 'lid' || Math.abs(face.area)>.001))
    .sort((a,b)=>a.depth-b.depth);

  // The glass follows the same loft as the shell. Its footprint remains
  // circular in face coordinates, rather than floating on the old box plane.
  const onLens = (u,v) => {
    const {a,b}=sectionAt(u);
    return a.map((value,i)=>value+(b[i]-value)*v/SIDE);
  };
  const lensPoint = (u,v) => project(insetHousing(onLens(u,v)));
  const circle = radius => Array.from({length:72},(_,i)=>{
    const angle=i*2*Math.PI/72;
    return lensPoint(Math.cos(angle)*radius,SIDE/2+Math.sin(angle)*radius);
  });
  const flutes = [];
  for(const x of [-36,-24,-12,0,12,24,36]) {
    const half=Math.sqrt(48**2-x**2);
    flutes.push([lensPoint(x,SIDE/2-half),lensPoint(x,SIDE/2+half)]);
  }
  return {
    lidInk: LID_INK.map(project),
    faces, pivot:project(centerSection.p), lidTip:project(centerSection.a), bulbBottom:project(insetHousing(centerSection.b)),
    lensCenter:lensPoint(0,SIDE/2), lens:circle(49), bezel:circle(55), innerRing:circle(46),
    highlight: Array.from({length:20},(_,i)=> {
      const angle=Math.PI*1.12+i/19*Math.PI*.57;
      return lensPoint(Math.cos(angle)*40,SIDE/2+Math.sin(angle)*40);
    }), flutes,
  };
}
