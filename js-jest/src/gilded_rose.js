// BEST PRACTICES
// used a linter according to the AirBnB linting standard
// improved readability and logic by removing nested if statements from the updateQuality method and implemented a switch.
// modularized the code for scalability by creating new methods for each item type in the store.
// Implemented variables (such as maxQuality, minQuality, and rate) in the Shop class to make future refactoring easier  (side note, I was not able to do this for the backstage tickets rate increases without making some assumptions, so I left as is)
// separated out the sellIn updater into its own method for the same reasons stated above.
// I added comments to help future developers know what's going on.
// I wrote descriptive code to make everything easier to read.
// I wrote tests to make sure the refactored code works as expected.
// I wrote tests to make sure the new update works as expected.
// minimized potential errors by accounting for data entry error for sulfuras quality.

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.maxQuality = 50;
    this.minQuality = 0;
    this.rate = 1;
  }

  updateBrie(item) {
    //increment quality unless maxQuality has been reached
    item.quality =
      item.quality >= this.maxQuality
        ? this.maxQuality
        : item.quality + this.rate;
  }

  updatePasses(item) {
    //if concert has passed then item quality is 0
    if (item.sellIn < 0) item.quality = this.minQuality;
    else {
      //update quality depending on how close we are to concert (never past maxQuality)
      item.quality++;
      if (item.sellIn < 10) item.quality++;
      if (item.sellIn < 5) item.quality++;
      item.quality =
        item.quality > this.maxQuality ? this.maxQuality : item.quality;
    }
  }

  updateSulfuras(item) {
    //sets quality to 80 in case quality was entered incorrectly.
    item.quality = 80;
  }

  updateConjured(item) {
    //quality declines double the normal rate and double again if sellIn is negative (quality is never negative)
    const doubleRate = this.rate * 2;
    let newRate = item.sellIn < 0 ? doubleRate * 2 : doubleRate;
    item.quality =
      item.quality - newRate < this.minQuality
        ? this.minQuality
        : item.quality - newRate;
  }

  updateItem(item) {
    //quality declines and then doubles the rate if sellIn is negative (quality is never negative)
    const newRate = item.sellIn < 0 ? this.rate * 2 : this.rate;
    item.quality =
      item.quality - newRate < this.minQuality
        ? this.minQuality
        : item.quality - newRate;
  }

  updateSellIn(item) {
    //reduce sellIn by one for every item except Sulfuras
    item.sellIn =
      item.name !== "Sulfuras, Hand of Ragnaros"
        ? item.sellIn - this.rate
        : item.sellIn;
  }

  //iterate over all items to update quality and sellIn values
  updateQuality() {
    for (let item of this.items) {
      //update sellIn value
      this.updateSellIn(item);

      //update quality value
      switch (item.name) {
        case "Aged Brie":
          this.updateBrie(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.updatePasses(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          this.updateSulfuras(item);
          break;
        case "Conjured":
          this.updateConjured(item);
          break;
        default:
          this.updateItem(item);
          break;
      }
      return this.items;
    }
  }
}

module.exports = {
  Item,
  Shop,
};
