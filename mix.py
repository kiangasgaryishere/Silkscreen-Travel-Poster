from pathlib import Path
import json,numpy as np,soundfile as sf
from scipy.signal import butter,sosfilt,resample_poly
D=Path(__file__).parent
voice,sr=sf.read(D/'assets/narration.wav');voice=resample_poly(voice,2,1);sr=48000;n=len(voice)
# The supplied voice remains in place, at its original speed, for every source sample.
rng=np.random.default_rng(31);fx=np.zeros(n);amb=np.zeros(n);tl=json.load(open(D/'timeline.json'))
def filt(x,lo,hi):return sosfilt(butter(2,[lo,hi],btype='bandpass',fs=sr,output='sos'),x)
def add(t,d,amp,kind='scrape'):
 m=int(d*sr);tt=np.arange(m)/sr;v=rng.standard_normal(m)
 if kind=='scrape':v=filt(v,700,4200)*(np.minimum(1,tt/.035)*np.minimum(1,(d-tt)/.07))*(.75+.25*np.sin(2*np.pi*245*tt)**2)
 elif kind=='clamp':v=filt(v,130,2800)*np.exp(-tt/0.023)
 else:v=filt(v,900,6000)*np.exp(-tt/.008)
 v=v/max(1e-7,np.max(np.abs(v)));a=round(t*sr);b=min(n,a+m)
 if b>a:fx[a:b]+=amp*v[:b-a]
# Short air moves anticipate selected camera cuts; no repeating blade scrape.
for t in [5.43,11.83,34.98,41.73]:add(t,.24,.012,'scrape')
for t in [12.8,21.9,38.5,42.95]:add(t,.11,.020,'clamp')
for t in [14.0,25.34,40.0,50.7]:add(t,.065,.010,'tick')
# Very quiet non-tonal environmental air. No musical or periodic instrumental layer.
noise=filt(rng.standard_normal(n),100,900);noise/=max(np.std(noise),1e-8);tt=np.arange(n)/sr
bed=np.full(n,.0014);bed[(tt>32.1)&(tt<35.19)]=0;bed[(tt>41.2)&(tt<42.7)]=0
bed*=np.minimum(1,tt/.4)*np.minimum(1,(n/sr-tt)/.4);amb=noise*bed
mix=voice+fx+amb
if np.max(np.abs(mix))>.98:mix*=.98/np.max(np.abs(mix))
sf.write(D/'out/mix.wav',np.column_stack([mix,mix]),sr,subtype='PCM_24')
print('Mix length',n,'samples at',sr,'=',n/sr,'s; no music')
