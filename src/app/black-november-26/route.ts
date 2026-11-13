// Índice da Black November 2026: todas as páginas internas da Black num lugar só, com senha (lembrada no navegador).
// Mesmo padrão de /anuncios-black-november: rota que devolve um HTML pronto, fora do Google.
// A senha só esconde a lista de quem cair no link; as páginas em si continuam acessíveis pelo endereço.
import { comFavicon } from '@/lib/favicon-html'

const PRINCIPAIS = [
  ['/relatorio-1111-black-november', 'Relatório 11.11 (pico)', 'O dia de pico: receita, pedidos, hora a hora, produtos, Meta, Google, a ressaca pós-11.11 e a live.'],
  ['/apresentacao-black-november', 'Planejamento Black November', 'Plano completo da Black 2026 (apresentação à diretoria, com senha própria).'],
  ['/plano-aplicacao-google-black-november', 'Google Ads · plano de aplicação (temporário)', 'Passo a passo com checklist para subir tudo em 07/11: Merchant, Editor, ajustes à mão e PMax da Black.'],
  ['/estrategia-google-ads', 'Estratégia Google Ads', 'Execução, campanhas, textos, Merchant e o porquê de cada decisão.'],
  ['/estrategia-meta-ads', 'Estratégia Meta Ads', 'Campanhas em ABO, públicos, verba por semana, criativos e calendário.'],
]
const ANUNCIOS = [
  ['/anuncios-black-november', 'Todos os anúncios da Black', 'Anúncios com nome, texto, título e destino para copiar, artes, onde sobe e o que já está no ar.'],
]
const APOIO = [
  ['/roteiros-pendentes-black-november', 'Roteiros pendentes', 'Roteiros dos vídeos que faltam gravar, um por anúncio.'],
  ['/plano-tarefas-black-november', 'Plano de tarefas', 'Tarefas da Black por grupo, com descrição, data e responsável.'],
  ['/projecao-black-november', 'Projeção de verba', 'Cenários de verba com pedidos, receita e ROAS.'],
  ['/site-black-november', 'Propostas de site', 'Propostas para o site com protótipo, esforço e impacto.'],
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const cards = (lista: string[][], cls = '') =>
  lista
    .map(([href, t, d]) => `<a class="card ${cls}" href="${href}"><b>${esc(t)}</b><span>${esc(d)}</span><i>${href}</i></a>`)
    .join('')

const HTML = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Black November 2026</title><link rel="icon" href="/favicon.ico">
<style>
:root{--bg:#f6f5f3;--card:#fff;--tx:#1a1a1a;--mute:#6b6b6b;--line:#e3e1dd;--rosa:#ff2d87}
@media (prefers-color-scheme:dark){:root{--bg:#141414;--card:#1e1e1e;--tx:#f1f1f1;--mute:#a0a0a0;--line:#333}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.5 system-ui,"Segoe UI",Roboto,sans-serif;padding:0 16px 60px}
.wrap{max-width:860px;margin:0 auto}h1{font-size:24px;margin:28px 0 4px}.sub{color:var(--mute);margin:0 0 22px}
h2{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--mute);margin:26px 0 10px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.card{display:flex;flex-direction:column;gap:4px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px;color:var(--tx);text-decoration:none}
.card:hover{border-color:var(--tx)}.card b{font-size:16px}.card span{font-size:13px;color:var(--mute)}.card i{font-size:12px;font-style:normal;color:var(--rosa)}
.card.top{border-left:5px solid #111}.card.ads{border-left:5px solid var(--rosa)}
.espaco{height:22px}
#trava{max-width:360px;margin:18vh auto 0;text-align:center}#trava input{width:100%;font:inherit;padding:10px 12px;border-radius:8px;border:1px solid var(--line);margin:12px 0}
#trava button{font:inherit;padding:10px 18px;border-radius:8px;border:0;background:#111;color:#fff;cursor:pointer}#erro{color:#d32f2f;font-size:13px;min-height:18px}
.oculto{display:none}
</style></head><body>
<form id="trava" class="oculto"><h1>Black November 2026</h1><p class="sub">Digite a senha para ver as páginas. Ela fica lembrada neste navegador.</p>
<input id="senha" type="password" autocomplete="current-password" placeholder="Senha" aria-label="Senha"><div id="erro"></div><button type="submit">Entrar</button></form>
<div id="conteudo" class="wrap oculto">
<h1>Black November 2026</h1><p class="sub">Todas as páginas da Black num lugar só.</p>
<h2>Planejamento</h2><div class="grid">${cards(PRINCIPAIS, 'top')}</div>
<h2>Anúncios</h2><div class="grid">${cards(ANUNCIOS, 'ads')}</div>
<div class="espaco"></div>
<h2>Apoio</h2><div class="grid">${cards(APOIO)}</div>
</div>
<script>
var CH='bn26-indice-ok',SENHA='mariane';
function ok(){try{return localStorage.getItem(CH)==='1'}catch(e){return false}}
function abrir(){document.getElementById('trava').classList.add('oculto');document.getElementById('conteudo').classList.remove('oculto')}
if(ok())abrir();else document.getElementById('trava').classList.remove('oculto');
document.getElementById('trava').addEventListener('submit',function(e){e.preventDefault();
if(document.getElementById('senha').value.trim().toLowerCase()===SENHA){try{localStorage.setItem(CH,'1')}catch(x){}abrir()}
else document.getElementById('erro').textContent='Senha incorreta.'});
</script></body></html>`

export async function GET() {
  return new Response(comFavicon(HTML), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' },
  })
}
