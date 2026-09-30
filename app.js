const SERVER_URL=(window.BLOKUS_CONFIG?.SERVER_URL||'').replace(/\/$/,'');
const COLORS={blue:'青',yellow:'黄',red:'赤',green:'緑',orange:'橙',purple:'紫'};
const PIECES=[[[0,0]],[[0,0],[1,0]],[[0,0],[1,0],[2,0]],[[0,0],[0,1],[1,0]],[[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[1,0],[2,0],[1,1]],[[0,0],[0,1],[0,2],[1,2]],[[0,0],[1,0],[1,1],[2,1]],[[0,0],[1,0],[2,0],[3,0],[4,0]],[[0,0],[0,1],[0,2],[0,3],[1,3]],[[0,0],[0,1],[0,2],[1,0],[1,1]],[[0,0],[0,1],[1,1],[1,2],[2,2]],[[0,0],[1,0],[2,0],[3,0],[1,1]],[[0,0],[1,0],[2,0],[0,1],[0,2]],[[0,0],[1,0],[1,1],[2,1],[1,2]],[[0,0],[0,1],[1,1],[2,0],[2,1]],[[0,0],[1,0],[2,0],[1,1],[1,2]],[[0,0],[1,0],[2,0],[2,1],[3,1]],[[0,0],[1,0],[1,1],[1,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]]];
const TRIGON_PIECES=[[[0,0,0]],[[0,0,0],[0,0,1]],[[0,0,0],[0,0,1],[0,1,0]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1]],[[0,0,0],[0,0,1],[0,1,0],[1,0,0]],[[0,0,1],[0,1,0],[0,1,1],[1,0,0]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[0,2,0]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,1,0]],[[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[0,2,0],[0,2,1]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[0,2,0],[1,0,0]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,1,0]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,1],[1,1,0]],[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,1,0],[1,1,1]],[[0,0,1],[0,1,0],[0,1,1],[0,2,0],[0,2,1],[1,0,0]],[[0,0,1],[0,1,0],[0,1,1],[0,2,0],[0,2,1],[1,1,0]],[[0,0,1],[0,1,0],[0,1,1],[0,2,0],[1,1,0],[1,1,1]],[[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0]],[[0,0,1],[0,1,0],[0,1,1],[1,1,0],[1,1,1],[1,2,0]],[[0,1,0],[0,1,1],[0,2,0],[1,0,1],[1,1,0],[1,1,1]]];
const TRIGON_BOARD=[[-9,-1,1],[-9,0,0],[-9,0,1],[-9,1,0],[-9,1,1],[-9,2,0],[-9,2,1],[-9,3,0],[-9,3,1],[-9,4,0],[-9,4,1],[-9,5,0],[-9,5,1],[-9,6,0],[-9,6,1],[-9,7,0],[-9,7,1],[-9,8,0],[-9,8,1],[-8,-2,1],[-8,-1,0],[-8,-1,1],[-8,0,0],[-8,0,1],[-8,1,0],[-8,1,1],[-8,2,0],[-8,2,1],[-8,3,0],[-8,3,1],[-8,4,0],[-8,4,1],[-8,5,0],[-8,5,1],[-8,6,0],[-8,6,1],[-8,7,0],[-8,7,1],[-8,8,0],[-8,8,1],[-7,-3,1],[-7,-2,0],[-7,-2,1],[-7,-1,0],[-7,-1,1],[-7,0,0],[-7,0,1],[-7,1,0],[-7,1,1],[-7,2,0],[-7,2,1],[-7,3,0],[-7,3,1],[-7,4,0],[-7,4,1],[-7,5,0],[-7,5,1],[-7,6,0],[-7,6,1],[-7,7,0],[-7,7,1],[-7,8,0],[-7,8,1],[-6,-4,1],[-6,-3,0],[-6,-3,1],[-6,-2,0],[-6,-2,1],[-6,-1,0],[-6,-1,1],[-6,0,0],[-6,0,1],[-6,1,0],[-6,1,1],[-6,2,0],[-6,2,1],[-6,3,0],[-6,3,1],[-6,4,0],[-6,4,1],[-6,5,0],[-6,5,1],[-6,6,0],[-6,6,1],[-6,7,0],[-6,7,1],[-6,8,0],[-6,8,1],[-5,-5,1],[-5,-4,0],[-5,-4,1],[-5,-3,0],[-5,-3,1],[-5,-2,0],[-5,-2,1],[-5,-1,0],[-5,-1,1],[-5,0,0],[-5,0,1],[-5,1,0],[-5,1,1],[-5,2,0],[-5,2,1],[-5,3,0],[-5,3,1],[-5,4,0],[-5,4,1],[-5,5,0],[-5,5,1],[-5,6,0],[-5,6,1],[-5,7,0],[-5,7,1],[-5,8,0],[-5,8,1],[-4,-6,1],[-4,-5,0],[-4,-5,1],[-4,-4,0],[-4,-4,1],[-4,-3,0],[-4,-3,1],[-4,-2,0],[-4,-2,1],[-4,-1,0],[-4,-1,1],[-4,0,0],[-4,0,1],[-4,1,0],[-4,1,1],[-4,2,0],[-4,2,1],[-4,3,0],[-4,3,1],[-4,4,0],[-4,4,1],[-4,5,0],[-4,5,1],[-4,6,0],[-4,6,1],[-4,7,0],[-4,7,1],[-4,8,0],[-4,8,1],[-3,-7,1],[-3,-6,0],[-3,-6,1],[-3,-5,0],[-3,-5,1],[-3,-4,0],[-3,-4,1],[-3,-3,0],[-3,-3,1],[-3,-2,0],[-3,-2,1],[-3,-1,0],[-3,-1,1],[-3,0,0],[-3,0,1],[-3,1,0],[-3,1,1],[-3,2,0],[-3,2,1],[-3,3,0],[-3,3,1],[-3,4,0],[-3,4,1],[-3,5,0],[-3,5,1],[-3,6,0],[-3,6,1],[-3,7,0],[-3,7,1],[-3,8,0],[-3,8,1],[-2,-8,1],[-2,-7,0],[-2,-7,1],[-2,-6,0],[-2,-6,1],[-2,-5,0],[-2,-5,1],[-2,-4,0],[-2,-4,1],[-2,-3,0],[-2,-3,1],[-2,-2,0],[-2,-2,1],[-2,-1,0],[-2,-1,1],[-2,0,0],[-2,0,1],[-2,1,0],[-2,1,1],[-2,2,0],[-2,2,1],[-2,3,0],[-2,3,1],[-2,4,0],[-2,4,1],[-2,5,0],[-2,5,1],[-2,6,0],[-2,6,1],[-2,7,0],[-2,7,1],[-2,8,0],[-2,8,1],[-1,-9,1],[-1,-8,0],[-1,-8,1],[-1,-7,0],[-1,-7,1],[-1,-6,0],[-1,-6,1],[-1,-5,0],[-1,-5,1],[-1,-4,0],[-1,-4,1],[-1,-3,0],[-1,-3,1],[-1,-2,0],[-1,-2,1],[-1,-1,0],[-1,-1,1],[-1,0,0],[-1,0,1],[-1,1,0],[-1,1,1],[-1,2,0],[-1,2,1],[-1,3,0],[-1,3,1],[-1,4,0],[-1,4,1],[-1,5,0],[-1,5,1],[-1,6,0],[-1,6,1],[-1,7,0],[-1,7,1],[-1,8,0],[-1,8,1],[0,-9,0],[0,-9,1],[0,-8,0],[0,-8,1],[0,-7,0],[0,-7,1],[0,-6,0],[0,-6,1],[0,-5,0],[0,-5,1],[0,-4,0],[0,-4,1],[0,-3,0],[0,-3,1],[0,-2,0],[0,-2,1],[0,-1,0],[0,-1,1],[0,0,0],[0,0,1],[0,1,0],[0,1,1],[0,2,0],[0,2,1],[0,3,0],[0,3,1],[0,4,0],[0,4,1],[0,5,0],[0,5,1],[0,6,0],[0,6,1],[0,7,0],[0,7,1],[0,8,0],[1,-9,0],[1,-9,1],[1,-8,0],[1,-8,1],[1,-7,0],[1,-7,1],[1,-6,0],[1,-6,1],[1,-5,0],[1,-5,1],[1,-4,0],[1,-4,1],[1,-3,0],[1,-3,1],[1,-2,0],[1,-2,1],[1,-1,0],[1,-1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1],[1,2,0],[1,2,1],[1,3,0],[1,3,1],[1,4,0],[1,4,1],[1,5,0],[1,5,1],[1,6,0],[1,6,1],[1,7,0],[2,-9,0],[2,-9,1],[2,-8,0],[2,-8,1],[2,-7,0],[2,-7,1],[2,-6,0],[2,-6,1],[2,-5,0],[2,-5,1],[2,-4,0],[2,-4,1],[2,-3,0],[2,-3,1],[2,-2,0],[2,-2,1],[2,-1,0],[2,-1,1],[2,0,0],[2,0,1],[2,1,0],[2,1,1],[2,2,0],[2,2,1],[2,3,0],[2,3,1],[2,4,0],[2,4,1],[2,5,0],[2,5,1],[2,6,0],[3,-9,0],[3,-9,1],[3,-8,0],[3,-8,1],[3,-7,0],[3,-7,1],[3,-6,0],[3,-6,1],[3,-5,0],[3,-5,1],[3,-4,0],[3,-4,1],[3,-3,0],[3,-3,1],[3,-2,0],[3,-2,1],[3,-1,0],[3,-1,1],[3,0,0],[3,0,1],[3,1,0],[3,1,1],[3,2,0],[3,2,1],[3,3,0],[3,3,1],[3,4,0],[3,4,1],[3,5,0],[4,-9,0],[4,-9,1],[4,-8,0],[4,-8,1],[4,-7,0],[4,-7,1],[4,-6,0],[4,-6,1],[4,-5,0],[4,-5,1],[4,-4,0],[4,-4,1],[4,-3,0],[4,-3,1],[4,-2,0],[4,-2,1],[4,-1,0],[4,-1,1],[4,0,0],[4,0,1],[4,1,0],[4,1,1],[4,2,0],[4,2,1],[4,3,0],[4,3,1],[4,4,0],[5,-9,0],[5,-9,1],[5,-8,0],[5,-8,1],[5,-7,0],[5,-7,1],[5,-6,0],[5,-6,1],[5,-5,0],[5,-5,1],[5,-4,0],[5,-4,1],[5,-3,0],[5,-3,1],[5,-2,0],[5,-2,1],[5,-1,0],[5,-1,1],[5,0,0],[5,0,1],[5,1,0],[5,1,1],[5,2,0],[5,2,1],[5,3,0],[6,-9,0],[6,-9,1],[6,-8,0],[6,-8,1],[6,-7,0],[6,-7,1],[6,-6,0],[6,-6,1],[6,-5,0],[6,-5,1],[6,-4,0],[6,-4,1],[6,-3,0],[6,-3,1],[6,-2,0],[6,-2,1],[6,-1,0],[6,-1,1],[6,0,0],[6,0,1],[6,1,0],[6,1,1],[6,2,0],[7,-9,0],[7,-9,1],[7,-8,0],[7,-8,1],[7,-7,0],[7,-7,1],[7,-6,0],[7,-6,1],[7,-5,0],[7,-5,1],[7,-4,0],[7,-4,1],[7,-3,0],[7,-3,1],[7,-2,0],[7,-2,1],[7,-1,0],[7,-1,1],[7,0,0],[7,0,1],[7,1,0],[8,-9,0],[8,-9,1],[8,-8,0],[8,-8,1],[8,-7,0],[8,-7,1],[8,-6,0],[8,-6,1],[8,-5,0],[8,-5,1],[8,-4,0],[8,-4,1],[8,-3,0],[8,-3,1],[8,-2,0],[8,-2,1],[8,-1,0],[8,-1,1],[8,0,0]];
const TRIGON_STARTS=[[3,0,0],[0,3,0],[-4,3,1],[-4,0,0],[0,-4,0],[3,-4,1]];
let room=null,state=null,token=localStorage.getItem('blokus_token')||crypto.randomUUID(),selected=null,ori=0,flipped=false,hover=null,poll=null,cpuTimer=null,lastRenderSig='',cpuScheduledKey='',pinHideTimer=null,pingSocket=null,pingReconnectTimer=null,shownPingIds=new Set(),turnClockTimer=null;
const $=s=>document.querySelector(s); const nameEl=$('#name'); nameEl.value=localStorage.getItem('boardgamePlayerName')||'';
function newActionId(){return token+'-'+Date.now().toString(36)+'-'+crypto.randomUUID()} 
async function api(path,opt={}){if(!SERVER_URL)throw Error('SERVER_URLが未設定です');let r=await fetch(SERVER_URL+path,{headers:{'content-type':'application/json'},...opt});let j;try{j=await r.json()}catch{throw Error('サーバー応答が不正です')}if(!r.ok)throw Error(j.error||('HTTP '+r.status));return j}
function toast(s){let e=$('#toast');e.textContent=s;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1500)}
function roomFallbacks(){return [1,2,3,4].map(id=>({id,status:'待機中',players:[],count:0}))}
function drawRooms(rooms){
  let box=$('#rooms');if(!box)return;
  let byId=new Map((Array.isArray(rooms)?rooms:[]).map(r=>[Number(r.id),r]));
  let fixed=roomFallbacks().map(f=>({...f,...(byId.get(f.id)||{})}));
  box.innerHTML=fixed.map(r=>`<div class="room"><b>ROOM${r.id}</b><small>${r.status||'待機中'}<br>${Array.isArray(r.players)&&r.players.length?r.players.join(' / '):'0人'}</small><button onclick="join(${r.id})">${r.count?'参加':'作成・参加'}</button><button onclick="resetRoom(${r.id})">初期化</button></div>`).join('');
}
async function refreshRooms(){
  if(!$('#rooms')?.children.length)drawRooms(roomFallbacks());
  try{let d=await api('/rooms');drawRooms(d.rooms);$('#msg').textContent=''}
  catch(e){drawRooms(roomFallbacks());$('#msg').textContent='サーバー未接続: '+e.message}
}
window.resetRoom=async id=>{if(!confirm('ROOM'+id+'を初期化しますか？'))return;try{await api('/room/'+id+'/reset',{method:'POST',body:JSON.stringify({name:nameEl.value})});refreshRooms()}catch(e){alert(e.message)}};
window.join=async id=>{let name=nameEl.value.trim();if(!name)return alert('名前を入力してください');try{let d=await api('/room/'+id+'/join',{method:'POST',body:JSON.stringify({name,token})});room=id;localStorage.setItem('blokus_token',token);state=d.state;showRoomLobby();startPoll();connectPingSocket()}catch(e){alert(e.message)}};
function hideScreens(){['#lobby','#roomLobby','#game'].forEach(x=>$(x).hidden=true)} function showRoomLobby(){hideScreens();$('#roomLobby').hidden=false;render()} function showGame(){hideScreens();$('#game').hidden=false;render()}
function startPoll(){clearInterval(poll);poll=setInterval(sync,900)} function stateSig(s){if(!s)return'';return [s.phase,s.turnIndex,s.history?.length||0,s.players?.length||0,s.results?.length||0].join('|')}
async function sync(){if(!room)return;try{let d=await api('/room/'+room+'/state?token='+encodeURIComponent(token)),sig=stateSig(d.state);state=d.state;if(sig!==lastRenderSig){lastRenderSig=sig;render()}scheduleCpu()}catch(e){}}
function scheduleCpu(){
  if(!state||state.phase!=='playing'){clearTimeout(cpuTimer);cpuTimer=null;cpuScheduledKey='';return}
  let t=state.turns?.[state.turnIndex],p=state.players?.find(x=>x.token===t?.token);
  if(!p?.cpu){clearTimeout(cpuTimer);cpuTimer=null;cpuScheduledKey='';return}
  let key=[state.gameSessionId||'',state.turnIndex,state.history?.length||0,t.token,t.color].join('|');
  if(cpuScheduledKey===key&&cpuTimer)return;
  clearTimeout(cpuTimer);cpuScheduledKey=key;
  cpuTimer=setTimeout(async()=>{
    cpuTimer=null;
    try{
      let d=await api('/room/'+room+'/cpu-step',{method:'POST',body:JSON.stringify({turnKey:key})});
      state=d.state;lastRenderSig=stateSig(state);cpuScheduledKey='';render();scheduleCpu()
    }catch(e){cpuScheduledKey='';toast(e.message);setTimeout(scheduleCpu,1000)}
  },1000)
}
function myPlayer(){return state?.players.find(p=>p.token===token)}
function renderTurnClock(){
 let el=$('#turnTimer');if(!el)return;
 if(!state||state.phase!=='playing'||!Number(state.timeLimitSec)){el.textContent='制限時間なし';return}
 let remain=Math.max(0,Math.ceil((Number(state.turnDeadlineAt||0)-Date.now())/1000));
 el.textContent=`残り ${remain}秒`;
}
function startTurnClock(){clearInterval(turnClockTimer);renderTurnClock();turnClockTimer=setInterval(renderTurnClock,250)}
function render(){if(!state)return;if(state.phase==='lobby'){if($('#roomLobby').hidden)showRoomLobby();renderWaitingLobby();return}if($('#game').hidden)showGame();startTurnClock();let n=state.size;
if(state.variant==='trigon'){
 $('#board').classList.add('trigonBoard');$('#board').style.gridTemplateColumns='';renderTrigonBoard()
}else{
 $('#board').classList.remove('trigonBoard');$('#board').style.gridTemplateColumns=`repeat(${n},1fr)`;let startInfo={};for(let t of(state.turns||[])){if((state.used?.[t.color]||[]).length===0){let key=t.start.join(',');startInfo[key]={color:t.color,label:(COLORS[t.color]||t.color)}}}$('#board').innerHTML=state.board.flatMap((row,y)=>row.map((c,x)=>{let si=startInfo[x+','+y];return `<div class="cell ${c||''} ${si?'startMark start-'+si.color:''}" data-start-label="${si?si.label:''}" data-x="${x}" data-y="${y}"></div>`})).join('')
}
$('#board').querySelectorAll(state.variant==='trigon'?'.triCell':'.cell').forEach(c=>{c.onmouseenter=()=>preview(+c.dataset.x,+c.dataset.y,c.dataset.o==null?null:+c.dataset.o)});
if(hover)drawPreview(...hover);let cur=state.turns[state.turnIndex];$('#turnText').textContent=state.phase==='finished'?'ゲーム終了':`${cur?.name||''} / ${COLORS[cur?.color]||''} の手番`;
$('#players').style.setProperty('--player-count',Math.max(1,state.players.length));$('#players').innerHTML=state.players.map(p=>{let cs=p.colors||[], cls=cs.length===1?cs[0]:'multi',sty=cs.length>1?` style="--c1:${cssColor(cs[0])};--c2:${cssColor(cs[1])}"`:'';return `<div class="player ${cls} ${cur?.token===p.token?'active':''}"${sty} role="button" tabindex="0" onclick="showPlayerPieces('${p.token}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();showPlayerPieces('${p.token}')}" title="残りピースを見る"><b>${p.name}${p.cpu?' [CPU]':''}</b><br>${cs.map(c=>`${COLORS[c]}${(state.passedColors||[]).includes(c)?' <span class="passMini">パス</span>':''}`).join('・')}<br>残り ${p.remainingSquares}${state.variant==='trigon'?'△':'マス'}${cs.length&&cs.every(c=>(state.passedColors||[]).includes(c))?'<div class="passBadge">パス</div>':''}<div class="colorDots">${cs.map(c=>`<i class="colorDot ${c}"></i>`).join('')}</div></div>`}).join('');if(state.phase==='finished'){renderResult();return}$('#modal').hidden=true;renderPieces();scheduleCpu()}
function showSharedPin(pin){
  if(!pin?.id||shownPingIds.has(pin.id))return;
  shownPingIds.add(pin.id);if(shownPingIds.size>64)shownPingIds=new Set([...shownPingIds].slice(-32));
  clearTimeout(pinHideTimer);document.querySelectorAll('#board .boardPin').forEach(e=>e.remove());
  let pc=pin.o==null?$(`#board .cell[data-x="${pin.x}"][data-y="${pin.y}"]`):$(`#board .triCell[data-x="${pin.x}"][data-y="${pin.y}"][data-o="${pin.o}"]`);if(!pc)return;
  let mark;if(state?.variant==='trigon'){mark=document.createElementNS('http://www.w3.org/2000/svg','circle');let poly=triPolygon([+pc.dataset.x,+pc.dataset.y,+pc.dataset.o]),cx=poly.reduce((z,q)=>z+q[0],0)/3,cy=poly.reduce((z,q)=>z+q[1],0)/3;mark.setAttribute('cx',cx);mark.setAttribute('cy',cy);mark.setAttribute('r','.24');mark.setAttribute('class','boardPin triBoardPin');mark.setAttribute('fill',cssColor(pin.playerColor||'blue'));pc.parentNode.appendChild(mark)}else{mark=document.createElement('span');mark.className='boardPin';mark.style.setProperty('--pin-color',cssColor(pin.playerColor||'blue'));pc.appendChild(mark)}
  pinHideTimer=setTimeout(()=>mark.remove(),3000);
}
function closePingSocket(){clearTimeout(pingReconnectTimer);pingReconnectTimer=null;if(pingSocket){try{pingSocket.onclose=null;pingSocket.close()}catch{}pingSocket=null}}
function connectPingSocket(){
  closePingSocket();if(!room||!token)return;
  let url=SERVER_URL.replace(/^http:/,'ws:').replace(/^https:/,'wss:')+`/room/${room}/ws?token=${encodeURIComponent(token)}`;
  try{
    let ws=new WebSocket(url);pingSocket=ws;
    ws.onmessage=e=>{try{let m=JSON.parse(e.data);if(m.type==='board_ping')showSharedPin(m.ping)}catch{}};
    ws.onclose=()=>{if(pingSocket===ws)pingSocket=null;if(room)pingReconnectTimer=setTimeout(connectPingSocket,1200)};
    ws.onerror=()=>{};
  }catch{if(room)pingReconnectTimer=setTimeout(connectPingSocket,1200)}
}
function sendBoardPing(cell){
  if(!cell||!pingSocket||pingSocket.readyState!==WebSocket.OPEN){toast('ピン接続中です');return false}
  let ping={id:`ping-${Date.now()}-${Math.random().toString(36).slice(2)}`,x:+cell.dataset.x,y:+cell.dataset.y,o:cell.dataset.o==null?null:+cell.dataset.o};
  pingSocket.send(JSON.stringify({type:'board_ping',ping}));return true;
}
function renderWaitingLobby(){let host=state.players[0]?.token===token,count=state.players.length;$('#roomTitle').textContent=`ROOM ${room}`;$('#waitingPlayers').innerHTML=state.players.map((p,i)=>`<div class="seatRow"><span class="seatNo">${i+1}</span><span class="seatName">${p.name}</span>${p.cpu?'<span class="cpuTag">CPU Lv'+(p.level||2)+'</span>':''}${host&&p.cpu?`<button class="removeCpu" onclick="removeCpu('${p.token}')">削除</button>`:''}</div>`).join('')+Array.from({length:Math.max(0,4-count)},(_,i)=>`<div class="seatRow"><span class="seatNo">${count+i+1}</span><span class="seatName" style="color:#9aa5ae">空席</span></div>`).join('');$('#hostSettings').querySelectorAll('button,select').forEach(e=>e.disabled=!host);$('#addCpuBtn').hidden=!host||count>=4;$('#startBtn').hidden=!host;$('#modeSetting').hidden=!(host&&count===2&&($('#variant')?.value||'square')==='square');
let om=$('#turnOrderMode'),manual=$('#manualOrder');if(om&&manual){manual.hidden=om.value!=='manual';if(!manual.hidden){let prev=[...manual.querySelectorAll('select')].map(s=>s.value);manual.innerHTML=state.players.map((p,i)=>`<label>${i+1}番手<select class="orderSelect" data-pos="${i}">${state.players.map(q=>`<option value="${q.token}" ${((prev[i]||state.players[i]?.token)===q.token)?'selected':''}>${q.name}${q.cpu?' [CPU]':''}</option>`).join('')}</select></label>`).join('');manual.querySelectorAll('select').forEach(s=>s.disabled=!host)}}$('#waitNote').textContent=host?(count<2?'2人以上で開始できます。':'設定後、ゲームを開始できます。'):'ホストのゲーム開始を待っています。'}
$('#turnOrderMode').onchange=()=>{if(state)renderWaitingLobby()};$('#variant').onchange=()=>{if(state)renderWaitingLobby()};window.addCpu=async()=>{try{await act('addCpu',{level:+($('#cpuLv')?.value||2)})}catch(e){alert(e.message)}};window.removeCpu=async cpuToken=>{try{await act('removeCpu',{cpuToken})}catch(e){alert(e.message)}};window.startGame=async()=>{let b=$('#startBtn');try{b.classList.add('startBusy');b.textContent='開始中…';let orderMode=$('#turnOrderMode')?.value||'random',playerOrder=null;if(orderMode==='manual'){playerOrder=[...document.querySelectorAll('#manualOrder .orderSelect')].map(s=>s.value);if(new Set(playerOrder).size!==state.players.length)throw new Error('手番順に同じプレイヤーが重複しています。全員を1回ずつ選んでください。')}await act('start',{mode:$('#mode')?.value||null,orderMode,playerOrder,timeLimitSec:+($('#timeLimit')?.value||0),variant:$('#variant')?.value||'square'});if(state.phase!=='lobby'){let n=nameEl.value.trim().slice(0,18);if(n)localStorage.setItem('boardgamePlayerName',n);showGame()}}catch(e){alert(e.message)}finally{b.classList.remove('startBusy');b.textContent='ゲーム開始'}};
async function act(type,data={}){let d=await api('/room/'+room+'/action',{method:'POST',body:JSON.stringify({token,type,actionId:newActionId(),...data})});state=d.state;lastRenderSig=stateSig(state);render();scheduleCpu()}
function triVerts(c){let[i,j,o]=c;return o===0?[[i,j],[i+1,j],[i,j+1]]:[[i+1,j],[i,j+1],[i+1,j+1]]}
function triCellFromVerts(vs){let set=new Set(vs.map(v=>v.join(','))),xs=vs.map(v=>v[0]),ys=vs.map(v=>v[1]);for(let i=Math.min(...xs)-1;i<=Math.max(...xs);i++)for(let j=Math.min(...ys)-1;j<=Math.max(...ys);j++)for(let o=0;o<2;o++){let v=triVerts([i,j,o]);if(v.every(x=>set.has(x.join(','))))return[i,j,o]}return null}
function triNorm(q){let mi=Math.min(...q.map(c=>c[0])),mj=Math.min(...q.map(c=>c[1]));return q.map(([i,j,o])=>[i-mi,j-mj,o]).sort((x,y)=>x.join(',').localeCompare(y.join(',')))}
function triTransform(shape){let out=[];for(let c of shape){let vs=triVerts(c).map(([i,j])=>{if(flipped)[i,j]=[i+j,-j];for(let k=0;k<ori;k++)[i,j]=[-j,i+j];return[i,j]});out.push(triCellFromVerts(vs))}return triNorm(out)}
function currentPieces(){return state?.variant==='trigon'?TRIGON_PIECES:PIECES}
function triBoardSet(){return new Set((state?.trigonCells||TRIGON_BOARD).map(c=>c.join(',')))}
function triPlayable(c){if(!triBoardSet().has(c.join(',')))return false;if(state.mode!=='trigon3')return true;let pts=triVerts(c).map(([i,j])=>[i+j/2,j*Math.sqrt(3)/2]),cx=pts.reduce((z,p)=>z+p[0],0)/3,cy=pts.reduce((z,p)=>z+p[1],0)/3,n=8;return Math.abs(cx)<=n&&Math.abs(cy)<=Math.sqrt(3)*n/2&&Math.abs(cx)+Math.abs(cy)/Math.sqrt(3)<=n}
function transforms(shape){let pts=shape.map(([x,y])=>[flipped?-x:x,y]);for(let i=0;i<ori;i++)pts=pts.map(([x,y])=>[-y,x]);let minx=Math.min(...pts.map(p=>p[0])),miny=Math.min(...pts.map(p=>p[1]));return pts.map(([x,y])=>[x-minx,y-miny])}
function cssColor(c){return({blue:'#2d7dd2',yellow:'#f0c83d',red:'#d84a4a',green:'#42a66c',orange:'#e98b35',purple:'#8359b7'})[c]||'#777'}
function triPoint(i,j){return [i+j/2,j*Math.sqrt(3)/2]}
function triPolygon(c){return triVerts(c).map(([i,j])=>triPoint(i,j))}
function triSvgGeometry(cells,pad=0.12){let polys=cells.map(triPolygon),pts=polys.flat(),minx=Math.min(...pts.map(p=>p[0])),maxx=Math.max(...pts.map(p=>p[0])),miny=Math.min(...pts.map(p=>p[1])),maxy=Math.max(...pts.map(p=>p[1]));return{polys,minx:minx-pad,miny:miny-pad,w:(maxx-minx||1)+pad*2,h:(maxy-miny||1)+pad*2}}
function triPieceSvg(shape,color){let g=triSvgGeometry(shape,.10),polys=g.polys.map(p=>`<polygon points="${p.map(q=>q.join(',')).join(' ')}"></polygon>`).join('');return `<svg class="triPieceSvg ${color}" viewBox="${g.minx} ${g.miny} ${g.w} ${g.h}" preserveAspectRatio="xMidYMid meet">${polys}</svg>`}
function renderTrigonBoard(){let cells=(state.trigonCells||TRIGON_BOARD).filter(q=>triPlayable(q)),allPolys=cells.map(triPolygon),pts=allPolys.flat(),minx=Math.min(...pts.map(p=>p[0])),maxx=Math.max(...pts.map(p=>p[0])),miny=Math.min(...pts.map(p=>p[1])),maxy=Math.max(...pts.map(p=>p[1])),pad=.08,occupied=state.board||{},starts={};for(let t of(state.turns||[]))if((state.used?.[t.color]||[]).length===0)starts[t.start.join(',')]=t.color;let body=cells.map((cell,idx)=>{let[i,j,o]=cell,k=cell.join(','),col=occupied[k]||'',st=starts[k]||'',points=allPolys[idx].map(q=>q.join(',')).join(' ');return `<polygon class="triCell ${col}" points="${points}" data-x="${i}" data-y="${j}" data-o="${o}"></polygon>`}).join('');
 let marks=Object.entries(starts).map(([k,col])=>{let cell=k.split(',').map(Number),poly=triPolygon(cell),cx=poly.reduce((z,q)=>z+q[0],0)/3,cy=poly.reduce((z,q)=>z+q[1],0)/3,label=COLORS[col]||col;return `<g class="triStartMark" pointer-events="none"><circle cx="${cx}" cy="${cy}" r=".31" fill="#fff" stroke="${cssColor(col)}" stroke-width=".09"></circle><text x="${cx}" y="${cy+.09}" text-anchor="middle" font-size=".27" font-weight="900" fill="${cssColor(col)}">${label}</text></g>`}).join('');
 $('#board').innerHTML=`<svg class="trigonSvg" viewBox="${minx-pad} ${miny-pad} ${maxx-minx+pad*2} ${maxy-miny+pad*2}" preserveAspectRatio="xMidYMid meet">${body}${marks}</svg>`}
