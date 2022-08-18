import m from "mithril";
import Actor from "../models/Actor";

const ActorList = {
  onInit: Actor.loadActorList,
  view: () => {
    return m(
      ".actor-list",
      Actor.list.map((actor) => {
        return m(
          ".actor-list-item",
          {
            id: actor.id,
            onclick: () => {
              console.log("clicked");
            },
          },
          `${actor.name}, (${actor.known_for[0]?.title ?? "unknown"} (${
            actor.known_for[0]?.release_date?.split("-")[0]
          }))`
        );
      })
    );
  },
};

export default ActorList;
