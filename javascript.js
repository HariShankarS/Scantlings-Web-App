function arrayassign(){
  d = [];
  l = [];
  o = [];
  q = [];
  for( i=0; i<23; i++ ){
   d[i] = document.getElementById("d"+i).value;
   l[i] = document.getElementById("l"+i).value;
   o[i] = document.getElementById("o"+i).value;
   q[i] = document.getElementById("q"+i).value;
  }
  lbp     = document.getElementById("lbp").value;
  t       = document.getElementById("t").value;
  len     = document.getElementById("len").value;
  bredth  = document.getElementById("bredth").value;

 if(l[11]>l[12]) {
  Am = l[11];
  }
  else {
  Am = l[12];
  }
  calc(d, l, o, q, lbp, len, bredth, t, Am);
};




function calc(d, l, o, q, lbp, len, bredth, t, Am){
  //var h,lbp,t,l,br,dens,v,delta,lcb,vcbkb,Aw,d,tpc,Is,It,Ilcf,BMt,BMi,KMt,KMi,MCT1cm,Cb,Cm,Cpl,Cpv,wsa;
  var a = [0,0.25,0.5,0.75,1,1.5,2,2.5,3,3.5,4,5,6,6.5,7,7.5,8,8.5,9,9.25,9.5,9.75,10];//stations
  var b = [0.25,1,0.5,1,0.75,2,1,2,1,2,1.5,4,1.5,2,1,2,1,2,0.75,1,0.5,1,0.25];//simpson multipliers
  var c = [];//levers
  for (i=0; i<23; i++){
    if(i<12){ 
      c[i] = 5-a[i];
    }
    else{
      c[i] = a[i]-5;
    }
  }

  // d[i]= halfbreadths using input 
  var e = [];// products of waterplane area
  e[23] = 0;
  for (i=0; i<23; i++){
    e[i]  = d[i] * b[i];
    e[23] = e[23] + e[i];
  }

  var f = [];//product for moment of area about midship
  f[23] = 0;
  f[24] = 0;
  for(i=0; i<23; i++){
    f[i] = e[i] * c[i];
    if(i<12){
      f[23] = f[23] + f[i];
    }
    else{
      f[24]=f[24]+f[i];
    }
  }

  var g = [];//product for longitudinal moment of inertia about the stations
  g[23] = 0;
  for(i=0; i<23; i++){
    g[i] = f[i] * c[i];
    g[23] = g[23] + g[i];
  }

  var h = [];/*(half breadths)^3*/
  for(i=0; i<23; i++){
    h[i] = d[i] * d[i] * d[i];
  }

  var k = [];/*product for transverse moment of inertia about central line*/
  k[23] = 0;
  for(i=0; i<23; i++){
    k[i] = h[i] * b[i];
    k[23]= k[23] + k[i];
  }
  
  //var l=[];//bonjeans using input
  var m = [];/*product for volume of displacement*/
  m[23] = 0;
  for(i=0; i<23; i++){
    m[i] = l[i] * b[i];
    m[23] = m[23] + m[i];
    
  }
  
  var n = [];/*product for moment of volume about midship*/
  n[23] = 0;
  n[24] = 0;
  for(i=0; i<23; i++){
    n[i] = m[i] * c[i];
    if(i<12){
      n[23] = n[23] + n[i];
    }
    else{
      n[24] = n[24] + n[i];
    }
  }
  
  //var o=[]; /*vertical moments using input */
  var p = [];/*product for vertical moments of volume about baseline*/
  p[23] = 0;
  o[23] = 0;
  for(i=0; i<23; i++){
    p[i] = o[i] * b[i];
    p[23] = p[23] + p[i];
    o[23] = o[23] + o[i];
  }
  
  //var q=[];/*half girths*/
  var r = []; //wetted surface area
  r[23] = 0;
  for(i=0; i<23; i++){
    r[i] = q[i] * b[i];
    r[23] = r[23] + r[i];
  }

  h        = lbp/10;
  dens     = 1.025;
  v        = 0.333*h*m[23];
  delta    = v*dens;
  lcb      = (h*(n[23]-n[24]))/m[23];
  vcbkb    = p[23]/m[23];
  Aw       = 2*h*0.333*e[23];
  d        = h*(f[23]-f[24])/e[23];
  tpc      = 0.01*Aw*dens;
  Is       = 2*h*h*h*0.333*g[23];
  It       = 2*h*0.1111*k[23];
  Ilcf     = Is-(Aw*d*d);
  BMt      = It/v;
  BMi      = Ilcf/v;
  KMt      = lcb+BMt;
  KMi      = lcb+BMi;
  MCT1cm   = (delta*BMi*0.01)/len;
  Cb       = v/(len*bredth);
  Cm       = Am/(bredth*t);
  Cw       = Aw/(len*bredth);
  Cpl      = v/(Am*len);
  Cpv      = v/(Aw*t);
  wsa      = 2*0.333*h*r[23];
  yn23     = n[23];
  yn24     = n[24]; 

document.getElementById("v").innerHTML=v.toFixed(4);
document.getElementById("delta").innerHTML=delta.toFixed(4);
document.getElementById("lcb").innerHTML=lcb.toFixed(4);
document.getElementById("vcbkb").innerHTML=vcbkb.toFixed(4);
console.log(m[23]);
document.getElementById("Aw").innerHTML=Aw.toFixed(4);
document.getElementById("d").innerHTML=d.toFixed(4);
document.getElementById("tpc").innerHTML=tpc.toFixed(4);
document.getElementById("Is").innerHTML=Is.toFixed(4);
document.getElementById("It").innerHTML=It.toFixed(4);
document.getElementById("Ilcf").innerHTML=Ilcf.toFixed(4);
document.getElementById("BMt").innerHTML=BMt.toFixed(4);
document.getElementById("BMi").innerHTML=BMi.toFixed(4);
document.getElementById("KMt").innerHTML=KMt.toFixed(4);
document.getElementById("KMi").innerHTML=KMi.toFixed(4);
document.getElementById("MCT1cm").innerHTML=MCT1cm.toFixed(4);
document.getElementById("Cb").innerHTML=Cb.toFixed(4);
document.getElementById("Cm").innerHTML=Cm.toFixed(4);
document.getElementById("Cw").innerHTML=Cw.toFixed(4);
document.getElementById("Cpl").innerHTML=Cpl.toFixed(4);
document.getElementById("Cpv").innerHTML=Cpv.toFixed(4);
document.getElementById("wsa").innerHTML=wsa.toFixed(4);
document.getElementById("yn23").innerHTML=yn23.toFixed(4);
document.getElementById("yn24").innerHTML=yn24.toFixed(4);
}

