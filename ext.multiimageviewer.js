Ext.define('MultiImageViewer', {
    extend: 'ImageViewer',

    requires: ['Ext.XTemplate'],

    config: {
        currentImage: 0,
        imageCount: 0,
        sources: null
    },

    initComponent: function () {
        var me = this;

        me.setSources(me.src);
        me.setImageCount(me.src.length);

        me.currentImageTemplate = me.currentImageTemplate || 'Viewing image {i} out of {total}';
        me.currentImage = 0;
        me.src = me.src[0];

        me.on('beforerender', me.insertPageUI, me);

        me.callParent();
    },

    insertPageUI: function () {
        var me = this,
            toolbar = this.down('toolbar');

        toolbar.add([{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            icon: 'resources/images/multiimageviewer/resultset_previous.png',
            listeners: { click: me.previousImage, scope: me }
        }, {
            xtype: 'tbtext'
        }, {
            xtype: 'button',
            icon: 'resources/images/multiimageviewer/resultset_next.png',
            listeners: { click: me.nextImage, scope: me }
        }]);

        me.updateImageText();
    },

    nextImage: function () {
        var me = this,
            index = this.getCurrentImage();

        index += 1;

        if (index === me.getImageCount()) {
            index = 0;
        }

        me.setCurrentImage(index);
        me.updateImageText();
    },

    previousImage: function () {
        var me = this,
            index = this.getCurrentImage();

        index -= 1;

        if (index < 0) {
            index = me.getImageCount() - 1;
        }

        me.setCurrentImage(index);
        me.updateImageText();
    },

    applyCurrentImage: function (index) {
        var me = this;

        me.getImage().el.dom.src = me.getSources()[index];

        return index;
    },

    updateImageText: function () {
        var me = this,
            tpl = new Ext.XTemplate(me.currentImageTemplate);

        me.down('toolbar').down('tbtext').setText(tpl.apply({
            i: me.getCurrentImage() + 1,
            total: me.getImageCount()
        }));
    },

    _isCurrentImageInitialized: function () {
        return true;
    }
});
