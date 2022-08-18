import m from "mithril";

var ActorPage = {
  oninit: function (vnode) {
    Actor.load(vnode.attrs.id);
  },
  view: function () {
    return m("p", Actor.name + " " + Actor.birthday);
  },
};
