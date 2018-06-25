(function() {
    tinymce.create('tinymce.plugins.tip', {

        init : function(ed, url) {
            var self = this;

            // Register commands
            ed.addCommand('mceTip', function() {

                var block = ed.selection.getContent();

                console.log(block);
                var newcode = '<div class="tip"><div class="_clear"><div class="_left tip-icon _align-center"><img src="/assets/Uploads/nudge-repayment-icon.jpg" class="_full-width"></div><div class="_left nudge-main">' + block + '</div></div></div>';
                ed.execCommand('mceInsertContent', 0, newcode);

            });

            // Register buttons
            ed.addButton('tip', {title : 'format as a Tip', image : url+'/tip.png', cmd : 'mceTip'});
        },

        getInfo : function() {
            return {
                longname  : 'tip',
                author      : 'Paul Headington',
                authorurl : 'http://www.downtherabbithole.io/',
                infourl   : 'http://www.downtherabbithole.io/',
                version   : "1.0"
            };
        }
    });

    tinymce.PluginManager.add('tip', tinymce.plugins.tip);
})();