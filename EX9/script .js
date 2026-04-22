// 將 per_page 設為 4，剛好填滿這個 4 張圖的特殊 Grid 排版
var imglist_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=4&format=json&nojsoncallback=1';
function getimg() {
   var xhr = new XMLHttpRequest();
   xhr.open('GET', imglist_Url, true);
   xhr.send();
   xhr.onload = function () {
       if (this.status === 200) {
           // 解析回傳的 JSON 字串
           var data = JSON.parse(this.responseText);
           add_new_img(data);
       } else {
           console.error("API 請求失敗");
       }
   }
}
function add_new_img(dataset) {
   var gallery = document.getElementById('gallery');
   gallery.innerHTML = ''; // 每次點擊重新抓取時，先清空舊的圖片
   // Flickr API 的相片陣列位在 dataset.photos.photo
   var photos = dataset.photos.photo;
   // 跑迴圈把這 4 張圖片塞進畫面中
   for (var i = 0; i < photos.length; i++) {
       var photo = photos[i];
       // 組合 Flickr 圖片網址 (結尾加上 _b 代表抓取大尺寸圖片)
       var imgUrl = 'https://live.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
       var img = document.createElement("img");
       img.src = imgUrl;
       gallery.appendChild(img);
   }
}