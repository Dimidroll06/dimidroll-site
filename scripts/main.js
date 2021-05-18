function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

function checkIsOnMobile(){
   return (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}

function newHeader(domelem){
   console.log(domelem)
   domelem.innerHTML = 
`
<h3>Dimidroll</h3>
<nav>
   <a href="/dimidroll-site/index.html">Main</a>
   <a href="#">About</a>
   <a href="/dimidroll-site/blogs.html">Blog</a>
</nav>
`
}

function newNav(){
   document.body.innerHTML = document.body.innerHTML+`\n\n`+

`
<nav id="navigationBar" class="">
   <section>
      <h3>Игры</h3>
      <p>В разработке</p>
   </section>
   <hr>
   <section>
      <h3>Информация</h3>
      Сайт находится в разработке, поэтому возможны баги и ошибки. Просьба писать их мне в личку. Для контактов зайдите на страницу "About"
   </section>
   <hr>
</nav>
`
   document.querySelector('#navigationBar').classList.add('scroll');
   
   setInterval(()=>{
      
      
      if( checkIsOnMobile() ) {
         // some code..
         document.querySelector('#navigationBar').classList.remove('hover_scroll');
         document.querySelector('#navigationBar').classList.add('scroll');
      }else{
         document.querySelector('#navigationBar').classList.remove('scroll');
         document.querySelector('#navigationBar').classList.add('hover_scroll');
      }
   }, 1000)
}