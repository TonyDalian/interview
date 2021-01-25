//this `keyword`
//==========================================

// 1. method -> obj 
const video = {
    title: 'a',
    play() {
        console.log(this); // {title: "a", play: ƒ}
    }
};
video.play();

video.stop = function() {
    console.log(this);
}
video.stop();

// 2. function -> global(window, global)
function playVideo() {
    console.log(this); // Window
}

// 3. constructor functions
function Video(title) {
    this.title = title;
    console.log(this); // Video {title: "b"}
}
const v = new Video('b');


const video = {
    title: 'a',
    tags: ['a', 'b', 'c'],
    showTags() {
        this.tags.forEach(function(tag) {
            //callback common function
            console.log(this, tag); // Window 
        });
    }
}

// solution

//1 let
const video = {
    title: 'a',
    tags: ['a', 'b', 'c'],
    showTags() {
        this.tags.forEach(tag => console.log(this.title, tag));
    }
}
//2 
const video = {
    title: 'a',
    tags: ['a', 'b', 'c'],
    showTags() {
        this.tags.forEach(function(tag) {
            console.log(this.title, tag); 
        }, this);
    }
}
//3
const video = {
    title: 'a',
    tags: ['a', 'b', 'c'],
    showTags() {
        var self = this;
        this.tags.forEach(function(tag) {
            console.log(self.title, tag); 
        });
    }
}