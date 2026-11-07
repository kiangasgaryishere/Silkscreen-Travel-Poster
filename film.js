import {makeTextures,paperSheet,inkFinish,wipeRegion,squeegee,ink,rectPath} from './engine/silk.js';
const TL=await(await fetch('timeline.json')).json();
await Promise.all([document.fonts.load('700 48px Persian','برج ایفل'),document.fonts.load('400 40px Persian','آهن'),document.fonts.load('400 34px English','SUMMER')]);
const c=document.getElementById('c'),g=c.getContext('2d');const W=1080,H=1920,PAPER='#F3EAD8',NAVY='#192D3C',RED='#BB503B',GOLD='#E3AF4E',BLUE='#548291',T=makeTextures(PAPER,24);
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t,smooth=x=>{x=clamp(x);return x*x*(3-2*x)},seg=(t,a,b)=>clamp((t-a)/(b-a));
const palettes={warm:{sky:'#EDCD9E',band:'#DF9A68',far:'#B67F65',mid:'#577976',near:NAVY,accent:RED},cold:{sky:'#DCE6E1',band:'#AAC5C8',far:'#839FA9',mid:'#547889',near:NAVY,accent:'#41738E'}};
function fill(col,x,y,w,h){g.fillStyle=col;g.fillRect(x,y,w,h)}
function poly(pts,col){g.fillStyle=col;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()}
function circle(x,y,r,col){g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function beam(x1,y1,x2,y2,w,col){let d=Math.hypot(x2-x1,y2-y1),nx=(y1-y2)/d*w/2,ny=(x2-x1)/d*w/2;poly([[x1+nx,y1+ny],[x2+nx,y2+ny],[x2-nx,y2-ny],[x1-nx,y1-ny]],col)}
function text(s,x,y,size=44,col=NAVY,lang='fa',weight=700,align='center',max=900){g.save();g.direction=lang==='fa'?'rtl':'ltr';g.textAlign=align;g.textBaseline='middle';g.fillStyle=col;let fs=size;do{g.font=`${weight} ${fs}px ${lang==='fa'?'Persian':'English'}`;if(g.measureText(s).width<=max)break;fs--}while(fs>20);g.fillText(s,x,y);g.restore()}
function rule(x,y,w,col=NAVY,h=3){fill(col,x,y,w,h)}
function label(fa,en,x,y,sz=34,col=NAVY){text(fa,x,y,sz,col);text(en,x,y+45,Math.round(sz*.62),col,'en',400)}
function sun(x,y,r=66,col=GOLD){circle(x,y,r,col);for(let i=0;i<2;i++){g.beginPath();g.arc(x,y,r+17+i*14,0,7);g.lineWidth=3;g.strokeStyle=col;g.stroke()}}
function header(s,idx){text('THE TOWER THAT RESPONDS',96,167,22,NAVY,'en',400,'left',760);text('برجی که واکنش نشان می‌دهد',96,218,27,NAVY,'fa',700,'left',800);rule(96,255,888,NAVY,2);text(String(idx+1).padStart(2,'0')+' / 13',978,171,22,NAVY,'en',400,'right');text(s.title,540,345,66,NAVY,'fa',700,'center',880);text(s.enTitle,540,410,25,NAVY,'en',400,'center',860)}
function landscape(p,t){fill(p.sky,0,455,1080,930);fill(p.band,0,750,1080,135);for(let i=0;i<9;i++)fill(p.band,0,610+i*15,1080,Math.max(2,i*.7));poly([[0,1090],[90,1070],[160,1085],[220,1030],[330,1080],[450,1050],[550,1080],[650,1020],[780,1090],[900,1065],[1080,1080],[1080,1380],[0,1380]],p.far);
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
function schematic(){fill(NAVY,126,1248,828,85);text('نمایش شماتیک؛ تغییرات بزرگ‌نمایی شده',540,1277,27,PAPER,'fa');text('SCHEMATIC · DEFORMATION EXAGGERATED',540,1311,18,PAPER,'en',400)}
function arrow(x1,y1,x2,y2,col=RED,width=8){beam(x1,y1,x2,y2,width,col);let a=Math.atan2(y2-y1,x2-x1),r=23;poly([[x2,y2],[x2-r*Math.cos(a-.55),y2-r*Math.sin(a-.55)],[x2-r*Math.cos(a+.55),y2-r*Math.sin(a+.55)]],col)}
function rulers(y,p){rule(160,1172,760,NAVY,3);rule(865,y,3,NAVY,1172-y);rule(850,y,30,RED,5);rule(850,1172,30,NAVY,5);for(let i=0;i<8;i++)rule(850,y+i*(1172-y)/8,15,NAVY,2)}
function drawScene(i,t){let s=TL.scenes[i],u=t-s.start,p=palettes.warm;paperSheet(g,T,0,0,W,H);header(s,i);
 g.save();g.beginPath();g.rect(0,455,1080,930);g.clip();
 if(['summer-winter','return','end'].includes(s.id)){
  let change=s.id==='return'?smooth(u/4):.5;landscape(p,t);g.save();g.beginPath();g.rect(540,455,540,930);g.clip();landscape(palettes.cold,t);g.restore();
  sun(220,680,49,GOLD);circle(846,680,48,palettes.cold.sky);for(let k=0;k<6;k++)beam(846-55*Math.cos(k*Math.PI/3),680-55*Math.sin(k*Math.PI/3),846+55*Math.cos(k*Math.PI/3),680+55*Math.sin(k*Math.PI/3),3,palettes.cold.near);
  const zoom=1+.012*Math.sin(clamp(u/6)*1.5);g.save();g.translate(540,1150);g.scale(zoom,zoom);g.translate(-540,-1150);tower(300,1300,650,NAVY,{lit:'#BA5C3E'});tower(780,1300,650,NAVY,{lit:BLUE});g.restore();
  label('تابستون','SUMMER',295,523,37);label('زمستون','WINTER',780,523,37);fill(PAPER,535,455,10,930);fill(NAVY,196,1348,214,36);fill(NAVY,670,1348,214,36);
  if(s.id==='end'){label('گرما: انبساط','HEAT: EXPANSION',290,1170,29,PAPER);label('سرما: انقباض','COLD: CONTRACTION',785,1170,29,PAPER)}
 }else if(s.id==='iron'){
  fill(p.sky,0,455,1080,930);for(let k=0;k<8;k++)fill(p.band,0,550+k*26,1080,4+k);
  const z=lerp(.85,1.02,smooth(u/6));g.save();g.translate(540,940);g.scale(z,z);g.rotate(-.14);for(let x of [-430,360]){fill(NAVY,x,-520,80,1000);fill(BLUE,x+8,-520,13,1000)}
  for(let k=-1;k<3;k++){let y=k*360-400;beam(-390,y,400,y+360,61,NAVY);beam(400,y,-390,y+360,61,NAVY);beam(-390,y+13,400,y+373,9,RED);for(let x of [-386,394]){circle(x,y+18,17,PAPER);circle(x,y+18,8,NAVY)}}
  g.restore();fill(NAVY,190,1220,700,104);label('آهنِ اسکلت برج','THE IRON STRUCTURE',540,1254,38,PAPER);
 }else if(['bar','small'].includes(s.id)){
  fill(p.sky,0,455,1080,930);sun(812,650,62,GOLD);text('Fe',240,652,90,NAVY,'en',400);text('IRON',240,723,25,NAVY,'en',400);
  let expansion=s.id==='bar'?smooth((u-.6)/3)*.17:.17;let len=520*(1+expansion);let bx=210,by=900;
  fill(BLUE,bx,by-155,520,74);text('اندازهٔ اولیه',480,by-205,31,NAVY);text('BEFORE HEATING',480,by-254,20,NAVY,'en',400);
  // Warm ink printed onto the growing bar.
  poly([[bx,by],[bx+len,by],[bx+len+35,by-24],[bx+35,by-24]],GOLD);fill(RED,bx,by,len,91);poly([[bx+len,by],[bx+len+35,by-24],[bx+len+35,by+65],[bx+len,by+91]],NAVY);
  for(let k=0;k<5;k++)fill(PAPER,bx+k*116,by+10,3,70);
  rule(bx,1076,520,NAVY,3);rule(bx,1061,3,NAVY,32);rule(bx+520,1061,3,NAVY,32);arrow(bx+520,1040,bx+len,1040,RED,5);
  label(s.id==='small'?'در یک تکهٔ کوچک، به‌سختی دیده می‌شه':'گرم‌تر می‌شه، بلندتر می‌شه',s.id==='small'?'BARELY VISIBLE IN A SMALL PIECE':'WARMER IRON EXPANDS',540,1150,33);schematic();
 }else if(['height','cold'].includes(s.id)){
  let cold=s.id==='cold';p=cold?palettes.cold:palettes.warm;landscape(p,t);let e=cold?1-smooth(u/3):smooth(u/4);let h=650+e*65;
  tower(480,1172,650,p.far);tower(480,1172,h,NAVY,{lit:cold?BLUE:RED});rulers(1172-h,p);sun(790,650,47,cold?BLUE:GOLD);
  label(cold?'آهن سرد می‌شه':'آهن گرم می‌شه',cold?'COOLING':'HEATING',520,1210,29);schematic();
 }else if(s.id==='turn'){
  landscape(p,t);tower(510,1335,800,NAVY,{lit:RED});sun(lerp(1150,820,smooth(u/2.4)),700,70,GOLD);fill(NAVY,190,1155,700,113);text('یه حرکت دیگه هم هست…',540,1210,41,PAPER);
 }else if(s.id==='uneven'){
  fill(p.sky,0,455,1080,930);sun(858,645,66,GOLD);let grow=smooth((u-2)/3)*95;let l=484,r=665,y=1120;
  fill(BLUE,280,670,85,450);fill(NAVY,277,1116,92,6);fill(RED,650,670-grow,85,450+grow);fill(GOLD,650,670-grow,17,450+grow);
  for(let yy=700;yy<1100;yy+=80){fill(PAPER,280,yy,85,4);fill(PAPER,650,yy-grow*.5,85,4)}
  for(let j=0;j<3;j++)arrow(818,760+j*70,755,800+j*70,GOLD,5);
  label('سمت سایه','SHADED SIDE',319,1170,29);label('سمت آفتاب','SUNLIT SIDE',695,1170,29);schematic();
 }else if(['bend','sun'].includes(s.id)){
  landscape(p,t);let shift=s.id==='sun'?lerp(90,-90,smooth(u/2.7)):smooth((u-.65)/2.1)*90;
  let sx=s.id==='sun'?lerp(861,210,smooth(u/2.7)):861;sun(sx,660,59,GOLD);
  tower(540,1215,700,p.far);tower(540,1215,700,NAVY,{bend:-shift,lit:RED});
  // Positive bend parameter moves crown right; right sunlight must push crown left.
  let target=540-shift*.7;arrow(sx>540?790:290,815,sx>540?650:430,850,GOLD,7);
  arrow(540,508,target,508,RED,7);label('دور از سمت گرم‌تر','AWAY FROM THE WARMER SIDE',540,1187,30);schematic();
 }else if(s.id==='human'){
  landscape(p,t);sun(814,635,55,GOLD);let h=lerp(900,765,smooth(u/8));tower(540,1350,h,NAVY,{lit:'#AE6749'});
  for(let [x,y,z]of [[180,1330,1],[240,1340,.8],[825,1338,1],[880,1341,.75]]){circle(x,y-30*z,7*z,NAVY);fill(NAVY,x-5*z,y-23*z,10*z,23*z);beam(x-3*z,y,x-7*z,y+18*z,4*z,NAVY);beam(x+3*z,y,x+8*z,y+18*z,4*z,NAVY)}
  fill(NAVY,205,1152,670,100);label('رفتار طبیعی سازه','A NATURAL STRUCTURAL RESPONSE',540,1186,32,PAPER);
 }
 g.restore();inkFinish(g,T,0,455,1080,930,.6,.65);rule(96,1384,888,NAVY,3);
 // Small graphic index reinforces the two concepts without competing with narration.
 text('PARIS / IRON / HEAT',96,1656,21,NAVY,'en',400,'left');text('انبساط  /  انقباض',980,1656,27,NAVY,'fa',700,'right');rule(96,1700,888,'#C8BCA8',3);rule(96,1700,888*clamp(t/TL.duration),RED,5);
 text('یک سازه، دو واکنش',96,1761,25,NAVY,'fa',400,'left');text('THERMAL RESPONSE',980,1761,21,NAVY,'en',400,'right');
}
function subtitles(t){const q=TL.cues.find(q=>t>=q.t0&&t<q.t1);if(!q)return;g.save();g.clip(wipeRegion([78,1417,924,180],'right',seg(t,q.t0,q.t0+.12),18,10));fill(NAVY,78,1417,924,180);fill(RED,78,1417,7,180);text(q.fa,540,1470,44,PAPER,'fa',700,'center',860);text(q.en,540,1544,31,PAPER,'en',400,'center',856);g.restore()}
const scratch=document.createElement('canvas');scratch.width=W;scratch.height=H;const sg=scratch.getContext('2d');
window.render=t=>{t=clamp(t,0,TL.duration-.00001);let i=TL.scenes.findIndex(s=>t>=s.start&&t<s.end);if(i<0)i=TL.scenes.length-1;let u=t-TL.scenes[i].start;
 if(i>0&&u<.42){drawScene(i-1,TL.scenes[i].start-.001);sg.clearRect(0,0,W,H);sg.drawImage(c,0,0);drawScene(i,t);// Keep both sides of the printed wipe deterministic.
 // New sheet prints over the previous illustration; preserve previous canvas outside ragged wipe.
 const fresh=document.createElement('canvas');fresh.width=W;fresh.height=H;fresh.getContext('2d').drawImage(c,0,0);g.drawImage(scratch,0,0);g.save();g.clip(wipeRegion([0,0,W,H],'right',u/.42,17,30));g.drawImage(fresh,0,0);g.restore();let x=-30+u/.42*(W+60);g.save();squeegee(g,[x,-40],[x,H+40],[1,0],{color:TL.scenes[i].id==='cold'?BLUE:RED,handle:0,scale:1});g.restore();
 }else drawScene(i,t);subtitles(t)};
window.DUR=TL.duration;window.TL=TL;window.READY=true;window.render(0);
if(new URLSearchParams(location.search).has('render'))document.documentElement.classList.add('render');
const audio=document.getElementById('audio'),seek=document.getElementById('seek'),clock=document.getElementById('clock'),btn=document.getElementById('play');
btn.onclick=()=>{if(audio.paused){audio.play();btn.textContent='Pause'}else{audio.pause();btn.textContent='Play'}};seek.oninput=()=>{audio.currentTime=+seek.value;window.render(+seek.value)};
function loop(){if(!audio.paused){seek.value=audio.currentTime;window.render(audio.currentTime);clock.textContent=audio.currentTime.toFixed(1)+'s'}requestAnimationFrame(loop)}loop();
