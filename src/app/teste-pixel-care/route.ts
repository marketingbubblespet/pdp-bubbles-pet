// Página de teste do pixel da Linha Care (29302739709380200): um botão por evento padrão, para ativar os eventos
// no Gerenciador de Eventos e liberar a criação de públicos. Fora do Google e sem link no site.
// Aberta direto, os eventos entram como reais (decisão do gestor em 17/11, para liberar os eventos na criação de públicos).
import { comFavicon } from '@/lib/favicon-html'

const PIXEL = '29302739709380200'

const HTML = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Teste do pixel Care</title>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#f6f5f3;--card:#fff;--tx:#0C0C0C;--mu:#666;--li:#e3e1dd}
@media (prefers-color-scheme:dark){:root{--bg:#141414;--card:#1e1e1e;--tx:#f1f1f1;--mu:#aaa;--li:#333}}
body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.5 Figtree,system-ui,sans-serif}
header{background:#F4CDD4;color:#0C0C0C;padding:22px 16px}.in,main{max-width:820px;margin:0 auto}h1{margin:0 0 4px;font-size:22px}header p{margin:0;color:#333}
.selo{display:inline-block;background:#5DE813;color:#0C0C0C;font-weight:800;font-size:12px;border-radius:20px;padding:2px 10px;margin-bottom:6px}
.aviso{border-color:#5DE813 !important}
main{padding:16px}.card{background:var(--card);border:1px solid var(--li);border-radius:12px;padding:16px;margin:14px 0}
.aviso{border:2px solid #f0b44c}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
button{font:inherit;font-weight:700;padding:12px;border-radius:10px;border:0;background:#0C0C0C;color:#fff;cursor:pointer;text-align:left}
button small{display:block;font-weight:400;opacity:.75;font-size:12px}button.verde{background:#5DE813;color:#0C0C0C}
@media (prefers-color-scheme:dark){button{background:#fff;color:#000}}
#log{font:12.5px/1.5 ui-monospace,Consolas,monospace;white-space:pre-wrap;max-height:320px;overflow:auto;background:var(--bg);border:1px solid var(--li);border-radius:8px;padding:10px;margin:0}
ol{margin:6px 0 0 20px;padding:0}label{font-size:14px}select,input{font:inherit;padding:6px 8px;border-radius:8px;border:1px solid var(--li);background:var(--bg);color:var(--tx)}
</style>
<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL}');fbq('track','PageView',{},{eventID:'teste-pv-'+Date.now()});</script>
</head><body>
<header><div class="in"><span class="selo">VERSÃO 2 · DISPARO REAL</span><h1>Teste do pixel · Linha Care</h1><p>Pixel ${PIXEL}. Um botão por evento, com produto, valor e event_id de teste.</p></div></header>
<main>
<section class="card aviso"><b>Como usar</b>
<ol>
<li>Abra esta página direto no navegador (sem o "Testar eventos"): assim os eventos entram como reais e aparecem na lista de eventos para criar públicos.</li>
<li>Desative o bloqueador de anúncios e clique em cada botão. O registro no fim da página mostra o que foi enviado.</li>
<li>Cada clique em <b>Purchase</b> registra uma compra no pixel Care (com o valor do produto escolhido). Use poucas vezes.</li>
<li>Para só conferir sem contar como real, abra pelo Gerenciador de Eventos › Testar eventos › Testar eventos do navegador.</li>
</ol></section>
<section class="card"><label>Produto usado nos eventos:
<select id="prod">
<option value="CR009|Banho a Seco Desembaraçador Care 250ml|29.90">Banho a Seco Desembaraçador Care 250ml · R$ 29,90</option>
<option value="CR002|Shampoo Neutro Care 300ml|36.90">Shampoo Neutro Care 300ml · R$ 36,90</option>
<option value="KITCR006|Kit Completo Linha Care|345.90">Kit Completo Linha Care · R$ 345,90</option>
</select></label> <label>Quantidade <input id="qtd" type="number" value="1" min="1" style="width:64px"></label></section>
<section class="card"><div class="grid">
<button data-ev="ViewContent">ViewContent<small>visualizou o produto</small></button>
<button data-ev="AddToCart">AddToCart<small>adicionou ao carrinho</small></button>
<button data-ev="InitiateCheckout">InitiateCheckout<small>iniciou o checkout</small></button>
<button data-ev="AddPaymentInfo">AddPaymentInfo<small>informou o pagamento</small></button>
<button data-ev="Purchase" class="verde">Purchase<small>compra (registra no pixel)</small></button>
<button data-ev="Search">Search<small>pesquisou na loja</small></button>
<button data-ev="AddToWishlist">AddToWishlist<small>favoritou</small></button>
<button data-ev="Lead">Lead<small>cadastro ou contato</small></button>
<button data-ev="CompleteRegistration">CompleteRegistration<small>concluiu cadastro</small></button>
<button data-ev="PageView">PageView<small>visualização de página</small></button>
</div></section>
<section class="card"><b>Registro desta página</b><pre id="log"></pre></section>
</main>
<script>
(function(){
var log=document.getElementById('log');
function escreve(t){var d=new Date();log.textContent=d.toLocaleTimeString('pt-BR')+'  '+t+String.fromCharCode(10)+log.textContent}
escreve('PageView enviado ao carregar a página');
document.querySelectorAll('button[data-ev]').forEach(function(b){b.addEventListener('click',function(){
  var ev=b.getAttribute('data-ev'),p=document.getElementById('prod').value.split('|'),q=Math.max(1,parseInt(document.getElementById('qtd').value,10)||1);
  var preco=parseFloat(p[2]),valor=Math.round(preco*q*100)/100,eid='teste-'+ev.toLowerCase()+'-'+Date.now();
  var dados={content_ids:[p[0]],content_type:'product',content_name:p[1],contents:[{id:p[0],quantity:q,item_price:preco}],value:valor,currency:'BRL',num_items:q};
  if(ev==='Search'){dados={search_string:'shampoo care',content_ids:[p[0]],value:valor,currency:'BRL'}}
  if(ev==='Lead'||ev==='CompleteRegistration'){dados={value:0,currency:'BRL',content_name:'teste pixel care'}}
  if(ev==='PageView'){dados={}}
  if(typeof fbq!=='function'){escreve('ERRO: o pixel não carregou (bloqueador de anúncios?)');return}
  fbq('track',ev,dados,{eventID:eid});
  escreve(ev+' enviado · '+(dados.content_ids?dados.content_ids.join(','):'')+(dados.value!==undefined?' · R$ '+dados.value:'')+' · event_id '+eid);
})});
})();
</script></body></html>`

export async function GET() {
  return new Response(comFavicon(HTML), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
