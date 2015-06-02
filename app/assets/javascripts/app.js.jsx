App = React.createClass({
    render: function () {
        return <div>
            < Header/>
            <div id="tags">
                <TagsBox/>
            </div>
            <div id="images">
                <ImageBox/>
            </div>
        </div>;
    }
});

App.start = function () {
    React.render(<App/>, document.getElementById('app'));
};
