const request = axios.create();
request.interceptors.response.use((res) => {
  return res.data;
});

function getNewsList(page = 1, limit = 8) {
  return request.get(
    "https://62a0527c202ceef7086ab1b6.mockapi.io/bussiness/news",
    { params: { page, limit } }
  );
}

getNewsList(1, 4)
  .then((res) => {
    renderInfoItem(res.items);
  })
  .catch((e) => {
    console.error(e);
  });

/**
 * @param {array} data
 * */
function renderInfoItem(data) {
  const news = document.getElementById("news");
  // 取出第一个子元素作为模板
  const template = news.childNodes[0];

  const domStruct = data.map((item, index) => {
    const temp = template.cloneNode(true);

    // img
    temp.childNodes[0].src = item.img + "?index=" + index;
    temp.childNodes[0].alt = item.title;
    // title
    temp.childNodes[1].innerText = item.title;
    // desc
    temp.childNodes[2].innerText = item.desc;

    temp.style.display = "flex";
    temp.href = "./detail.html?id=" + item.id;
    return temp;
  });

  news.replaceChildren(...domStruct);
}
