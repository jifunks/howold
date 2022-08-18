import m from "mithril";
var ActorList = require("./views/ActorList");
var ActorList = require("./views/ActorList");
m.route.prefix("#");
m.route(document.body, "/list", {
  "/list": {
    render: function () {
      return m(Layout, m(ActorList));
    },
  },
  "/actor/:id": {
    render: function (vnode) {
      return m(Layout, m(ActorPage, vnode.attrs));
    },
  },
});
