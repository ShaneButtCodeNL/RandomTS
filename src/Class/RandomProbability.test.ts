import RandomProbability from "./RandomProbabilty";

describe("\n01 Constructors", () => {
  it("01 empty constructor", () => {
    const RNG = new RandomProbability();
    expect(RNG).toBeDefined();
    expect(typeof RNG).toBe("object");
  });
  it("02 constructor with a seed", () => {
    const RNG = new RandomProbability(123456);
    expect(RNG).toBeDefined();
    expect(typeof RNG).toBe("object");
  });
  it("03 constructor with 2 seeds", () => {
    const RNG = new RandomProbability(123456, 654321);
    expect(RNG).toBeDefined();
    expect(typeof RNG).toBe("object");
  });
  it("04 constructor with 2 seeds and precision", () => {
    const RNG = new RandomProbability(123456, 654321, 3);
    expect(RNG).toBeDefined();
    expect(typeof RNG).toBe("object");
  });
});
describe("\n02 Generate values", () => {
  it("01 no seed generates values in range [0,1)", () => {
    const rng = new RandomProbability();
    for (let i = 0; i < 1000; i++) {
      const v = rng.next();
      expect(v).toBeLessThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(0);
    }
  });
  it("02 no seed generates values in range [0,1) when using offset", () => {
    const rng = new RandomProbability();
    for (let i = 0; i < 1000; i++) {
      const v = rng.next(i * 123 + 23491);
      expect(v).toBeLessThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(0);
    }
  });
  it("03 2 seed generates values in range [0,1)", () => {
    const rng = new RandomProbability(1234567, 274645);
    for (let i = 0; i < 1000; i++) {
      const v = rng.next();
      expect(v).toBeLessThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(0);
    }
  });
  it("04 2 seed generates values in range [0,1) when using offset", () => {
    const rng = new RandomProbability(1234567, 274645);
    for (let i = 0; i < 1000; i++) {
      const v = rng.next(i * 123 + 23491);
      expect(v).toBeLessThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(0);
    }
  });
  it("05 precision levels should format output correctly", () => {
    const rng = new RandomProbability(1234567, 274645);
    for (let i = 1; i < 7; i++) {
      rng.setPrecision(i);
      for (let j = 0; j < 100; j++) {
        const v = rng.next();
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
        //3+i as 2 precision will be [0.00 , 0.99)
        expect(v.toString().length).toBeLessThan(3 + i);
      }
    }
  });
});
