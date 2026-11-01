import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
const planets=[
{name:'Merkurius',color:0x999999,size:.34,distance:4.2,speed:.045,desc:'Planet terkecil dan terdekat dari Matahari. Permukaannya dipenuhi kawah dan mengalami perubahan suhu ekstrem.',type:'Planet kebumian'},
{name:'Venus',color:0xd9a45e,size:.58,distance:6.1,speed:.032,desc:'Planet terpanas di Tata Surya. Atmosfer tebal kaya karbon dioksida memerangkap panas.',type:'Planet kebumian'},
{name:'Bumi',color:0x318ee8,size:.62,distance:8.2,speed:.025,desc:'Rumah bagi kehidupan yang diketahui. Bumi memiliki air dalam bentuk cair di permukaannya.',type:'Planet kebumian'},
{name:'Mars',color:0xc45c3b,size:.45,distance:10.4,speed:.020,desc:'Planet Merah karena oksida besi di permukaannya. Mars menjadi tujuan penting eksplorasi robotik.',type:'Planet kebumian'},
{name:'Jupiter',color:0xd2a477,size:1.35,distance:14.2,speed:.011,desc:'Planet terbesar di Tata Surya. Atmosfernya memiliki badai raksasa bernama Bintik Merah Besar.',type:'Raksasa gas'},
{name:'Saturnus',color:0xe5d09b,size:1.12,distance:18.2,speed:.008,desc:'Raksasa gas yang terkenal dengan sistem cincin dari es, debu, dan batuan.',type:'Raksasa gas'},
{name:'Uranus',color:0x80d9df,size:.82,distance:22.1,speed:.0055,desc:'Raksasa es biru kehijauan dengan sumbu rotasi yang sangat miring.',type:'Raksasa es'},
{name:'Neptunus',color:0x426be0,size:.79,distance:25.7,speed:.004,desc:'Planet terjauh dari Matahari. Atmosfernya memiliki angin yang sangat kencang.',type:'Raksasa es'}];
const list=document.querySelector('#planetList');
function selectPlanet(p){document.querySelector('#planetName').textContent=p.name;document.querySelector('#planetDescription').textContent=p.desc;}
planets.forEach((p,i)=>{const b=document.createElement('button');b.className='planet-card';b.innerHTML=`<div class="planet-ball" style="background:radial-gradient(circle at 30% 25%,#fff8,#${p.color.toString(16).padStart(6,'0')},#07101f);--glow:#${p.color.toString(16).padStart(6,'0')}"></div><h3>${p.name}</h3><p>${p.type}</p>`;b.addEventListener('click',()=>selectPlanet(p));list.appendChild(b);});
const facts=['Satu hari di Venus lebih lama daripada satu tahunnya.','Jupiter memiliki badai raksasa yang diamati selama ratusan tahun.','Cahaya Matahari membutuhkan sekitar 8 menit 20 detik untuk mencapai Bumi.','Jejak kaki astronot di Bulan dapat bertahan sangat lama karena hampir tidak ada angin atau hujan.','Neptunus ditemukan melalui prediksi matematika sebelum diamati langsung.'];
let fi=0;document.querySelector('#nextFact').addEventListener('click',()=>{fi=(fi+1)%facts.length;document.querySelector('#randomFact').textContent=facts[fi];document.querySelector('#factNumber').textContent=String(fi+1).padStart(2,'0');});
const toggle=document.querySelector('#menuToggle'),nav=document.querySelector('#nav');toggle.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const container=document.querySelector('#solarSystem'),loading=document.querySelector('#loading');
try{
const scene=new THREE.Scene();scene.background=new THREE.Color(0x050d1c);
const camera=new THREE.PerspectiveCamera(48,container.clientWidth/container.clientHeight,.1,200);camera.position.set(0,24,37);
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(container.clientWidth,container.clientHeight);container.prepend(renderer.domElement);
scene.add(new THREE.AmbientLight(0x8ab7df,1.4));const light=new THREE.PointLight(0xffd79a,160,100);scene.add(light);
const positions=[];for(let i=0;i<1100;i++)positions.push((Math.random()-.5)*100,(Math.random()-.5)*65,(Math.random()-.5)*100);
const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x9ecdf7,size:.12}));scene.add(stars);
const sun=new THREE.Mesh(new THREE.SphereGeometry(1.8,32,32),new THREE.MeshBasicMaterial({color:0xffc56b}));scene.add(sun);
const objects=[];
planets.forEach((p,i)=>{const orbit=new THREE.Mesh(new THREE.RingGeometry(p.distance-.012,p.distance+.012,128),new THREE.MeshBasicMaterial({color:0x3c7799,side:THREE.DoubleSide,transparent:true,opacity:.32}));orbit.rotation.x=Math.PI/2;scene.add(orbit);
const mesh=new THREE.Mesh(new THREE.SphereGeometry(p.size,28,28),new THREE.MeshStandardMaterial({color:p.color,roughness:.86}));const angle=i*.8;mesh.position.set(Math.cos(angle)*p.distance,0,Math.sin(angle)*p.distance);mesh.userData.planet=p;scene.add(mesh);
if(p.name==='Saturn'){const ring=new THREE.Mesh(new THREE.RingGeometry(1.35,2.05,64),new THREE.MeshBasicMaterial({color:0xc9b58b,side:THREE.DoubleSide,transparent:true,opacity:.72}));ring.rotation.x=Math.PI/2.35;mesh.add(ring);}objects.push({mesh,p,angle});});
loading.remove();
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();renderer.domElement.addEventListener('click',e=>{const r=renderer.domElement.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width*2-1;pointer.y=-(e.clientY-r.top)/r.height*2+1;ray.setFromCamera(pointer,camera);const hits=ray.intersectObjects(objects.map(o=>o.mesh));if(hits.length)selectPlanet(hits[0].object.userData.planet);});
let drag=false,px=0,py=0,ry=0,rx=0;renderer.domElement.addEventListener('pointerdown',e=>{drag=true;px=e.clientX;py=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);});renderer.domElement.addEventListener('pointermove',e=>{if(!drag)return;ry+=(e.clientX-px)*.006;rx=THREE.MathUtils.clamp(rx+(e.clientY-py)*.003,-.7,.7);px=e.clientX;py=e.clientY;});renderer.domElement.addEventListener('pointerup',()=>drag=false);renderer.domElement.addEventListener('pointercancel',()=>drag=false);renderer.domElement.addEventListener('wheel',e=>camera.position.z=THREE.MathUtils.clamp(camera.position.z+e.deltaY*.025,22,65),{passive:true});
const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);scene.rotation.y=ry;scene.rotation.x=rx;sun.rotation.y+=.002;objects.forEach(o=>{o.angle+=o.p.speed*.22;o.mesh.position.x=Math.cos(o.angle)*o.p.distance;o.mesh.position.z=Math.sin(o.angle)*o.p.distance;o.mesh.rotation.y+=.008;});stars.rotation.y=clock.getElapsedTime()*.003;renderer.render(scene,camera);}animate();
addEventListener('resize',()=>{const w=container.clientWidth,h=container.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);});
}catch(err){loading.textContent='SIMULASI 3D GAGAL DIMUAT. Periksa koneksi dan dukungan WebGL.';console.error(err);}
console.log('KOSMO V2 initialized.');
