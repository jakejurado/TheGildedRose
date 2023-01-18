const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("quality of Brie cheese grows by 1 every day", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(11);
  });

  it("quality of Brie cheese and Tickets never grow past 50", () => {
    const gildedRose = new Shop([
      new Item("Aged Brie", 4, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBeLessThan(51);
    expect(gildedRose.items[1].quality).toBeLessThan(51);
  });

  it("sellIn of Brie cheese shrinks by 1 every day (even though it doesn't have a purpose)", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);
  });

  it("quality of backstage drops each day by 1 when sellIn is above 10", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(1);
  });

  it("quality of backstage drops each day by 2 when sellIn is above 5 and below 11", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(2);
  });

  it("quality of backstage drops each day by 3 when sellIn is above 0 and below 6", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(3);
  });

  it("quality of backstage passes are 0 after sellIn is negative", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("sulfuras never decresses in quality", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 1, 80),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
  });

  it("the quality sulfuras is always 80", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 1, 78),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
  });

  it("sulfuras' sellIn value never decreases", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 1, 80),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(1);
  });

  it("each day lowers both quality and sellin", () => {
    const gildedRose = new Shop([new Item("toothpaste", 5, 5)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
    expect(gildedRose.items[0].sellIn).toBe(4);
  });

  it("quality of an item should never be negative", () => {
    const gildedRose = new Shop([new Item("toothpaste", 5, 1)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("quality degrades twice as fast once sell date has passed", () => {
    const gildedRose = new Shop([new Item("toothpaste", 0, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(18);
  });

  it("Conjured items degrade in Quality twice as fast as normal items", () => {
    const gildedRose = new Shop([new Item("Conjured", 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(18);
  });

  it("Conjured items degrade in Quality twice as fast as normal items when sellIn is negative", () => {
    const gildedRose = new Shop([new Item("Conjured", 0, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(16);
  });
});