function pieceHtml(shape,color){if(state?.variant==='trigon')return triPieceSvg(shape,color);let maxx=Math.max(...shape.map(p=>p[0])),maxy=Math.max(...shape.map(p=>p[1])),set=new Set(shape.map(p=>p.join(','))),h=`<span class="miniPiece" style="grid-template-columns:repeat(${maxx+1},12px);grid-template-rows:repeat(${maxy+1},12px)">`;for(let y=0;y<=maxy;y++)for(let x=0;x<=maxx;x++)h+=set.has(x+','+y)?`<i class="miniCell ${color}"></i>`:'<i></i>';return h+'</span>'}
function localLegal(color,piece,cells){if(state?.variant==='trigon'){if(!color||piece==null||new Set(cells.map(c=>c.join(','))).size!==cells.length)return false;for(let c of cells)if(!triPlayable(c)||state.board[c.join(',')])return false;let first=(state.used[color]||[]).length===0,t=state.turns.find(t=>t.color===color);if(first&&!cells.some(c=>c.join(',')===t.start.join(',')))return false;let own=Object.entries(state.board).filter(([k,v])=>v===color).map(([k])=>k.split(',').map(Number)),corner=false;for(let c of cells){let cv=triVerts(c);for(let oc of own){let ov=triVerts(oc),common=cv.filter(v=>ov.some(q=>q[0]===v[0]&&q[1]===v[1])).length;if(common>=2)return false;if(common===1)corner=true}}return first||corner}if(!color||piece==null)return false;let set=new Set(cells.map(p=>p.join(',')));if(set.size!==cells.length)return false;for(let [x,y] of cells)if(x<0||y<0||x>=state.size||y>=state.size||state.board[y][x])return false;let first=(state.used[color]||[]).length===0;if(first){let t=state.turns.find(t=>t.color===color);if(!t||!cells.some(([x,y])=>x===t.start[0]&&y===t.start[1]))return false}let diag=false;for(let [x,y] of cells){for(let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]])if(state.board[y+dy]?.[x+dx]===color)return false;for(let [dx,dy] of [[1,1],[1,-1],[-1,1],[-1,-1]])if(state.board[y+dy]?.[x+dx]===color)diag=true}return first||diag}
function renderPieces(){
  let me=myPlayer(),cur=state.turns[state.turnIndex];
  if(!me){$('#remain').textContent='';$('#pieces').innerHTML='';return}
  let myColors=me.colors||[],activeColor=(cur?.token===token&&myColors.includes(cur.color))?cur.color:null;
  let colors=activeColor?[activeColor]:myColors;
  let totalRem=0,html='';
  for(let color of colors){
    let used=new Set(state.used[color]||[]);
    let rem=currentPieces().reduce((sum,p,i)=>sum+(used.has(i)?0:p.length),0);totalRem+=rem;
    if(colors.length>1)html+=`<div class="pieceColorLabel ${color}">${COLORS[color]||color}</div>`;
    html+=currentPieces().map((p,i)=>{
      if(used.has(i))return '';
      let disabled=!activeColor||color!==activeColor;
      return `<button class="piece ${selected===i&&activeColor===color?'sel':''} ${!activeColor?'waiting':''}" ${disabled?'disabled':''} onclick="selPiece(${i})" aria-label="${p.length}マスピース">${pieceHtml(p,color)}</button>`
    }).join('');
  }
  $('#remain').textContent=totalRem+(state.variant==='trigon'?'△':'マス');
  $('#pieces').innerHTML=html||'<small>ピースなし</small>';
}
function isMobileGame(){return matchMedia('(max-width:760px)').matches}
function updateConfirm(){let b=$('#confirm');if(!b)return;let cur=state?.turns?.[state.turnIndex],ok=false;if(selected!=null&&hover&&cur?.token===token)ok=localLegal(cur.color,selected,placementCells(...hover));b.disabled=!ok}
window.selPiece=i=>{selected=i;ori=0;flipped=false;document.querySelectorAll('#pieces .piece').forEach(b=>b.classList.remove('sel'));let btn=[...document.querySelectorAll('#pieces .piece')].find(b=>b.getAttribute('onclick')===`selPiece(${i})`);if(btn)btn.classList.add('sel');if(hover)drawPreview(...hover);updateConfirm()};$('#rot').onclick=()=>{ori=(ori+1)%(state?.variant==='trigon'?6:4);if(hover)preview(...hover);updateConfirm()};$('#flip').onclick=()=>{flipped=!flipped;if(hover)preview(...hover);updateConfirm()};$('#pinBtn').onclick=()=>{pinMode=!pinMode;$('#pinBtn').classList.toggle('pinActive',pinMode);toast(pinMode?'盤面のピンを挿す位置を選択':'ピンをキャンセル')};$('#confirm').onclick=()=>{if(selected!=null&&hover&&!$('#confirm').disabled)place(...hover)};
function clearPreview(){document.querySelectorAll('#board .cell.previewOk,#board .cell.previewGhost,#board .triCell.previewOk,#board .triCell.previewGhost').forEach(c=>{c.classList.remove('previewOk','previewGhost');c.style.removeProperty('--preview-color');if(c.classList.contains('triCell')){c.style.removeProperty('fill');c.style.removeProperty('opacity')}})}
function placementCells(x,y,o=null){if(state.variant==='trigon')return triTransform(TRIGON_PIECES[selected]).map(([i,j,z])=>[x+i,y+j,z]);return transforms(PIECES[selected]).map(([dx,dy])=>[x+dx,y+dy])}
function findCell(c){return state.variant==='trigon'?document.querySelector(`.triCell[data-x="${c[0]}"][data-y="${c[1]}"][data-o="${c[2]}"]`):document.querySelector(`.cell[data-x="${c[0]}"][data-y="${c[1]}"]`)}
function drawPreview(x,y,o=null){clearPreview();if(selected==null)return;let cur=state.turns[state.turnIndex];if(cur?.token!==token)return;let cells=placementCells(x,y,o),ok=localLegal(cur.color,selected,cells);for(let q of cells){let el=findCell(q);if(!el)continue;el.classList.add(ok?'previewOk':'previewGhost');if(state.variant==='trigon'){el.style.setProperty('fill',ok?cssColor(cur.color):'#111820','important');el.style.setProperty('opacity',ok?'.62':'.78','important')}else if(ok)el.style.setProperty('--preview-color',cssColor(cur.color))}}
function preview(x,y,o=null){hover=state.variant==='trigon'?[x,y,o]:[x,y];drawPreview(...hover);updateConfirm()}
async function place(x,y,o=null){if(selected==null)return;try{await act('place',{piece:selected,cells:placementCells(x,y,o)});selected=null;hover=null;updateConfirm()}catch(e){toast(e.message)}}
const boardEl=$('#board');
let mobilePieceDrag=null,pinMode=false;
function cellFromPoint(x,y){
  let el=document.elementFromPoint(x,y);
  let cell=el?.closest?.('.cell,.triCell');
  return cell&&boardEl.contains(cell)?cell:null;
}
function sendPinCell(cell){if(!cell)return;pinMode=false;$('#pinBtn')?.classList.remove('pinActive');sendBoardPing(cell)}
function previewFromPoint(x,y){
  let cell=cellFromPoint(x,y);
  if(!cell||selected==null)return;
  preview(+cell.dataset.x,+cell.dataset.y,cell.dataset.o==null?null:+cell.dataset.o);
}
boardEl.addEventListener('pointerdown',e=>{
  let cell=e.target.closest('.cell,.triCell');
  if(pinMode&&cell&&boardEl.contains(cell)){e.preventDefault();sendPinCell(cell);return}
  if(!isMobileGame()||selected==null)return;
  if(!cell||!boardEl.contains(cell))return;
  mobilePieceDrag={id:e.pointerId};boardEl.classList.add('draggingPiece');
  boardEl.setPointerCapture?.(e.pointerId);
  e.preventDefault();
  preview(+cell.dataset.x,+cell.dataset.y,cell.dataset.o==null?null:+cell.dataset.o);
});
boardEl.addEventListener('pointermove',e=>{
  if(isMobileGame()){
    if(!mobilePieceDrag||mobilePieceDrag.id!==e.pointerId||selected==null)return;
    e.preventDefault();
    previewFromPoint(e.clientX,e.clientY);
    return;
  }
  let cell=e.target.closest('.cell,.triCell');
  if(cell&&boardEl.contains(cell))preview(+cell.dataset.x,+cell.dataset.y,cell.dataset.o==null?null:+cell.dataset.o)
});
boardEl.addEventListener('pointerup',e=>{
  if(isMobileGame()){
    if(!mobilePieceDrag||mobilePieceDrag.id!==e.pointerId)return;
    e.preventDefault();
    previewFromPoint(e.clientX,e.clientY);
    mobilePieceDrag=null;boardEl.classList.remove('draggingPiece');
    try{boardEl.releasePointerCapture?.(e.pointerId)}catch{}
    return;
  }
  let cell=e.target.closest('.cell,.triCell');
  if(!cell||!boardEl.contains(cell)||selected==null)return;
  e.preventDefault();
  place(+cell.dataset.x,+cell.dataset.y,cell.dataset.o==null?null:+cell.dataset.o)
});
boardEl.addEventListener('pointercancel',e=>{
  if(mobilePieceDrag&&mobilePieceDrag.id===e.pointerId){mobilePieceDrag=null;boardEl.classList.remove('draggingPiece')}
});

