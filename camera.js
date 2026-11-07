// Editorial cameras use semantic subjects and matched framing. Scene changes
// are cuts through moving cameras, never moving panels, wipes or overlays.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ease=t=>{t=clamp(t,0,1);return t*t*(3-2*t)};
function track(t,keys){let a=keys[0],b=keys.at(-1);for(let i=1;i<keys.length;i++)if(t<=keys[i][0]){a=keys[i-1];b=keys[i];break}
 const u=ease((t-a[0])/Math.max(.001,b[0]-a[0]));return [1,2,3,4].map(i=>a[i]+(b[i]-a[i])*u)}
const center=(t,z=1.04)=>[t,z,540,960,0];
export const EDITS=[
 {time:5.65,kind:'Lattice match cut',out:'Push toward tower brace',in:'Close structural lattice, pull back'},
 {time:12.02,kind:'Material match cut',out:'Push into iron joint',in:'Iron bar, settle into explanation'},
 {time:17.53,kind:'Continuous insert',out:'Hold bar comparison',in:'Same bar, gradual detail push'},
 {time:21.21,kind:'Scale reveal',out:'Close view of expanded iron',in:'Pull back to tower elevation'},
 {time:27.02,kind:'Continuous seasonal grade',out:'Warm tower at matched height',in:'Same elevation cools without a spatial wipe'},
 {time:32.10,kind:'Matched tower cut',out:'Stable cool elevation',in:'Stable warm elevation, push toward sun'},
 {time:35.19,kind:'Sun match cut',out:'Push toward sun',in:'Sunlit material, pull back to two sides'},
 {time:41.93,kind:'Warm-side match cut',out:'Close warm structural strip',in:'Tower silhouette reveals direction'},
 {time:48.42,kind:'Continuous sun follow',out:'Bend away from right-hand sun',in:'Same diagram follows moving sun'},
 {time:52.12,kind:'Scale match cut',out:'Release diagram camera',in:'Pull back to visitors and stable tower'},
 {time:61.35,kind:'Landmark match cut',out:'Visitor-scale elevation',in:'Same landmark, gentle closing push'},
 {time:66.87,kind:'Unbroken closing shot',out:'Seasonal palette changes',in:'Camera settles on final question'}
];
export function cameraAt(t,scenes){const s=scenes.find(s=>t>=s.start&&t<s.end)||scenes.at(-1);let keys;
 switch(s.id){
 case 'summer-winter':keys=[center(0,1.025),center(4.6,1.025),[5.65,1.66,540,1035,-.012]];break;
 case 'iron':keys=[[5.65,1.66,540,1035,-.012],[6.85,1.09,540,960,-.006],[10.8,1.15,556,950,-.009],[12.02,1.8,580,980,-.012]];break;
 case 'bar':case 'small':keys=[[12.02,1.55,565,995,0],center(13.15,1.045),center(17.53,1.045),[20.35,1.14,575,1010,0],[21.21,1.34,600,1030,0]];break;
 case 'height':case 'cold':keys=[[21.21,1.22,510,970,0],center(22.5,1.025),center(27.02,1.025),center(32.1,1.09)];break;
 case 'turn':keys=[center(32.1,1.09),[33.1,1.1,560,910,0],[35.19,1.72,815,520,0]];break;
 case 'uneven':keys=[[35.19,1.72,850,480,0],center(36.6,1.04),center(39.6,1.04),[41.93,1.35,690,985,0]];break;
 case 'bend':case 'sun':keys=[[41.93,1.35,620,980,0],center(43.1,1.04),center(48.42,1.04),[50.5,1.07,510,960,0],center(52.12,1.025)];break;
 case 'human':keys=[center(52.12,1.025),center(55,1.025),center(61.35,1.005)];break;
 default:keys=[center(61.35,1.035),center(66.87,1.075),center(70.8,1.04),center(71.622,1.04)];
 }
 let [zoom,x,y,roll]=track(t,keys);
 // Bound the view inside the art, including the small deliberate lattice roll.
 const r=Math.abs(roll),halfX=(540*Math.cos(r)+960*Math.sin(r))/zoom,halfY=(960*Math.cos(r)+540*Math.sin(r))/zoom;
 x=clamp(x,halfX+1,1080-halfX-1);y=clamp(y,halfY+1,1920-halfY-1);
 return {zoom,x,y,roll};
}
