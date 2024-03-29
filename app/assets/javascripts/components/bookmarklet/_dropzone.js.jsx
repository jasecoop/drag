'use strict';

var Dropzone = require('dropzone'),
    Helpers = require('vendor/helpers'),
    IconComponent = require('vendor/icon'),
    BookmarkletDropzone;

BookmarkletDropzone = React.createClass({
    /**
     * Configuration of Dropzone.js. Defaults are
     * overriden overriden by the 'djsConfig' property
     * For a full list of possible configurations,
     * please consult
     * http://www.dropzonejs.com/#configuration
     */
    getDjsConfig: function () {
        var options,
            defaults = {
                url: this.props.config.postUrl,
                headers: {
                  'X-Transaction': 'POST Example',
                  'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                withCredentials: true
            };

        if (this.props.config.allowedFiletypes && this.props.config.allowedFiletypes.length > 0) {
            defaults.acceptedFiled = this.props.config.allowedFiletypes;
        }

        if (this.props.djsConfig) {
            options = Helpers.extend(true, {}, defaults, this.props.djsConfig);
        } else {
            options = defaults;
        }

        return options;
    },

    /**
     * React 'componentDidMount' method
     * Sets up dropzone.js with the component.
     */
    componentDidMount:  function () {
        var self = this,
            options = this.getDjsConfig();

        if (!this.props.config.postUrl && !this.props.eventHandlers.drop) {
            console.info('Neither postUrl nor a "drop" eventHandler specified, the React-Dropzone component might misbehave.');
        }

        Dropzone.autoDiscover = false;
        var t = this;
        this.dropzone = new Dropzone('div#'+this.props.id, options);
        this.setupEvents();
    },

    /**
     * React 'componentWillUnmount'
     * Removes dropzone.js (and all its globals) if the component is being unmounted
     */
    componentWillUnmount: function () {
        this.dropzone.destroy();
    },

    /**
     * React 'render'
     */
    render: function () {
        var icons = [],
            files = this.state.files,
            config = this.props.config,
            className = (this.props.className) ? 'filepicker dropzone' + this.props.className : 'filepicker dropzone';

        if (config.showFiletypeIcon && config.allowedFiletypes && (!files || files.length < 1)) {
            for (var i = 0; i < this.props.config.allowedFiletypes.length; i = i + 1) {
                icons.push(React.createElement(IconComponent, {filetype: this.props.config.allowedFiletypes[i], key: "icon-component" + i}));
            }
        }

        return (
            React.createElement("div", {className: className},
                icons,
                this.props.children
            )
        );
    },

    /**
     * React 'getInitialState' method, setting the initial state
     * @return {object}
     */
    getInitialState: function () {
        return {
            files: []
        }
    },

    /**
     * Takes event handlers in this.props.eventHandlers
     * and binds them to dropzone.js events
     */
    setupEvents: function () {
        var _this = this;
        var eventHandlers = this.props.eventHandlers;

        if (!this.dropzone || !eventHandlers) {
            return;
        }

        for (var eventHandler in eventHandlers) {
            if (eventHandlers.hasOwnProperty(eventHandler) && eventHandlers[eventHandler]) {
                // Check if there's an array of event handlers
                if (Object.prototype.toString.call(eventHandlers[eventHandler]) === '[object Array]') {
                    for (var i = 0; i < eventHandlers[eventHandler].length; i = i + 1) {
                        // Check if it's an init handler
                        if (eventHandler === 'init') {
                            eventHandlers[eventHandler][i](this.dropzone);
                        } else {
                            this.dropzone.on(eventHandler, eventHandlers[eventHandler][i]);
                        }
                    }
                } else {
                    if (eventHandler === 'init') {
                        eventHandlers[eventHandler](this.dropzone);
                    } else {
                        this.dropzone.on(eventHandler, eventHandlers[eventHandler]);
                    }
                }
            }
        }

        this.dropzone.on('addedfile', function(file)  {
            if (file) {
                var files = this.state.files;

                if (!files) {
                    files = [];
                }

                files.push(file)

                this.setState({
                    files: files,
                });

                this.props.setActiveCollection(_this.props.collection)
            }
        }.bind(this));

        this.dropzone.on('removedfile', function(file)  {
            if (file) {
                var files = this.state.files;

                if (files && files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        if (files[i].name === file.name && files[i].size === file.size) {
                            files.splice(i, 1);
                        }
                    }

                    this.setState({files: files});
                }
            }
        }.bind(this));
    }
});

module.exports = BookmarkletDropzone;
