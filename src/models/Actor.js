import { MovieDb } from "moviedb-promise";
import m from "mithril";
import _ from "lodash";

const movieDbInstance = new MovieDb("4404811166bc7c84005ffcdb34516ff1");

const loadActorList = (nameQueryString) => {
  return movieDbInstance
    .searchPerson({ query: nameQueryString })
    .then((res) => {
      Actor.list = _.orderBy(res.results, "popularity", "desc");
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

  current: {},
  load: (id) => {
    movieDbInstance.personInfo({ id }).then((res) => {
      Actor.current.bio = res;
    });
    return movieDbInstance.personMovieCredits({ id }).then((res) => {
      const ages = moviesAndAges(res.cast, Actor.current.bio.birthday);
      Actor.current.credits = ages;
    });
  },
};

const moviesAndAges = (movieCredits, actorBirthday) => {
  const moviesAndAges = [];
  for (let credit of movieCredits) {
    const ageDiff = calculateAge(actorBirthday, credit.release_date);
    moviesAndAges.push({
      id: credit.id,
      title: credit.title,
      year: credit.release_date?.split("-")[0],
      age: ageDiff,
    });
  }
  const sortedByAge = _.sortBy(moviesAndAges, "age");
  console.log("UPDATED AGES");
  m.redraw();
  return sortedByAge;
};

function calculateAge(birthday, movieRelease) {
  // birthday is a date
  const bdayAsDate = new Date(birthday);
  const creditAsDate = new Date(movieRelease);
  var ageDifMs = creditAsDate - bdayAsDate;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export default Actor;
