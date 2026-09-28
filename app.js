const SERVER_URL=(window.BLOKUS_CONFIG?.SERVER_URL||'').replace(/\/$/,'');
const COLORS={blue:'青',yellow:'黄',red:'赤',green:'緑',orange:'橙',purple:'紫'};
const PIECES=[[[0,0]],[[0,0],[1,0]],[[0,0],[1,0],[2,0]],[[0,0],[0,1],[1,0]],[[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[1,0],[2,0],[1,1]],[[0,0],[0,1],[0,2],[1,2]],[[0,0],[1,0],[1,1],[2,1]],[[0,0],[1,0],[2,0],[3,0],[4,0]],[[0,0],[0,1],[0,2],[0,3],[1,3]],[[0,0],[0,1],[0,2],[1,0],[1,1]],[[0,0],[0,1],[1,1],[1,2],[2,2]],[[0,0],[1,0],[2,0],[3,0],[1,1]],[[0,0],[1,0],[2,0],[0,1],[0,2]],[[0,0],[1,0],[1,1],[2,1],[1,2]],[[0,0],[0,1],[1,1],[2,1],[2,2]],[[0,0],[1,0],[2,0],[1,1],[1,2]],[[0,0],[1,0],[2,0],[2,1],[3,1]],[[0,0],[1,0],[1,1],[1,2],[2,2]],[[0,0],[0,1],[1,1],[1,2],[2,1]]];
let room=null,state=null,token=localStorage.getItem('blokus_token')||crypto.randomUUID(),selected=null,ori=0,flipped=false,hover=null,poll=null,cpuTimer=null,lastRenderSig='',cpuScheduledKey='';
const $=s=>document.querySelector(s); const nameEl=$('#name'); nameEl.value=localStorage.getItem('boardgamePlayerName')||'';
function newActionId(){return token+'-'+Date.now().toString(36)+'-'+crypto.randomUUID()} 
async function api(path,opt={}){if(!SERVER_URL)throw Error('SERVER_URLが未設定です');let r=await fetch(SERVER_URL+path,{headers:{'content-type':'application/json'},...opt});let j;try{j=await r.json()}catch{throw Error('サーバー応答が不正です')}if(!r.ok)throw Error(j.error||('HTTP '+r.status));return j}
function toast(s){let e=$('#toast');e.textContent=s;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1500)}
async function refreshRooms(){try{let d=await api('/rooms'),rooms=Array.isArray(d.rooms)&&d.rooms.length?d.rooms:[1,2,3,4].map(id=>({id,status:'待機中',players:[],count:0}));$('#rooms').innerHTML=rooms.map(r=>`<div class="room"><b>ROOM${r.id}</b><small>${r.status}<br>${r.players.join(' / ')||'0人'}</small><button onclick="join(${r.id})">${r.count?'参加':'作成・参加'}</button><button onclick="resetRoom(${r.id})">初期化</button></div>`).join('')}catch(e){$('#msg').textContent='サーバー未接続: '+e.message}}
window.resetRoom=async id=>{if(!confirm('ROOM'+id+'を初期化しますか？'))return;try{await api('/room/'+id+'/reset',{method:'POST',body:JSON.stringify({name:nameEl.value})});refreshRooms()}catch(e){alert(e.message)}};
window.join=async id=>{let name=nameEl.value.trim();if(!name)return alert('名前を入力してください');try{let d=await api('/room/'+id+'/join',{method:'POST',body:JSON.stringify({name,token})});room=id;localStorage.setItem('blokus_token',token);state=d.state;showRoomLobby();startPoll()}catch(e){alert(e.message)}};
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
function render(){if(!state)return;if(state.phase==='lobby'){if($('#roomLobby').hidden)showRoomLobby();renderWaitingLobby();return}if($('#game').hidden)showGame();let n=state.size;$('#board').style.gridTemplateColumns=`repeat(${n},1fr)`;let startInfo={};for(let t of (state.turns||[])){if((state.used?.[t.color]||[]).length===0){let key=t.start.join(',');startInfo[key]={color:t.color,label:(COLORS[t.color]||t.color)}}}$('#board').innerHTML=state.board.flatMap((row,y)=>row.map((c,x)=>{let si=startInfo[x+','+y];return `<div class="cell ${c||''} ${si?'startMark start-'+si.color:''}" data-start-label="${si?si.label:''}" data-x="${x}" data-y="${y}"></div>`})).join('');
$('#board').querySelectorAll('.cell').forEach(c=>{c.onmouseenter=()=>preview(+c.dataset.x,+c.dataset.y)});if(hover)drawPreview(...hover);let cur=state.turns[state.turnIndex];$('#turnText').textContent=state.phase==='finished'?'ゲーム終了':`${cur?.name||''} / ${COLORS[cur?.color]||''} の手番`;
$('#players').innerHTML=state.players.map(p=>{let cs=p.colors||[], cls=cs.length===1?cs[0]:'multi',sty=cs.length>1?` style="--c1:${cssColor(cs[0])};--c2:${cssColor(cs[1])}"`:'';return `<div class="player ${cls} ${cur?.token===p.token?'active':''}"${sty}><b>${p.name}${p.cpu?' [CPU]':''}</b><br>${cs.map(c=>`${COLORS[c]}${(state.passedColors||[]).includes(c)?' <span class="passMini">パス</span>':''}`).join('・')}<br>残り ${p.remainingSquares}マス${cs.length&&cs.every(c=>(state.passedColors||[]).includes(c))?'<div class="passBadge">パス</div>':''}<div class="colorDots">${cs.map(c=>`<i class="colorDot ${c}"></i>`).join('')}</div></div>`}).join('');if(state.phase==='finished'){renderResult();return}$('#modal').hidden=true;renderPieces();scheduleCpu()}
function renderWaitingLobby(){let host=state.players[0]?.token===token,count=state.players.length;$('#roomTitle').textContent=`ROOM ${room}`;$('#waitingPlayers').innerHTML=state.players.map((p,i)=>`<div class="seatRow"><span class="seatNo">${i+1}</span><span class="seatName">${p.name}</span>${p.cpu?'<span class="cpuTag">CPU Lv'+(p.level||2)+'</span>':''}${host&&p.cpu?`<button class="removeCpu" onclick="removeCpu('${p.token}')">削除</button>`:''}</div>`).join('')+Array.from({length:Math.max(0,4-count)},(_,i)=>`<div class="seatRow"><span class="seatNo">${count+i+1}</span><span class="seatName" style="color:#9aa5ae">空席</span></div>`).join('');$('#hostSettings').querySelectorAll('button,select').forEach(e=>e.disabled=!host);$('#addCpuBtn').hidden=!host||count>=4;$('#startBtn').hidden=!host;$('#modeSetting').hidden=!(host&&count===2);$('#waitNote').textContent=host?(count<2?'2人以上で開始できます。':'設定後、ゲームを開始できます。'):'ホストのゲーム開始を待っています。'}
window.addCpu=async()=>{try{await act('addCpu',{level:+($('#cpuLv')?.value||2)})}catch(e){alert(e.message)}};window.removeCpu=async cpuToken=>{try{await act('removeCpu',{cpuToken})}catch(e){alert(e.message)}};window.startGame=async()=>{let b=$('#startBtn');try{b.classList.add('startBusy');b.textContent='開始中…';await act('start',{mode:$('#mode')?.value||null});if(state.phase!=='lobby'){let n=nameEl.value.trim().slice(0,18);if(n)localStorage.setItem('boardgamePlayerName',n);showGame()}}catch(e){alert(e.message)}finally{b.classList.remove('startBusy');b.textContent='ゲーム開始'}};
async function act(type,data={}){let d=await api('/room/'+room+'/action',{method:'POST',body:JSON.stringify({token,type,actionId:newActionId(),...data})});state=d.state;lastRenderSig=stateSig(state);render();scheduleCpu()}
function transforms(shape){let pts=shape.map(([x,y])=>[flipped?-x:x,y]);for(let i=0;i<ori;i++)pts=pts.map(([x,y])=>[-y,x]);let minx=Math.min(...pts.map(p=>p[0])),miny=Math.min(...pts.map(p=>p[1]));return pts.map(([x,y])=>[x-minx,y-miny])}
function cssColor(c){return({blue:'#2d7dd2',yellow:'#f0c83d',red:'#d84a4a',green:'#42a66c',orange:'#e98b35',purple:'#8359b7'})[c]||'#777'}
function pieceHtml(shape,color){let maxx=Math.max(...shape.map(p=>p[0])),maxy=Math.max(...shape.map(p=>p[1])),set=new Set(shape.map(p=>p.join(','))),h=`<span class="miniPiece" style="grid-template-columns:repeat(${maxx+1},12px);grid-template-rows:repeat(${maxy+1},12px)">`;for(let y=0;y<=maxy;y++)for(let x=0;x<=maxx;x++)h+=set.has(x+','+y)?`<i class="miniCell ${color}"></i>`:'<i></i>';return h+'</span>'}
function localLegal(color,piece,cells){if(!color||piece==null)return false;let set=new Set(cells.map(p=>p.join(',')));if(set.size!==cells.length)return false;for(let [x,y] of cells)if(x<0||y<0||x>=state.size||y>=state.size||state.board[y][x])return false;let first=(state.used[color]||[]).length===0;if(first){let t=state.turns.find(t=>t.color===color);if(!t||!cells.some(([x,y])=>x===t.start[0]&&y===t.start[1]))return false}let diag=false;for(let [x,y] of cells){for(let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]])if(state.board[y+dy]?.[x+dx]===color)return false;for(let [dx,dy] of [[1,1],[1,-1],[-1,1],[-1,-1]])if(state.board[y+dy]?.[x+dx]===color)diag=true}return first||diag}
function renderPieces(){
  let me=myPlayer(),cur=state.turns[state.turnIndex];
  if(!me){$('#remain').textContent='';$('#pieces').innerHTML='';return}
  let myColors=me.colors||[],activeColor=(cur?.token===token&&myColors.includes(cur.color))?cur.color:null;
  let colors=activeColor?[activeColor]:myColors;
  let totalRem=0,html='';
  for(let color of colors){
    let used=new Set(state.used[color]||[]);
    let rem=PIECES.reduce((sum,p,i)=>sum+(used.has(i)?0:p.length),0);totalRem+=rem;
    if(colors.length>1)html+=`<div class="pieceColorLabel ${color}">${COLORS[color]||color}</div>`;
    html+=PIECES.map((p,i)=>{
      let disabled=used.has(i)||!activeColor||color!==activeColor;
      return `<button class="piece ${selected===i&&activeColor===color?'sel':''} ${used.has(i)?'used':''} ${!activeColor?'waiting':''}" ${disabled?'disabled':''} onclick="selPiece(${i})" aria-label="${p.length}マスピース">${pieceHtml(p,color)}</button>`
    }).join('');
  }
  $('#remain').textContent=totalRem+'マス';
  $('#pieces').innerHTML=html||'<small>ピースなし</small>';
}
window.selPiece=i=>{selected=i;ori=0;flipped=false;document.querySelectorAll('#pieces .piece').forEach((b,n)=>b.classList.toggle('sel',n===i));if(hover)drawPreview(...hover)};$('#rot').onclick=()=>{ori=(ori+1)%4;if(hover)preview(...hover)};$('#flip').onclick=()=>{flipped=!flipped;if(hover)preview(...hover)};$('#cancel').onclick=()=>{selected=null;hover=null;clearPreview();document.querySelectorAll('#pieces .piece.sel').forEach(b=>b.classList.remove('sel'))};
function clearPreview(){document.querySelectorAll('#board .cell.previewOk,#board .cell.previewGhost').forEach(c=>{c.classList.remove('previewOk','previewGhost');c.style.removeProperty('--preview-color')})}
function drawPreview(x,y){clearPreview();if(selected==null)return;let cur=state.turns[state.turnIndex];if(cur?.token!==token)return;let pts=transforms(PIECES[selected]),cells=pts.map(([dx,dy])=>[x+dx,y+dy]),ok=localLegal(cur.color,selected,cells);for(let [cx,cy] of cells){let c=$(`.cell[data-x="${cx}"][data-y="${cy}"]`);if(!c)continue;c.classList.add(ok?'previewOk':'previewGhost');if(ok)c.style.setProperty('--preview-color',cssColor(cur.color))}}
function preview(x,y){hover=[x,y];drawPreview(x,y)}
async function place(x,y){if(selected==null)return;try{await act('place',{piece:selected,cells:transforms(PIECES[selected]).map(([dx,dy])=>[x+dx,y+dy])});selected=null;hover=null}catch(e){toast(e.message)}}
const boardEl=$('#board');boardEl.addEventListener('pointermove',e=>{let c=e.target.closest('.cell');if(c&&boardEl.contains(c))preview(+c.dataset.x,+c.dataset.y)});boardEl.addEventListener('pointerup',e=>{let c=e.target.closest('.cell');if(!c||!boardEl.contains(c)||selected==null)return;e.preventDefault();place(+c.dataset.x,+c.dataset.y)});function renderResult(){if(!$('#modal').hidden)return;$('#modal').hidden=false;let rows=state.results.map((r,i)=>`<div class="resultRow rank${i+1}"><span class="rank">${i+1}</span><strong>${r.name}</strong><b>${r.score}<small>点</small></b></div>`).join('');$('#modalBody').innerHTML=`<div class="resultCard"><div class="resultEyebrow">GAME RESULT</div><h2>対局終了</h2><div class="resultRows">${rows}</div><div class="resultActions"><button class="subResult" onclick="closeResult()">最終盤面を見る</button><button class="mainResult" onclick="backLobby()">ロビーへ戻る</button></div></div>`}window.closeResult=()=>$('#modal').hidden=true;window.backLobby=async()=>act('backLobby');
window.leaveRoom=async()=>{try{await act('leave')}catch{}room=null;state=null;clearInterval(poll);hideScreens();$('#lobby').hidden=false;refreshRooms()};$('#leave').onclick=leaveRoom;$('#roomLeave').onclick=leaveRoom;$('#addCpuBtn').onclick=addCpu;$('#startBtn').onclick=startGame;
refreshRooms();setInterval(()=>{if(!room)refreshRooms()},3000);