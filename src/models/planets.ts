//log module allows filePath to be read by windows and mac
//parse csv function
// BufReader implements buffering for a Reader object
import { log, join, parse, BufReader } from "../deps.ts";

import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

//define typescript interface

//each planet object is a string
type Planet = Record<string, string>;

let planets: Array<Planet>;
//                              panets an array of aplanets
export function filterHabitablePlanets(planets: Array<Planet>) {
  return planets.filter((planet) => {
    const plantaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] === "CONFIRMED" &&
      plantaryRadius > 0.5 && plantaryRadius < 1.5 &&
      stellarMass > 0.78 && stellarMass < 1.04 &&
      stellarRadius > 0.99 && stellarRadius < 1.01;
  });
}

async function loadPlanetsData() {
  //           join('currentDIR', 'fileName')
  const path = join("data", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    // parse header and commit
    header: true,
    comment: "#",
  });
  //Deno.close to prevent memory leak
  Deno.close(file.rid);

  //                  typescript type assertion
  const planets = filterHabitablePlanets(result as Array<Planet>);
  //_.pick() lodash Creates an object composed of the picked object properties.

  return planets.map((planet) => {
    return _.pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff",
    ]);
  });
}

planets = await loadPlanetsData();

log.info(`${planets.length} habitable planets found!`);

export function getAllPlanets() {
  return planets;
}
