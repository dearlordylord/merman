import{_ as e,l as s,G as n,k as i,H as p}from"./index-C7m__bwO.js";import{p as g}from"./gitGraph-YCYPL57B-BW892VPG.js";import"./_baseUniq-DDlVMDPk.js";import"./_basePickBy-1XMW8IS7.js";import"./clone-C8Omd7qC.js";var v={parse:e(async r=>{const a=await g("info",r);s.debug(a)},"parse")},d={version:p},m=e(()=>d.version,"getVersion"),c={getVersion:m},l=e((r,a,o)=>{s.debug(`rendering info diagram
`+r);const t=n(a);i(t,100,400,!0),t.append("g").append("text").attr("x",100).attr("y",40).attr("class","version").attr("font-size",32).style("text-anchor","middle").text(`v${o}`)},"draw"),f={draw:l},S={parser:v,db:c,renderer:f};export{S as diagram};
