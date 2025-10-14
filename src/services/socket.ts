type Callback = (payload?: any) => void

let ws: WebSocket | null = null
const handlers: Record<string, Set<Callback>> = {}

function safeParse(s: string){ try { return JSON.parse(s) } catch { return null } }

export function connect(url = 'wss://furious.george.richmnd.uk/ws') {
  if (ws) return
  ws = new WebSocket(url)
  ws.addEventListener('open', ()=> emitLocal('connect'))
  ws.addEventListener('close', ()=> { emitLocal('disconnect'); ws = null })
  ws.addEventListener('error', (e)=> emitLocal('error', e))
  ws.addEventListener('message', (ev)=>{
    const d = safeParse(ev.data as string)
    if (!d || !d.type) return
    handlers[d.type]?.forEach(cb => cb(d))
  })
}
export function disconnect(){ if(ws){ ws.close(); ws=null } }
function send(obj:any){ if(ws && ws.readyState===WebSocket.OPEN) ws.send(JSON.stringify(obj)) }

export function hostGame(gameCode:string, username:string){ send({ type:'host', gameCode, username }) }
export function joinGame(gameCode:string, username:string){ send({ type:'join', gameCode, username }) }
export function startGame(){ send({ type:'start' }) }
export function sendBet(amount:number){ send({ type:'action', action:'bet', amount }) }
export function raise(amount:number){ send({ type:'action', action:'raise', amount }) }
export function fold(){ send({ type:'action', action:'fold' }) }
export function check(){ send({ type:'action', action:'check' }) }

export function on(eventName:string, cb:Callback){ if(!handlers[eventName]) handlers[eventName]=new Set(); handlers[eventName].add(cb) }
export function off(eventName:string, cb:Callback){ handlers[eventName]?.delete(cb) }
function emitLocal(name:string, payload?:any){ handlers[name]?.forEach(cb=>cb(payload)) }
export function _emit(name:string, payload?:any){ emitLocal(name, payload) }
