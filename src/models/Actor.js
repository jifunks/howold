import { MovieDb } from "moviedb-promise";
import m from "mithril";

const movieDbInstance = new MovieDb("4404811166bc7c84005ffcdb34516ff1");

const Actor = {
  list: [],
  loadActorList: (nameQueryString) => {
    return movieDbInstance
      .searchPerson({ query: nameQueryString })
      .then((res) => {
        console.log("%%%R EXECUTING QUERY");
        Actor.list = res.results;
        m.redraw();
      })
      .catch(console.error);
  },

  current: { name: "Jeff Bridges", birthday: "Jan 1 1980" },
  load: (id) => {
    return movieDbInstance.personInfo({ id }).then((res) => {
      console.log("ACTOR INFO", res);
      Actor.current = res;
    });
  },
};

export default Actor;
