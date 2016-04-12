$(document).ready(function(){

  $('#search').keyup(function(e){
      $('#wikiList').empty();
      if(e.keyCode != 13){

      //autocomplete
      $("#search").autocomplete({
          source: function(request, response) {
              $.ajax({
                  url: "http://en.wikipedia.org/w/api.php",
                  dataType: "jsonp",
                  data: {
                      'action': "opensearch",
                      'format': "json",
                      'search': request.term
                  },
                  success: function(data) {
                      response(data[1]);
                  }
              });
            }
        });
      // when enter is pressed
       }else{
        var searchTerm = $('#search').val();
        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='+ searchTerm;
        console.log(wikiUrl);
        console.log('searchTerm');

        //perform ajax call
        $.ajax({
          url: wikiUrl,
          dataType: "jsonp",
          success: function(data){
            console.log(data);
            var articles = data.query.search;
              for (var i = 0; i < articles.length; i++){
                var wikiTitle = articles[i].title;
                var wikiSnippet = articles[i].snippet;
                var wikiLink = 'https://en.wikipedia.org/wiki/'+ wikiTitle;
                console.log(wikiTitle);
                console.log(wikiLink);
                var markup = '<a href="'+wikiLink+'"><li> <h2>' + wikiTitle +'<h2><p>'+wikiSnippet+'</p></li></a>';
                $('#wikiList').append(markup);
              }
          },
          error : function(){
          $('#msg').removeClass('hidden');
        $('#msg').text('Sorry, something went wrong. Please try again later');
         }
        }); //Ajax call
      } //if else
  });//keyup


}); //document.ready
