import test from 'node:test';
import assert from 'node:assert/strict';
import { headlightFrame, SIDE, rotatePoint } from '../src/lib/headlight-geometry.mjs';
const near = (a,b,epsilon=1e-8) => assert.ok(Math.abs(a-b)<epsilon, `${a} != ${b}`);
const length = (a,b) => Math.hypot(...a.map((v,i)=>v-b[i]));
test('the equilateral prism rotates rigidly about its hinge', () => {
  const p=[0,0,0], a=[0,0,SIDE], b=[0,-Math.sqrt(3)*SIDE/2,SIDE/2];
  for(let t=0;t<=1;t+=.05) {
    const vertices=[p,a,b].map(v=>rotatePoint(v,t));
    assert.deepEqual(vertices[0],p);
    near(length(vertices[0],vertices[1]),SIDE);
    near(length(vertices[1],vertices[2]),SIDE);
    near(length(vertices[2],vertices[0]),SIDE);
  }
});
test('left and right assemblies are exact mirrors throughout travel', () => {
  for(let i=0;i<=20;i++) {
    const left=headlightFrame(i/20,-1), right=headlightFrame(i/20,1);
    for(const key of ['pivot','lidTip','bulbBottom','lensCenter']) {
      near(left[key][0]+right[key][0],1200);
      near(left[key][1],right[key][1]);
    }
  }
});
test('raised bulb stops facing the camera vertically', () => {
  for(const side of [-1,1]) {
    const frame=headlightFrame(1,side);
    const a = rotatePoint([0,0,SIDE],1);
    const b = rotatePoint([0,-Math.sqrt(3)*SIDE/2,SIDE/2],1);
    const elevation = Math.asin(64/SIDE);
    // Both ends have identical camera depth: the face no longer leans back.
    near(a[2]*Math.cos(elevation)+a[1]*Math.sin(elevation),
         b[2]*Math.cos(elevation)+b[1]*Math.sin(elevation));
    assert.ok((frame.lensCenter[0]-(side<0?302:898))*side>0);
  }
});
test('closed bulb is below the hood; the opaque lid remains in every frame', () => {
  for(let i=0;i<=100;i++) {
    const f=headlightFrame(i/100,-1);
    assert.ok(f.faces.some(face=>face.name==='lid'));
    for(const face of f.faces) for(const point of face.points) {
      assert.ok(point.every(Number.isFinite));
    }
  }
  assert.ok(!headlightFrame(0,-1).faces.some(face=>face.name==='bulb'));
});

test('closed cover follows the original SVG contour rather than a rectangle', () => {
  const points=headlightFrame(0,-1).faces.find(f=>f.name==='lid').points;
  for(const [x,y] of [[230,350],[374,348],[340,413],[248,412],[230,395]]) {
    assert.ok(points.some(p=>Math.hypot(p[0]-x,p[1]-y)<.001),`missing original contour point ${x},${y}`);
  }
  assert.ok(points.length>20, 'curved perimeter must retain sampled quadratic curves');
});

test('housing keeps the curved taper with a small inset beneath the lid', () => {
  const frame=headlightFrame(1,-1);
  const bulb=frame.faces.find(f=>f.name==='bulb');
  assert.ok(bulb.points.length>30, 'bulb housing must carry the curved perimeter');
  const lid=frame.faces.find(f=>f.name==='lid');
  const extent=points=>[Math.min(...points.map(p=>p[0])),Math.max(...points.map(p=>p[0]))];
  const [lidMin,lidMax]=extent(lid.points), [bulbMin,bulbMax]=extent(bulb.points);
  assert.ok(bulbMin>lidMin && bulbMax<lidMax, 'housing edges must sit inside the lid');
  assert.ok((bulbMax-bulbMin)/(lidMax-lidMin)>.9, 'inset must remain subtle');
});

test('lid ink preserves the original variable-width SVG ribbon and mirrors in motion', () => {
  const closed=headlightFrame(0,-1).lidInk;
  assert.ok(closed?.length>80, 'original filled ribbon must be present');
  for(const [x,y] of [[234,353],[235,394],[249,407],[340,407],[230,395]]) {
    assert.ok(closed.some(p=>Math.hypot(p[0]-x,p[1]-y)<.001));
  }
  for(const t of [0,.25,.5,.75,1]) {
    const left=headlightFrame(t,-1).lidInk, right=headlightFrame(t,1).lidInk;
    left.forEach((p,i)=> { near(p[0]+right[i][0],1200); near(p[1],right[i][1]); });
  }
});
