var main_page = document.querySelector('.main_page .container');
var blogName  = get('blog');
var tagsSection = document.createElement('section');

tagsSection.innerHTML = `<h3>Теги</h3>`
var blogParams = false;

fetch(`/dimidroll-site/blog/${blogName}/parameters.json`).then(resp=>{
   if(resp.ok) resp.json().then(val=>{
      blogParams = val;
      loadPage();
   })
   else{
      main_page.innerHTML = '<h1>ERROR 404</h1> <h4>Page undefinded<h4>'
   }
})



function loadPage(){
   if(!blogParams){
      main_page.innerHTML = '<h1>ERROR 404</h1> <h4>Page undefinded<h4>'
      return
   }
   document.title = blogParams.title + " || Dimidroll blog"
   var tagUl = document.createElement('ul');
   blogParams.tags.forEach(tagName => {
      var li = document.createElement('li');
      li.innerHTML = `<a href="#">${tagName}</a>`
      tagUl.appendChild(li)
   });
   tagsSection.appendChild(tagUl)
   document.querySelector('body>nav').appendChild(tagsSection);
   document.querySelector('body>nav').appendChild(document.createElement('hr'));

   fetch(`/blog/${blogName}/text.md`).then(resp=>{
      if(resp.ok){
         resp.text().then(blogMdText=>{
///////////////////////////////////////////
//PAGE FINNAL LOADER

            var converter = new showdown.Converter({
               parseImgDimensions: true,
               simplifiedAutoLink: true,
               excludeTrailingPunctuationFromURLs: true,
               strikethrough: true,
               tables: true,
               tasklists: true,
               simpleLineBreaks: true,
            });
            var fixedText =blogMdText.replace('[---]', '');
            main_page.innerHTML = converter.makeHtml(fixedText);
            hljs.highlightAll();

         })
      }
      else{
         main_page.innerHTML = '<h1>Something went wrong</h1> <h4>File text.md undefinded<h4>'
      }
   })
}