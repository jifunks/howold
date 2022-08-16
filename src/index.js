import m from "mithril";
import _ from "lodash";
import { MovieDb } from "moviedb-promise";

const movieDbInstance = new MovieDb("4404811166bc7c84005ffcdb34516ff1");

var root = document.body;

var actorData = {};

var getActor2 = (actorName) => {
  movieDbInstance
    .searchPerson({ query: actorName })
    .then((res) => {
      console.log(res);
    })
    .catch(console.error);
};
const debouncedGetActor = _.debounce(getActor2, 1000);

var Main = {
  view: () => {
    return m("main", [
      m(
        "h1",
        {
          class: "title",
        },
        "How Old?"
      ),

      m("input", {
        placeholder: "Actor name...",
        oninput: (e) => {
          const value = e.target.value;
          debouncedGetActor(value);
        },
      }),

      m("p", JSON.stringify(actorData)),
    ]);
  },
};

m.mount(root, Main);
