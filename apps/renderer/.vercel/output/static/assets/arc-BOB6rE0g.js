import{$ as ln,a0 as an,a1 as y,a2 as tn,a3 as G,a4 as q,a5 as _,a6 as un,a7 as rn,a8 as K,a9 as o,aa as z,ab as sn,ac as on,ad as fn}from"./index-0gsVZ72Z.js";function cn(l){return l.innerRadius}function yn(l){return l.outerRadius}function gn(l){return l.startAngle}function dn(l){return l.endAngle}function mn(l){return l&&l.padAngle}function pn(l,h,I,D,v,A,B,a){var O=I-l,i=D-h,n=B-v,d=a-A,u=d*O-n*i;if(!(u*u<y))return u=(n*(h-A)-d*(l-v))/u,[l+u*O,h+u*i]}function V(l,h,I,D,v,A,B){var a=l-I,O=h-D,i=(B?A:-A)/K(a*a+O*O),n=i*O,d=-i*a,u=l+n,s=h+d,f=I+n,c=D+d,C=(u+f)/2,t=(s+c)/2,m=f-u,g=c-s,R=m*m+g*g,T=v-A,P=u*c-f*s,S=(g<0?-1:1)*K(fn(0,T*T*R-P*P)),$=(P*g-m*S)/R,j=(-P*m-g*S)/R,w=(P*g+m*S)/R,p=(-P*m+g*S)/R,x=$-C,e=j-t,r=w-C,F=p-t;return x*x+e*e>r*r+F*F&&($=w,j=p),{cx:$,cy:j,x01:-n,y01:-d,x11:$*(v/T-1),y11:j*(v/T-1)}}function hn(){var l=cn,h=yn,I=z(0),D=null,v=gn,A=dn,B=mn,a=null,O=ln(i);function i(){var n,d,u=+l.apply(this,arguments),s=+h.apply(this,arguments),f=v.apply(this,arguments)-an,c=A.apply(this,arguments)-an,C=un(c-f),t=c>f;if(a||(a=n=O()),s<u&&(d=s,s=u,u=d),!(s>y))a.moveTo(0,0);else if(C>tn-y)a.moveTo(s*G(f),s*q(f)),a.arc(0,0,s,f,c,!t),u>y&&(a.moveTo(u*G(c),u*q(c)),a.arc(0,0,u,c,f,t));else{var m=f,g=c,R=f,T=c,P=C,S=C,$=B.apply(this,arguments)/2,j=$>y&&(D?+D.apply(this,arguments):K(u*u+s*s)),w=_(un(s-u)/2,+I.apply(this,arguments)),p=w,x=w,e,r;if(j>y){var F=sn(j/u*q($)),L=sn(j/s*q($));(P-=F*2)>y?(F*=t?1:-1,R+=F,T-=F):(P=0,R=T=(f+c)/2),(S-=L*2)>y?(L*=t?1:-1,m+=L,g-=L):(S=0,m=g=(f+c)/2)}var H=s*G(m),J=s*q(m),M=u*G(T),N=u*q(T);if(w>y){var Q=s*G(g),U=s*q(g),W=u*G(R),X=u*q(R),E;if(C<rn)if(E=pn(H,J,W,X,Q,U,M,N)){var Y=H-E[0],Z=J-E[1],b=Q-E[0],k=U-E[1],nn=1/q(on((Y*b+Z*k)/(K(Y*Y+Z*Z)*K(b*b+k*k)))/2),en=K(E[0]*E[0]+E[1]*E[1]);p=_(w,(u-en)/(nn-1)),x=_(w,(s-en)/(nn+1))}else p=x=0}S>y?x>y?(e=V(W,X,H,J,s,x,t),r=V(Q,U,M,N,s,x,t),a.moveTo(e.cx+e.x01,e.cy+e.y01),x<w?a.arc(e.cx,e.cy,x,o(e.y01,e.x01),o(r.y01,r.x01),!t):(a.arc(e.cx,e.cy,x,o(e.y01,e.x01),o(e.y11,e.x11),!t),a.arc(0,0,s,o(e.cy+e.y11,e.cx+e.x11),o(r.cy+r.y11,r.cx+r.x11),!t),a.arc(r.cx,r.cy,x,o(r.y11,r.x11),o(r.y01,r.x01),!t))):(a.moveTo(H,J),a.arc(0,0,s,m,g,!t)):a.moveTo(H,J),!(u>y)||!(P>y)?a.lineTo(M,N):p>y?(e=V(M,N,Q,U,u,-p,t),r=V(H,J,W,X,u,-p,t),a.lineTo(e.cx+e.x01,e.cy+e.y01),p<w?a.arc(e.cx,e.cy,p,o(e.y01,e.x01),o(r.y01,r.x01),!t):(a.arc(e.cx,e.cy,p,o(e.y01,e.x01),o(e.y11,e.x11),!t),a.arc(0,0,u,o(e.cy+e.y11,e.cx+e.x11),o(r.cy+r.y11,r.cx+r.x11),t),a.arc(r.cx,r.cy,p,o(r.y11,r.x11),o(r.y01,r.x01),!t))):a.arc(0,0,u,T,R,t)}if(a.closePath(),n)return a=null,n+""||null}return i.centroid=function(){var n=(+l.apply(this,arguments)+ +h.apply(this,arguments))/2,d=(+v.apply(this,arguments)+ +A.apply(this,arguments))/2-rn/2;return[G(d)*n,q(d)*n]},i.innerRadius=function(n){return arguments.length?(l=typeof n=="function"?n:z(+n),i):l},i.outerRadius=function(n){return arguments.length?(h=typeof n=="function"?n:z(+n),i):h},i.cornerRadius=function(n){return arguments.length?(I=typeof n=="function"?n:z(+n),i):I},i.padRadius=function(n){return arguments.length?(D=n==null?null:typeof n=="function"?n:z(+n),i):D},i.startAngle=function(n){return arguments.length?(v=typeof n=="function"?n:z(+n),i):v},i.endAngle=function(n){return arguments.length?(A=typeof n=="function"?n:z(+n),i):A},i.padAngle=function(n){return arguments.length?(B=typeof n=="function"?n:z(+n),i):B},i.context=function(n){return arguments.length?(a=n??null,i):a},i}export{hn as d};
