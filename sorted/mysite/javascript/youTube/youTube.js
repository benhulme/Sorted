(function() {
    tinymce.create('tinymce.plugins.youTube', {

        init : function(ed, url) {
            var self = this;

            ed.addButton ('youTube', {
                'title' : 'Insert a YouTube video ID',
                'image' : url+'/YouTube-logo-light.png',
                'onclick' : function () {
                	var ytID = prompt("What Nudge you want to place ? ");
                  console.log(ytID);
	                if (ytID !== null) {
	                        var template =
                            '<div class="video-container">'+
                            '<iframe src="https://www.youtube.com/embed/'+
                            ytID+
                            '" frameborder="0" width="560" height="315"></iframe>'+
                            '</div>';
	                        ed.execCommand('mceInsertContent', 0, template);

	                }else {
                    alert("You can't set an empty ID");
                  }
                }
            });

        },

        getInfo : function() {
            return {
                longname  : 'youTube',
                author      : 'Paul Headington',
                authorurl : 'http://www.downtherabbithole.io/',
                infourl   : 'http://www.downtherabbithole.io/',
                version   : "1.0"
            };
        }
    });

    tinymce.PluginManager.add('youTube', tinymce.plugins.youTube);
})();
