import m from "mithril";
import { MovieDb } from "moviedb-promise";
import ActorList from "./views/ActorList";
import Actor from "./models/Actor";

const movieDbInstance = new MovieDb("4404811166bc7c84005ffcdb34516ff1");

var root = document.body;

var actorData = {};

var getActor = (actorName) => {
  movieDbInstance
    .searchPerson({ query: actorName })
    .then((res) => {
      console.log(res);
      actorData = res;
      m.redraw();
    })
    .catch(console.error);
};

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
          const actorNameQuery = e.target.value;
          // debouncedGetActor(actorNameQuery);
          // need to have actorlist call a seach
          Actor.loadActorList(actorNameQuery);
        },
      }),

      m("p", JSON.stringify(actorData)),
      m(
        ".actor-list",
        Actor.list.map((actor) => {
          return m(".actor-list-item", actor.name + " " + actor.birthday);
        })
      ),
    ]);
  },
};

m.mount(root, Main);
