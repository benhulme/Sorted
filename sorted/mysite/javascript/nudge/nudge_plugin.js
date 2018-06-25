(function() {
    tinymce.create('tinymce.plugins.nudge', {

        init : function(ed, url) {
            var self = this;

            ed.addButton ('nudge', {
                'title' : 'Insert a Sorted Nudge',
                'image' : url+'/nudge.png',
                'onclick' : function () {
                	var number = prompt("What Nudge you want to place ? "),
                    shortcode;
	                if (number !== null) {
	                    number = parseInt(number);
	                    if (number > 0 && number <= 20) {
	                        shortcode = '{nudge id="' + number + '"}';
	                        ed.execCommand('mceInsertContent', 0, shortcode);
	                    }
	                    else {
	                        alert("The number value is invalid. It should be from 0 to 20.");
	                    }
	                }
                	//ed.execCommand('mceInsertContent', 0, '<nudge>nudge</nudge>');
                }
            });

        },

        getInfo : function() {
            return {
                longname  : 'nudge',
                author      : 'Paul Headington',
                authorurl : 'http://www.downtherabbithole.io/',
                infourl   : 'http://www.downtherabbithole.io/',
                version   : "1.0"
            };
        }
    });

    tinymce.PluginManager.add('nudge', tinymce.plugins.nudge);
})();