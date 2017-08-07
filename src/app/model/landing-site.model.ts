import { Geolocation } from "./geolocation.model";

export class LandingSite {
  id: number;
  name?: string;
  nametype?: string; //valid: a typical meteorite, relict: a meteorite that has been highly degraded by weather on Earth
  recclass?: string; //the class of the meteorite; one of a large number of classes based on physical, chemical, and other characteristics
  mass?: number; //mass in grams
  fall?: string; //find vs fall http://www.permanent.com/meteorites-falls-finds.html
  /*
  "Found" are meteorites which were found on the ground unrelated to any sighting, 
  due to the finder recognizing them to be clearly identifyable as being of nonterrestrial origin.

  "Fell" are meteorites which were seen to fall from the sky and which were tracked down successfully.
  */
  year?: Date;
  geolocation?: Geolocation;
}
