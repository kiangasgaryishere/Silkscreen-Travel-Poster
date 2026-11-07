import json
from pathlib import Path
D=Path(__file__).parent
rows=[
(0.31,2.15,'برج ایفل تابستونا بلندتره،','The Eiffel Tower is taller in summer.'),
(2.15,3.75,'زمستونا کوتاه‌تر؛','Shorter in winter.'),
(4.02,5.35,'چطور ممکنه؟','How is that possible?'),
(5.65,8.25,'برای فهمیدنش، باید از نمای معروف برج فاصله بگیریم','To understand why, look beyond the landmark'),
(8.25,11.55,'و بریم سراغ آهن‌هایی که اسکلتش رو ساختن.','to the iron that forms its structure.'),
(12.02,15.3,'وقتی آهن گرم می‌شه، یه‌کم منبسط می‌شه؛','When iron heats up, it expands a little.'),
(15.44,17.4,'یعنی اندازه‌ش افزایش پیدا می‌کنه.','In other words, it gets bigger.'),
(17.53,19.1,'این تغییر توی یه تکه آهن کوچیک،','In a small piece of iron,'),
(19.1,21.15,'به‌سختی به چشم میاد.','the change is barely visible.'),
(21.21,23.4,'اما اسکلت برج ایفل هم','But the Eiffel Tower’s structure'),
(23.4,25.25,'به همین گرما واکنش نشون می‌ده','responds to that same heat,'),
(25.34,26.9,'و ارتفاعش کمی بیشتر می‌شه.','and becomes slightly taller.'),
(27.02,29.95,'هوا که سرد بشه، آهن منقبض می‌شه','When it gets cold, the iron contracts.'),
(30.16,31.95,'و برج دوباره کمی کوتاه‌تر می‌شه.','The tower becomes slightly shorter again.'),
(32.10,35.05,'ولی داستان فقط بالا و پایین رفتن نیست…','But there’s more than an up-and-down change…'),
(35.19,38.35,'خورشید همه طرف برج رو یکسان گرم نمی‌کنه.','The sun doesn’t heat every side equally.'),
(38.35,40.0,'سمت آفتاب‌خورده گرم‌تر می‌شه','The sunlit side gets warmer'),
(40.0,41.8,'و بیشتر انبساط پیدا می‌کنه.','and expands more.'),
(41.93,42.9,'نتیجه؟','The result?'),
(42.93,45.95,'برج خیلی کم به سمت مخالف خورشید خم می‌شه؛','The tower bends very slightly away from the sun.'),
(46.09,48.25,'انگار داره از آفتاب فاصله می‌گیره.','As if it’s leaning away from the sunlight.'),
(48.42,51.95,'با جابه‌جا شدن خورشید، جهت این تغییر هم عوض می‌شه.','As the sun moves, the direction changes too.'),
(52.12,54.1,'البته این حرکت اون‌قدر کوچیکه','But this movement is so small'),
(54.28,56.85,'که وقتی پای برج ایستادی، متوجهش نمی‌شی.','you won’t notice it standing below the tower.'),
(56.99,58.6,'این رفتار طبیعی سازه‌ست','This is a natural response of the structure.'),
(58.6,61.15,'و به‌خودی‌خود نشونه آسیب نیست.','By itself, it isn’t a sign of damage.'),
(61.35,64.0,'پس اون برجی که توی عکس‌ها کاملاً ثابت به نظر میاد،','So the tower that looks perfectly still in photos'),
(64.0,66.65,'در طول روز هم واکنش نشون می‌ده.','is responding throughout the day.'),
(66.87,68.55,'قبل از این ویدئو، فکر می‌کردی','Before this video, did you think'),
(68.55,71.621541667,'یه برج فلزی هم با گرما تغییر اندازه بده؟','a metal tower could change size with heat?')]
cues=[dict(t0=a,t1=b,fa=fa,en=en) for a,b,fa,en in rows]
scenes=[
(0,5.65,'summer-winter','تابستون بلندتر؟','TALLER IN SUMMER?','Full / front elevation / matched comparison','Slow 3% push','Matched towers print in warm and cold palettes; preserve structural geometry.','Two short paper stamps'),
(5.65,12.02,'iron','راز، توی آهنه','LOOK INSIDE THE IRON','Close-up / orthographic oblique material insert','Push through lattice, then lateral slide','A brace fills the frame; rivets and adjacent bracing reveal iron structure.','Mesh scrape, low metal tap'),
(12.02,17.53,'bar','گرما، انبساط','HEAT → EXPANSION','Insert / top-down orthographic','Locked for legible comparison','Sun warms an iron bar; the bar extends against an original-length ghost.','Dry ink drag synchronized to growth'),
(17.53,21.21,'small','تغییر کوچیک، اثر بزرگ','SMALL CHANGE. BIG STRUCTURE.','Macro / top-down','Pull back from bar to a pair of beams','Show subtle actual-scale bar, then an enlarged comparison explicitly labelled schematic.','Paper tick'),
(21.21,27.02,'height','کمی بلندتر','A LITTLE TALLER','Full / front elevation','Slow vertical crane preserving baseline','Tower schematic grows slightly against a paper baseline and height marker.','Scrape as marker rises'),
(27.02,32.10,'cold','سرما، انقباض','COLD → CONTRACTION','Full / same matched elevation','Lock baseline, small pullback','Cold palette re-inks tower; exaggerated schematic height returns.','Short re-ink sweep'),
(32.10,35.19,'turn','فقط بالا و پایین نیست…','THERE’S ANOTHER MOVEMENT','Full / front elevation','Suspended slow push','Stable tower; lone sun enters upper right; room for curiosity.','Near-silence in foley and ambience'),
(35.19,41.93,'uneven','دو طرف، دو دما','TWO SIDES. DIFFERENT HEAT.','Medium / orthographic diagram','Push toward two parallel structural strips','Sunlit side warms and lengthens; shaded side stays cool. No numerical scale.','Two ink pulls, soft clamp'),
(41.93,48.42,'bend','دور از آفتاب','AWAY FROM THE SUN','Full / schematic front elevation','Locked framing for causal direction','Right-side sun; tower schematic bends left, with directional arrow.','Clamp on result, soft directional scrape'),
(48.42,52.12,'sun','با حرکت خورشید','AS THE SUN MOVES','Full / front schematic','Lateral truck following sun','Sun moves right to left; bend changes left to right.','Soft wind leads next shot'),
(52.12,61.35,'human','اون‌قدر کم که نمی‌بینی','TOO SMALL TO NOTICE','Wide / slight low-angle illustration','Gentle pullback to visitors for scale','Perfectly stable tower, small visitors, park and river. No dramatic bending.','Restrained city-like air, paper steps'),
(61.35,66.87,'return','ثابت به نظر میاد','IT ONLY LOOKS STILL','Full / front elevation','Slow push into same opening geometry','Warm/cold ink sweep revisits opening with labels expansion and contraction.','Two soft print pulls'),
(66.87,71.621541667,'end','تو چی فکر می‌کردی؟','DID YOU KNOW?','Full / matched front elevation','Settle and hold','Same tower with warm/cold halves; end on the viewer question, no logo.','Paper-settle tick, ambience tails within original duration')]
ss=[dict(start=a,end=b,duration=b-a,id=id,title=title,enTitle=en,shot=shot,camera=cam,action=act,sfx=sfx,music='None',transition='Motivated ink-pull wipe',subject='No people except stable scale silhouettes in human shot',lens='Virtual orthographic / compressed perspective',depth_of_field='Deep focus; depth by value and overlap',focus='Causal graphic / tower silhouette',lighting='Flat ink light from sun side',composition='Subject central; captions below illustration') for a,b,id,title,en,shot,cam,act,sfx in scenes]
json.dump({'duration':1718917/24000,'scenes':ss,'cues':cues},open(D/'timeline.json','w'),ensure_ascii=False,indent=2)
def stamp(t):
 ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
