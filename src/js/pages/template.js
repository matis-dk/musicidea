import React from 'react';

export default () => (
    <div id="template">
        <div className="item">
            <h1 className="item-header">Colors</h1>
            <div className="box-wrap">
                <div className="box box1"> </div>
                <div className="box box2"> </div>
                <div className="box box3"> </div>
                <div className="box box4"> </div>
                <div className="box box5"> </div>
            </div>
        </div>
        <div className="item">
            <h1 className="item-header">Shadows</h1>
            <div className="box-wrap">
                <div className="box card-1"> </div>
                <div className="box card-2"> </div>
                <div className="box card-3"> </div>
                <div className="box card-4"> </div>
                <div className="box card-5"> </div>
            </div>
        </div>
        <div className="item">
            <h1 className="item-header">Text & fonts</h1>
            <div className="text-wrap">
                <h1>This is h1</h1>
                <h2>This is h2</h2>
                <h3>This is h3</h3>
                <h4>This is h4</h4>
                <h5>This is h5</h5>
                <p>This is p</p>
                <span>This is span</span>
                <div>This is div</div>
                <ul><li>This is li</li></ul>
            </div>
            <div className="text-wrap">
                <p className="text-larsseit text-weith1">Larsseit light</p>
                <p className="text-larsseit text-weith2">Larsseit medium</p>
                <p className="text-larsseit text-weith3">Larsseit bold</p>
            </div>
        </div>

    </div>
)
