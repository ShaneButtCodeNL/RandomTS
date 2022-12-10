import RandomWholeNumber from "./RandomWholeNumber";

describe("\n01 Constructors", () => {
  it("01 empty constructor", () => {
    const RNG = new RandomWholeNumber();
    expect(RNG).toBeDefined();
    expect(typeof RNG).toBe("object");
  });
  it("02 constructor with seed", () => {
    const RNG = new RandomWholeNumber(123456);
    expect(RNG).toBeDefined();
    expect(typeof RNG).toBe("object");
  });
  it("03 constructor with seed multiplier incrementor modulus", () => {
    const RNG = new RandomWholeNumber(123456, 321, 111, 30000);
    expect(RNG).toBeDefined();
    expect(typeof RNG).toBe("object");
  });
  it("04 constructor with seed multiplier incrementor modulus max min", () => {
    const RNG = new RandomWholeNumber(123456, 321, 111, 30000, 312312, 500);
    expect(RNG).toBeDefined();
    expect(typeof RNG).toBe("object");
  });
});

describe("\n02 Generate Values", () => {
  it("01 Should generate a number from next calls", () => {
    const RNG1 = new RandomWholeNumber();
    const RNG2 = new RandomWholeNumber(123456789, 1234, 4321, 12345, 12344, 0);
    expect(typeof RNG1.next()).toBe("number");
    expect(typeof RNG2.next()).toBe("number");
  });
  it("02 2 RNGs with same seed should generate the same values", () => {
    const RNG1 = new RandomWholeNumber(1234567);
    const RNG2 = new RandomWholeNumber(1234567);
    for (let i = 0; i < 100; i++) {
      let r1 = RNG1.next();
      let r2 = RNG2.next();
      expect(r1 === r2).toBeTruthy();
    }
    for (let i = 0; i < 100; i++) {
      let r1 = RNG1.next(1234);
      let r2 = RNG2.next(1234);
      expect(r1 === r2).toBeTruthy();
    }
  });
  it("03 Reset should generate the same values", () => {
    const RNG = new RandomWholeNumber();
    let array1 = [];
    for (let i = 0; i < 100; i++) {
      array1.push(RNG.next());
    }
    RNG.reset();
    let array2 = [];
    for (let i = 0; i < 100; i++) {
      array2.push(RNG.next());
    }
    expect(array1.toString()).toBe(array2.toString());
  });
});

describe("\n03 Range functions. Each will call 1000 calls to next", () => {
  it("01 Generateed values should be in range", () => {
    const RNG = new RandomWholeNumber(1234567, 1234, 123, 1233, 10, 0);
    for (let i = 0; i < 1000; i++) {
      const v = RNG.next();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(10);
    }
  });
  it("02 Change max value of range, generate values should be less then new max", () => {
    const RNG = new RandomWholeNumber(1234567, 1234, 123, 1233, 10, 0);
    const newMax = 100;
    RNG.setMax(newMax);
    for (let i = 0; i < 1000; i++) {
      const v = RNG.next();
      expect(v).toBeLessThan(newMax);
    }
  });
  it("03 Change min value of range, generate values should be greater then or equal then new min", () => {
    const RNG = new RandomWholeNumber(1234567, 1234, 123, 1233, 200, 0);
    const newMin = 100;
    RNG.setMin(newMin);
    for (let i = 0; i < 1000; i++) {
      const v = RNG.next();
      expect(v).toBeGreaterThanOrEqual(newMin);
    }
  });
  it("04 Change range", () => {
    const RNG = new RandomWholeNumber(1234567, 1234, 123, 1233, 200, 0);
    const newMin = 100;
    const newMax = 110;
    RNG.setMinMax(newMin, newMax);
    for (let i = 0; i < 1000; i++) {
      const v = RNG.next();
      expect(v).toBeLessThan(newMax);
      expect(v).toBeGreaterThanOrEqual(newMin);
    }
  });
  it("05 Change min value to value greater than max should not affect RNG", () => {
    const RNG = new RandomWholeNumber(1234567, 1234, 123, 1233, 200, 0);
    RNG.setMin(9000);
    for (let i = 0; i < 1000; i++) {
      const v = RNG.next();
      expect(v).not.toBeGreaterThanOrEqual(200);
    }
  });
  it("06 Change Max Value to be less than min should do nothing", () => {
    const RNG = new RandomWholeNumber(12345467, 12345, 123, 5000, 1000, 900);
    RNG.setMax(900);
    for (let i = 0; i < 1000; i++) {
      const v = RNG.next();
      expect(v).not.toBeLessThan(900);
    }
    RNG.setMax(500);
    for (let i = 0; i < 1000; i++) {
      const v = RNG.next();
      expect(v).not.toBeLessThan(900);
    }
  });
});
