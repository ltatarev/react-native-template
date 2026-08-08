import { groupBy, moveItem, uniqueBy } from './array';

describe('moveItem', () => {
  it('swaps an item with its neighbor', () => {
    expect(moveItem(['a', 'b', 'c'], 2, 'up')).toEqual(['a', 'c', 'b']);
    expect(moveItem(['a', 'b', 'c'], 0, 'down')).toEqual(['b', 'a', 'c']);
  });

  it('returns the original order when the move is out of bounds', () => {
    expect(moveItem(['a', 'b'], 0, 'up')).toEqual(['a', 'b']);
    expect(moveItem(['a', 'b'], 1, 'down')).toEqual(['a', 'b']);
  });

  it('does not mutate the input', () => {
    const items = ['a', 'b'];

    moveItem(items, 0, 'down');

    expect(items).toEqual(['a', 'b']);
  });
});

describe('groupBy', () => {
  it('keeps each group in source order', () => {
    const items = [
      { id: 1, kind: 'x' },
      { id: 2, kind: 'y' },
      { id: 3, kind: 'x' },
    ];

    expect(groupBy(items, item => item.kind)).toEqual({
      x: [items[0], items[2]],
      y: [items[1]],
    });
  });
});

describe('uniqueBy', () => {
  it('keeps the first item of each key', () => {
    const items = [
      { id: 'a', label: 'first' },
      { id: 'a', label: 'second' },
      { id: 'b', label: 'third' },
    ];

    expect(uniqueBy(items, item => item.id)).toEqual([items[0], items[2]]);
  });
});
