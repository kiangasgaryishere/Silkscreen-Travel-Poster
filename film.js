import {makeTextures,paperSheet,inkFinish,wipeRegion,squeegee,ink,rectPath} from './engine/silk.js';
const TL=await(await fetch('timeline.json')).json();
await Promise.all([document.fonts.load('700 48px Persian','برج ایفل'),document.fonts.load('400 40px Persian','آهن'),document.fonts.load('400 34px English','SUMMER')]);
const c=document.getElementById('c'),g=c.getContext('2d');const W=1080,H=1920,PAPER='#F3EAD8',NAVY='#192D3C',RED='#BB503B',GOLD='#E3AF4E',BLUE='#548291',T=makeTextures(PAPER,24);
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t,smooth=x=>{x=clamp(x);return x*x*(3-2*x)},seg=(t,a,b)=>clamp((t-a)/(b-a));
const palettes={warm:{sky:'#EDCD9E',band:'#DF9A68',far:'#B67F65',mid:'#577976',near:NAVY,accent:RED},cold:{sky:'#DCE6E1',band:'#AAC5C8',far:'#839FA9',mid:'#547889',near:NAVY,accent:'#41738E'}};
function fill(col,x,y,w,h){g.fillStyle=col;g.fillRect(x,y,w,h)}
function poly(pts,col){g.fillStyle=col;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()}
function circle(x,y,r,col){g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function beam(x1,y1,x2,y2,w,col){let d=Math.max(.001,Math.hypot(x2-x1,y2-y1)),nx=(y1-y2)/d*w/2,ny=(x2-x1)/d*w/2;poly([[x1+nx,y1+ny],[x2+nx,y2+ny],[x2-nx,y2-ny],[x1-nx,y1-ny]],col)}
function text(s,x,y,size=44,col=NAVY,lang='fa',weight=700,align='center',max=900){g.save();g.direction=lang==='fa'?'rtl':'ltr';g.textAlign=align;g.textBaseline='middle';g.fillStyle=col;let fs=size;do{g.font=`${weight} ${fs}px ${lang==='fa'?'Persian':'English'}`;if(g.measureText(s).width<=max)break;fs--}while(fs>20);g.fillText(s,x,y);g.restore()}
function rule(x,y,w,col=NAVY,h=3){fill(col,x,y,w,h)}
function sun(x,y,r=66,col=GOLD){circle(x,y,r,col);for(let i=0;i<2;i++){g.beginPath();g.arc(x,y,r+17+i*14,0,7);g.lineWidth=3;g.strokeStyle=col;g.stroke()}}
function landscape(p,t){fill(p.sky,0,0,1080,2400);fill(p.band,0,750,1080,135);for(let i=0;i<9;i++)fill(p.band,0,610+i*15,1080,Math.max(2,i*.7));poly([[0,1090],[90,1070],[160,1085],[220,1030],[330,1080],[450,1050],[550,1080],[650,1020],[780,1090],[900,1065],[1080,1080],[1080,1380],[0,1380]],p.far);
 for(let j=0;j<14;j++){let x=j*88-20,h=45+(j*31%65);fill(p.mid,x,1190-h,75,h);poly([[x-4,1190-h],[x+36,1174-h],[x+80,1190-h]],p.near);for(let k=0;k<3;k++)fill(p.sky,x+12+k*19,1200-h,7,13)}
 fill(p.mid,0,1242,1080,138);for(let j=0;j<6;j++)fill(p.sky,(j*191+t*3)%1200-120,1270+j%3*24,95+j*12,5);fill(p.near,0,1360,1080,25);
}
function tower(x,base,height,col=NAVY,opt={}){g.save();g.translate(x,base-height);let sx=height/1000,sy=height/1000*(opt.stretch||1);g.scale(sx,sy);const shift=opt.bend||0;
 // Curved silhouette with paper knockouts: all structural edges are flat ink fills.
 const outer=new Path2D('M -300 1000 C -241 908 -187 728 -151 559 C -114 388 -59 197 -27 99 L -17 79 L -10 79 L -7 0 L 7 0 L 10 79 L 17 79 L 27 99 C 59 197 114 388 151 559 C 187 728 241 908 300 1000 L 200 1000 C 170 908 115 866 0 861 C -115 866 -170 908 -200 1000 Z');
 const holes=new Path2D('M -14 151 L 14 151 L 77 405 L -77 405 Z M -82 449 L 82 449 L 118 594 L -118 594 Z M -132 636 L 132 636 L 179 798 L -179 798 Z');outer.addPath(holes);
 g.transform(1,0,-shift/1000,1,shift,0);g.fillStyle=col;g.fill(outer,'evenodd');
 const tiers=[[151,405,14,77],[449,594,82,118],[636,798,132,179]];
 for(const [a,b,wa,wb] of tiers){let n=Math.round((b-a)/45);for(let k=0;k<n;k++){let ya=lerp(a,b,k/n),yb=lerp(a,b,(k+1)/n),xa=lerp(wa,wb,k/n),xb=lerp(wa,wb,(k+1)/n);beam(-xa,ya,xb,yb,7,col);beam(xa,ya,-xb,yb,7,col)}}
 fill(col,-91,409,182,24);fill(col,-150,599,300,30);fill(col,-205,800,410,27);fill(col,-32,90,64,15);
 if(opt.lit){g.save();g.beginPath();g.rect(0,-10,350,1100);g.clip();g.fillStyle=opt.lit;g.fill(outer,'evenodd');for(const [a,b,wa,wb]of tiers){beam(wa,a,wb,b,7,opt.lit)}fill(opt.lit,0,599,150,30);fill(opt.lit,0,800,205,27);g.restore()}
 g.restore()}
function arrow(x1,y1,x2,y2,col=RED,width=8){if(Math.hypot(x2-x1,y2-y1)<2)return;beam(x1,y1,x2,y2,width,col);let a=Math.atan2(y2-y1,x2-x1),r=23;poly([[x2,y2],[x2-r*Math.cos(a-.55),y2-r*Math.sin(a-.55)],[x2-r*Math.cos(a+.55),y2-r*Math.sin(a+.55)]],col)}
function rulers(y,p){rule(160,1172,760,NAVY,3);rule(865,y,3,NAVY,1172-y);rule(850,y,30,RED,5);rule(850,1172,30,NAVY,5);for(let i=0;i<8;i++)rule(850,y+i*(1172-y)/8,15,NAVY,2)}
// Full-bleed art: the print itself fills the portrait frame. Text is drawn only
// by subtitles(), after the art camera has been restored to screen coordinates.
function artCamera(){g.translate(0,-719);g.scale(1,1.8)}
function city(p,t){landscape(p,t);fill(p.near,0,1380,1080,700)}
function winterSky(p,t){city(p,t);circle(846,680,48,p.sky);for(let k=0;k<3;k++)beam(846-55*Math.cos(k*Math.PI/3),680-55*Math.sin(k*Math.PI/3),846+55*Math.cos(k*Math.PI/3),680+55*Math.sin(k*Math.PI/3),3,p.near)}
function opener(t){
 const pull=smooth(t/1.15),z=lerp(2.4,1,pull),pivot=[540,1040];
 g.save();g.translate(...pivot);g.scale(z,z);g.translate(-pivot[0],-pivot[1]);
 city(palettes.warm,t);sun(830,645,58,GOLD);tower(540,1350,810,NAVY,{lit:RED});
 // A print pull changes the season at the spoken winter reveal. At the question,
 // the same tower is held between warm/cold inks: no exaggerated size claim.
 const cold=seg(t,2.12,2.65),split=t<3.45?cold:lerp(1,.5,smooth((t-3.45)/.65));
 if(cold>0){g.save();g.clip(wipeRegion([0,0,1080,2400],'left',split,19,20));winterSky(palettes.cold,t);tower(540,1350,810,NAVY,{lit:BLUE});g.restore()}
 g.restore();
 // The first ink pull is fast enough that the first spoken line starts on the
 // landmark, while its steep camera pullback delivers a visual reveal.
 if(t<.42){let x=lerp(-50,1140,t/.42);g.save();squeegee(g,[x,-40],[x,2100],[1,0],{color:RED,handle:0,scale:1});g.restore()}
}
function drawScene(i,t){const s=TL.scenes[i],u=t-s.start;let p=s.id==='cold'?palettes.cold:palettes.warm;
 fill(p.sky,0,0,W,H);g.save();artCamera();
 if(s.id==='summer-winter')opener(t);
 else if(['return','end'].includes(s.id)){
  city(p,t);sun(810,645,58,GOLD);tower(540,1350,810,NAVY,{lit:RED});
  g.save();g.beginPath();g.rect(540,0,540,2400);g.clip();winterSky(palettes.cold,t);tower(540,1350,810,NAVY,{lit:BLUE});g.restore();
 }else if(s.id==='iron'){
  fill(p.sky,0,400,1080,1700);for(let k=0;k<8;k++)fill(p.band,0,550+k*26,1080,4+k);
  const z=lerp(.85,1.02,smooth(u/6));g.save();g.translate(540,940);g.scale(z,z);g.rotate(-.14);
  for(let x of [-430,360]){fill(NAVY,x,-1000,80,2500);fill(BLUE,x+8,-1000,13,2500)}
  for(let k=-2;k<5;k++){let y=k*360-400;beam(-390,y,400,y+360,61,NAVY);beam(400,y,-390,y+360,61,NAVY);beam(-390,y+13,400,y+373,9,RED);for(let x of [-386,394]){circle(x,y+18,17,PAPER);circle(x,y+18,8,NAVY)}}g.restore();
 }else if(['bar','small'].includes(s.id)){
  fill(p.sky,0,400,1080,1700);sun(812,620,62,GOLD);
  const expansion=s.id==='bar'?smooth((u-.6)/3)*.17:.17,len=520*(1+expansion),bx=210,by=950;
  fill(BLUE,bx,by-155,520,74);
  poly([[bx,by],[bx+len,by],[bx+len+35,by-24],[bx+35,by-24]],GOLD);fill(RED,bx,by,len,91);poly([[bx+len,by],[bx+len+35,by-24],[bx+len+35,by+65],[bx+len,by+91]],NAVY);
  for(let k=0;k<5;k++)fill(PAPER,bx+k*116,by+10,3,70);
  rule(bx,1126,520,NAVY,3);rule(bx,1111,3,NAVY,32);rule(bx+520,1111,3,NAVY,32);arrow(bx+520,1090,bx+len,1090,RED,5);
 }else if(['height','cold'].includes(s.id)){
  const cold=s.id==='cold';city(p,t);const e=cold?1-smooth(u/3):smooth(u/4),h=650+e*65;
  tower(480,1272,650,p.far);tower(480,1272,h,NAVY,{lit:cold?BLUE:RED});
  rule(160,1272,760,NAVY,3);const top=1272-h;rule(865,top,3,NAVY,1272-top);rule(850,top,30,RED,5);rule(850,1272,30,NAVY,5);sun(790,650,47,cold?BLUE:GOLD);
 }else if(s.id==='turn'){
  city(p,t);tower(510,1350,800,NAVY,{lit:RED});sun(lerp(1150,820,smooth(u/2.4)),700,70,GOLD);
 }else if(s.id==='uneven'){
  fill(p.sky,0,400,1080,1700);sun(858,645,66,GOLD);const grow=smooth((u-2)/3)*95;
  fill(BLUE,280,720,85,450);fill(NAVY,277,1166,92,6);fill(RED,650,720-grow,85,450+grow);fill(GOLD,650,720-grow,17,450+grow);
  for(let yy=750;yy<1150;yy+=80){fill(PAPER,280,yy,85,4);fill(PAPER,650,yy-grow*.5,85,4)}
  for(let j=0;j<3;j++)arrow(818,760+j*70,755,800+j*70,GOLD,5);
 }else if(['bend','sun'].includes(s.id)){
  city(p,t);const shift=s.id==='sun'?lerp(90,-90,smooth(u/2.7)):smooth((u-.65)/2.1)*90,sx=s.id==='sun'?lerp(861,210,smooth(u/2.7)):861;
  sun(sx,660,59,GOLD);tower(540,1315,750,p.far);tower(540,1315,750,NAVY,{bend:-shift,lit:RED});
  arrow(sx>540?790:290,815,sx>540?650:430,850,GOLD,7);arrow(540,558,540-shift*.75,558,RED,7);
 }else if(s.id==='human'){
  city(p,t);sun(814,635,55,GOLD);const h=lerp(900,765,smooth(u/8));tower(540,1350,h,NAVY,{lit:'#AE6749'});
  for(let [x,y,z]of [[180,1330,1],[240,1340,.8],[825,1338,1],[880,1341,.75]]){circle(x,y-30*z,7*z,NAVY);fill(NAVY,x-5*z,y-23*z,10*z,23*z);beam(x-3*z,y,x-7*z,y+18*z,4*z,NAVY);beam(x+3*z,y,x+8*z,y+18*z,4*z,NAVY)}
 }
 g.restore();inkFinish(g,T,0,0,W,H,.6,.45);
}
function subtitles(t){const q=TL.cues.find(q=>t>=q.t0&&t<q.t1);if(!q)return;g.save();
 g.clip(wipeRegion([78,1442,924,180],'right',seg(t,q.t0,q.t0+.12),18,10));
 fill('rgba(16,32,44,.93)',78,1442,924,180);
 text(q.fa,540,1495,44,PAPER,'fa',700,'center',860);text(q.en,540,1569,31,PAPER,'en',400,'center',856);g.restore()}
const scratch=document.createElement('canvas'),fresh=document.createElement('canvas');for(const el of [scratch,fresh]){el.width=W;el.height=H}const sg=scratch.getContext('2d'),fg=fresh.getContext('2d');
window.render=t=>{t=clamp(t,0,TL.duration-.00001);let i=TL.scenes.findIndex(s=>t>=s.start&&t<s.end);if(i<0)i=TL.scenes.length-1;const u=t-TL.scenes[i].start;
 if(i>0&&u<.42){drawScene(i-1,TL.scenes[i].start-.001);sg.drawImage(c,0,0);drawScene(i,t);fg.drawImage(c,0,0);g.drawImage(scratch,0,0);g.save();g.clip(wipeRegion([0,0,W,H],'right',u/.42,17,30));g.drawImage(fresh,0,0);g.restore();const x=-30+u/.42*(W+60);g.save();squeegee(g,[x,-40],[x,H+40],[1,0],{color:TL.scenes[i].id==='cold'?BLUE:RED,handle:0,scale:1});g.restore();
 }else drawScene(i,t);subtitles(t)};
window.DUR=TL.duration;window.TL=TL;window.READY=true;window.render(0);
if(new URLSearchParams(location.search).has('render'))document.documentElement.classList.add('render');
const audio=document.getElementById('audio'),seek=document.getElementById('seek'),clock=document.getElementById('clock'),btn=document.getElementById('play');
btn.onclick=()=>{if(audio.paused){audio.play();btn.textContent='Pause'}else{audio.pause();btn.textContent='Play'}};seek.oninput=()=>{audio.currentTime=+seek.value;window.render(+seek.value)};
function loop(){if(!audio.paused){seek.value=audio.currentTime;window.render(audio.currentTime);clock.textContent=audio.currentTime.toFixed(1)+'s'}requestAnimationFrame(loop)}loop();