window.showPlayerPieces=playerToken=>{
  if(!state)return;
  let p=state.players.find(x=>x.token===playerToken);if(!p)return;
  let html=(p.colors||[]).map(color=>{
    let used=new Set(state.used?.[color]||[]);
    let pieces=currentPieces().map((shape,i)=>used.has(i)?'':`<div class="viewPiece">${pieceHtml(shape,color)}</div>`).join('');
    return `<section class="viewColor"><h3><i class="colorDot ${color}"></i>${COLORS[color]||color}　残り ${currentPieces().filter((_,i)=>!used.has(i)).length}個</h3><div class="viewPieceGrid">${pieces||'<p>残りピースなし</p>'}</div></section>`
  }).join('');
  $('#modalBody').innerHTML=`<div class="pieceViewer"><div class="pieceViewerHead"><h2>${p.name} の残りピース</h2><button type="button" onclick="closePlayerPieces()">閉じる</button></div>${html}</div>`;
  $('#modal').hidden=false;
};
window.closePlayerPieces=()=>{$('#modal').hidden=true};
function renderResult(){if(!$('#modal').hidden)return;$('#modal').hidden=false;let rows=state.results.map((r,i)=>`<div class="resultRow rank${i+1}"><span class="rank">${i+1}</span><strong>${r.name}</strong><b>${r.score}<small>点</small></b></div>`).join('');$('#modalBody').innerHTML=`<div class="resultCard"><div class="resultEyebrow">GAME RESULT</div><h2>対局終了</h2><div class="resultRows">${rows}</div><div class="resultActions"><button class="subResult" onclick="closeResult()">最終盤面を見る</button><button class="mainResult" onclick="backLobby()">ロビーへ戻る</button></div></div>`}window.closeResult=()=>$('#modal').hidden=true;window.backLobby=async()=>act('backLobby');
window.leaveRoom=()=>{
  let leavingRoom=room,leavingState=state,leaveToken=token;
  closePingSocket();clearInterval(poll);poll=null;clearInterval(turnClockTimer);turnClockTimer=null;clearTimeout(cpuTimer);cpuTimer=null;
  room=null;state=null;selected=null;hover=null;pinMode=false;lastRenderSig='';cpuScheduledKey='';
  hideScreens();$('#lobby').hidden=false;drawRooms(roomFallbacks());refreshRooms();
  if(leavingRoom&&leavingState)api('/room/'+leavingRoom+'/action',{method:'POST',body:JSON.stringify({token:leaveToken,type:'leave',actionId:newActionId()})}).catch(()=>{});
};$('#leave').onclick=leaveRoom;$('#roomLeave').onclick=leaveRoom;$('#addCpuBtn').onclick=addCpu;$('#startBtn').onclick=startGame;
drawRooms(roomFallbacks());refreshRooms();setInterval(()=>{if(!room)refreshRooms()},3000);
let lastGameTouchEnd=0;
$('#game').addEventListener('touchend',e=>{
  let now=Date.now();
  if(now-lastGameTouchEnd<=320)e.preventDefault();
  lastGameTouchEnd=now;
},{passive:false});
