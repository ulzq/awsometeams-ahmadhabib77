var addPlayerContainer  = document.querySelector('.addPlayerContainer');
var addPlayerInput      = document.querySelector('[name="addPlayerInput"]');
var addPlayerButton     = document.querySelector('[name="add"]');
var playerListContainer = document.querySelector('.playerListContainer');
var playerListUL        = document.querySelector('#playerListUL');
var playerListActions   = document.querySelector('.playerListActions');
var playerCountInput    = document.querySelector('[name="playerCountInput"]');
var playerListMixButton = document.querySelector('[name="playerListMixButton"]');
var teamsContainer      = document.querySelector('.teamsContainer');

var playerList = [];
load();
renderPlayers();
addPlayerButton.addEventListener('click',addPlayer);
addPlayerInput.addEventListener('keyup',addPlayerOnEnter);
playerListMixButton.addEventListener('click',mixTeams);

let playing = false
document.onclick = ()=>{
  if ( playing ) return;
  document.querySelector('video').play();
  playing = true;
}

function load(){
  let data = localStorage.getItem('playerList');
  if ( data ){
    data = JSON.parse(data);
    if ( Array.isArray(data) ){
      playerList = data;
    }
  }
}

function save(){
  let data = JSON.stringify(playerList);
  localStorage.setItem('playerList', data);
}

function renderPlayers(){
  playerListUL.innerHTML = '';
  playerList.forEach( item => {
    let tr  = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let del = document.createElement('button');
    td1.innerText = item
    del.innerText = 'x'
    del.style.float = 'right'
    del.type = 'button'
    del.classList.value = 'btn btn-danger'
    del.onclick = (e)=> {
      playerList = playerList.filter( i => { return i !== item })
      renderPlayers()
      save()
    }
    td2.append(del)
    tr.append(td1)
    tr.append(td2)
    playerListUL.append(tr)
  })
}

function addPlayer (e){
  let name = addPlayerInput.value.replace(/[^a-zA-Z0-9_]/g,'');
  if ( name === '' ){
    alert('bitte gib einen richtigen namen ein');
    return
  }
  if ( playerList.indexOf(name) === -1 ){
    playerList.push(name);
    renderPlayers();
    save();
  } else {
    alert(`bitte gib einen eindeutigen namen ein, ${name} existiert schon!`);
  }
}

function addPlayerOnEnter(e){
  if (e.code === 'Enter') {
    addPlayer(e);
    e.target.value = ''
  }
}

function mixTeams(){
  // loesche alle bestehenden teams
  teamsContainer.innerHTML = ''

  let playersPerTeam = Number(playerCountInput.value);

  // kopiere playerList in einen neuen Array
  let list = playerList.slice() // oder kurz [...playerList]

  // mische list in eine zufaellige reihenfolge
  list = list.sort( (a,b)=>{
    return Math.random() - 0.5
  })

  // solange spieler in list existieren, ziehe spieler und blide teams
  let ul, teamNummer = 1;
  let teamSpieler = 0;
  while ( list.length ){
    if ( teamSpieler++ === 0 ){
      ul = document.createElement('div')
      ul.classList.value = 'list-group'
      let li = document.createElement('li')
      li.innerText = `Team ${teamNummer++}`
      li.classList.add('list-group-item')
      li.classList.add('active')
      ul.append(li);
      teamsContainer.append(ul);
    }
    let li = document.createElement('li')
    li.innerText = list.pop()
    li.classList.add('list-group-item')
    ul.append(li);
    if ( teamSpieler === playersPerTeam ){
      teamSpieler = 0
    }
  }
}
