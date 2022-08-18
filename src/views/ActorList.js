import m from "mithril";
import Actor from "../models/Actor";

const ActorList = {
  onInit: Actor.loadActorList,
  view: () => {
    return m(
      ".actor-list",
      Actor.list.map((actor) => {
        return m(".actor-list-item", actor.name + " " + actor.birthday);
      }),
      "abcdefg"
    );
  },
};

export default ActorList;
