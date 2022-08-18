import m from "mithril";
import Actor from "./models/Actor";

var root = document.body;

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
          if ((e.length = 0)) return;
          const actorNameQuery = e.target.value;
          Actor.loadActorList(actorNameQuery);
        },
      }),

      m(
        ".actor-list",
        Actor.list.map((actor) => {
          return m(
            ".actor-list-item",
            {
              id: actor.id,
              onclick: () => {
                Actor.load(actor.id);
              },
            },
            `${actor.name}, (${actor.known_for[0]?.title ?? "unknown"} (${
              actor.known_for[0]?.release_date?.split("-")[0]
            }))`
          );
        })
      ),
    ]);
  },
};

m.mount(root, Main);
