import { MovieDb } from "moviedb-promise";
import m from "mithril";
import _ from "lodash";

const movieDbInstance = new MovieDb("4404811166bc7c84005ffcdb34516ff1");

const loadActorList = (nameQueryString) => {
  return movieDbInstance
    .searchPerson({ query: nameQueryString })
    .then((res) => {
      Actor.list = res.results;
      console.log(Actor.list);
      m.redraw();
    })
    .catch(console.error);
};
const debouncedGetActor = _.debounce(loadActorList, 1000);

const Actor = {
  list: [],
  loadActorList: (nameQueryString) => {
    return debouncedGetActor(nameQueryString);
  },

  current: { name: "Jeff Bridges", birthday: "Jan 1 1980" },
  load: (id) => {
    console.log(`loading id: ${id}`);
    return movieDbInstance.personInfo({ id }).then((res) => {
      console.log("ACTOR INFO", res);
      Actor.current = res;
    });
  },
};

export default Actor;
