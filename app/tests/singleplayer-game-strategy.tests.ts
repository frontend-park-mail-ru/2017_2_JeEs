import SinglePlayerGameStrategy from "../game/game-strategies/singleplayer-game-strategy"

let singlePlayerGameStrategy: SinglePlayerGameStrategy = new SinglePlayerGameStrategy(5);

test("simple test", () => {
    expect(singlePlayerGameStrategy.fieldDimension).toBe(5);
});