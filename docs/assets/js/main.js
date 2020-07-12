"use strict";const showsSearchButton=document.querySelector(".js-search-button");let showNameInput=document.querySelector(".js-search-show"),shows=[],favorites=[];function handleshowsSearchClick(){getDataFromApi().then(()=>paintShows())}function getDataFromApi(){return event.preventDefault(),shows=[],fetch("http://api.tvmaze.com/search/shows?q="+showNameInput.value).then(e=>e.json()).then(e=>{for(let t=0;t<e.length;t++){const s=e[t];shows.push(s)}}).catch(e=>{console.log(e)})}showsSearchButton.addEventListener("click",handleshowsSearchClick);const showsItems=document.querySelector(".js-shows-list"),msgNoResults=document.querySelector(".msg-no-results");function paintShows(){let e=showsItems;if(e.innerHTML="",shows.length>0){msgNoResults.classList.add("msg-no-results--hidden");for(let t=0;t<shows.length;t++){const s=shows[t];let o=null!==s.show.image?s.show.image.medium:"https://via.placeholder.com/210x295/ffffff/666666/?text=TV",a=document.createElement("li");e.appendChild(a);let n=document.createElement("article");n.classList.add("main__list--item","js-shows-items"),n.dataset.index=t,isFavorite(s)&&n.classList.add("selected"),n.id=s.show.id,a.appendChild(n),n.addEventListener("click",handleSetFavorite);let i=document.createElement("img");i.src=o,n.appendChild(i);let r=document.createElement("h3");r.classList.add("main__list--name","js-list-name"),r.appendChild(document.createTextNode(s.show.name)),n.appendChild(r)}}else msgNoResults.classList.remove("msg-no-results--hidden")}function isFavorite(e){return void 0!==favorites.find(t=>t.show.id===e.show.id)}const favoritesItems=document.querySelector(".js-favorites-list");function paintFavorites(){favoritesItems.innerHTML="";for(let e=0;e<favorites.length;e++){paintFavorite(favorites[e],e)}}function paintFavorite(e,t){let s=null!==e.show.image?e.show.image.medium:"https://via.placeholder.com/210x295/ffffff/666666/?text=TV",o=document.querySelector(".js-favorites-list"),a=document.createElement("li");a.classList.add("main__favorites--list","js-favorites-items"),o.appendChild(a),a.id=e.show.id;let n=document.createElement("article");n.classList.add("main__favorites--item"),n.dataset.index=t,a.appendChild(n);let i=document.createElement("img");i.src=s,n.appendChild(i);let r=document.createElement("h3");r.classList.add("main__list--title","js-favorites-name"),r.appendChild(document.createTextNode(e.show.name)),n.appendChild(r);let c=document.createElement("button");c.classList.add("remove__button","js-remove-button"),c.innerHTML="X",c.dataset.id=e.show.id,n.appendChild(c),c.addEventListener("click",handleRemoveFavorite)}function handleSetFavorite(e){e.currentTarget.classList.add("selected");const t=e.currentTarget.dataset.index,s=shows[t];isFavorite(s)?removeFavorite(parseInt(e.currentTarget.id)):(favorites.push(s),paintFavorite(s,t)),updateLocalStorage()}function handleRemoveFavorite(e){removeFavorite(parseInt(e.currentTarget.dataset.id))}function removeFavorite(e){const t=favorites.findIndex(t=>t.show.id===e);favorites.splice(t,1),updateLocalStorage();const s=document.querySelectorAll(".js-favorites-items");for(const t of s)e===parseInt(t.id)&&t.remove();const o=document.querySelectorAll(".js-shows-items");for(const t of o)e===parseInt(t.id)&&t.classList.remove("selected")}function updateLocalStorage(){localStorage.setItem("favorites",JSON.stringify(favorites))}function getFromLocalStorage(){favorites=JSON.parse(localStorage.getItem("favorites"))??[],paintFavorites()}const buttonReset=document.querySelector(".js-reset-button");function resetFavorites(){favorites=[],updateLocalStorage(),paintFavorites();const e=document.querySelectorAll(".js-shows-items");for(const t of e)t.classList.remove("selected")}buttonReset.addEventListener("click",resetFavorites),getFromLocalStorage();