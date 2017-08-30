// (function() {
//   var section = document.querySelectorAll(".row");
//   var sections = {};
//   var i = 0;
//
//   Array.prototype.forEach.call(section, function(e) {
//     sections[e.id] = e.offsetTop;
//   });
//
//   window.onscroll = function() {
//     unfortunately this doesn't work in REACT
//     alert('dj g')
//
//     var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
//
//     for (i in sections) {
//       if (sections[i] <= scrollPosition) {
//         document.querySelector('.active').setAttribute('class', ' ');
//         document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
//       }
//     }
//
//   };
// })();