for lang in ['fa','en','bilingual']:
 text='\n\n'.join(f'{i+1}\n{stamp(c["t0"])} --> {stamp(c["t1"])}\n'+(c['fa']+'\n'+c['en'] if lang=='bilingual' else c[lang]) for i,c in enumerate(cues))+'\n'
 (D/f'eiffel.{lang}.srt').write_text(text)
with open(D/'SHOTLIST.md','w') as f:
 f.write('# Audio-led shot timeline\n\nNo music in any shot. Original recording duration: 71.621541667 s. All timing below is in seconds. Each graphic enters with a 0.42 s ink pull; it exits with the next shot’s motivated ink wipe. Captions have individual exact cue times in timeline.json and the SRT files.\n\n')
 for i,s in enumerate(ss):
  f.write(f'## {i+1}. {s["start"]:.3f}–{s["end"]:.3f} ({s["duration"]:.3f} s): {s["id"]}\n\n')
  for k in ['shot','camera','lens','depth_of_field','focus','subject','lighting','composition','action','sfx','music','transition']:f.write(f'- {k}: {s[k]}\n')
  f.write('- On-screen title: '+s['title']+' / '+s['enTitle']+'\n- Narration / captions:\n')
  for c in cues:
   if s['start']<=c['t0']<s['end']:f.write(f'  - {c["t0"]:.3f}–{c["t1"]:.3f}: {c["fa"]} / {c["en"]}\n')
  f.write('\n')
