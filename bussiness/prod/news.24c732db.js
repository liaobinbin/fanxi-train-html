const request=axios.create();function getNewsList(e=1,t=8){return request.get("https://62a0527c202ceef7086ab1b6.mockapi.io/bussiness/news",{params:{page:e,limit:t}})}function getNewsItem(e){return request.get(`https://61e80b15e32cd90017acbfb7.mockapi.io/enterprise/news/${e}`)}function getParams(){const e=new URLSearchParams(location.search);return{page:Number(e.get("page"))||1,limit:Number(e.get("limit"))||8}}request.interceptors.response.use((e=>e.data));const params=getParams()||{page:1,limit:8};function renderInfoItem(e){const t=document.getElementById("news"),s=t.childNodes[0],n=e.map(((e,t)=>{const n=s.cloneNode(!0);return n.childNodes[0].src=e.img+"?index="+t,n.childNodes[0].alt=e.title,n.childNodes[1].innerText=e.title,n.childNodes[2].innerText=e.desc,n.style.display="flex",n.href="./detail.html?id="+e.id,n}));t.replaceChildren(...n)}function renderPagination(){}getNewsList(params.page,params.limit).then((e=>{renderInfoItem(e)})).catch((e=>{console.error(e)}));
//# sourceMappingURL=news.24c732db.js.map
