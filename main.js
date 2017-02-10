//This is the NYT-flex branch

var state = {
  currentSection : "",
  submitted : false,
  rawData: [],
  currentURL: function(){
    return "https://api.nytimes.com/svc/topstories/v2/" + this.currentSection + ".json?api-key=3047b4f43aa340b1a9976a2cefadbf7f";
  }
}


function getData(callback){
  $.ajax({
    url: state.currentURL(),
    method: 'GET',
    success: callback
  });
}


function addToState(data){
  state.rawData = data.results;
}


function display(state) {
   $('.container').empty();

    state.rawData.forEach(function(article) {
        var list = `<div class="article-div">
                      <img src="NYTlogo.png" alt="NYT Logo" class="logo-img">
                      <h2>${article.title}</h2>
                      <p>${article.byline}<br>${article.published_date}</p>
                      <ul>
                        <h5>${article.abstract}</h5>
                        <br>
                        <a href="${article.url}">Full Text Article</a>
                      </ul>
                    </div>`
        $('.container').append(list);
    });
    state.rawData=[];
}


function init(data){
  addToState(data);
  display(state);
}


function eventListener(){
  $('#search').submit(function(e) {
    e.preventDefault();
    state.currentSection = $('#selection').val();
    getData(init);
  });
}

$(eventListener);
