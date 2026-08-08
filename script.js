const cart=[];
const price=59.90;
const $=id=>document.getElementById(id);
const qty=$('quantity');
$('minusQty').addEventListener('click',()=>qty.value=Math.max(1,(+qty.value||1)-1));
$('plusQty').addEventListener('click',()=>qty.value=Math.min(10,(+qty.value||1)+1));
$('addToCart').addEventListener('click',()=>{
  const size=$('size').value, quantity=Math.max(1,+qty.value||1);
  const existing=cart.find(i=>i.size===size);
  if(existing) existing.quantity+=quantity; else cart.push({size,quantity});
  renderCart(); showToast(); openCart();
});
function renderCart(){
  $('cartCount').textContent=cart.reduce((s,i)=>s+i.quantity,0);
  $('cartEmpty').style.display=cart.length?'none':'block';
  $('cartFooter').hidden=!cart.length;
  $('cartItems').innerHTML=cart.map((i,index)=>`<div class="cart-item"><div class="cart-item-icon">PAIR.</div><div><h4>PAIR Original · 5 Paar</h4><p>Grösse ${i.size} · ${i.quantity} × CHF ${price.toFixed(2)}</p></div><button class="remove-item" onclick="removeItem(${index})">×</button></div>`).join('');
  $('cartTotal').textContent='CHF '+cart.reduce((s,i)=>s+i.quantity*price,0).toFixed(2);
}
window.removeItem=index=>{cart.splice(index,1);renderCart()};
function openCart(){$('cartDrawer').classList.add('open');$('overlay').classList.add('show');$('cartDrawer').setAttribute('aria-hidden','false')}
function closeCart(){$('cartDrawer').classList.remove('open');$('overlay').classList.remove('show');$('cartDrawer').setAttribute('aria-hidden','true')}
$('cartButton').addEventListener('click',openCart);$('closeCart').addEventListener('click',closeCart);$('overlay').addEventListener('click',closeCart);
function showToast(){$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1700)}
$('checkoutButton').addEventListener('click',()=>alert('Dies ist aktuell ein Demo-Shop. Als nächsten Schritt können wir Stripe, Shopify oder einen anderen Zahlungsanbieter anschliessen.'));
