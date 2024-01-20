describe("Window", () => {
  it("resize vec", () => {
    const origins = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [0.5, 0.5],
    ];
    const expected = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    for (const origin of origins) {
      const [originX, originY] = origin;
      const vec = Math.atan2(originY - 0.5, originX - 0.5);
      console.log([originX, originY], vec);
    }
  });
});
