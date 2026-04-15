const API = "https://ljacdjgzsk.execute-api.us-east-1.amazonaws.com/prod";

// NAV
function showUser(){
  userView.classList.remove("hidden");
  adminView.classList.add("hidden");
}

function showAdmin(){
  const pass = prompt("Enter admin code:");
  if(pass==="admin"){
    adminView.classList.remove("hidden");
    userView.classList.add("hidden");
    getList();
  }
}

// JOIN
async function join(){

  if(!name.value || !phone.value || !size.value){
    alert("❌ عبي كل الحقول");
    return;
  }

  const res = await fetch(API+"/waitlist",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      customerName:name.value,
      phone:phone.value,
      partySize:parseInt(size.value)
    })
  });

  const data = await res.json();
  result.innerHTML = "✅ رقمك: "+data.position;
}

// CROWD MAP (مثل Google 🔥)
function drawCrowdMap(count){

  let html = '<div class="crowd-container">';
  let color = "green";
  let label = "🟢 خفيف";

  if(count > 3 && count <= 6){
    color = "orange";
    label = "🟡 متوسط";
  } else if(count > 6){
    color = "red";
    label = "🔴 مزدحم";
  }

  for(let i=0;i<10;i++){
    html += `<div class="block" style="background:${i<count?color:"#ddd"}"></div>`;
  }

  html += "</div>";

  crowdMap.innerHTML = html;
  crowdLabel.innerText = label;
}

// GET
async function getList(){

  const res = await fetch(API+"/waitlist");
  const data = await res.json();

  drawCrowdMap(data.totalWaiting);

  let html="";
  let w=0,r=0,c=0;

  data.customers.forEach(x=>{

    if(x.status==="WAITING") w++;
    if(x.status==="READY") r++;
    if(x.status==="CANCELLED") c++;

    if(x.status==="READY") return;

    html+=`
    <div class="card" data-id="${x.waitlistId}">
      👤 ${x.customerName}<br>
      👥 ${x.partySize}<br>
      🔖 ${x.status}<br><br>

      <button class="success" onclick="ready('${x.waitlistId}')">جاهزة</button>
      <button class="danger" onclick="remove('${x.waitlistId}')">حذف</button>
    </div>`;
  });

  list.innerHTML=html;

  wCount.innerText=w;
  rCount.innerText=r;
  cCount.innerText=c;
}

// READY (يختفي مباشرة 🔥)
async function ready(id){

  document.querySelectorAll(".card").forEach(card=>{
    if(card.dataset.id===id){
      card.remove();
    }
  });

  await fetch(API+"/waitlist/ready",{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({waitlistId:id})
  });

}

// DELETE
async function remove(id){
  await fetch(API+"/waitlist",{
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({waitlistId:id})
  });
  getList();
}

// LOAD
window.onload = getList;